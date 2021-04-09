import { Component, OnInit } from '@angular/core';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../../services/_auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faBars = faBars;
  faUser = faUser;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    const from = 'dashboard';
    this.authService.logout(from);
  }
}
