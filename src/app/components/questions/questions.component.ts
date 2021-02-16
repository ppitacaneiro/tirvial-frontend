import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/questions.model';
import { QuestionsService } from '../../services/questions.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit {

  idCategory: string;
  questions: Question[];
  form: FormGroup;
  answersByUser : any;

  constructor
    (
      private router: ActivatedRoute,
      private questionsService: QuestionsService,
    ) {

  }

  ngOnInit(): void {
    this.idCategory = this.router.snapshot.paramMap.get('id');
    this.questionsService.getQuestionsAndAnswers(this.idCategory).subscribe
      (
        (data) => {
          this.questions = data;
          console.log(this.questions);
          this.generateRadioButtons(this.questions);
        }
      );
  }

  generateRadioButtons(questionsAndAnswers): void {

    let group = {};
    questionsAndAnswers.forEach(question => {
      question.answers.forEach(answer => {
        group[question.id] = new FormControl('');
      })
    });

    this.form = new FormGroup(group);
  }

  onSubmit() {
    this.answersByUser = this.form.value;
    this.evaluateAnswersByUser();
  }

  evaluateAnswersByUser():void {
    for(let questionAnswered in this.answersByUser)
    {
      this.questions.forEach(question => {
        if (question.id === parseInt(questionAnswered)) {
          question.answers.forEach(answer => {
            if (answer.id === parseInt(this.answersByUser[questionAnswered])) {
              if (answer.correct) {
                console.log('correcta' + 'question : ' + question.id + 'answer :' + answer.id);
              } else {
                console.log('incorrecta' + 'question : ' + question.id + 'answer :' + answer.id);
              }
            }
          });
        }
      });
    }
  }

}