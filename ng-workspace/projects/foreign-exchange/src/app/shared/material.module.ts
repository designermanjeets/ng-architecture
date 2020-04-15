import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';


const modules = [
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
];

@NgModule({
    imports: [
        ...modules
    ],
    exports: [
        ...modules
    ]
})
export class MsMaterialModule { }
