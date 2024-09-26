import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage],
  template: `
    <div class="branding">
      <a [routerLink]="['/']">
        <img
          ngSrc="../../../../assets/images/logo.png"
          class="align-middle m-2"
          alt="logo"
          height="58" width="173"/>
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
