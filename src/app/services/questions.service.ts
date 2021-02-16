import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/questions.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private url = '/api/categories/questions/answers/';

  constructor(private http:HttpClient) { }

  getQuestionsAndAnswers(idCategory):Observable<Question[]> {
    return this.http.get<Question[]>(this.url + idCategory)
    .pipe(
      map((response:any) => {
        return response;
      })
    );
  }

}
