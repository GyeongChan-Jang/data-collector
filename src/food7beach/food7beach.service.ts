import { Injectable } from '@nestjs/common';
import { ConfigService, getConfigToken } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantDto, RestaurantResponse } from './dto/restaurant.dto';
import { RequestData } from 'src/food7beach/utils/request';
import { MenuDto, MenuResponse } from './dto/menu.dto';
import {
  MenuDetailDto,
  MenuDetailResponse,
  MenuDetailData,
} from './dto/menuDetail.dto';
import {
  RestaurantImageDto,
  RestaurantImageResponse,
} from './dto/restaurantImage.dto';
import {
  FoodImageData,
  FoodImageDto,
  FoodImageResponse,
} from './dto/foodImage.dto';
import {
  RestaurantOprtDto,
  RestaurantOprtResponse,
} from './dto/restaurantOprtInfo';
import {
  RestaurantQualityDto,
  RestaurantQualityResponse,
} from './dto/restaurantQuality.dto';

@Injectable()
export class Food7beachService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    private request: RequestData,
  ) {}
  BASE_URL = `${this.configService.get<string>('FOOD7BEACH_BASE_URL')}`;
  API_KEY = `${this.configService.get<string>('FOOD7BEACH_API_KEY')}`;

  // 식당 기본정보 데이터 가져와 DB 저장
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

  // 메뉴 기본정보 데이터 가져와 DB 저장
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

  // 메뉴 상세정보 데이터 가져와 DB 저장
  async getMenuDetail() {
    // menuDetail은 메뉴 테이블에 추가할 것
    // 식당데이터가 없으면 menu, menuDetail 정보도 저장이 안될듯
    // id를 찾아서 저장될텐데 데이터가 없다면 에러가 날듯
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
    // for...of
    for (const detail of menuDetailData) {
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
        console.log(success, '메뉴 상세 업데이트 완료');
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  }

  // 식당 이미지 데이터 가져와 Resaurant 테이블에 저장
  async getRstrImage() {
    const rstrImageData: RestaurantImageDto[] = [];
    try {
      const response = await this.request.get<RestaurantImageResponse>(
        '/rstr/img',
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
          const response = await this.request.get<RestaurantImageResponse>(
            '/rstr/img',
            {
              pageNo,
            },
          );

          const pageData: RestaurantImageDto[] = response.body.map((image) => ({
            rstrId: image.RSTR_ID,
            rstrName: image.RSTR_NM,
            areaName: image.AREA_NM,
            rstrImgUrl: image.RSTR_IMG_URL,
          }));

          rstrImageData.push(...pageData);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
      return err;
    }

    // Restaurant table에 rstrImageData를 추가
    // for...of
    console.log(rstrImageData);
    for (const image of rstrImageData) {
      try {
        const success = await this.prismaService.restaurant.update({
          where: {
            rstrId: image.rstrId,
          },
          data: {
            rstrImgUrl: image.rstrImgUrl,
          },
        });
        console.log(success, '식당 이미지 업데이트 완료');
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  }

  // 메뉴 이미지 데이터를 가져와 Menu 테이블에 저장
  async getFoodImage() {
    const foodImageData: FoodImageDto[] = [];
    try {
      const response = await this.request.get<FoodImageResponse>('/food/img', {
        numOfRows: 1,
      });

      const totalCount = response.header.totalCount;
      const numOfRows = response.header.numOfRows;
      const totalPages = Math.ceil(totalCount / numOfRows);

      for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
        console.log('pageNo', pageNo);
        try {
          const response = await this.request.get<FoodImageResponse>(
            '/food/img',
            {
              pageNo,
            },
          );

          const pageData: FoodImageDto[] = response.body.map((image) => ({
            rstrId: image.RSTR_ID,
            rstrName: image.RSTR_NM,
            areaName: image.AREA_NM,
            menuId: image.MENU_ID,
            foodImgUrl: image.FOOD_IMG_URL,
          }));

          foodImageData.push(...pageData);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
      return err;
    }

    // Menu table에 menuImageData를 추가
    // for...of
    for (const image of foodImageData) {
      console.log(image);
      try {
        const success = await this.prismaService.menu.update({
          where: {
            menuId: image.menuId,
          },
          data: {
            foodImgUrl: image.foodImgUrl,
          },
        });
        console.log(success, '메뉴 이미지 업데이트 완료');
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  }

  // 식당 운영정보 데이터를 가져와 RestaurantOperating 테이블에 저장
  async getRstrOperatingInfo() {
    const rstrOperatingInfoData: RestaurantOprtDto[] = [];

    try {
      const response = await this.request.get<RestaurantOprtResponse>(
        '/rstr/oprt',
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
          const response = await this.request.get<RestaurantOprtResponse>(
            '/rstr/oprt',
            {
              pageNo,
            },
          );

          const pageData: RestaurantOprtDto[] = response.body.map((oprt) => ({
            rstrId: oprt.RSTR_ID,
            rstrName: oprt.RSTR_NM,
            areaName: oprt.AREA_NM,
            perpendicularSeat: oprt.PRDL_SEAT_CNT,
            seatCount: oprt.SEAT_CNT,
            isParking: oprt.PRKG_POS_YN,
            isWifi: oprt.WIFI_OFR_YN,
            isPlayroom: oprt.DCRN_YN,
            isPet: oprt.PET_ENTRN_POSBL_YN,
            isForeignMenu: oprt.FGGG_MENU_OFR_YN,
            restDay: oprt.RESTDY_INFO_CN,
            businessHour: oprt.BSNS_TM_CN,
            isHomedelivery: oprt.HMDLV_SALE_YN,
            isDisabledConvenience: oprt.DSBR_CVNTL_YN,
            isDelervService: oprt.DELV_SRVIC_YN,
            reservationMethod: oprt.RSRV_MTHD_NM,
            homepageUrl: oprt.HMPG_URL,
            nearLandmarkName: oprt.CRCMF_LDMARK_NM,
            nearLandmarkLat: oprt.CRCMF_LDMARK_LA,
            nearLandmarkLng: oprt.CRCMF_LDMARK_LO,
            nearLandmarkDistance: oprt.CRCMF_LDMARK_DIST,
            isKiosk: oprt.KIOSK_YN,
            isMobilePay: oprt.MB_PMAMT_YN,
            isSmartOrder: oprt.SMORDER_YN,
            representMenuName: oprt.REPRSNT_MENU_NM,
          }));

          rstrOperatingInfoData.push(...pageData);
        } catch (err) {
          console.log('식당 운영정보 데이터 순차적 호출', err);
        }
      }
    } catch (err) {
      console.log('식당 운영정보 API 호출 에러', err);
      return err;
    }

    try {
      const success = await this.prismaService.restaurantOperating.createMany({
        data: rstrOperatingInfoData,
        skipDuplicates: true,
      });
      console.log(success, '식당 운영정보 테이블 생성 및 데이터 입력 완료');
      return success;
    } catch (err) {
      console.log('식당 운영정보 DB 생성 에러', err);
      return err;
    }
  }

  // 식당 품질정보 데이터를 가져와 RestaurantQuality 테이블에 저장
  async getRstrQualityInfo() {
    const rstrQualityInfoData: RestaurantQualityDto[] = [];

    try {
      const response = await this.request.get<RestaurantQualityResponse>(
        '/rstr/qlt',
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
          const response = await this.request.get<RestaurantQualityResponse>(
            '/rstr/qlt',
            {
              pageNo,
            },
          );

          const pageData: RestaurantQualityDto[] = response.body.map(
            (qlty) => ({
              rstrId: qlty.RSTR_ID,
              rstrName: qlty.RSTR_NM,
              areaName: qlty.AREA_NM,
              awardInfo: qlty.AWARD_INFO_DSCRN,
              rtiIndex: qlty.RTI_IDEX,
              isOnline: qlty.ONLINE_CONV_PRGS_YN,
              acceptStatusIndex: qlty.ACCPN_STTUS_IDEX,
              rating: qlty.RATING_IDEX,
              tradAdvisorRating: qlty.TRPDVSR_GRAD,
              cTripRating: qlty.CTRIP_GRAD,
              naverRating: qlty.NAVER_GRAD,
            }),
          );

          rstrQualityInfoData.push(...pageData);
        } catch (err) {
          console.log('식당 품질정보 데이터 순차적 호출', err);
          return err;
        }
      }
    } catch (err) {
      console.log('식당 품질정보 API 호출 에러', err);
      return err;
    }

    try {
      const success = await this.prismaService.restaurantQuality.createMany({
        data: rstrQualityInfoData,
        skipDuplicates: true,
      });
      console.log(success, '식당 품질정보 테이블 생성 및 데이터 입력 완료');
      return success;
    } catch (err) {
      console.log('식당 품질정보 DB 생성 에러', err);
      return err;
    }
  }
}
