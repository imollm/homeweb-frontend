import {Component, OnInit } from '@angular/core';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/_auth/auth.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string;

  faBars = faBars;
  faUser = faUser;

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.getAuthUser();
    this.setNameOfUserWhenIsEdited();
  }

  getAuthUser(): void {
    this.authService.getAuthUser().then((response) => {
      if (response.success) {
        this.userName = response.data[0].name;
      }
    });
  }

  logout(): void {
    const from = 'dashboard';
    this.authService.logout(from);
  }

  private setNameOfUserWhenIsEdited(): void {
    this.messageService.currentMessage.subscribe((name) => {
      if (typeof name === 'string') {
        this.userName = name;
      }
    });
  }
}
