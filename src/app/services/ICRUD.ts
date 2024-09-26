import { Observable } from "rxjs";

export interface ICRUD<T> {
  url: string;
  save(obj: T): Observable<T> ;
  edit(obj: T, id: string): Observable<T> ;
  delete(id: string): Observable<T> ;
  getId(id: string): Observable<T> ;
  listAll(): Observable<T[]>;

}
