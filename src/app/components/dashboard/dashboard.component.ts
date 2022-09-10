import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { TokenService } from '../../shared/token.service';
import {Router} from "@angular/router";
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Pie
  pieChartOptions: ChartOptions<'doughnut'> = {responsive: false,};
  pieChartLabels : string[] = [];
  pieChartDatasets : any;
  pieChartLegend = true;
  pieChartPlugins = [];
  dataPieChart: number[] = [];

  // Pie2
  pieChartOptions2: ChartOptions<'bar'> = {responsive: false,};
  pieChartLabels2 : string[] = [];
  pieChartDatasets2 : any;
  pieChartLegend2 = true;
  pieChartPlugins2 = [];
  dataPieChart2: number[] = [];
  dataUser: any;

  constructor(
    public authService: AuthService,
    public token: TokenService,
    public router: Router,
  ) {
    if (!this.token.isValidToken()){
      this.router.navigate(['login']);
    }

    this.authService.dashboard().subscribe((data: any) => {
      console.log(data.tableUsers)
      this.dataUser = data.tableUsers;
      if (data.chartDonut){
        data.chartDonut.map((val:any) =>
        this.pushPieChart(val)
        );
      }
      if (data.chartBar){
        data.chartBar.map((val:any) =>
          this.pushPieChartbar(val)
        );
      }
    });

  }
  ngOnInit() {}

  pushPieChart(data:any){
    this.pieChartLabels.push(data.name);
    this.dataPieChart.push(data.value);
    this.pieChartDatasets = [{ data:this.dataPieChart}];
  }

  pushPieChartbar(data:any){
    this.pieChartLabels2.push(data.name);
    this.dataPieChart2.push(data.value);
    this.pieChartDatasets2 = [{ data:this.dataPieChart2, label: 'chartBar' }];
  }
}
