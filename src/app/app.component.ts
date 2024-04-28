import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Parse from 'parse';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  question: number = 1;
  questionAnswer: string = "";

  data: any = [];

  fetchData = async () => {
    try {
      const query = new Parse.Query("Quiz");
      const quiz = await query.find();
      this.data = quiz;
      console.log(this.data);
    } catch (error) {
      console.log(error);
    }
  }

  handleSubmit = () => {
    console.log(this.data[this.question].get("answer"));
    console.log(this.questionAnswer)
    if(this.questionAnswer == this.data[this.question].get("answer")) {
      console.log('fire');
      // let newQuestion = this.question + 1;
      // this.question = newQuestion;
      // console.log(this.question);
      // this.fetchData();
    }
  }

  ngOnInit() {
    console.log("lifecycle");
    this.fetchData();
  }

}

Parse.initialize("Nk6O6jwBL2mStRBnYnrSsqEfz28to8bBC7B7tNjB", "aeTiH8yTBPnJsU06rn96n1en6axhon0TTWGuzjAc");
Parse.serverURL = "https://parseapi.back4app.com/";