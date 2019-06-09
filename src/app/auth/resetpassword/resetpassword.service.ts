import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(public httpClient: HttpClient) { }




    restorepassword(body) {
        return this.httpClient.put(`${environment.api_url}/user/reset`, body).pipe(map((res: any) => {
            return res;
        }));
    }

}
