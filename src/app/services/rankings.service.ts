import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Ranking } from '../models/ranking.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  private url = 'http://trivial0.test:8888/api/rankings';

  constructor(private http:HttpClient) { }

  register(ranking:Ranking) {
    return this.http.post(this.url,ranking).pipe(
      map(response => {
        return response;
      })
    );
  }

}
