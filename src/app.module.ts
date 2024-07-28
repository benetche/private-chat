import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingController } from './ping/ping.controller';
import { PrismaService } from './prisma/prisma.service';
import { UserController } from './user/user.controller';
import { PasswordService } from './password/password.service';

@Module({
  imports: [],
  controllers: [AppController, PingController, UserController],
  providers: [AppService, PrismaService, PasswordService],
})
export class AppModule {}
