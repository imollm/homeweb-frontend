import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/_auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToursService} from '../../../../services/_tour/tours.service';
import {AlertService} from '../../../../services/_alert/alert.service';
import {ResponseStatus} from '../../../../api/response-status';
import {ModalResultService} from '../../../../services/_modal/modal.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {

  role: string;
  mode: string;

  constructor(
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private toursService: ToursService,
    private alertService: AlertService,
    private router: Router,
    private modalResultService: ModalResultService
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
        this.deleteTour();
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private deleteTour(): void {
    const tourId = this.activateRoute.snapshot.params.id;
    this.toursService.deleteTour(tourId).then((response) => {
      this.router.navigate(['/dashboard/tours']).then(() => {
        this.modalResultService.deleteResultModal(response);
      });
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

}
