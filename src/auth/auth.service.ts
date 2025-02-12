/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SignInDto } from './dto';

import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signin(dto: SignInDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // not found throw exception
    if (!user) throw new ForbiddenException('Invalid user credentials');

    // compare password hash
    const pmatches = await argon.verify(user.hash, dto.password);

    if (!pmatches) throw new ForbiddenException('Invalid Password!');
    // if password incorrect throw exception

    // send back the user
    return this.signToken(user.id, user.email);
  }

  async signup(dto: AuthDto) {
    try {
      // generate hash of the password
      const hash = await argon.hash(dto.password);
      // save the user in the db
      const user = await this.prisma.user.create({
        data: {
          fname: dto.fname,
          lname: dto.lname,
          mobile: dto.mobile,
          email: dto.email,
          hash,
        },
        select: {
          id: true,
          fname: true,
          mobile: true,
          email: true,
          createdAt: true,
        },
      });

      // return the saved user
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken');
        }
      }
      throw error;
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return { access_token: token };
  }
}
