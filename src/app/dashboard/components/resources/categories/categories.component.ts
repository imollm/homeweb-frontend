import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/_auth/auth.service';

@Component({
  selector: 'app-dashboard-categories-employee',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  role: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAuthUser();
  }

  private getAuthUser(): void {
    this.authService.getAuthUser().then((response) => {
      if (response.success) {
        this.role = response.data[0].role.name;
      }
    });
  }
}
