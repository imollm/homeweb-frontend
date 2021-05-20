import {Component, OnInit, ViewChild} from '@angular/core';
import {IAuthUser} from '../models/auth-user';
import {AuthService} from '../services/_auth/auth.service';
import {HeaderComponent} from './components/header/header.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  authUser: IAuthUser = {} as IAuthUser;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getAuthUserInfo();
  }

  private getAuthUserInfo(): void {
    this.authService.getAuthUser().then((response) => {
      if (response.success) {
        this.authUser = response.data;
      }
    });
  }

  deleteResource(): void {

  }
}
