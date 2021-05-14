import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/_auth/auth.service';
import {PropertiesService} from '../../../../services/_property/properties.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../services/_alert/alert.service';
import {ResponseStatus} from '../../../../api/response-status';
import {ModalResultService} from '../../../../services/_modal/modal.service';
import {ApiResponseI} from '../../../../models/api-response';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  role: string;
  mode: string;
  propertyId: string;
  apiResponse: ApiResponseI;

  constructor(
    private authService: AuthService,
    private propertiesService: PropertiesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private modalResultService: ModalResultService
  ) { }

  ngOnInit(): void {
    this.getAuthUser();
  }

  private getAuthUser(): void {
    this.authService.getAuthUser().then((response) => {
      this.role = response.data[0].role.name;
    }).then(() => {
      if (this.activateRoute.snapshot.url[1] && this.activateRoute.snapshot.url[1].path === 'delete') {
        this.propertyId = this.activateRoute.snapshot.params.id;
        this.propertiesService.deleteProperty(this.propertyId).then((response) => {
          this.apiResponse = response;
        }).then(() => {
          this.router.navigate(['/dashboard/properties']).then(() => {
            this.modalResultService.deleteResultModal(this.apiResponse);
          });
        }).catch((error) => {
          this.alertService.error(ResponseStatus.displayErrorMessage(error));
          console.error(error);
        });
      }
    });
  }

}
