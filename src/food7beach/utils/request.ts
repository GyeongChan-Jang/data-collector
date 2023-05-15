import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

// request 클래스
@Injectable()
export class RequestData {
  constructor(private configService: ConfigService) {}

  BASE_URL = `${this.configService.get<string>('FOOD7BEACH_BASE_URL')}`;
  API_KEY = `${this.configService.get<string>('FOOD7BEACH_API_KEY')}`;

  // get 메소드
  async getData<T>(url: string, params?: any): Promise<T> {
    try {
      const { data } = await axios.get<T>(`${this.BASE_URL}${url}`, {
        params: {
          serviceKey: this.API_KEY,
          ...params,
        },
      });
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

// export const request = async (url: string, params?: any) => {
//   try {
//     const response = await axios.get(`${}`, {
//       params,
//     });
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };
