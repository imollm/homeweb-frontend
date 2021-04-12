import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { faTachometerAlt, faHome, faAngleLeft, faFlag, faGlobeEurope, faCity, faMoneyCheckAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {IAuthUser} from '../../../models/auth-user';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnChanges {

  @Input() authUser: IAuthUser = {} as IAuthUser;
  user: IAuthUser = {} as IAuthUser;

  faTachometerAlt   = faTachometerAlt;
  faHome            = faHome;
  faAngleLeft       = faAngleLeft;
  faCountry         = faGlobeEurope;
  faCity            = faCity;
  faCategory        = faFlag;
  faSale            = faMoneyCheckAlt;
  faTour            = faMapMarkerAlt;

  properties  = false;
  categories  = false;
  sales       = false;
  tours       = false;
  countries   = false;
  cities      = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.user = changes.authUser.currentValue[0];
    this.setSidebarMenu();
  }

  private setSidebarMenu(): void {
    if (this.user !== undefined) {
      switch (this.user.role.name) {
        case 'admin':
          this.isAdmin();
          break;
        case 'employee':
          this.isEmployee();
          break;
        case 'customer':
          this.isCustomer();
          break;
        case 'owner':
          this.isOwner();
          break;
        default:
          break;
      }
    }
  }

  private isAdmin(): void {
    this.properties = true;
    this.categories = true;
    this.sales = true;
    this.tours = true;
    this.countries = true;
    this.cities = true;
  }

  private isEmployee(): void {
    this.properties = true;
    this.categories = true;
    this.sales = true;
    this.tours = true;
    this.countries = false;
    this.cities = false;
  }

  private isCustomer(): void {
    this.properties = true;
    this.categories = false;
    this.sales = false;
    this.tours = true;
    this.countries = false;
    this.cities = false;
  }

  private isOwner(): void {
    this.properties = true;
    this.categories = false;
    this.sales = true;
    this.tours = false;
    this.countries = false;
    this.cities = false;
  }
}
