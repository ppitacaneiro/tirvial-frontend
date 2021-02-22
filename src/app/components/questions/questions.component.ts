import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/questions.model';
import { QuestionsService } from '../../services/questions.service';
import { PlayersService } from '../../services/players.service';
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
  totalCorrects : number;
  totalErrors : number;
  score : number;
  initialTime : any;
  endTime : any;
  totalTime: any;

  constructor
    (
      private router: ActivatedRoute,
      private questionsService: QuestionsService,
      private playerService: PlayersService
    ) {
      this.totalCorrects = 0;
      this.totalErrors = 0;
      this.initialTime = new Date();
  }

  ngOnInit(): void {
    this.idCategory = this.router.snapshot.paramMap.get('id');
    this.questionsService.getQuestionsAndAnswers(this.idCategory).subscribe
      (
        (data) => {
          this.questions = data;
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
    this.endTime = new Date();
    this.evaluateAnswersByUser();
    this.totalTime = this.calculateTotalTime();
    this.score = this.calculateScore();

    console.log(
      'hits : ' + this.totalCorrects +
      'errors : ' + this.totalErrors + 
      'score : ' + this.score + 
      'time : ' + this.totalTime + 
      'player_id : ' + this.playerService.getIdPlayer() + 
      'category_id : ' + this.idCategory
    );
  }

  calculateScore():number {
    return (100 * this.totalCorrects) / 10;
  }

  calculateTotalTime():number {
    let difference = this.endTime - this.initialTime;
    return Math.round(difference/1000);
  }

  evaluateAnswersByUser():void {
    for(let questionAnswered in this.answersByUser)
    {
      this.questions.forEach(question => {
        if (question.id === parseInt(questionAnswered)) {
          question.answers.forEach(answer => {
            if (answer.id === parseInt(this.answersByUser[questionAnswered])) {
              if (answer.correct) {
                this.totalCorrects++;
              } else {
                this.totalErrors++;
              }
            }
          });
        }
      });
    }
  }

}