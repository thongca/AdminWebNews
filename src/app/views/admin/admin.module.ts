import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BaivietComponent } from './baiviet/baiviet.component';
import { SanphamComponent } from './sanpham/sanpham.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { ComponentModule } from '../../shared/component.module';


@NgModule({
  declarations: [BaivietComponent, SanphamComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ModalModule,
    QuillModule,
    FormsModule,
    ComponentModule
  ]
})
export class AdminModule { }
