import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Form } from '../form';
import { SignupService } from '../signup.service';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buynow',
  templateUrl: './buynow.component.html',
  styleUrls: ['./buynow.component.css']
})
export class BuynowComponent implements OnInit{
  selectedProduct: any;
  public products: any[] = [];
  contactForm:FormGroup;
  constructor(private signupservice:SignupService,private formBuilder: FormBuilder,private cartservice:CartService){}
ngOnInit(): void {
 this.contactForm=this.formBuilder.group({
    name:["",[Validators.required]],
    quantity:["",[Validators.required]],
    size:["",[Validators.required]],
    color:["",[Validators.required]],
    address:["",[Validators.required]],
    pincode:["",[Validators.required]],
    payment:["",[Validators.required]],
    price: [this.selectedProduct ? this.selectedProduct.price : "", [Validators.required]],
    image: [this.selectedProduct ? this.selectedProduct.image : "", [Validators.required]],
  })
  this.cartservice.selectedProduct$.subscribe((product) => {
    this.selectedProduct = product;
    this.updateFormWithProductData();
  });

  
}
  updateFormWithProductData() {
    if (this.selectedProduct) {
      this.contactForm.patchValue({
        price: this.selectedProduct.price,
        image: this.selectedProduct.image,
      });
    }
  }
onSubmit(){
 const forms=this.contactForm.value as Form
 this.signupservice.postForm(forms).subscribe((res)=>{
console.log(res);
this.contactForm.reset();
 })
 alert('Your Order is placed!');
}


}
