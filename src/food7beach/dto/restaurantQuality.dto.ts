export interface RestaurantQualityResponse {
  header: {
    resultCode: string;
    resultMsg: string;
    numOfRows: number;
    pageNo: number;
    totalCount: number;
  };
  body: RestaurantQualityData[];
}

export class RestaurantQualityDto {
  rstrId: number;
  rstrName: string;
  areaName: string;
  awardInfo: string | null;
  rtiIndex: string | null;
  isOnline: string | null;
  acceptStatusIndex: string | null;
  rating: string | null;
  tradAdvisorRating: string | null;
  cTripRating: string | null;
  naverRating: string | null;
}

export interface RestaurantQualityData {
  RSTR_ID: number;
  RSTR_NM: string;
  AREA_NM: string;
  AWARD_INFO_DSCRN: string | null;
  RTI_IDEX: string | null;
  RTI_INDEX: string | null;
  ONLINE_CONV_PRGS_YN: string | null;
  ACCPN_STTUS_IDEX: string | null;
  RATING_IDEX: string | null;
  TRPDVSR_GRAD: string | null;
  CTRIP_GRAD: string | null;
  NAVER_GRAD: string | null;
}
