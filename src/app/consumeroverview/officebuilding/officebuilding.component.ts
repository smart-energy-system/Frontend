import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-officebuilding',
  templateUrl: './officebuilding.component.html',
  styleUrls: ['./officebuilding.component.css']
})
export class OfficebuildingComponent implements OnInit {

  id: number;

  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

}
