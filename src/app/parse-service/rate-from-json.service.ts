import { Injectable } from '@angular/core';
import { rateService, Rate } from '../currency-rate.service';

export interface dailyJson{
  Valute: {
    EUR: {
      CharCode: Rate['BaseCode'];
      Name: string;
      Value: number;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class RateFromJsonService implements rateService {

  readonly responseType = {responseType: 'json'};

  constructor() { }

  fillData (data: dailyJson, code: Rate['BaseCode']):Rate{
    const valute =  data.Valute[code];
    return {
      BaseCode: code,
      BaseName: valute.Name,
      RateValue: valute.Value,
    }
  }

}
