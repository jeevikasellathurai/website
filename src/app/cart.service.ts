import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
public cartItemList:any=[]
public productList=new BehaviorSubject<any>([]);
public search=new BehaviorSubject<string>("");
  constructor() { }

  getProducts(){
   return this.productList.asObservable();
  }
  setProduct(product:any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product:any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  
  getTotalPrice():number{
    let grandTotal=0;
    this.cartItemList.map((a:any)=>{
      grandTotal+=a.total;
    })
    return grandTotal;
  }
  removeCartItem(product:any){
    this.cartItemList.map((a:any,index:any)=>{
      if(product.id===a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList=[]
    this.productList.next(this.cartItemList);
  }


  //connection between buynow and product componnet
  // private selectedProductSource = new BehaviorSubject<Order | null>(null);
  // selectedProduct$ = this.selectedProductSource.asObservable();

  // setSelectedProduct(product: Order) {
  //   this.selectedProductSource.next(product);
  // }
  private selectedProductSource = new BehaviorSubject<Order | null>(this.getStoredProduct());
  selectedProduct$ = this.selectedProductSource.asObservable();

  setSelectedProduct(product: Order) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    this.selectedProductSource.next(product);
  }

  private getStoredProduct(): Order | null {
    const storedProduct = localStorage.getItem('selectedProduct');
    return storedProduct ? JSON.parse(storedProduct) : null;
  }
}
