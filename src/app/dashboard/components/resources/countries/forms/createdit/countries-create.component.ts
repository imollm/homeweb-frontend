import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ICountry} from '../../../../../../models/country';
import {AlertService} from '../../../../../../services/_alert/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ILocation, IMaps} from '../../../../../../models/maps';
import {ResponseStatus} from '../../../../../../api/response-status';
import {CountriesService} from '../../../../../../services/_country/countries.service';
import {ModalResultService} from '../../../../../../services/_modal/modal.service';

@Component({
  selector: 'app-countries-create',
  templateUrl: './countries-create.component.html',
  styleUrls: ['./countries-create.component.css']
})
export class CountriesCreateComponent implements OnInit {

  modeTitle = 'Crear';
  form: FormGroup;
  isSubmitted = false;
  mode: string;
  countryId: string;
  country: ICountry = {} as ICountry;

  mapData: IMaps = {
    location: {lat: -0.268549, lng: -9.782616} as ILocation,
    markers: [{lat: -0.268549, lng: -9.782616} as ILocation],
    zoom: 1,
    mapType: 'ROADMAP',
    getLocation: true
  } as IMaps;

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
    private alertService: AlertService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private modalResultService: ModalResultService
  ) {
    this.form = this.fb.group({
      id: new FormControl({value: null, readonly: true}),
      name: new FormControl('', Validators.required),
      code: new FormControl('', [Validators.required, Validators.pattern('[A-Z]{3}')]),
      latitude: new FormControl(this.mapData.location.lat, [Validators.required, Validators.max(90), Validators.min(-90)]),
      longitude: new FormControl(this.mapData.location.lng, [Validators.required, Validators.max(180), Validators.min(-180)]),
    });
  }

  ngOnInit(): void {
    this.mode = this.activateRoute.snapshot.url[1].path;
    if (this.mode === 'edit') {
      this.countryId = this.activateRoute.snapshot.params.id;
      this.modeTitle = 'Actualitza';
      this.editMode();
    }
  }

  onSubmit(): void {
    console.log(this.form.value);
    if (this.form.valid) {
      if (this.mode === 'edit') {
        this.countriesService.updateCountry(this.form.value).then((response) => {
          this.router.navigate(['dashboard/countries']).then(() => {
            this.modalResultService.editResultModal(response);
          });
        }).catch((error) => {
          this.alertService.error(ResponseStatus.displayErrorMessage(error));
          console.error(error);
        });
      } else if (this.mode === 'create') {
        this.countriesService.createCountry(this.form.value).then((response) => {
          this.router.navigate(['dashboard/countries']).then(() => {
            this.modalResultService.createResultModal(response);
          });
        }).catch((error) => {
          this.alertService.error(ResponseStatus.displayErrorMessage(error));
          console.error(error);
        });
      }
    }
  }

  private editMode(): void {
    this.countriesService.getCountryById(this.countryId).then((response) => {
      if (response.success) {
        this.country = response.data;
        this.form.setValue({
          id: this.country.id,
          name: this.country.name,
          code: this.country.code,
          latitude: this.country.latitude,
          longitude: this.country.longitude
        });
      } else {
        this.alertService.warn(response.message);
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  getMarkerLocation(location: ILocation): void {
    this.form.get('latitude').setValue(location.lat);
    this.form.get('longitude').setValue(location.lng);
  }

  get name(): AbstractControl { return this.form.get('name'); }

  get code(): AbstractControl { return this.form.get('code'); }

  get latitude(): AbstractControl { return this.form.get('latitude'); }

  get longitude(): AbstractControl { return this.form.get('longitude'); }

}
