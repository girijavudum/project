import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';



@Component({
  selector: 'app-energy-indicators',
  templateUrl: './energy-indicators.component.html',
  styleUrls: ['./energy-indicators.component.css'],
})
export class EnergyIndicatorsComponent implements OnInit {

  graphContSearch: any;
  graphIndiSearch: any;
  graphIndiTypeSearch: any;
  tablecont: any;
  tableInd: any;
  tableyear: any;



  salesData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { label: 'Energy consumption', data: [], tension: 0.5 },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: {
        title: {
          display: true,
          text: "Years",
          font: {
            size: 15
          }
        }
      },
      yAxes: {
        title: {
          display: true,
          text: 'value',
          font: {
            size: 15
          }
        },

      }
    },

    plugins: {
      title: {
        display: true,
        text: '',
      },
    },
  };

  enerygyIndicators: any[] = [];
  countries: any[] = [];
  indicators: any[] = [];
  years: any[] = [];
  comparision: any[] = [];
  country: any = '';
  indType: any = '';
  year: any = '';
  energyExport: any;
  expimpUnit: any;
  energyImport: any;
  gpRatio: any;
  gpUnit: any;
  gdpPPP: any;
  gdpUnit: any;
  //v1:number='';
  //v2:number='';
  countryA: any;
  value1: any[] = [];
  chartData: any[] = [];
  value2: any[] = [];
  data: any[] = [];
  indicator: any[] = [];
  graphLabel: any[] = [];
  filteredIndicator: any[] = [];
  graphValue: any[] = [];
  filteredtable: any[] = [];


  constructor(private global: GlobalService) { }


  ngOnInit(): void {
    this.global.getEnerygyData().subscribe((data: any) => {
      this.enerygyIndicators = this.csvToJson(data);
      console.table(this.enerygyIndicators);

      this.enerygyIndicators.forEach((ei: any) => {
        //console.log("data",ei)
        // console.log("country",this.country)
        this.countries.push(ei.country);
        //console.log("country",this.countries)
        this.indicators.push(ei.indicatorType);
        this.years.push(ei.year);
        this.indicator.push(ei.indicator)
        this.countries.push(ei.countryA)

      });

      this.countries = [...new Set(this.countries)];
      this.indicators = [...new Set(this.indicators)];
      this.years = [...new Set(this.years)];

    });
  }

  csvToJson(data: any) {
    const lines = data.split('\n');
     let keysArr = lines[0].split(',');
     const keys = keysArr.map((item: any) => {
      if (item.includes('\r'))
        return item.replace('\r', '')
        else return item;
    });
    return lines.slice(1).map((line: any) => {
      return line.split(',').reduce((acc: any, cur: any, i: any) => {
        var toAdd: any = {};
        toAdd[keys[i]] = cur;
        return { ...acc, ...toAdd };
      }, {});
    });
  }
  // dropdown summary calculation
  calculate() {
    if (this.country != '' && this.indType != '' && this.year != '') {
      this.energyExport = 0;
      this.energyImport = 0;
      let energyExp = 0;
      let energyImp = 0;
      let gpratio = 0;
      let gdp = 0;
      this.comparision = [];
      this.enerygyIndicators.forEach((ei: any) => {
        if (ei.country == this.country && ei.indicatorType == this.indType && ei.year == this.year) {
          this.comparision.push(ei);
          if (ei.indicator == 'Total energy export') {
            if (ei['value'] != null || ei['value'] != '' || ei['value'] != undefined) {
              energyExp = +energyExp + +ei['value'];
              this.expimpUnit = ei.unit;
            }
          }
          if (ei.indicator == 'Total energy import') {
            if (ei['value'] != null || ei['value'] != '' || ei['value'] != undefined) {
              energyImp = +energyImp + +ei['value'];
              this.expimpUnit = ei.unit;
            }
          }
          if (ei.indicator == 'Gas reserve to production ratio') {
            if (ei['value'] != null || ei['value'] != '' || ei['value'] != undefined) {
              gpratio = +gpratio + +ei['value'];
              this.gpUnit = ei.unit;
            }
          }
          if (ei.indicator == 'GDP per capita based on PPP') {
            if (ei['value'] != null || ei['value'] != '' || ei['value'] != undefined) {
              gdp = +gdp + +ei['value'];
              this.gdpUnit = ei.unit;
            }
          }
        }
      })
      this.energyExport = energyExp;
      this.energyImport = energyImp;
      this.gpRatio = gpratio;
      this.gdpPPP = gdp;
    } else {
      return
    }
  }

  //table calculation
  tablecal() {
    this.filteredtable = this.enerygyIndicators.filter(val => val.indicatorType == this.tableInd && val.country==this.tablecont && val.year==this.tableyear)



  }

  //charts filter
  filterIndicator(indicatorType: any) {
    this.filteredIndicator = this.enerygyIndicators.filter(data => data.indicatorType == indicatorType)
  }
  generateGraph(country: any, indicatorType: any, indicator: any) {
    if (country && indicatorType && indicator) {

      let data = this.enerygyIndicators.filter(item => item.country == country && item.indicatorType == indicatorType && item.indicator == indicator)
      this.graphLabel = data.map(data => data.year).slice(0, 5);
      this.graphValue = data.map(data => data.value).slice(0, 5);
      this.salesData = {
        labels: this.graphLabel,
        datasets: [
          { label: 'Energy consumption', data: this.graphValue, tension: 0.5 },
        ],
      };
    } else {
      return
    }
  }


}
