import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { parse } from 'json2csv';

import Exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import Accessibility from 'highcharts/modules/accessibility';
Exporting(Highcharts);
HC_exportData(Highcharts);
Accessibility(Highcharts);

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  formValue: any;
  dataValue: any;
  csvForDownload: any;
  button: any;
  chartOptions: any;

  updateFlag = false;

  Highcharts = Highcharts;

  constructor() {

  }

  setExampleChart() {

    // http://jsfiddle.net/BlackLabel/y0dkzn1q/
    // idea from here
    const someData = {
      "xData": [
        "2022-12-01T00:00:00.000Z",
        "2022-12-01T01:00:00.000Z",
        "2022-12-01T02:00:00.000Z",
        "2022-12-01T03:00:00.000Z",
        "2022-12-01T04:00:00.000Z",
        "2022-12-01T05:00:00.000Z",
        "2022-12-01T06:00:00.000Z",
        "2022-12-01T07:00:00.000Z",
        "2022-12-01T08:00:00.000Z",
        "2022-12-01T09:00:00.000Z",
        "2022-12-01T10:00:00.000Z",
        "2022-12-01T11:00:00.000Z",
        "2022-12-01T12:00:00.000Z",
        "2022-12-01T13:00:00.000Z",
        "2022-12-01T14:00:00.000Z",
        "2022-12-01T15:00:00.000Z",
        "2022-12-01T16:00:00.000Z",
        "2022-12-01T17:00:00.000Z",
        "2022-12-01T18:00:00.000Z",
        "2022-12-01T19:00:00.000Z",
        "2022-12-01T20:00:00.000Z",
        "2022-12-01T21:00:00.000Z",
        "2022-12-01T22:00:00.000Z",
        "2022-12-01T23:00:00.000Z"
      ],
      data: [10.1, 10.2, 10.5, 12.4, 16.1, 15.4, 11.5, 12.5, 13.1, 15.2, 17.6, -1.1, 
            3, 12.5, -12.5, -10, 0.1, -0.2, -3.1, -14.2, -15, -12, -11, -12.5
          ]
    };

    const processedData = someData.data.map((dataEl, i) => {
      return [new Date(someData.xData[i]).getTime(), dataEl] // x, y format
    });

    this.chartOptions = {
      title: {
        text: 'Example'
      },
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%d-%m-%Y}'
        },
        title: {
          text: "Date and time (UTC)",
          style: {
            fontSize: '18px'
          }
        }
      },
      tooltip: {
        xDateFormat: '%A, %b %e, %H:%M',
        shared: true,
        split: false,
        enabled: true
      },
      yAxis: {
        title: {
          text: "°C",
          style: {
            fontSize: '18px'
          }
        }
      },
      series: [
        {
          data: processedData,
          name: "Test",
          tooltip: {
            valueSuffix: ' °C'
          },
          connectNulls: true
        },
        {
          data: [],
          name: "Test2",
          tooltip: {
            valueSuffix: ' °C'
          },
          connectNulls: true
        },
        {
          data: [],
          name: "Test3",
          tooltip: {
            valueSuffix: ' °C'
          },
          connectNulls: true
        }
      ]
    };

  }

  ngOnInit(): void {
    this.setExampleChart();
  }
  
  buildGraph() {
    this.updateGraph();

    this.generateCSV(this.dataValue);
  }

  generateDataForHighchart() {
    const dataYrno = [];
    const dataOpenMeteo = [];
    const dataWeatherApi = [];
    let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    for (let idx = 0; this.dataValue.length != idx; idx++) {
      let obj = this.dataValue[idx];
      let dt = new Date(obj.time).getTime();
      // x, y format
      dataYrno.push([dt, obj.hasOwnProperty('yrno_temperature') ? obj.yrno_temperature : null]);
      dataOpenMeteo.push([dt, obj.hasOwnProperty('openmeteo_temperature') ? obj.openmeteo_temperature : null]);
      dataWeatherApi.push([dt, obj.hasOwnProperty('weatherapi_temperature') ? obj.weatherapi_temperature : null]);
    }

    return [
      {data:dataYrno, name: "Yrno"},
      {data:dataOpenMeteo, name: "OpenMeteo"},
      {data: dataWeatherApi, name: "WeatherApi"}
    ];
  }

  updateGraph() {
    this.chartOptions = ({
      title: {
        text: `Forecast for 
        ${Math.round((this.formValue.coordsForm.latitude + Number.EPSILON) * 100) / 100}°N 
        ${Math.round((this.formValue.coordsForm.longitude + Number.EPSILON)* 100) / 100}°E`
      },
      series: this.generateDataForHighchart()
    });
    this.updateFlag = true;
  }

  getFormFromAppComponent(formFromApp: any) {
    this.formValue = formFromApp;
  }

  getDataFromAppComponent(dataFromApp: any) {
    this.dataValue = dataFromApp;

    this.buildGraph();
  }

  generateCSV(dataValue: any) {
    this.button = (<HTMLInputElement>document.getElementById('csvButton'));

    this.csvForDownload = parse(dataValue, { quote: '' });

    this.button.style.visibility = 'visible';
  }

  downloadCSV() {
    const a = document.createElement('a');
    const blob = new Blob([this.csvForDownload], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;

    let roundedLat = Math.round((this.formValue.coordsForm.latitude + Number.EPSILON) * 100) / 100;
    let roundedLng = Math.round((this.formValue.coordsForm.longitude + Number.EPSILON) * 100) / 100;
    a.download = `Forecast_lat=${roundedLat}_lng=${roundedLng}_epoch=${Date.now()}.csv`;

    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}
