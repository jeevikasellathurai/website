import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../cart.service';
import { Order } from '../order';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  public filterCategory: any;
  searchKey: string = '';
  public productList: Order[];
  constructor(
    private signupservice: SignupService,
    private cartservice: CartService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.signupservice.getProduct().subscribe((res) => {
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a: any) => {
        if (a.category === "women's clothing" || a.category === "men's clothing" ) {
          a.category = 'fashion';
        }
        else if (a.category === "saree") {
          a.category = 'saree';
        }
        Object.assign(a, { quantity: 1, total: a.price });
      });
      console.log(this.productList);
    });
    this.cartservice.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
  addtocart(item: any) {
    
    this.cartservice.addtoCart(item);
  }
  gotobynow(item: any) {
    this.cartservice.setSelectedProduct(item);
    this.route.navigate(['/buynow']);

  }
  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }
 
}
