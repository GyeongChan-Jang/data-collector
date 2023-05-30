export interface RestaurantOprtResponse {
  header: {
    resultCode: string;
    resultMsg: string;
    numOfRows: number;
    pageNo: number;
    totalCount: number;
  };
  body: RestaurantOprtData[];
}

export class RestaurantOprtDto {
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

export interface RestaurantOprtData {
  RSTR_ID: number;
  RSTR_NM: string;
  AREA_NM: string;
  PRDL_SEAT_CNT?: string;
  SEAT_CNT?: string;
  PRKG_POS_YN: string;
  WIFI_OFR_YN: string;
  DCRN_YN: string;
  PET_ENTRN_POSBL_YN: string;
  FGGG_MENU_OFR_YN: string;
  RESTDY_INFO_CN?: string;
  BSNS_TM_CN: null;
  HMDLV_SALE_YN: string;
  DSBR_CVNTL_YN: string;
  DELV_SRVIC_YN: string;
  RSRV_MTHD_NM?: string;
  HMPG_URL?: string;
  CRCMF_LDMARK_NM?: string;
  CRCMF_LDMARK_LA?: string;
  CRCMF_LDMARK_LO?: string;
  CRCMF_LDMARK_DIST?: string;
  KIOSK_YN?: string;
  MB_PMAMT_YN?: string;
  SMORDER_YN?: string;
  REPRSNT_MENU_NM?: string;
}
