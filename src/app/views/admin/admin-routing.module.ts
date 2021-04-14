import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaivietComponent } from './baiviet/baiviet.component';
import { SanphamComponent } from './sanpham/sanpham.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quản trị'
    },
    children: [
      {
        path: '',
        redirectTo: 'baiviet'
      },
      {
        path: 'baiviet',
        component: BaivietComponent,
        data: {
          title: 'Bài viết'
        }
      },
      {
        path: 'sanpham',
        component: SanphamComponent,
        data: {
          title: 'Sản phẩm'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
