import { Cron, CronExpression } from '@nestjs/schedule';
import { FoodImageDto } from './dto/foodImage.dto';
import { Food7beachService } from './food7beach.service';
import { Body, Controller, Get } from '@nestjs/common';

@Controller('food7beach')
export class Food7beachController {
  constructor(private food7beachService: Food7beachService) {}

  // @Cron(CronExpression.EVERY_10_SECONDS)
  @Get('rstr')
  async getRstr() {
    return await this.food7beachService.getRstr();
  }

  @Get('menu/korean')
  async getMenu() {
    return await this.food7beachService.getMenu();
  }

  @Get('menu-dscrn/korean')
  async getMenuDetail() {
    return await this.food7beachService.getMenuDetail();
  }

  @Get('rstr/img')
  async getRstrImage() {
    return await this.food7beachService.getRstrImage();
  }

  // @Get('food-image')
  // async getFoodImage() {
  //   return await this.food7beachService.getFoodImage();
  // }
}
