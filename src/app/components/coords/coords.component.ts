import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, Form, FormGroup, FormGroupDirective } from '@angular/forms';
import { isEmpty } from 'rxjs';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-coords',
  templateUrl: './coords.component.html',
  styleUrls: ['./coords.component.css']
})
export class CoordsComponent implements OnInit {

  coordsForm!: FormGroup;

  lat: number;
  lng: number;
  lngFilledInForm: string;
  latFilledInForm: string;

  @ViewChild('ctrlLatError') ctrlLatError: ErrorComponent;
  @ViewChild('ctrlLngError') ctrlLngError: ErrorComponent;

  @Input() formGroupName!: string; 
  @Input('messageFromMap') messageFromMap: string = '';
  @Output() messageEventCoords = new EventEmitter<string>();

  constructor(private root2FormGroup: FormGroupDirective) {
  }

  ngOnInit(): void {
    this.coordsForm = this.root2FormGroup.control.get(this.formGroupName) as FormGroup;
  }

  getPayload(value: string, placeholder: string) {
    let msgJson = {
      coord: value,
      placeholder: placeholder
    };

    return msgJson;
  }

  emitLngValue(value: string, placeholder: string) {
    this.lngFilledInForm = JSON.stringify(this.getPayload(value, placeholder));
    this.messageEventCoords.emit(this.lngFilledInForm);
    this.ctrlLngError.removeError();
  }
 
  emitLatValue(value: string, placeholder: string) {
    this.latFilledInForm = JSON.stringify(this.getPayload(value, placeholder));
    this.messageEventCoords.emit(this.latFilledInForm);
    this.ctrlLatError.removeError();
  }

  setCoordinates(coords: any) {
    this.lat = coords.lat;
    this.lng = coords.lng;
    this.coordsForm.value.latitude = coords.lat;
    this.coordsForm.value.longitude = coords.lng;
  }

  onKeyPressEvent($event: KeyboardEvent) {
    if ($event.key == 'Enter') {
      if ($event.target instanceof HTMLInputElement) {
        let inputEl = $event.target as HTMLInputElement;

        // todo simplify
        if (inputEl.placeholder == "Latitude") {
          this.setCoord(this.ctrlLatError, this.ctrlLngError, inputEl, 90, 180, "Longitude", this.emitLatValue.bind(this), this.emitLngValue.bind(this));
        }
        if (inputEl.placeholder == "Longitude") {
          this.setCoord(this.ctrlLngError, this.ctrlLatError, inputEl, 180, 90, "Latitude", this.emitLngValue.bind(this), this.emitLatValue.bind(this));
        }
      } 
    }
  }

  setCoord(errorComponent1:ErrorComponent, errorComponent2: ErrorComponent,  inputEl: HTMLInputElement, threeshold1: number, threeshold2: number, otherPlaceholder: string, func1: Function, func2: Function) {
    
    // todo simplify 
    // todo remove marker if problem
    if (isFinite(parseFloat(inputEl.value)) && Math.abs(parseFloat(inputEl.value)) <= threeshold1 ) {
      func1(inputEl.value, inputEl.placeholder);
      errorComponent1.removeError();
    } else {
      this.displayErrors(errorComponent1, inputEl, inputEl.placeholder);
    }

    let coordVal = (document.getElementById(otherPlaceholder.toLowerCase()) as HTMLInputElement);
    if(isFinite(parseFloat(coordVal.value)) && Math.abs(parseFloat(coordVal.value)) <= threeshold2) {
      func2(coordVal.value, otherPlaceholder);
      errorComponent2.removeError();
    } else {
      this.displayErrors(errorComponent2, coordVal, otherPlaceholder);
    }
  }

  displayErrors(errorComponent: ErrorComponent, coordValue: HTMLInputElement, placeholder: string) {
    if (!coordValue.value) {
      this.displayError(errorComponent, coordValue,
                        `Input is empty!`
                        );
    } /* else if (isNaN(parseFloat(coordValue.value))) {
      this.displayError(errorComponent, coordValue,
                        `${coordValue.value} is not a number!`
                        );
    }  */
    else {
      this.displayError(errorComponent, coordValue,
                        `${coordValue.value} is not in the range of ${placeholder}!`
                        );
    }
  }

  displayError(errorComponent: ErrorComponent, coordValue: HTMLInputElement, errorText: string) {
    coordValue.value = '';
    errorComponent.setError(errorText);
  }  
}
