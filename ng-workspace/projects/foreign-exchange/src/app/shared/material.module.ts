import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatTabsModule
    ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatTabsModule
    ]
})
export class MsMaterialModule { }
