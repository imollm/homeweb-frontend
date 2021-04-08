import { Component, OnInit } from '@angular/core';
import { faTachometerAlt, faHome, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  faTachometerAlt = faTachometerAlt;
  faHome = faHome;
  faAngleLeft = faAngleLeft;

  constructor() { }

  ngOnInit(): void {
  }

}
