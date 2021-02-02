import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { PlayerModel } from '../../models/player.model';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  formPlayer:FormGroup;
  player:PlayerModel;

  constructor(private fb:FormBuilder,private playersService:PlayersService) { }

  ngOnInit(): void {
    this.player = new PlayerModel();

    this.formPlayer = this.fb.group({
      nickname : ['',Validators.required],
      email : ['',Validators.email],
      age : [''],
      sex : ['']
    });
  }

  onSubmit() {
    this.playersService.register(this.player)
    .subscribe( response => {
      console.log(response);
    }, (err) => { console.log(err)} )
  }

}
