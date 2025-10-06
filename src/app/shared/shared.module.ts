import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [],
  providers: [MessageService, ConfirmationService],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    SelectButtonModule,
  ],
})
export class SharedModule {}
