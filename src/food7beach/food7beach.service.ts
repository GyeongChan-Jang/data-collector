import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { FoodImageDto, FoodImageResponse } from './dto/foodImage.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  RestaurantDto,
  RestaurantData,
  RestaurantResponse,
} from './dto/restaurant.dto';

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
      const response = await axios.get<RestaurantResponse>(
        `${this.BASE_URL}/api/rstr`,
        {
          params: {
            serviceKey: this.API_KEY,
          },
        },
      );
      console.log(response.data);

      const rstrData: RestaurantDto[] = response.data.body.map((rstr) => ({
        rstrId: rstr.RSTR_ID,
        rstrName: rstr.RSTR_NM,
        rstrRoadAddr: rstr.RSTR_RDNMADR,
        rstrLotNumberAddr: rstr.RSTR_LNNO_ADRES,
        rstrLat: rstr.RSTR_LA,
        rstrLng: rstr.RSTR_LO,
        rstrPhone: rstr.RSTR_TELNO,
        bizName: rstr.BSNS_STATM_BZCND_NM,
        bizLicenceName: rstr.BSNS_LCNC_NM,
        rstrDescription: rstr.RSTR_INTRCN_CONT,
      }));

      const success = await this.prismaService.restaurant.createMany({
        data: rstrData,
        skipDuplicates: true,
      });

      return success;
    } catch (err) {
      console.log(err);
      return { err };
    }
  }

  async getFoodImage() {
    console.log(this.BASE_URL);
    console.log(this.BASE_URL);
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

      return response;
    } catch (err) {
      return err;
    }
  }
}
