import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { FormModule } from './components/form/form.module';
import { GraphModule } from './components/graph/graph.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormModule,
    GraphModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
