import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-batterie',
  templateUrl: './batterie.component.html',
  styleUrls: ['./batterie.component.css']
})
export class BatterieComponent implements OnInit {

  id: Object;

  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }
  
}
