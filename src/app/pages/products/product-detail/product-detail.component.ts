import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product} from '../../../core/model/product';
import { ProductService } from '../../../services/product.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MaterialModule} from "../../../material/material.module";


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MaterialModule, FormsModule,
    ReactiveFormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  form!: FormGroup;

  public selectedId!: string;
  product: Product = new Product();


constructor(private router: Router,
  private route: ActivatedRoute,
  private fb: FormBuilder,
            private snackBar: MatSnackBar,
  private productService: ProductService)
  {}
  ngOnInit() {

    this.createForm();
    this.updateForm();
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }
  updateForm()
  {
    debugger;
    this.selectedId = this.route.snapshot.paramMap.get('_id')!;
    this.productService.getId(this.selectedId)
    .subscribe({
      next: (res: Product) => {
      this.product = res;
      if (this.product) {
        this.form.patchValue(this.product);
      } else {
          this.form.reset();
      }
    }});

  }
  save(){

    if(this.product._id){
      this.product = Object.assign(this.product, this.form.value)

      this.productService.edit(this.product, this.product._id)
      .subscribe({
        next: (res: Product) => {
          this.snackBar.open('Successful',  'Produto salvo com sucesso!');
          this.router.navigate(['products']);
      },
      error: (err: any) => {
        this.snackBar.open('Erro',  err);
      }});
    }else{

      this.productService.save(this.form.value)
      .subscribe({
        next: (res: Product) => {
          this.snackBar.open('Successful',  'Produto salvo com sucesso!');
          this.router.navigate(['products']);
      },
      error: (err: any) => {
        this.snackBar.open('Erro',  err);
      }});
    }
  }
}
