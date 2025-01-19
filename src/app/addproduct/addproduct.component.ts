import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {

  constructor(private http:HttpClient, private router:Router){}
  public profileForm = new FormGroup({
    productName : new FormControl('', [Validators.required]),
    productPrice : new FormControl('', [Validators.required]),
    productDesc : new FormControl('', [Validators.required]),
    categoryId : new FormControl('', [Validators.required])  
    })

    onSubmit(){
      console.log(this.profileForm.value);
  
      this.http.post("http://localhost:8000/add-product", this.profileForm.value)
      .subscribe((response:any)=>{
        console.log(response);
        this.message = response['message']
        this.router.navigate(['/show-product']);
      })
    }
    public message : string = '';
    public userdata : any = [];

    ngOnInit(){
      this.http.get('http://localhost:8000/show-category')
      .subscribe((response:any)=>{
        console.log(response);
        this.userdata = response.data;
      })
    }
  
}
