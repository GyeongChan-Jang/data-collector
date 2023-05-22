import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantDto, RestaurantResponse } from './dto/restaurant.dto';
import { RequestData } from 'src/food7beach/utils/request';
import { MenuDto, MenuResponse } from './dto/menu.dto';
import {
  MenuDetailDto,
  MenuDetailResponse,
  MenuDetailData,
} from './dto/menuDetail.dto';

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
    const rstrData: RestaurantDto[] = [];
    // api 요청 후 totalCount, numOfRows, totalPages 구하기
    try {
      const response = await this.request.get<RestaurantResponse>('/rstr', {
        numOfRows: 1,
      });

      const totalCount = response.header.totalCount;
      const numOfRows = response.header.numOfRows;
      const totalPages = Math.ceil(totalCount / numOfRows);

      for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
        console.log('pageNo', pageNo);
        try {
          const response = await this.request.get<RestaurantResponse>('/rstr', {
            pageNo,
          });

          const pageData: RestaurantDto[] = response.body.map((rstr) => ({
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

          rstrData.push(...pageData);
        } catch (err) {
          console.log(err);
          return err;
        }
      }
    } catch (err) {
      console.log(err);
      return err;
    }

    try {
      const success = await this.prismaService.restaurant.createMany({
        data: rstrData,
        skipDuplicates: true,
      });

      return success;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getMenu() {
    const menuData: MenuDto[] = [];

    // api 요청 후 totalCount, numOfRows, totalPages 구하기
    try {
      const response = await this.request.get<MenuResponse>('/menu/korean', {
        numOfRows: 1,
      });

      const totalCount = response.header.totalCount;
      const numOfRows = response.header.numOfRows;
      const totalPages = Math.ceil(totalCount / numOfRows);

      for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
        console.log('pageNo', pageNo);
        try {
          const response = await this.request.get<MenuResponse>(
            '/menu/korean',
            {
              pageNo,
            },
          );

          const pageData: MenuDto[] = response.body.map((menu) => ({
            menuId: menu.MENU_ID,
            menuName: menu.MENU_NM,
            menuPrice: menu.MENU_PRICE,
            isSpecial: menu.SPCLT_MENU_YN,
            specialName: menu.SPCLT_MENU_NM,
            specialUrl: menu.SPCLT_MENU_OGN_URL,
            areaName: menu.AREA_NM,
            rstrId: menu.RSTR_ID,
            rstrName: menu.RSTR_NM,
          }));

          menuData.push(...pageData);
        } catch (err) {
          console.log(err);
          return err;
        }
      }
    } catch (err) {
      console.log(err);
      return err;
    }

    try {
      const success = await this.prismaService.menu.createMany({
        data: menuData,
        skipDuplicates: true,
      });

      return success;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // menuDetail은 메뉴 테이블에 추가할 것
  // 식당데이터가 없으면 menu, menuDetail 정보도 저장이 안될듯
  // id를 찾아서 저장될텐데 데이터가 없다면 에러가 날듯
  async getMenuDetail() {
    const menuDetailData: MenuDetailDto[] = [];
    try {
      const response = await this.request.get<MenuDetailResponse>(
        '/menu-dscrn/korean',
        {
          numOfRows: 1,
        },
      );

      const totalCount = response.header.totalCount;
      const numOfRows = response.header.numOfRows;
      const totalPages = Math.ceil(totalCount / numOfRows);

      for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
        console.log('pageNo', pageNo);
        try {
          const response = await this.request.get<MenuDetailResponse>(
            '/menu-dscrn/korean',
            {
              pageNo,
            },
          );

          const pageData: MenuDetailDto[] = response.body.map((detail) => ({
            menuId: detail.MENU_ID,
            menuName: detail.MENU_NM,
            menuDescription: detail.MENU_DSCRN,
            menuCategoryL: detail.MENU_CTGRY_LCLAS_NM,
            menuCategoryS: detail.MENU_CTGRY_SCLAS_NM,
            rstrId: detail.RSTR_ID,
            rstrName: detail.RSTR_NM,
            areaName: detail.AREA_NM,
          }));

          menuDetailData.push(...pageData);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
      return err;
    }

    // menu table에 menuDetailData를 추가
    menuDetailData.forEach(async (detail) => {
      console.log(detail);
      try {
        const success = await this.prismaService.menu.update({
          where: {
            menuId: detail.menuId,
          },
          data: {
            menuDescription: detail.menuDescription,
            menuCategoryL: detail.menuCategoryL,
            menuCategoryS: detail.menuCategoryS,
          },
        });
        console.log(success);
      } catch (err) {
        console.log(err);
        return err;
      }
    });
  }
}
