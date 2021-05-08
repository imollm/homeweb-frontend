import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/_auth/auth.service';
import {ResponseStatus} from '../../../../api/response-status';
import {AlertService} from '../../../../services/_alert/alert.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {FeaturesService} from '../../../../services/_feature/features.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  role: string;
  mode: string;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private activateRoute: ActivatedRoute,
    private featuresService: FeaturesService,
    private router: Router
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
        this.deleteFeature();
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private deleteFeature(): void {
    const featureId = this.activateRoute.snapshot.params.id;
    this.featuresService.deleteFeature(featureId).then((response) => {
      if (response.success) {
        this.alertService.success(response.message);
      } else {
        this.alertService.warn(response.message);
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
    this.router.navigate(['/dashboard/features']);
  }
}
