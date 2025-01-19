import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-showproduct',
  imports: [NgFor, RouterLink],
  templateUrl: './showproduct.component.html',
  styleUrl: './showproduct.component.css'
})


export class ShowproductComponent {

  constructor(private http:HttpClient){}

  public productData : any[] = []

  ngOnInit(){
    this.http.get('http://localhost:8000/show-product')
    .subscribe((response:any)=>{
      console.log(response)
      this.productData = response.data;
    })
  }

  deleteData(proid:any, ev:any ){
    console.log(proid)
    this.http.delete('http://localhost:9000/delete-product/'+proid)
    .subscribe((response:any)=>{
      console.log(response.message)
      ev.target.parentNode.parentNode.remove();

    })
  }
}
