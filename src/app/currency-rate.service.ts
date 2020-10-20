import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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

  readonly sorceList = [
    `https://hjjhjhj`,
    `https://www.cbr-xml-daily.ru/daily_json.js`
  ];

  private sorceId: number = 0;

  constructor(private http: HttpClient) { }

  getRate(valuteCode: Rate['BaseCode']){
    return this.http.get<dailyJson>(this.sorceList[this.sorceId]).pipe(
      map( (data: dailyJson) => this.fillData(data, valuteCode)),
      catchError(() => (++this.sorceId >= this.sorceList.length) ? throwError('all sources are unavailable') :  this.getRate(valuteCode))
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
