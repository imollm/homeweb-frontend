import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ILocation, IMaps} from '../../../../../../models/maps';
import {CountriesService} from '../../../../../../services/_country/countries.service';
import {AlertService} from '../../../../../../services/_alert/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CitiesService} from '../../../../../../services/_city/cities.service';
import {ICountry} from '../../../../../../models/country';
import {ResponseStatus} from '../../../../../../api/response-status';
import {ModalResultService} from '../../../../../../services/_modal/modal.service';

@Component({
  selector: 'app-cities-create',
  templateUrl: './cities-create.component.html',
  styleUrls: ['./cities-create.component.css']
})
export class CitiesCreateComponent implements OnInit {

  modeTitle = 'Crear';
  form: FormGroup;
  isSubmitted = false;
  mode: string;
  cityId: string;
  countries: ICountry[] = [];

  mapData: IMaps = {
    location: {lat: -0.268549, lng: -9.782616} as ILocation,
    markers: [{lat: -0.268549, lng: -9.782616} as ILocation],
    zoom: 1,
    mapType: 'ROADMAP',
    getLocation: true
  } as IMaps;

  constructor(
    private fb: FormBuilder,
    private citiesService: CitiesService,
    private countriesService: CountriesService,
    private alertService: AlertService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private modalResultService: ModalResultService
  ) {
    this.form = this.fb.group({
      id: new FormControl({value: null, readonly: true}),
      name: new FormControl('', Validators.required),
      country_id: new FormControl('', Validators.required),
      latitude: new FormControl(this.mapData.location.lat, [Validators.required, Validators.max(90), Validators.min(-90)]),
      longitude: new FormControl(this.mapData.location.lng, [Validators.required, Validators.max(180), Validators.min(-180)]),
    });
  }

  ngOnInit(): void {
    this.mode = this.activateRoute.snapshot.url[1].path;
    if (this.mode === 'edit') {
      this.cityId = this.activateRoute.snapshot.params.id;
      this.modeTitle = 'Actualitza';
      this.editMode();
    }
    this.getCountries();
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.mode === 'edit') {
        this.citiesService.updateCity(this.form.value).then((response) => {
          this.router.navigate(['dashboard/cities']).then(() => {
            this.modalResultService.editResultModal(response);
          });
        }).catch((error) => {
          this.alertService.error(ResponseStatus.displayErrorMessage(error));
          console.error(error);
        });
      } else if (this.mode === 'create') {
        this.citiesService.createCity(this.form.value).then((response) => {
          this.router.navigate(['dashboard/cities']).then(() => {
            this.modalResultService.createResultModal(response);
          });
        }).catch((error) => {
          this.alertService.error(ResponseStatus.displayErrorMessage(error));
          console.error(error);
        });
      }
    }
  }

  private getCountries(): void {
    this.countriesService.getCountries().then((response) => {
      if (response.success) {
        this.countries = response.data;
      } else {
        this.alertService.warn(response.message);
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private editMode(): void {
    this.citiesService.getCityById(this.cityId).then((response) => {
      if (response.success) {
        this.form.setValue({
          id: response.data.id,
          name: response.data.name,
          country_id: response.data.country_id,
          latitude: response.data.latitude,
          longitude: response.data.longitude
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

  get countryId(): AbstractControl { return this.form.get('country_id'); }

  get latitude(): AbstractControl { return this.form.get('latitude'); }

  get longitude(): AbstractControl { return this.form.get('longitude'); }

}
