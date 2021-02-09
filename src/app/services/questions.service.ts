import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer.models';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private url = '/api/categories/questions/answers/';

  constructor(private http:HttpClient) { }

  getQuestionsAndAnswers(idCategory):Observable<Answer[]> {
    return this.http.get<Answer[]>(this.url + idCategory);
  }

}
