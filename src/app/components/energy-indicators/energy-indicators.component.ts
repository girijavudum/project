import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-energy-indicators',
  templateUrl: './energy-indicators.component.html',
  styleUrls: ['./energy-indicators.component.css'],
})
export class EnergyIndicatorsComponent implements OnInit {
 
  salesData: ChartData<'line'> = {
    labels: ['2013', '2014', '2015', '2016', '2017'],
    datasets: [
      { label: 'Energy consumption', data: [1000, 1200, 1050, 2000, 500], tension: 0.5 },
     
    ],
  };
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text:'',
      },
    },
  };



  enerygyIndicators: any[] = [];
  countries: any[] = [];
  indicators: any[] = [];
  years: any[] = [];
  comparision: any[]= [];
  country: any = '';
  indType: any = '';
  year: any = '';
  energyExport: any ;
  expimpUnit : any;
  energyImport: any ;
  gpRatio: any;
  gpUnit: any;
  gdpPPP: any;
  gdpUnit: any;
  countryA:any;
   value1: any[]=[];
   value2: any[]=[];

  constructor(private global: GlobalService) {}

  ngOnInit(): void {
    this.global.getEnerygyData().subscribe((data: any) => {
      this.enerygyIndicators = this.csvToJson(data);
      this.enerygyIndicators.forEach((ei: any) => {
        this.countries.push(ei.country);
        this.indicators.push(ei.indicatorType);
        this.years.push(ei.year);
        //this.countries.push(ei.countryA)
      });
      this.countries = [...new Set(this.countries)];
      this.indicators = [...new Set(this.indicators)];
      this.years = [...new Set(this.years)];
    });
  }

  csvToJson(data: any) {
    const lines = data.split('\n');
    const keys = lines[0].split(',');
    return lines.slice(1).map((line: any) => {
      return line.split(',').reduce((acc: any, cur: any, i: any) => {
        var toAdd: any = {};
        toAdd[keys[i]] = cur;
        return { ...acc, ...toAdd };
      }, {});
    });
  }

  calculate(){
    if(this.country != '' && this.indType != '' && this.year != ''){
    this.energyExport = 0;
    this.energyImport = 0;
    let energyExp = 0;
    let energyImp = 0;
    let gpratio = 0;
    let gdp = 0;
    this.comparision = [];
    this.enerygyIndicators.forEach((ei:any)=>{
      if(ei.country == this.country && ei.indicatorType == this.indType && ei.year == this.year ){
        this.comparision.push(ei);
        if(ei.indicator == 'Total energy export'){
          if(ei['value\r'] != null || ei['value\r'] != '' || ei['value\r'] != undefined){
            energyExp = +energyExp + +ei['value\r'];
            this.expimpUnit = ei.unit;
          }
        }
        if(ei.indicator == 'Total energy import'){
          if(ei['value\r'] != null || ei['value\r'] != '' || ei['value\r'] != undefined){
            energyImp = +energyImp + +ei['value\r'];
            this.expimpUnit = ei.unit;
          }
        }
        if(ei.indicator == 'Gas reserve to production ratio'){
          if(ei['value\r'] != null || ei['value\r'] != '' || ei['value\r'] != undefined){
            gpratio = +gpratio + +ei['value\r'];
            this.gpUnit = ei.unit;
          }
        }
        if(ei.indicator == 'GDP per capita based on PPP'){
          if(ei['value\r'] != null || ei['value\r'] != '' || ei['value\r'] != undefined){
            gdp = +gdp + +ei['value\r'];
            this.gdpUnit = ei.unit;
          }
        }
      }
    })
    this.energyExport = energyExp;
    this.energyImport = energyImp;
    this.gpRatio = gpratio;
    this.gdpPPP = gdp;
    }else{
      return
    }
  }
    

  tablecal(){
    if(this.country != '' && this.indType != '' && this.year != '') {
      this.value1=[];
      this.value2=[];
     this.enerygyIndicators.forEach((ei:any)=>{
      if(ei.country[0] == this.country[0] && ei.indicatorType == this.indType && ei.year == this.year){
        this.value1.push(ei);
      }
      if(ei.country[1] == this.country[1] && ei.indicatorType == this.indType && ei.year == this.year){
        this.value2.push(ei);
      }
     })

      }
    
  }

}
