import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { GraphComponent } from './components/graph/graph.component';
import { FormService } from './form-service.service';
import { WeathermanFormClass } from './weatherman-form-class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(GraphComponent) ctrlGraph: GraphComponent;
  @ViewChild(FormComponent) ctrlForm: FormComponent;

  title: string;
  form!: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.title = "Weatherman";
  }

  passDataToGraphComponent(event: any) {
    this.ctrlGraph.getDataFromAppComponent(event);
  }

  passFormToGraphComponent(event: any) {
    this.ctrlGraph.getFormFromAppComponent(event);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      formWeather: this.fb.group({
        coordsForm: this.fb.group({
          latitude: '',
          longitude: '',
        }),
        dateForm: this.fb.group({
          startDate: '',
          endDate: ''
        }),
         apiForm: this.fb.group({
          yrnoApi: false,
          openmeteoApi: false,
          weatherApi: false
        }) 
      })
    });
  }
}
