import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph.component';

import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [GraphComponent],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports: [
    GraphComponent
  ]
})
export class GraphModule { }
