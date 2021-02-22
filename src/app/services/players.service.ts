import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerModel } from '../models/player.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private url = 'http://trivial0.test:8888/api/players';
  private idPlayer;

  constructor(private http:HttpClient) { }

  register(player:PlayerModel) {
    return this.http.post(this.url,player).pipe(
      map(response => {
        return response;
      })
    );
  }

  setIdPlayer(id) {
    this.idPlayer = id;
  }

  getIdPlayer() {
    return this.idPlayer;
  }
}
