import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-showcategory',
  standalone: true, 
  imports: [NgFor, RouterLink],
  templateUrl: './showcategory.component.html',
  styleUrl: './showcategory.component.css'
})
export class ShowcategoryComponent {

  constructor(private http:HttpClient){}

  public categoryData : any = [];

  ngOnInit(){
    this.http.get('http://localhost:8000/show-category')
    .subscribe((response:any)=>{
      console.log(response);
      this.categoryData = response.data;
    })
  }

  deleteData(catid:any, ev:any ){
    console.log(catid)
    this.http.delete('http://localhost:9000/delete-category/'+catid)
    .subscribe((response:any)=>{
      console.log(response.message)
      ev.target.parentNode.parentNode.remove();

    })
  }

}
