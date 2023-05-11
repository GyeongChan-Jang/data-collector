import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class Food7beachService {
  async getFood7beach() {
    try {
      const response = await axios.get(
        'https://busan-7beach.openapi.redtable.global/api/rstr?serviceKey= k6n6auirB4RainsimXQsPzYW1KXz2i3xBgaqKX54lXGcENz2sHTg7g4zuLG3BioL',
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
}
