import { forkJoin, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.urlApi;
  constructor(
    private http: HttpClient
  ) { }

  /** GET: lấy thông tin danh sách dữ liệu  */
  r1_Get_List_Data(url: string): Observable<any> {
    const options: any = {
      headers: new HttpHeaders({
        ContentType: 'application/json; charset=utf-8',
      })
    };
    return this.http.get<any>(this.baseUrl + url, options);
  }
  /** Post: lấy thông tin danh sách dữ liệu có truyền tham số  */
  r1_Post_List_Data(model: any, url: string): Observable<any> {
    const options: any = {
      ContentType: 'application/json; charset=utf-8',
      headers: new HttpHeaders({
        Authorization: this.getToken()
      })
    };
    return this.http.post(this.baseUrl + url, model, options);
  }
  /** GET: Lấy thông tin của nhiều API kết quả trả về cùng lúc [0,1,2,3] */
  r1_Get_Merge_API(url: string, urlTwo: string, urlThree?: string, urlFord?: string): Observable<any> {
    const options: any = {
      ContentType: 'application/json; charset=utf-8',
      headers: new HttpHeaders({
        Authorization: this.getToken()
      })
    };
    const apiOne = this.http.get(this.baseUrl + url, options);
    const apiTwo = this.http.get(this.baseUrl + urlTwo, options);
    let apiThree = null;
    let apiFord = null;
    if (urlThree !== undefined) {
      apiThree = this.http.get(this.baseUrl + urlThree, options);
      if (urlFord !== undefined) {
        apiFord = this.http.get(this.baseUrl + urlFord, options);
        return forkJoin([apiOne, apiTwo, apiThree, apiFord]);
      }
      return forkJoin([apiOne, apiTwo, apiThree]);
    }
    return forkJoin([apiOne, apiTwo]);
  }
    // POST: thêm thông tin vào danh sách dữ liệu từ api serve khác
    r1_Get_Add_Data_FullUrl(url: string, header: any): Observable<any> {
      return this.http.get(url, header);
    }
  /** GET: lấy thông tin danh sách dữ liệu theo 1 id */
  r1_Get_Data_ById(Id: string, url: string): Observable<any> {
    const options: any = {
      ContentType: 'application/json; charset=utf-8',
      headers: new HttpHeaders({
        Authorization: this.getToken()
      })
    };
    return this.http.get<any>(this.baseUrl + url + '/' + Id, options);
  }
  /** GET: lấy thông tin danh sách dữ liệu forkJoin theo 1 Id */
  r1_Get_Data_forkJoin_ById(Id: string, url: string, urlTwo: string): Observable<any> {
    const options: any = {
      ContentType: 'application/json; charset=utf-8',
      headers: new HttpHeaders({
        Authorization: this.getToken()
      })
    };
    const apiOne = this.http.get(this.baseUrl + url + '/' + Id, options);
    const apiTwo = this.http.get(this.baseUrl + urlTwo + '/' + Id, options);
    return forkJoin([apiOne, apiTwo]);
  }

   /** GET: Lấy thông tin tọa độ bản đồ */
   r1_Get_Location_By_Address(textSearch: string, textSearch1?: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          Authorization: `Basic ` + btoa('ba:123@123a'),
        }
      )
    };
    const url = 'http://placeapi.bagroup.io/api/v1/Place/Search?q=' + textSearch;
    const apiOne = this.http.get(url, httpOptions);
    if (textSearch1) {
      const url2 = 'http://placeapi.bagroup.io/api/v1/Place/Search?q=' + textSearch1;
      const apiTwo = this.http.get(url2, httpOptions);
      return forkJoin([apiOne, apiTwo]);
    } else {
      return apiOne;
    }
  }
  /** GET: Lấy thông tin danh sách dữ liệu theo parameter */
  r1_Get_Data_By_Param(url: string, params1: HttpParams): Observable<any> {
    const options: any = {
      ContentType: 'application/json; charset=utf-8',
      params: params1,
    };
    return this.http.get<any>(this.baseUrl + url, options);
  }
  // POST: thêm thông tin vào danh sách dữ liệu
  r2_Post_Add_Data(model, url: string): Observable<any> {
    const options: any = {
      ContentType: 'application/json; charset=utf-8',
      headers: new HttpHeaders({
        Authorization: this.getToken()
      })
    };
    return this.http.post<any>(this.baseUrl + url, model, options);
  }
  // POST: thêm thông tin vào danh sách dữ liệu từ api serve khác
  r2_Post_Add_Data_FullUrl(model, url: string): Observable<any> {
    const options: any = {
      ContentType: 'application/json; charset=utf-8',
    };
    return this.http.post(url, model, options);
  }
  // PUT: thêm thông tin vào danh sách dữ liệu
  r3_Put_Update_Data(model, url: string): Observable<any> {
    const options: any = {
      ContentType: 'application/json; charset=utf-8',
      headers: new HttpHeaders({
        Authorization: this.getToken()
      })
    };
    let urlUp = this.baseUrl + url + '/' + model.Id;
    urlUp = urlUp.replace(/[?&]$/, '');
    return this.http.put<any>(urlUp, model, options);
  }
  // DEL: Xóa thông tin vào danh sách dữ liệu
  r4_Del_Data_ById(id: string, url: string): Observable<any> {
    const options: any = {
      ContentType: 'application/json; charset=utf-8',
      headers: new HttpHeaders({
        Authorization: this.getToken()
      })
    };
    let urlDel = this.baseUrl + url + '/' + id;
    urlDel = urlDel.replace(/[?&]$/, '');
    return this.http.delete<any>(urlDel, options);
  }
  /** DEL: Xóa thông tin danh sách dữ liệu theo parameter */
  r4_Del_Data_By_Param(url: string, params1: HttpParams): Observable<any> {
    const options: any = {
      ContentType: 'application/json; charset=utf-8',
      params: params1,
    };
    return this.http.delete<any>(this.baseUrl + url, options);
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
