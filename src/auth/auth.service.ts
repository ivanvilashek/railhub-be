import { JwtPayload, SignInDto, SignUpDto, Tokens } from '@app/common'
import { UserService } from '@app/user'
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async signUp(data: SignUpDto): Promise<Tokens> {
    const email = data.email.trim().toLowerCase()
    const firstName = data.firstName.trim()
    const password = data.password.trim()
    const lastName = data.lastName.trim()

    const user = await this.userService.findByEmail(email)

    if (!!user) {
      throw new BadRequestException(`User with email ${email} already exist`)
    }

    const hash = await bcrypt.hash(password, 10)

    const newUser = await this.userService.create({
      firstName,
      lastName,
      email,
      hash,
    })

    return this.getTokens({ sub: newUser.id, email })
  }

  public async signIn(data: SignInDto): Promise<Tokens> {
    const email = data.email.trim().toLowerCase()
    const password = data.password.trim()

    const user = await this.userService.findByEmail(email)

    if (!user) {
      throw new NotFoundException(`User with email ${email} doesn't exist`)
    }

    const isMatch = await bcrypt.compare(password, user.hash)

    if (!isMatch) {
      throw new BadRequestException('Invalid credentials')
    }

    return this.getTokens({ sub: user.id, email })
  }

  public async refreshAccessToken(
    data: JwtPayload,
  ): Promise<Pick<Tokens, 'accessToken'>> {
    const accessToken = await this.jwtService.signAsync(data, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: 60 * 60,
    })

    return { accessToken }
  }

  private async getTokens(data: JwtPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(data, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: 60 * 60,
      }),

      this.jwtService.signAsync(data, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: 60 * 60 * 24 * 7,
      }),
    ])

    return { accessToken, refreshToken }
  }
}
