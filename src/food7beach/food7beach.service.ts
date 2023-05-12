import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { FoodImageDto } from './dto/foodImage.dto';

@Injectable()
export class Food7beachService {
  constructor(private configService: ConfigService) {}
  BASE_URL = `${this.configService.get<string>('FOOD7BEACH_BASE_URL')}`;
  API_KEY = `${this.configService.get<string>('FOOD7BEACH_API_KEY')}`;

  async getFoodImage() {
    try {
      const response = await axios.get(`${this.BASE_URL}/api/food/img`, {
        params: {
          serviceKey: this.API_KEY,
        },
      });
      return response.data;
    } catch (err) {
      return err;
    }
  }
}
