import {Injectable} from '@angular/core';
import {IProductService} from './IProductService';
import {Product} from '../core/model/product';

import {CRUDService} from './CRUD.service';
import {ConfigAPI} from './config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CRUDService<Product> implements IProductService {
  override url: string = ConfigAPI.PRODUCT;

  constructor(http: HttpClient) {
    super(http);
  }
}
