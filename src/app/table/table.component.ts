import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  //styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  enerygyIndicators: any;
  countries: any;
  indicators: any;
  years: any;
 tablecont:any='';

 

  constructor(private global: GlobalService) { }

  ngOnInit() {
    this.global.getEnerygyData().subscribe((data: any) => {
      this.enerygyIndicators = this.csvToJson(data);
      console.log("data", this.enerygyIndicators.indicatorType)
      this.enerygyIndicators.forEach((ei: any) => {
        // console.log("data",ei)
        ei.country = this.countries;
        // console.log("data", ei)
        this.indicators.push(ei.indicatorType);
        this.years.push(ei.year);
        //this.countries.push(ei.countryA)
        

      });
      this.countries = [...new Set(this.countries)];
      this.indicators = [...new Set(this.indicators)];
      this.years = [...new Set(this.years)];
      //this.chartdata =[]
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
  
  
}

