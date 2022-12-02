import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app/app.component';
import { Observable } from 'rxjs';
import { WeathermanFormClass } from './weatherman-form-class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private formUrl: string;

  constructor(private http: HttpClient) { 
    this.formUrl = environment.apiBaseUrl + "/forms";
  }

  public findAll(): Observable<WeathermanFormClass[]> {
    return this.http.get<WeathermanFormClass[]>(this.formUrl);
  }

  public save(form: WeathermanFormClass) {
    return this.http.post<WeathermanFormClass>(this.formUrl, form);
  }
}
