import { Module } from '@nestjs/common';
import { Food7beachController } from './food7beach.controller';
import { Food7beachService } from './food7beach.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestData } from 'src/food7beach/utils/request';

@Module({
  controllers: [Food7beachController],
  providers: [Food7beachService, PrismaService, RequestData],
})
export class Food7beachModule {}
