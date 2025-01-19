import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css'],
})
export class EditproductComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private act: ActivatedRoute) {}

  public showProductData: any = {};
  public message: string = '';
  public categoryName: string = ''; 
  public categoryId: string = ''; 

  public profileForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    productPrice: new FormControl('', [Validators.required]),
    productDesc: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    const productId = this.act.snapshot.params['proid']; 

    this.http.get(`http://localhost:8000/show-product/${productId}`).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.showProductData = response.data;

          if (this.showProductData.category) {
            this.categoryName = this.showProductData.category.categoryName;
            this.categoryId = this.showProductData.category.id;
          } else {
            console.warn('Category data is missing for this product.');
          }


          this.profileForm.patchValue({
            productName: this.showProductData.productName,
            productPrice: this.showProductData.productPrice,
            productDesc: this.showProductData.productDesc,
          });
        }
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const productId = this.act.snapshot.params['proid']; 

      const updatePayload = {
        ...this.profileForm.value,
        categoryId: this.categoryId, 
      };

      this.http.put(`http://localhost:8000/update-product/${productId}`, updatePayload).subscribe(
        (response: any) => {
          if (response && response.message) {
            this.message = response.message; 
            this.router.navigate(['/show-product']); 
          } else {
            console.warn('Unexpected response from the server:', response);
          }
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
