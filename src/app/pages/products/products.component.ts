import {AfterViewInit, Component } from '@angular/core';
import {MaterialModule} from "../../material/material.module";
import {MatTableDataSource} from "@angular/material/table";

import {ProductService} from "../../services/product.service";
import {Router, RouterLink} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import {Product} from "../../core/model/product";


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'action'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();



  constructor( private productService: ProductService,
               private router: Router,
              private dialog: MatDialog ) {
    this.load();
  }

  load() {
    this.productService.listAll().subscribe({
      next: (res: Product[]) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
  }
  editProduct(product: Product) {
    this.router.navigate(['product', { _id: product._id }]);
  }
  openDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      data: {product: product},
      width: '250px'
    });

    dialogRef.afterOpened().subscribe(result => {
      if (result !== undefined) {
        this.load();
      }
    });
  }
}
