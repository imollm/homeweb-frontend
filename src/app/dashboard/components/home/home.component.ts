import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/_auth/auth.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  role: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getAuthUser();
  }

  private getAuthUser(): void {
    this.authService.getAuthUser().then((response) => {
      this.role = response.data[0].role.name;
    });
  }
}
