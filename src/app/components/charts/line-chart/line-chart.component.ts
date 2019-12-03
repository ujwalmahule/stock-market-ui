import { ApiService } from './../../../service/api.service';
import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, AfterViewInit {

  @Input('companyName')
  companyName: string
  
  @Input('prices')
  values: number[]

  @Input('dates')
  labels: string[]

  @Input('compareCompany')
  compareCompany: boolean = false

  chart: Chart

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    
  }
  

  @ViewChild('canvas', {static: true}) canvas : ElementRef
   
  ngAfterViewInit() {
        
  }
  
  createChart() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: {
        datasets:[
          {
            data: this.values, 
            label: this.companyName,
            fill: false,
            borderColor: '#3cba9f'
          }/*,
          {
            data: this.values2, 
            label: "Other Company",
            fill: false,
            borderColor: 'rgba(185,223,146)'
          }*/
        ],
        labels: this.labels,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
              display: false
          }]
        },
        elements: {
          point:{
            radius: 0
          }
        }
      }
    })
  }
/*

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];*/

  //lineChartLegend = true;
  
}
