import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Food7beachModule } from './food7beach/food7beach.module';

@Module({
  imports: [Food7beachModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
