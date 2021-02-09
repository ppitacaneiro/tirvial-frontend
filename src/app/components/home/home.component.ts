import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { PlayerModel } from '../../models/player.model';
import { PlayersService } from '../../services/players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  formPlayer:FormGroup;
  player:PlayerModel;
  formSubmitted: boolean;

  constructor(
    private fb:FormBuilder,
    private playersService:PlayersService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.formSubmitted = false;
    this.player = new PlayerModel();

    this.formPlayer = this.fb.group({
      nickname : ['',Validators.required],
      email : ['',[Validators.required,Validators.email]],
      age : ['',Validators.required],
      sex : ['',Validators.required]
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.formPlayer.valid) {
      this.playersService.register(this.player)
        .subscribe( response => {
          this.router.navigate(['/categories']);        
          console.log(response);
        }, (err) => { console.log(err)} )
    }
  }
}
