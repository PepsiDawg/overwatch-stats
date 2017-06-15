import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-descriptors',
  templateUrl: './match-descriptors.component.html',
  styleUrls: ['./match-descriptors.component.css']
})
export class MatchDescriptorsComponent implements OnInit {

  @Input() match;

  constructor() { }

  ngOnInit() {
  }

}
