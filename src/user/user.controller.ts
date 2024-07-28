import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordService } from '../password/password.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly prismaService: PrismaService,
    private encryptionService: PasswordService,
  ) {}

  @Get()
  async getUsers() {
    try {
      return this.prismaService.user.findMany();
    } catch (error) {
      throw new HttpException(
        'Error retrieving users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createUser(
    @Body() userData: { name: string; email: string; password: string },
  ) {
    try {
      const { name, email, password } = userData;
      const userExists = await this.prismaService.user.findUnique({
        where: { email },
      });
      if (userExists) {
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.CONFLICT,
        );
      }
      const encryptedPassword = this.encryptionService.encrypt(password);
      console.log(password, encryptedPassword);
      return this.prismaService.user.create({
        data: { name: name, email: email, password: encryptedPassword },
      });
    } catch (error) {
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
