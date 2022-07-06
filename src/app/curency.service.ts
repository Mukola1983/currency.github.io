import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CurencyService {
  constructor(public http: HttpClient) {}

  getCurrentVal() {
    return this.http.get(
      'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
    );
  }
}

//Monobank
//https://api.monobank.ua/bank/currency

//NBY  https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json

// ' https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'

//https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5
