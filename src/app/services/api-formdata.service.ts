import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiFormdataService {
  private baseUrl: string;
  constructor(
        private http: HttpClient,
  ) {
    this.baseUrl = environment.urlApi;
   }
   // request file to serve
   // para1 = file, 2 = model, 3 = url post model
   r2_addFileModel(files, model, url): Observable<any> {
    const header = {
      reportProgress: true,
      headers: new HttpHeaders()
        .set('Authorization',  this.getToken())
    };
    const formData = new FormData();
    let uploadReq;
    // tslint:disable-next-line:max-line-length
    if (files) {
      for (const file of files) {
        formData.append(file.name, file);
      }
    }
    formData.append('model', JSON.stringify(model));
    uploadReq = new HttpRequest('POST', this.baseUrl + url,
    formData, header);
    return this.http.request(uploadReq).pipe(); // api thứ nhất add file
  }
  // api update khi có file
  // para1 = file, 2 = model, 3 = url post model
  r3_addFileModelPut(files, model, url): Observable<any> {
    const header = {
      reportProgress: true,
      headers: new HttpHeaders()
        .set('Authorization',  this.getToken())
    };
    const formData = new FormData();
    let uploadReq;
    // tslint:disable-next-line:max-line-length
    if (files) {
      for (const file of files) {
        formData.append(file.name, file);
      }
    }
    formData.append('model', JSON.stringify(model));
    let urlUp = this.baseUrl + url + '/' + model.Id;
    urlUp = urlUp.replace(/[?&]$/, '');
    uploadReq = new HttpRequest('PUT', urlUp,
    formData, header);
    return this.http.request(uploadReq).pipe(); // api thứ thứ 2 upload file
  }
  private getToken(): string {
    const token: string = localStorage.getItem('session_tk');
    if (token) {
      return 'Bearer ' + token;
    } else {
      // se dieu huong ra login
      return '';
    }
  }
}

