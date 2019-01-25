import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';

@Component({
  selector: 'app-consumeroverview',
  templateUrl: './consumeroverview.component.html',
  styleUrls: ['./consumeroverview.component.css']
})
export class ConsumeroverviewComponent implements OnInit {

  homes: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAllWindturbines().subscribe(data => {
      this.homes = data
    });
  }

}
