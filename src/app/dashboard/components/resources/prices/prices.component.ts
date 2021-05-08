import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/_auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../services/_alert/alert.service';
import {PricesService} from '../../../../services/_price/prices.service';
import {ResponseStatus} from '../../../../api/response-status';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {

  role: string;

  constructor(
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private pricesService: PricesService,
    private router: Router,
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
