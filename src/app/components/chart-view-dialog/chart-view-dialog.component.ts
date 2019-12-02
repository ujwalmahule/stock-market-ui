import { ApiService } from './../../service/api.service';
import { ExchangeModel } from './../../model/exchange-model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyModel } from 'src/app/model/company-model';
import { StockPrice } from 'src/app/model/stock-price';

@Component({
  selector: 'app-chart-view-dialog',
  templateUrl: './chart-view-dialog.component.html',
  styleUrls: ['./chart-view-dialog.component.css']
})
export class ChartViewDialogComponent implements OnInit {

  constructor(private apiService: ApiService,
    private dialogRef: MatDialogRef<ChartViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyModel) { }

  exchanges: ExchangeModel[]
  dataAvailable: boolean[] = [true, true]
  companyNames: string[] = ['', '']
  values: number[]
  labels: string[]
  startDate: Date
  endDate: Date

  ngOnInit() {
    this.prepareChartData()
  }

  prepareChartData() {
    //first get list of exchanges
    this.apiService.getStockExchangeList().subscribe(
      response => {
        this.exchanges = <ExchangeModel[]>response
        this.exchanges.forEach((exchange, i) => {
          this.prepareCompanyName(i)
          this.prepareDataForExchange(i)
        })
      },
      error => this.apiService.handleError(error, "getStockExchangeList")
    )
  }

  prepareCompanyName(index: number) {
    this.companyNames[index] = this.data.companyName + " (" + this.exchanges[index].code + "-"
    this.data.exchange.forEach((e2c, i) => {
      if(e2c.exchangeId == this.exchanges[index].id) {
        this.companyNames[index] += e2c.stockCode + ")"
      }
    })
  }

  prepareDataForExchange(exchangeIndex : number) {
    //next get latest price for company
    this.apiService.getLatestPrice(this.data.id, this.exchanges[exchangeIndex].id).subscribe(
      response => {
        if(response) {
          //extract date to prepare chart data (by default prepare chart for latest date)
          this.startDate = new Date((<StockPrice>response).timestamp)
          this.endDate = new Date(this.startDate)
          this.endDate.setDate(this.endDate.getDate()+1)
          this.prepareDataForDates(exchangeIndex)

        } else {
          this.dataAvailable[exchangeIndex] = false
        }
      },
      error => this.apiService.handleError(error, "getLatestPrice")
    )
  }

  prepareDataForDates(exchangeIndex: number) {
    let date1str = this.startDate.getDate() + "." + (this.startDate.getMonth()+1) + "." + this.startDate.getFullYear()
    let date2str = this.endDate.getDate() + "." + (this.endDate.getMonth()+1) + "." + this.endDate.getFullYear()

    //get stock price for specific dates
    this.apiService.getPriceList(this.data.id, this.exchanges[exchangeIndex].id, date1str, date2str).subscribe(
      response => {
        this.values = (response as Array<StockPrice>).map((obj: StockPrice) => obj.price);
        this.labels = (response as Array<StockPrice>).map((obj: StockPrice) => {
          let dt: Date = new Date(obj.timestamp)
          return dt.toLocaleDateString('en', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true})
        });
      },
      error => this.apiService.handleError(error, "getLatestPrice")
    )
  }

}
