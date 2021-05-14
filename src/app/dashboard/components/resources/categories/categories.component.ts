import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/_auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../../../services/_category/categories.service';
import {AlertService} from '../../../../services/_alert/alert.service';
import {ResponseStatus} from '../../../../api/response-status';
import {ModalResultService} from '../../../../services/_modal/modal.service';

@Component({
  selector: 'app-dashboard-categories-employee',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  role: string;
  mode: string;

  constructor(
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
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
        this.deleteCategory();
      }
    });
  }

  private deleteCategory(): void {
    const categoryId = this.activateRoute.snapshot.params.id;
    this.categoriesService.deleteCategory(categoryId).then((response) => {
      this.router.navigate(['/dashboard/categories']).then(() => {
        this.modalResultService.deleteResultModal(response);
      });
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }
}
