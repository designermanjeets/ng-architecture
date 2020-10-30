import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibMstreeComponent } from './lib-mstree.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [LibMstreeComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    CdkTreeModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [LibMstreeComponent]
})
export class LibMSTreeModule { }
