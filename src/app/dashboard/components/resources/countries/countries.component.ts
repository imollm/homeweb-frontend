import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/_auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../services/_alert/alert.service';
import {ResponseStatus} from '../../../../api/response-status';
import {CountriesService} from '../../../../services/_country/countries.service';
import {ModalResultService} from '../../../../services/_modal/modal.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  role: string;
  mode: string;

  constructor(
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router,
    private alertService: AlertService,
    private modalResultService: ModalResultService
  ) { }

  ngOnInit(): void {
    this.getAuthUser();
    this.mode = this.activateRoute.snapshot.url[1] && this.activateRoute.snapshot.url[1].path === 'delete' ? 'delete' : '';
  }

  private getAuthUser(): void {
    this.authService.getAuthUser().then((response) => {
      if (response.success) {
        this.role = response.data[0].role.name;
      }
    }).then(() => {
      if (this.mode === 'delete') {
        this.deleteCountry();
      }
    });
  }

  private deleteCountry(): void {
    const countryId = this.activateRoute.snapshot.params.id;
    this.countriesService.deleteCountry(countryId).then((response) => {
      this.router.navigate(['/dashboard/countries']).then(() => {
        this.modalResultService.deleteResultModal(response);
      });
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

}
