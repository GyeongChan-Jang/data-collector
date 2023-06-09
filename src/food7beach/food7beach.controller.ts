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

  @Get('food/img')
  async getFoodImage() {
    return await this.food7beachService.getFoodImage();
  }

  @Get('rstr/oprt')
  async getRstrOperationgInfo() {
    return await this.food7beachService.getRstrOperatingInfo();
  }

  @Get('rstr/qlt')
  async getRstrQuality() {
    return await this.food7beachService.getRstrQualityInfo();
  }
}
