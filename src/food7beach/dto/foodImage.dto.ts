import { IsNumber, IsString } from 'class-validator';

export interface FoodImageResponse {
  header: {
    resultCode: string;
    resultMsg: string;
    numOfRows: number;
    pageNo: number;
    totalCount: number;
  };
  body: FoodImageDto[];
}

export class FoodImageDto {
  @IsNumber()
  RSTR_ID: number;
  @IsString()
  RSTR_NM: string;
  @IsString()
  AREA_NM: string;
  @IsNumber()
  MENU_ID: number;
  @IsString()
  FOOD_IMG_URL: string;
}
