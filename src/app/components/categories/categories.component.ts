import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryModel } from 'src/app/models/categories.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

  categories:CategoryModel[];

  constructor(private categoriesService:CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

}
