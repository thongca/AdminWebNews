import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiFormdataService } from '../../../services/api-formdata.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-baiviet',
  templateUrl: './baiviet.component.html',
  styleUrls: ['./baiviet.component.scss']
})
export class BaivietComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;
  @ViewChild('file', { static: false }) public file: ElementRef;
  model: CompNews = new CompNews();
  compnewss: CompNews[] = [];
  files: any;
  constructor(
    private apiFile: ApiFormdataService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.r1_GetData();
  }
  r1_GetData(): void {
    this.api.r1_Get_List_Data('api/AdminNews/r1_GetNews').subscribe(res => {
      this.compnewss = res.data;
    });
  }
  SelectIdEditModel(Id: string): void {
    this.api.r1_Get_Data_ById(Id, 'api/AdminNews/r1GetById').subscribe(res => {
      this.model = res.data;
      this.myModal.show();
    });
  }
  showModal(): void {
    this.model = new CompNews();
    this.myModal.show();
  }
  onFileChange(evt: any): void {

        const target: DataTransfer = (evt.target) as DataTransfer;
    this.files = target.files;
  }
  r2_AddData(): void {
    console.log(this.model);
    if (this.model.Id === 0) {
      this.apiFile.r2_addFileModel(this.files, this.model, 'api/AdminNews/r2_CreateNews').subscribe(res => {
        this.file.nativeElement.value = '';
        this.myModal.hide();
        this.r1_GetData();
      });
    } else {
      this.apiFile.r2_addFileModel(this.files, this.model, 'api/AdminNews/r3_UpdateNews').subscribe(res => {
        this.file.nativeElement.value = '';
        this.myModal.hide();
        this.r1_GetData();
      });
    }
  }
  DeleteById(Id: string): void {
    this.api.r4_Del_Data_ById(Id, 'api/AdminNews/r4_DeleteNews').subscribe(res => {
      this.r1_GetData();
    });
  }
}
export class CompNews {
  constructor() {
    this.Id = 0;
  }
  SortContent: string;
  LongContent: string;
  ImgUrlMaster: string;
  ImgUrlDetail: string;
  Title: string;
  TagId: number;
  TypeNews: number;
  Id: number;
}
