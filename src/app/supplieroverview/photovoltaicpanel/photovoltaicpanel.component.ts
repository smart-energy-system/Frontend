import { Component, OnInit } from '@angular/core';
import { DataService} from '../../data.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-photovoltaicpanel',
  templateUrl: './photovoltaicpanel.component.html',
  styleUrls: ['./photovoltaicpanel.component.css']
})
export class PhotovoltaicpanelComponent implements OnInit {

  id: number;

  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }
}
