import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  public searchTerm:string="";
  public totalItem:number=0;
  constructor(private cartservice:CartService){}

  ngOnInit(): void {
    this.cartservice.getProducts().subscribe(res=>{
      this.totalItem=res.length;
    })
    
      }
search(event:any){
  this.searchTerm=(event.target as HTMLInputElement).value;
  console.log(this.searchTerm);
  this.cartservice.search.next(this.searchTerm)
}
  
}
