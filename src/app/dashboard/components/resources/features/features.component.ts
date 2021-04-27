import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/_auth/auth.service';
import {ResponseStatus} from '../../../../api/response-status';
import {AlertService} from '../../../../_alert/alert.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  role: string;

  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getAuthUser();
  }

  private getAuthUser(): void {
    this.authService.getAuthUser().then((response) => {
      if (response.success) {
        this.role = response.data[0].role.name;
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }
}
