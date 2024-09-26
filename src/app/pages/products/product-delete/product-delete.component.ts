import { Component, inject, model, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css'],
  standalone: true,
  imports: [MaterialModule],
})
export class ProductDeleteComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<ProductDeleteComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly product = model(this.data);

  constructor(private productService: ProductService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  delete(){
    const p = this.product();
    this.productService.delete(p['product']._id).subscribe({
      next: (res: any) => {
        this.snackBar.open('Produto excluido com sucesso!');
      },
      error: (err: any) => {
        this.snackBar.open('Error ao excluir produto!');
      },
    });
  }
}
