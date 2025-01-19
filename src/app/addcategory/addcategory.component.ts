import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcategory',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent {

  constructor( private http:HttpClient, private router: Router){}

     public profileForm = new FormGroup({
      categoryName : new FormControl('', [Validators.required]),
      })

      public message : string = '';
    
      onSubmit(){
        console.log(this.profileForm.value);
    
        this.http.post("http://localhost:8000/add-category", this.profileForm.value)
        .subscribe((response:any)=>{
          console.log(response);
          this.message = response['message']
          this.router.navigate(['/show-category']);
        })
      }
}
