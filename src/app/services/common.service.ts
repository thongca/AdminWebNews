import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    baseUrl = environment.urlApi;
    replaceUrlImage(url): string {
        if (url === null || url === '') {
          url = 'assets/images/avatars/picture-no.svg';
          return url;
        }
        if (url) {
          url = url.split('\\').join('/');
        }
        return this.baseUrl + url;
      }
}
