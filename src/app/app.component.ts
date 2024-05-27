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
  question: number = 0;
  questionAnswer: string = "";
  questionNo: number = 1;

  data: any = [];

  fetchData = async () => {
    try {
      const query = new Parse.Query("Quiz");
      const quiz = await query.find();
      this.data = quiz;
    } catch (error) {
      console.log(error);
    }
  }

  handleSubmit = () => {
    if(this.questionAnswer === this.data[this.question].get("answer")) {
      this.question = this.question + 1;
      this.questionNo = this.questionNo + 1;
      alert("correct");
      this.fetchData();
    } else {
      alert("Wrong answer!!! Try again");
    }
  }

  ngOnInit() {
    this.fetchData();
  }

}

Parse.initialize("Nk6O6jwBL2mStRBnYnrSsqEfz28to8bBC7B7tNjB", "aeTiH8yTBPnJsU06rn96n1en6axhon0TTWGuzjAc");
Parse.serverURL = "https://parseapi.back4app.com/";