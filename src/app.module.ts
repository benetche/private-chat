import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingController } from './ping/ping.controller';
import { PrismaService } from './prisma/prisma.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [],
  controllers: [AppController, PingController, UserController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
