import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('user')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

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
      const { email } = userData;
      const userExists = await this.prismaService.user.findUnique({
        where: { email },
      });
      if (userExists) {
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.CONFLICT,
        );
      }
      return this.prismaService.user.create({
        data: userData,
      });
    } catch (error) {
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
