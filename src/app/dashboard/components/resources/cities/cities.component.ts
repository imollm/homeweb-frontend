import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/_auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../services/_alert/alert.service';
import {ResponseStatus} from '../../../../api/response-status';
import {CitiesService} from '../../../../services/_city/cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  role: string;
  mode: string;

  constructor(
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private citiesService: CitiesService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.mode = this.activateRoute.snapshot.url[1] && this.activateRoute.snapshot.url[1].path === 'delete' ? 'delete' : '';
    this.getAuthUser();
  }

  private getAuthUser(): void {
    this.authService.getAuthUser().then((response) => {
      if (response.success) {
        this.role = response.data[0].role.name;
      }
    }).then(() => {
      if (this.mode === 'delete') {
        this.deleteCity();
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private deleteCity(): void {
    const cityId = this.activateRoute.snapshot.params.id;
    this.citiesService.deleteCity(cityId).then((response) => {
      if (response.success) {
        this.alertService.success(response.message);
      } else {
        this.alertService.warn(response.message);
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
    this.router.navigate(['/dashboard/cities']);
  }

}
