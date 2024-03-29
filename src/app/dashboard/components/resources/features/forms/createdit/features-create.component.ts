import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FeaturesService} from '../../../../../../services/_feature/features.service';
import {AlertService} from '../../../../../../services/_alert/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ResponseStatus} from '../../../../../../api/response-status';
import {ModalResultService} from '../../../../../../services/_modal/modal.service';

@Component({
  selector: 'app-features-create',
  templateUrl: './features-create.component.html',
  styleUrls: ['./features-create.component.css']
})
export class FeaturesCreateComponent implements OnInit {

  modeTitle = 'Crear';
  form: FormGroup;
  mode: string;
  featureId: string;

  constructor(
    private fb: FormBuilder,
    private featureService: FeaturesService,
    private alertService: AlertService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private modalResultService: ModalResultService
  ) {
    this.form = this.fb.group({
      id: new FormControl({value: null, readonly: true}),
      name: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.mode = this.activateRoute.snapshot.url[1].path;
    if (this.mode === 'edit') {
      this.featureId = this.activateRoute.snapshot.params.id;
      this.editMode();
      this.modeTitle = 'Actualitza';
    }
  }

  onSubmit(): void {
    if (this.mode === 'create') {
      this.featureService.createFeature(this.form.value).then((response) => {
        this.router.navigate(['dashboard/features']).then(() => {
          this.modalResultService.createResultModal(response);
        });
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
    } else if (this.mode === 'edit') {
      this.featureService.updateFeature(this.form.value).then((response) => {
        this.router.navigate(['dashboard/features']).then(() => {
          this.modalResultService.editResultModal(response);
        });
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
    }
  }

  private editMode(): void {
    this.featureService.getFeatureById(this.featureId).then((response) => {
      if (response.success) {
        this.form.patchValue(response.data[0]);
      } else {
        this.alertService.warn(response.message);
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }
}
