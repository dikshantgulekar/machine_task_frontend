import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editcategory',
  imports: [ReactiveFormsModule],
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css'], 
})
export class EditcategoryComponent {
  public showCategoryData: any = [];
  public message: any = '';

  constructor(private http: HttpClient, private act: ActivatedRoute, private router: Router) {}

  // Initialize the form group
  public profileForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    const url = this.act.snapshot.params;
    this.http.get(`http://localhost:8000/categories/${url['catid']}`).subscribe((response: any) => {
      console.log(response);
      this.showCategoryData = response.data;
      
      // Populate the form with the fetched data
      if (this.showCategoryData.length > 0) {
        this.profileForm.patchValue({
          categoryName: this.showCategoryData[0].categoryName,
        });
      }
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
    const urlData = this.act.snapshot.params;
    this.http.put(`http://localhost:8000/categories/${urlData['catid']}`, this.profileForm.value).subscribe((response: any) => {
      console.log(response);
      this.message = response['message'];
      this.router.navigate(['/show-category']);
    });
  }
}
