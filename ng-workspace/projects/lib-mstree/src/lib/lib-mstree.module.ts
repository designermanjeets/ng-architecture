import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibMstreeComponent } from './lib-mstree.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { A11yModule } from '@angular/cdk/a11y';



@NgModule({
  declarations: [LibMstreeComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    DragDropModule,
    MatTreeModule,
    CdkTreeModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    A11yModule
  ],
  exports: [LibMstreeComponent]
})
export class LibMSTreeModule { }
