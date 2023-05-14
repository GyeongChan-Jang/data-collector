import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { FoodImageDto, FoodImageResponse } from './dto/foodImage.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class Food7beachService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}
  BASE_URL = `${this.configService.get<string>('FOOD7BEACH_BASE_URL')}`;
  API_KEY = `${this.configService.get<string>('FOOD7BEACH_API_KEY')}`;

  async getRstr() {
    try {
      const response = await axios.get(`${this.BASE_URL}/api/rstr`, {
        params: {
          serviceKey: this.API_KEY,
        },
      });

      console.log(response);

      // db에 저장

      return '음식점 정보가 성공적으로 db에 저장되었습니다.';
    } catch (err) {
      return err;
    }
  }

  async getFoodImage() {
    try {
      const response = await axios.get<FoodImageResponse>(
        `${this.BASE_URL}/api/food/img`,
        {
          params: {
            serviceKey: this.API_KEY,
          },
        },
      );

      // db에 저장

      return '음식 사진이 성공적으로 db에 저장되었습니다.';
    } catch (err) {
      return err;
    }
  }
}
