import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/_auth/auth.service';
import {PropertiesService} from '../../../../services/_property/properties.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../_alert/alert.service';
import {ResponseStatus} from '../../../../api/response-status';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  role: string;
  mode: string;
  propertyId: string;

  constructor(
    private authService: AuthService,
    private propertiesService: PropertiesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
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
          if (response.success) {
            this.alertService.success(response.message);
          } else {
            this.alertService.warn(response.message);
          }
        }).catch((error) => {
          this.alertService.error(ResponseStatus.displayErrorMessage(error));
          console.error(error);
        });
        this.router.navigate(['/dashboard/properties']);
      }
    });
  }

}
