import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Rate {
  BaseCode: "EUR";
  BaseName: string;
  RateValue: number;
}

export interface dailyJson{
  Valute: {
    EUR: {
      Name: string;
      Value: number;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService {

  constructor(private http: HttpClient) { }

  getRate(valuteCode: Rate['BaseCode']){
    return this.http.get<dailyJson>('https://www.cbr-xml-daily.ru/daily_json.js').pipe(
      map( (data: dailyJson) => this.fillData(data, valuteCode)),
    );
  }

  private fillData (data: dailyJson, code: Rate['BaseCode']):Rate{
    const valute =  data.Valute[code];
    return {
      BaseCode: code,
      BaseName: valute.Name,
      RateValue: valute.Value,
    }
  }
}
