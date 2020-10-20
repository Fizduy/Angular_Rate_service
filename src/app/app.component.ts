import { Component } from '@angular/core';
import { interval } from 'rxjs';

import { CurrencyRateService, Rate } from './currency-rate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly valuteCode: Rate['BaseCode'] = "EUR";
  rateValue: number;

  private counter = interval(10000);

  constructor(private rateService: CurrencyRateService){}

  ngOnInit(){
    this.getRate();
    this.counter.subscribe( () => this.getRate());
  }

  private getRate(){
    this.rateService.getRate(this.valuteCode).subscribe( (data: Rate) => this.rateValue = data.RateValue);
  }
}
