import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})
export class ConsumerComponent implements OnInit {

  homes: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAllHomes().subscribe(data => {
      this.homes = data
      console.log(this.homes)
    });
  }

}
