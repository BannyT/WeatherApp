import { Component,AfterViewInit, OnInit ,ElementRef} from '@angular/core';
import { WeatherServiceService } from './services/weather-service.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
   constructor( public weath:WeatherServiceService, public elementRef: ElementRef){}
   temp_max:any;
   temp_min:any;
   lineChart= [];
   canvas: any;
   chart=[];
   ctx: any;
   weatherDates = [];
   ngOnInit() {
     
}
     // getting data from api
   
  //   code snippet for line chart
  //   let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
  //  this.lineChart = new Chart(htmlRef, {
  //     type: 'line',
  //     data: {
  //       labels: this.weatherDates,
  //       datasets: [
  //         { 
  //           data: this.temp_max,
  //           borderColor: "#3cba9f",
  //           fill: false
  //         },
  //         { 
  //           data: this.temp_min,
  //           borderColor: "#ffcc00",
  //           fill: false
  //         },
  //       ]
  //     },
  //     options: {
  //       legend: {
  //         display: false
  //       },
  //       scales: {
  //         xAxes: [{
  //           display: true
  //         }],
  //         yAxes: [{
  //           display: true
  //         }],
  //       }
  //     }
  //   });
  // another graph

  

   ngAfterViewInit(){

    this.weath.dailyForecast().subscribe( res =>{
      console.log(res);

      this.temp_max = res['list'].map(res => res.main.temp_max);
       this.temp_min =res['list'].map(res => res.main.temp_min);
      let alldates =res['list'].map(res => res.dt)
      
      console.log(this.temp_max); 
   alldates.forEach((res) => {
    let jsdate = new Date(res * 1000)
    this.weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
})

      // this.canvas = document.getElementById('Chart');
    // this.ctx = this.canvas.getContext('2d');
   this.chart=  new Chart('canvas', {
    type: 'line', 
    data: {
      labels: this.weatherDates,
      datasets: [
        { 
          data: this.temp_max,
          borderColor: "#3cba9f",
          fill: false
        },
        { 
          data: this.temp_min,
          borderColor: "#ffcc00",
          fill: false
        },
      ]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }],
      }
    }
});


    })


   
  
     }
   
}
