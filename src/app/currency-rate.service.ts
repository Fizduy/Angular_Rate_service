/**
 * Сервис для загрузки курса валют
 * 
 * Список источников пополняется через sorceList в конструкторе класса
 * Для парсинга новых стркутур необходимо создать сервис с интерфейсом rateService и привязать его к sorceList
 * Порядок источников в sorceList определяет порядок переключения
 * 
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { RateFromJsonService } from './parse-service/rate-from-json.service';
import { RateFromXMLService } from './parse-service/rate-from-xml.service';

export interface Rate {
  BaseCode: "EUR" | "USD";
  BaseName: string;
  RateValue: number;
}

export interface rateService {
  readonly responseType: {responseType: any};
  fillData(data: any, code: Rate['BaseCode']): Rate;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService {

  private sorceList: {URL: string, Service: rateService}[];
  private sorceId: number = 0;

  constructor(private http: HttpClient, rateFromJson: RateFromJsonService, rateFromXml: RateFromXMLService) { 

    this.sorceList = [
      {URL:`https://hjjhjhj`, Service: rateFromJson}, //несуществующий url для теста на смену источника
      {URL:`https://www.cbr-xml-daily.ru/daily_utf8.xml`, Service: rateFromXml},
      {URL:`https://www.cbr-xml-daily.ru/daily_json.js`, Service: rateFromJson},
    ];
  }

  getRate(valuteCode: Rate['BaseCode']){
    const source = this.sorceList[this.sorceId];

    return this.http.get(source.URL, source.Service.responseType).pipe(
      map( (data) => source.Service.fillData(data, valuteCode)),
      catchError(() => (++this.sorceId >= this.sorceList.length) ? throwError('All sources are unavailable') :  this.getRate(valuteCode))
      );
  }
}
