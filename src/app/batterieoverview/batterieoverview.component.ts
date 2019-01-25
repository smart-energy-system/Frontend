import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';

@Component({
  selector: 'app-batterieoverview',
  templateUrl: './batterieoverview.component.html',
  styleUrls: ['./batterieoverview.component.css']
})
export class BatterieoverviewComponent implements OnInit {

  batteries: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAllWindturbines().subscribe(data => {
      this.batteries = data
    });
  }

}
