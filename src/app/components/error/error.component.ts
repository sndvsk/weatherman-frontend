import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  errorText: string

  setError(errorCode: string) {
    //console.log(errorCode);
    this.errorText = errorCode;
  }

  removeError() {
    this.errorText = '';
  }

}
