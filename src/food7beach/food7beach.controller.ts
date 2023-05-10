import { Food7beachService } from './food7beach.service';
import { Controller } from '@nestjs/common';

@Controller('food7beach')
export class Food7beachController {
  constructor(private food7beachService: Food7beachService) {
    this.food7beachService = food7beachService;
  }
}
