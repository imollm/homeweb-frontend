import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'HOMEWEB';

  public constructor(private router: Router) {}

  ngOnInit(): void {}

  isDashBoard(): boolean {
    return this.router.url.indexOf('dashboard') === -1;
  }
}
