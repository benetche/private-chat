import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('user')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getUsers() {
    return this.prismaService.user.findMany();
  }

  @Post()
  async createUser(@Body() userData: { name: string; email: string }) {
    return this.prismaService.user.create({
      data: userData,
    });
  }
}
