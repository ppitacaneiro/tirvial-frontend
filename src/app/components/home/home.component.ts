import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  formPlayer:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.formPlayer = this.fb.group({
      nickname : ['',Validators.required],
      email : ['',Validators.email],
      age : [''],
    });
  }

  onSubmit() {
    console.log(this.formPlayer.value);
  }

}
