import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-windturbine',
  templateUrl: './windturbine.component.html',
  styleUrls: ['./windturbine.component.css']
})
export class WindturbineComponent implements OnInit {

  id: number;

  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

}
