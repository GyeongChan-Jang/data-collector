import { Module } from '@nestjs/common';
import { Food7beachController } from './food7beach.controller';
import { Food7beachService } from './food7beach.service';

@Module({
  controllers: [Food7beachController],
  providers: [Food7beachService]
})
export class Food7beachModule {}
