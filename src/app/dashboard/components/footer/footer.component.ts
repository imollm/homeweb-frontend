import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  webstie = 'HOMEWEB';

  constructor() { }

  ngOnInit(): void {
  }

  actualYear(): string {
    const date = new Date();
    return date.getFullYear().toString();
  }

}
