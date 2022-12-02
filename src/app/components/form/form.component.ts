import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { CoordsComponent } from '../coords/coords.component';
import { FormService } from 'src/app/form-service.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { DateRangePickerComponent } from '../date-range-picker/date-range-picker.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterViewInit {

  @ViewChild(MapComponent) ctrlMap: MapComponent;
  @ViewChild(CoordsComponent) ctrlCoords: CoordsComponent;
  @ViewChild(CheckboxComponent) ctrlCheckbox: CheckboxComponent;
  @ViewChild(DateRangePickerComponent) ctrlDate: DateRangePickerComponent;
  @ViewChild(ErrorComponent) ctrlFormError: ErrorComponent;

  formWeather!: FormGroup;

  @Input() formGroupName!: string;

  @Output() onSubmitCompletedEmitData = new EventEmitter<string>();
  @Output() onSubmitCompletedEmitForm = new EventEmitter<any>();
  
  constructor(private rootFormGroup: FormGroupDirective, private formService: FormService) {
  }

  ngOnInit(): void {
    this.formWeather = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

  onSubmit() {
    let idx = 0;
    let formValue = this.formWeather.value;
    if (!this.checkSubmitCoords()) {
      idx++;
    }
    if (!this.checkSubmitDate()) {
      idx++;
    }
    if (!this.checkSubmitCheckbox()) {
      idx++;
    }
    if (idx === 0) {
      this.formService.save(formValue).subscribe({
        next: (data: any) => this.onSubmitCompleted(data, formValue),
        error: (err) => this.onSubmitError(err)
      });
      //console.log(formValue);
    } else {
      //console.log(`Error: ${JSON.stringify(formValue)}`)
    }
  }

  onSubmitCompleted(data: string, form: any): void {
    this.ctrlFormError.removeError();
    //console.log("onSubmitCompleted: ", data);
    this.onSubmitCompletedEmitForm.emit(form);
    this.onSubmitCompletedEmitData.emit(data);
  }

  onSubmitError(err: any) {
    this.ctrlFormError.setError(err.message);
    //console.log(err);
  }

  checkSubmitDate() {
    let form = this.formWeather.value.dateForm;
    let error = this.ctrlDate.ctrlDateError;
    let start = form.startDate;
    let end = form.endDate;
    let idx = 0;
    let checkStart = typeof start === "object" && start !== null;
    let checkEnd = typeof end === "object" && end !== null;
    error.removeError();
    if (!checkStart && !checkEnd) {
      error.setError(`Form has empty or wrong dates: [ start date: (${start}) , end date: (${end}) ]`);
      //console.log(`Form ${JSON.stringify(form)} has empty or wrong dates: [ start date: ${start} , end date: ${end} ]`);
      return false;
    }
    if (!checkStart) {
      error.setError(`Form has empty or wrong start date (${start})`);
      //console.log(`Form ${JSON.stringify(form)} has empty or wrong start date (${start})`);
      idx++;
    }
    if (!checkEnd) {
      error.setError(`Form has empty or wrong end date (${end})`);
      //console.log(`Form ${JSON.stringify(form)} has empty or wrong end date (${end})`);
      idx++;
    }
    if (idx === 0) {
    return true;
    } else {
      return false;
    }
  }
  

  checkSubmitCoords() {
    let form = this.formWeather.value.coordsForm;
    let errorLat = this.ctrlCoords.ctrlLatError;
    let errorLng = this.ctrlCoords.ctrlLngError;
    let lat = form.latitude;
    let lng = form.longitude;
    let checkLat = typeof lat === "number" && lat !== null && Math.abs(lat) <= 90;
    let checkLng = typeof lng === "number" && lng !== null && Math.abs(lng) <= 180;
    let idx = 0;
    errorLat.removeError();
    errorLng.removeError();
    if (!checkLat && !checkLng) {
      errorLat.setError(`Both coordinates are not in range latitude: ${lat} or empty`);
      errorLng.setError(`Both coordinates are not in range longitude: ${lng}  or empty`);
      //console.log(`Form ${JSON.stringify(form)} has coordinates not in range or empty`);
      return false;
    }
    if (!checkLat) {
      errorLat.setError(`Latitude is not in range: (${lat})  or empty`);
      //console.log(`Latitude is wrong or empty`); 
      idx++;
    }
    if (!checkLng){
      errorLng.setError(`Longitude is not in range: (${lng}) or empty`);
      //console.log(`Longitude is wrong or empty`); 
      idx++;
    }
    if (idx === 0) {
      this.ctrlMap.changeMarker(''+lat, "Latitude");
      this.ctrlMap.changeMarker(''+lng, "Longitude");
      return true;
    } else {
      return false;
    }
  }

  checkSubmitCheckbox() {
    let form = this.formWeather.value.apiForm;
    let error = this.ctrlCheckbox.ctrlCheckboxError;
    error.removeError();
    if (Object.values(form).every(value => value === false)) {
      error.setError(`Form has all apis unchecked`);
      //console.log(`Form ${JSON.stringify(form)} has all apis unchecked`);
      return false;
    }
    return true;
  }

  ngAfterViewInit(): void {
      //this.message = this.mapComponent.message;
  }

  receiveMessageMap($event: string) {
    //console.log("formComponent.receiveMessageMap: ", $event);
    this.ctrlCoords.setCoordinates(JSON.parse($event));
  }

  receiveMessageCoords($event: string) {
    //console.log("formComponent.receiveMessageCoords: ", $event);
    this.ctrlMap.setCoordinates(JSON.parse($event));
  }
}
