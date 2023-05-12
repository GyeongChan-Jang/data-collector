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
      const foodData: FoodImageDto[] = response.data.body.map((food) => {
        return {
          RSTR_ID: food.RSTR_ID,
          RSTR_NM: food.RSTR_NM,
          AREA_NM: food.AREA_NM,
          MENU_ID: food.MENU_ID,
          FOOD_IMG_URL: food.FOOD_IMG_URL,
        };
      });
      await this.prismaService.foodImage.createMany({
        data: foodData,
        skipDuplicates: true,
      });

      return '음식 사진이 성공적으로 db에 저장되었습니다.';
    } catch (err) {
      return err;
    }
  }
}
