export interface FoodImageResponse {
  header: {
    resultCode: string;
    resultMsg: string;
    numOfRows: number;
    pageNo: number;
    totalCount: number;
  };
  body: FoodImageData[];
}

export class FoodImageDto {
  rstrId: number;
  rstrName: string;
  areaName: string;
  menuId: number;
  foodImgUrl: string;
}

export interface FoodImageData {
  RSTR_ID: number;
  RSTR_NM: string;
  AREA_NM: string;
  MENU_ID: number; 
  FOOD_IMG_URL: string;
}