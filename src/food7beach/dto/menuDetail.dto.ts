export interface MenuDetailResponse {
    header: {
      resultCode: string;
      resultMsg: string;
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
    body: MenuDetailData[];
  }

export class MenuDetailDto {
    menuId: number
    menuName: string
    menuDescription: string
    menuCategoryL: string
    menuCategoryS: string
    rstrId: number
    rstrName: string
    areaName: string
}

export interface MenuDetailData {
    MENU_ID: number
    MENU_NM: string
    MENU_DSCRN: string
    MENU_CTGRY_LCLAS_NM: string
    MENU_CTGRY_SCLAS_NM: string
    RSTR_ID: number
    RSTR_NM: string
    AREA_NM: string
}