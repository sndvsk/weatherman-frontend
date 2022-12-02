import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordsComponent } from './coords.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ErrorModule } from "../error/error.module";

@NgModule({
    declarations: [CoordsComponent],
    exports: [
        CoordsComponent
    ],
    imports: [
        CommonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatCardModule,
        ErrorModule
    ]
})
export class CoordsModule { }
