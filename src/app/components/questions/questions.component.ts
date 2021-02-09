import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/questions.model';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit {

  idCategory : string;
  questions: Question[];

  constructor
  (
    private router:ActivatedRoute,
    private questionsService:QuestionsService
  ) 
  { }

  ngOnInit(): void {
    this.idCategory = this.router.snapshot.paramMap.get('id');
    this.getQuestionsAndAnswers(this.idCategory);
  }

  getQuestionsAndAnswers(idCategory) {
    this.questionsService.getQuestionsAndAnswers(idCategory).subscribe
    (
      (data) => {
        console.log(data);
      }
    );
  }

}
