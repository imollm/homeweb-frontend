import {Component, Input, OnInit} from '@angular/core';
import { faTachometerAlt, faHome, faAngleLeft, faFlag, faGlobeEurope, faCity, faMoneyCheckAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {IAuthUser} from '../../../models/auth-user';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() authUser: IAuthUser = {} as IAuthUser;

  faTachometerAlt = faTachometerAlt;
  faHome = faHome;
  faAngleLeft = faAngleLeft;
  faCountry = faGlobeEurope;
  faCity = faCity;
  faCategory = faFlag;
  faSale = faMoneyCheckAlt;
  faTour = faMapMarkerAlt;


  constructor() { }

  ngOnInit(): void {
  }

}
