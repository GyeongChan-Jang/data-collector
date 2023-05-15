import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantDto, RestaurantResponse } from './dto/restaurant.dto';
import { RequestData } from 'src/food7beach/utils/request';
import { MenuDto, MenuResponse } from './dto/menu.dto';

@Injectable()
export class Food7beachService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    private request: RequestData,
  ) {}
  BASE_URL = `${this.configService.get<string>('FOOD7BEACH_BASE_URL')}`;
  API_KEY = `${this.configService.get<string>('FOOD7BEACH_API_KEY')}`;

  async getRstr() {
    try {
      const response = await this.request.get<RestaurantResponse>('/rstr', {
        pageNo: 2,
      });

      const rstrData: RestaurantDto[] = response.body.map((rstr) => ({
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

  async getMenu() {
    try {
      const response = await this.request.get<MenuResponse>('/menu/korean', {
        pageNo: 1,
      });

      // const menuData: MenuDto[] = response.body.map((menu) => ({
      //   menuId: menu.MENU_ID,
      //   menuName: menu.MENU_NM,
      //   menuPrice: menu.MENU_PRICE,
      //   isMenuSpecial: menu.SPCLT_MENU_YN,
      //   menuSpecialName: menu.SPCLT_MENU_NM,
      //   menuSpecialUrl: menu.SPCLT_MENU_OGN_URL,
      //   areaName: menu.AREA_NM,
      //   rstrId: menu.RSTR_ID,
      //   rstrName: menu.RSTR_NM,
      // }));

      // const success = await this.prismaService.menu.createMany({
      //   data: menuData,
      //   skipDuplicates: true,
      // });

      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // async getFoodImage() {
  //   console.log(this.BASE_URL);
  //   console.log(this.BASE_URL);
  //   try {
  //     const response = await axios.get<FoodImageResponse>(
  //       `${this.BASE_URL}/api/food/img`,
  //       {
  //         params: {
  //           serviceKey: this.API_KEY,
  //         },
  //       },
  //     );

  //     // db에 저장

  //     return response;
  //   } catch (err) {
  //     return err;
  //   }
  // }
}
