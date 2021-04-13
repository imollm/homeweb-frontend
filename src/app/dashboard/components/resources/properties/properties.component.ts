import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/_auth/auth.service";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

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
