import { Component, OnInit } from '@angular/core';
import { Ranking } from 'src/app/models/ranking.model';
import { RankingsService } from '../../services/rankings.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {

  rankings:Ranking[];

  constructor(private rankingService:RankingsService) { }

  ngOnInit(): void {
    this.getRankigs();
  }

  getRankigs() {
    this.rankingService.getRankings().subscribe(
      (data) => {
        this.rankings = data;
        console.log(this.rankings);
      }
    );
  }

}
