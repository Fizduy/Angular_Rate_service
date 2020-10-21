import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js';

import { rateService, Rate } from '../currency-rate.service';

@Injectable({
  providedIn: 'root'
})
export class RateFromXMLService implements rateService {

  readonly responseType = {responseType: 'text'};

  xml: {
    VALCURS: {
      VALUTE: {
        CHARCODE: Rate['BaseCode'],
        NAME: string,
        VALUE: number,
      }[]
    }
  };

  constructor() { }

  fillData (data: any, code: Rate['BaseCode']):Rate{
    const parser = new xml2js.Parser({ strict: false, trim: true });
    parser.parseString(data, (err, result) => {
      this.xml = result;
    });
    const valute = this.xml.VALCURS.VALUTE.filter(data => data.CHARCODE == code );

    return {
      BaseCode: valute[0].CHARCODE,
      BaseName: valute[0].NAME,
      RateValue: valute[0].VALUE,
    }
  }
}
