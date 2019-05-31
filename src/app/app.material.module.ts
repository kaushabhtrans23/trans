import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule, MatOptionModule, MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule, MatTabsModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatExpansionModule, MatTooltipModule, MatDatepickerInput } from '@angular/material';

import { FormControl, FormGroup, NgModel } from '@angular/forms';
@NgModule({
  imports: [
     MatButtonModule,MatExpansionModule,MatTooltipModule, MatCheckboxModule, MatToolbarModule, MatDatepickerModule, MatChipsModule,MatNativeDateModule, MatOptionModule, MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule, MatTabsModule,MatListModule
  ],
  exports: [    MatButtonModule,MatExpansionModule, MatTooltipModule,MatCheckboxModule, MatToolbarModule,MatDatepickerModule,MatNativeDateModule, MatChipsModule, MatOptionModule, MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule, MatTabsModule, MatListModule
  ],
})
export class AppMaterialModule { }