export interface MenuResponse {
  header: {
    resultCode: string;
    resultMsg: string;
    numOfRows: number;
    pageNo: number;
    totalCount: number;
  };
  body: MenuData[];
}
export class MenuDto {
  menuId: number;
  menuName: string;
  menuPrice: string;
  isMenuSpecial: string;
  menuSpecialName: string | null;
  menuSpecialUrl: string | null; // 지역특산메뉴출처 url
  areaName: string;
  rstrId: number;
  rstrName: string;
}

export interface MenuData {
  MENU_ID: number;
  MENU_NM: string;
  MENU_PRICE: number;
  SPCLT_MENU_YN: string;
  SPCLT_MENU_NM: string | null;
  SPCLT_MENU_OGN_URL: string | null;
  AREA_NM: string;
  RSTR_ID: number;
  RSTR_NM: string;
}
