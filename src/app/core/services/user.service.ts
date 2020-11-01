import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserData } from '../../models/user-data.interface';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  getRandomUser(): Observable<IUserData> {
    return this.http.get<IUserData>(environment.apiUrl);
  }
}
