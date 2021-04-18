import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiFormdataService } from '../../../services/api-formdata.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.scss']
})
export class SanphamComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;
  @ViewChild('file', { static: false }) public file: ElementRef;
  model: CompProduct = new CompProduct();
  compProducts: CompProduct[] = [];
  files: any;
  constructor(
    private apiFile: ApiFormdataService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.r1_GetData();
  }
  r1_GetData(): void {
    this.api.r1_Get_List_Data('api/ProductBackend/r1_GetProducts').subscribe(res => {
      this.compProducts = res.data;
    });
  }
  SelectIdEditModel(Id: string): void {
    this.api.r1_Get_Data_ById(Id, 'api/ProductBackend/r1GetById').subscribe(res => {
      this.model = res.data;
      this.myModal.show();
    });
  }
  showModal(): void {
    this.model = new CompProduct();
    this.myModal.show();
  }
  onFileChange(evt: any): void {

        const target: DataTransfer = (evt.target) as DataTransfer;
    this.files = target.files;
  }
  r2_AddData(): void {
    if (this.model.Id === 0) {
      this.apiFile.r2_addFileModel(this.files, this.model, 'api/ProductBackend/r2_CreateProduct').subscribe(res => {
        this.file.nativeElement.value = '';
        this.myModal.hide();
        this.r1_GetData();
      });
    } else {
      this.apiFile.r2_addFileModel(this.files, this.model, 'api/ProductBackend/r3_UpdateProduct').subscribe(res => {
        this.file.nativeElement.value = '';
        this.myModal.hide();
        this.r1_GetData();
      });
    }
  }
  DeleteById(Id: string): void {
    this.api.r4_Del_Data_ById(Id, 'api/ProductBackend/r4_DeleteProduct').subscribe(res => {
      this.r1_GetData();
    });
  }
}
export class CompProduct {
  constructor() {
    this.Id = 0;
  }
  SortDetail: string;
  LongDetail: string;
  ImgFullHd: string;
  ImgIntro: string;
  ImgBanner: string;
  ImgTrending: string;
  ProductName: string;
  Price: string;
  WineType: string;
  StrengthBefore: string;
  StrengthAfter: string;
  WineTime: number;
  StartDate: string;
  TagId: number;
  ProductType: number;
  Id: number;
}
