import { FoodImageDto } from './dto/foodImage.dto';
import { Food7beachService } from './food7beach.service';
import { Body, Controller, Get } from '@nestjs/common';

@Controller('food7beach')
export class Food7beachController {
  constructor(private food7beachService: Food7beachService) {}

  @Get('rstr')
  async getRstr() {
    return await this.food7beachService.getRstr();
  }

  @Get('menu/korean')
  async getMenu() {
    return await this.food7beachService.getMenu();
  }

  // @Get('food-image')
  // async getFoodImage() {
  //   return await this.food7beachService.getFoodImage();
  // }
}
