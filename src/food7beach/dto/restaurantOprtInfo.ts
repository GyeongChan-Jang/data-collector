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
  areaName: string;
  perpendicularSeat?: number;
  seatCount?: number;
  isParking: string;
  isWifi: string;
  isPlayroom: string;
  isPet: string;
  isForeignMenu: string;
  // 화장실 정보 내용 제외
  restDay?: string; // String? 전부 string or null
  // 영업시간
  businessHour?: string;
  isHomedelivery: string;
  isDisabledConvenience: string;
  isDelervService: string;
  reservationMethod?: string;
  // 온라인 예약 정보 내용 제외 -> 데이터가 거의 null
  homepageUrl?: string;
  nearLandmarkName?: string;
  nearLandmarkLat?: string;
  nearLandmarkLng?: string;
  nearLandmarkDistance?: string;
  isKiosk: string;
  isMobilePay: string;
  isSmartOrder: string;
  representMenuName?: string;
}

export interface RestaurantOprtData {
  RSTR_ID: number;
  RSTR_NM: string;
  AREA_NM: string;
  PRDL_SEAT_CNT?: number;
  SEAT_CNT?: number;
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
