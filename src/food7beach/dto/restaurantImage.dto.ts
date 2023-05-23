export interface RestaurantImageResponse {
    header: {
      resultCode: string;
      resultMsg: string;
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
    body: RestaurantImageData[];
  }

export class RestaurantImageDto {
    rstrId: number;
    rstrName: string;
    areaName: string;
    rstrImgUrl: string;
}

export interface RestaurantImageData {
    RSTR_ID: number;
    RSTR_NM: string;
    AREA_NM: string;
    RSTR_IMG_URL: string;
}