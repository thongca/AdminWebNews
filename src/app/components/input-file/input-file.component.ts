import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent implements OnInit {
  @ViewChild('file', { static: false }) public file: ElementRef;
  srcImage = 'assets/images/avatars/image.svg';
  @Input() set seturlImage(url) {
    if (!url) {
      this.imgURL = this.srcImage;
    } else {
      this.imgURL = this.common.replaceUrlImage(url);
    }
  }
  heightI = 120;
  @Input() set heightImage(height) {
    if (height !== undefined) {
      this.heightI = height;
    }
  }
  @Input() widthImage: any;
  @Output() changeImage = new EventEmitter();
  // tslint:disable-next-line:variable-name
  _files: any;
  imagePath: string;
  imgURL: any;
  constructor(
    private common: CommonService
  ) { }

  ngOnInit(): void {
    if (this.heightI === undefined) {
      this.heightI = 120;
    }
    if (this.imgURL === undefined) {
      this.imgURL = this.srcImage;
    }
  }
  preview(files): void {
    if (files.length === 0) {
      return;
    }
    // tslint:disable-next-line:prefer-const
    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    this._files = files;
    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.changeImage.emit(this._files);
  }

  openAttachfile(): void {
    setTimeout(() => {
      const el: HTMLElement = this.file.nativeElement;
      el.click();
    }, 100);
  }
}
