import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-ow-icon',
  templateUrl: './ow-icon.component.html',
  styleUrls: ['./ow-icon.component.css']
})
export class OwIconComponent implements OnInit {
  @Input() user: any;

  constructor() { }

  ngOnInit() {

  }

}
