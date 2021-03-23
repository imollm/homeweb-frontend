import { Component, OnInit } from '@angular/core';
import { faTachometerAlt, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  faTachometerAlt = faTachometerAlt;
  faHome = faHome;

  constructor() { }

  ngOnInit(): void {
  }

}
