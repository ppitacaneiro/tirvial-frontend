import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/questions.model';
import { QuestionsService } from '../../services/questions.service';
import { PlayersService } from '../../services/players.service';
import { RankingsService } from '../../services/rankings.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Ranking } from 'src/app/models/ranking.model';

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
  ranking: Ranking;

  constructor
    (
      private activatedRoute: ActivatedRoute,
      private questionsService: QuestionsService,
      private playerService: PlayersService,
      private rankingService: RankingsService,
      private router:Router
    ) {
      this.totalCorrects = 0;
      this.totalErrors = 0;
      this.initialTime = new Date();
      this.ranking = new Ranking();
  }

  ngOnInit(): void {
    this.idCategory = this.activatedRoute.snapshot.paramMap.get('id');
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

    this.ranking.category_id = parseInt(this.idCategory);
    this.ranking.player_id = this.playerService.getIdPlayer();
    this.ranking.errors = this.totalErrors;
    this.ranking.hits = this.totalCorrects;
    this.ranking.score = this.score;
    this.ranking.time = this.totalTime;
    this.ranking.register_at_date = new Date().toISOString().slice(0,10);
    this.ranking.register_at_time = new Date().toISOString().slice(12,19);

    this.rankingService.register(this.ranking).subscribe
    (
      (response) => {
        console.log(response);
        this.router.navigate(['/rankings']);
      }, (error) => {
        console.log(error);
      }
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