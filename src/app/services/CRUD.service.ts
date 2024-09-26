import { Injectable, InjectionToken } from '@angular/core';
import { ICRUD } from './ICRUD';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigAPI } from './config';

@Injectable({
  providedIn: 'root'
})
export class CRUDService<T> implements ICRUD<T> {


constructor(private http: HttpClient,) {

 }
  url!: string;
  save(obj: T): Observable<T> {
    return this.http.post<T>(this.url, obj);
  }
  edit(obj: T, id: string): Observable<T> {
    return this.http.put<T>(this.url+"/"+id+"/", obj);
  }
  delete(id: string): Observable<T> {
    return this.http.delete<T>(this.url+"/"+id);
  }
  getId(id: string): Observable<T>{
    return this.http.get<T>(this.url+"/"+id);
  }
  listAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

}
