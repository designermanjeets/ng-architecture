import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

const modules = [
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule
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
