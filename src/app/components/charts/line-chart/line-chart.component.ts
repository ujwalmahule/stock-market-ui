import { HttpClient } from '@angular/common/http';
import { StockPrice } from './../../../model/stock-price';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  companyName = "Yes Bank Pvt. Ltd. (BSE-532648)"
  prices: StockPrice[]
  dateLabels: string[]
  values: number[]
  values2: number[]
  loading = false

  constructor(private httpClient: HttpClient, private snackbar : MatSnackBar) { }

  ngOnInit() {
    this.loading = true;
    let api = this.httpClient.get(`${environment.gatewayUrl}/stock-market-service/price/for-company-date-range/18/14/01.11.2019/06.11.2019`);
    api.subscribe(
      response => {
        this.dateLabels = (response as Array<StockPrice>).map((obj: StockPrice) => {
          let dt: Date = obj.timestamp;
          let test: Date = new Date(dt)
          return test.toLocaleDateString('en', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true})
        });
        this.values = (response as Array<StockPrice>).map((obj: StockPrice) => obj.price);
        this.values2 = (response as Array<StockPrice>).map((obj: StockPrice) => obj.price + (Math.random()*50) - (Math.random()*20));
        this.createChart()
      },
      error => this.handleError(error)
    )
  }

  chart: Chart
  createChart() {
    this.chart = new Chart("canvas", {
      type: 'line',
      data: {
        datasets:[
          {
            data: this.values, 
            label: this.companyName,
            fill: false,
            borderColor: '#3cba9f'
          },
          {
            data: this.values2, 
            label: "Other Company",
            fill: false,
            borderColor: 'rgba(185,223,146)'
          }
        ],
        labels: this.dateLabels,
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
              display: false
          }]
      }
      }
    })
  }

  lineChartData: ChartDataSets[] = [
    { data: this.values, label: this.companyName }
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  handleError(error) {
    let errorMessage: string
    this.loading = false;
    if(error.error && error.error.message) {
      errorMessage = "Error:" + error.error.message;
    } else {
      errorMessage = "Error occured while calling service.";
    }
    this.snackbar.open(errorMessage, 'Close', {
      duration: 3000
    });
  }

}
