import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/_auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'HOMEWEB';
  currentRoute: string;
  isLogged: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
  }

  logout(): void {
    const from = 'home';
    this.authService.logout(from);
  }
}
