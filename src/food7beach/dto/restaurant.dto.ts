export interface RestaurantResponse {
  header: {
    resultCode: string;
    resultMsg: string;
    numOfRows: number;
    pageNo: number;
    totalCount: number;
  };
  body: RestaurantData[];
}

export class RestaurantDto {
  rstrId: number;
  rstrName: string;
  rstrRoadAddr: string;
  rstrLotNumberAddr: string;
  rstrLat: string;
  rstrLng: string;
  rstrPhone: string | null;
  bizName: string | null;
  bizLicenceName: string;
  rstrDescription: string;
}

export interface RestaurantData {
  RSTR_ID: number;
  RSTR_NM: string;
  RSTR_RDNMADR: string;
  RSTR_LNNO_ADRES: string;
  RSTR_LA: string;
  RSTR_LO: string;
  RSTR_TELNO: string | null;
  BSNS_STATM_BZCND_NM: string | null;
  BSNS_LCNC_NM: string;
  RSTR_INTRCN_CONT: string;
}
