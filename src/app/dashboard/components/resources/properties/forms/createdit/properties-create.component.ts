import {Component, ElementRef, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PropertiesService} from '../../../../../../services/_property/properties.service';
import {AlertService} from '../../../../../../services/_alert/alert.service';
import {CategoriesService} from '../../../../../../services/_category/categories.service';
import {ICity} from '../../../../../../models/city';
import {IEnergeticCertificate} from '../../../../../../models/energetic-certificate';
import {ICategory} from '../../../../../../models/category';
import {UsersService} from '../../../../../../services/_user/users.service';
import {IUser} from '../../../../../../models/user';
import {CitiesService} from '../../../../../../services/_city/cities.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IProperty} from '../../../../../../models/property';
import {ResponseStatus} from '../../../../../../api/response-status';
import {ILocation, IMaps} from '../../../../../../models/maps';
import {IFeature} from '../../../../../../models/feature';
import {FeaturesService} from '../../../../../../services/_feature/features.service';

@Component({
  selector: 'app-properties-create-form',
  templateUrl: './properties-create.component.html',
  styleUrls: ['./properties-create.component.css']
})
export class PropertiesCreateComponent implements OnInit {

  // This component can create or edit a property

  form: FormGroup;
  isSubmitted = false;
  property: IProperty = {
    features: []
  } as IProperty;
  features: IFeature[] = [];
  cities: ICity[] = [];
  categories: ICategory[] = [];
  owners: IUser[] = [];
  isCountrySelected = false;
  certificates: any = IEnergeticCertificate;
  mode: string;
  propertyId: string;
  modeTitle = 'Crear';
  mapData: IMaps = {
    location: {lat: -0.268549, lng: -9.782616} as ILocation,
    markers: [{lat: -0.268549, lng: -9.782616} as ILocation],
    zoom: 1,
    mapType: 'ROADMAP',
    getLocation: true
  } as IMaps;

  constructor(
    private fb: FormBuilder,
    private propertiesService: PropertiesService,
    private citiesService: CitiesService,
    private categoriesService: CategoriesService,
    private featuresService: FeaturesService,
    private usersService: UsersService,
    private alertService: AlertService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: new FormControl({value: null, readonly: true}),
      user_id: new FormControl(''),
      category_id: new FormControl(1, Validators.required),
      city_id: new FormControl(1, Validators.required),
      title: new FormControl('guyfcuyc', Validators.required),
      reference: new FormControl('gufgfg', Validators.required),
      image: new FormControl(''),
      plot_meters: new FormControl(0),
      built_meters: new FormControl(0),
      rooms: new FormControl(0),
      baths: new FormControl(0),
      address: new FormControl(''),
      latitude: new FormControl(this.mapData.location.lat, [Validators.required, Validators.max(90), Validators.min(-90)]),
      longitude: new FormControl(this.mapData.location.lng, [Validators.required, Validators.max(180), Validators.min(-180)]),
      description: new FormControl(''),
      energetic_certification: new FormControl('obtingut'),
      sold: new FormControl(0),
      active: new FormControl(true),
      price: new FormControl(0),
      features: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.getValues();
    this.mode = this.activateRoute.snapshot.url[1].path;
    this.propertyId = this.activateRoute.snapshot.params.id;
    if (this.mode === 'edit') {
      this.editMode();
      this.modeTitle = 'Actualitza';
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.valid) {
      if (this.mode === 'edit') {
        this.propertiesService.updateProperty(this.form.value).then((response) => {
          if (response.success) {
              this.alertService.success(response.message);
          } else {
            this.alertService.warn(response.message);
          }
        }).catch((error) => {
          this.alertService.error(ResponseStatus.displayErrorMessage(error));
          console.error(error);
        });
      } else if (this.mode === 'create') {
        this.propertiesService.createProperty(this.form.value).then((response) => {
          if (response.success) {
            this.alertService.success(response.message);
          } else {
            this.alertService.warn(response.message);
          }
        }).catch((error) => {
          this.alertService.error(ResponseStatus.displayErrorMessage(error));
          console.error(error);
        });
      }
      this.router.navigate(['/dashboard/properties']);
    }
  }

  private getValues(): void {
    this.categoriesService.getAllCategories().then((response) => {
      if (response.success) {
        this.categories = response.data;
      }
    }).then(() => {
      this.citiesService.getAllCities().then((response) => {
        if (response.success) {
          this.cities = response.data;
        }
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
    }).then(() => {
      this.usersService.getOwners().then((response) => {
        if (response.success) {
          this.owners = response.data[0].users;
        }
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
    }).then(() => {
      this.featuresService.getFeatures().then((response) => {
        if (response.success) {
          this.features = response.data;
        } else {
          this.alertService.warn(response.message);
        }
      }).then(() => {
        this.addFeaturesCheckboxes();
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private editMode(): void {
    this.propertiesService.getPropertyById(this.propertyId).then((response) => {
      if (response.success) {
        this.property = response.data;
        this.preparePropertyValuesToEditForm();
      }
    });
  }

  private preparePropertyValuesToEditForm(): void {
    const formValues = {};
    Object.keys(this.form.controls).map((key) => {
      if (key === 'features') {
        formValues[key] = [];
      } else if (key === 'active') {
        formValues[key] = Boolean(this.property[key]);
      } else {
        formValues[key] = this.property[key];
      }
    });
    this.form.setValue(formValues);
  }

  getMarkerLocation(location: ILocation): void {
    this.latitude.setValue(location.lat);
    this.longitude.setValue(location.lng);
  }

  get featuresFormArray(): FormArray {
    return this.form.controls.features as FormArray;
  }

  private addFeaturesCheckboxes(): void {
    let flag = false;
    this.features.forEach((feature) => {
      if (this.mode === 'edit') {
        flag = false;
        this.property.features.forEach((pFeature) => {
          if (feature.id === pFeature.id) {
            this.featuresFormArray.push(new FormControl(true));
            flag = true;
          }
        });
        if (!flag) {
          this.featuresFormArray.push(new FormControl(false));
        }
      } else {
        this.featuresFormArray.push(new FormControl(false));
      }
    });
  }

  get categoryId(): AbstractControl { return this.form.get('category_id'); }

  get cityId(): AbstractControl { return this.form.get('city_id'); }

  get title(): AbstractControl { return this.form.get('title'); }

  get reference(): AbstractControl { return this.form.get('reference'); }

  get latitude(): AbstractControl { return this.form.get('latitude'); }

  get longitude(): AbstractControl { return this.form.get('longitude'); }
}
