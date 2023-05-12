import { Food7beachService } from './food7beach.service';
import { Controller, Get } from '@nestjs/common';

@Controller('food7beach')
export class Food7beachController {
  constructor(private food7beachService: Food7beachService) {}

  @Get('food-image')
  async getFoodImage() {
    return await this.food7beachService.getFoodImage();
  }
}