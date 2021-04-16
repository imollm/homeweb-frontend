import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PropertiesService} from '../../../../../../services/_property/properties.service';
import {AlertService} from '../../../../../../_alert/alert.service';
import {CategoriesService} from '../../../../../../services/_category/categories.service';
import {ICity} from '../../../../../../models/city';
import {IEnergeticCertificate} from '../../../../../../models/energetic-certificate';
import {ICategory} from '../../../../../../models/category';
import {UsersService} from '../../../../../../services/_user/users.service';
import {IUser} from '../../../../../../models/user';
import {CitiesService} from '../../../../../../services/_city/cities.service';
import {ActivatedRoute} from '@angular/router';
import {IProperty} from '../../../../../../models/property';

@Component({
  selector: 'app-properties-create-form',
  templateUrl: './properties-create.component.html',
  styleUrls: ['./properties-create.component.css']
})
export class PropertiesCreateComponent implements OnInit {

  // This component can create or edit a property

  form: FormGroup;
  isSubmitted = false;
  property: IProperty = {} as IProperty;
  cities: ICity[] = [];
  categories: ICategory[] = [];
  owners: IUser[] = [];
  isCountrySelected = false;
  certificates: any = IEnergeticCertificate;
  mode: string;
  propertyId: string;
  modeTitle = 'Crear';

  constructor(
    private fb: FormBuilder,
    private propertiesService: PropertiesService,
    private citiesService: CitiesService,
    private categoriesService: CategoriesService,
    private usersService: UsersService,
    private alertService: AlertService,
    private activateRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: new FormControl({value: null, readonly: true}),
      user_id: new FormControl(''),
      category_id: new FormControl('', Validators.required),
      city_id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      reference: new FormControl('', Validators.required),
      image: new FormControl(''),
      plot_meters: new FormControl(0),
      built_meters: new FormControl(0),
      rooms: new FormControl(0),
      baths: new FormControl(0),
      address: new FormControl(''),
      longitude: new FormControl(0),
      latitude: new FormControl(0),
      description: new FormControl(''),
      energetic_certification: new FormControl('obtingut'),
      sold: new FormControl(0),
      active: new FormControl(true),
      price: new FormControl(0),
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
          if (error.status === 500) { this.alertService.error(error.statusText); }
          console.error(error);
        });
      } else if (this.mode === 'create') {
        this.propertiesService.createProperty(this.form.value).then((response) => {
          if (response.success) {
            this.alertService.success(response.message);
            this.resetForm();
          } else {
            this.alertService.warn(response.message);
          }
        }).catch((error) => {
          if (error.status === 500) { this.alertService.error(error.statusText); }
          this.alertService.error(error.error.errors.reference[0]);
        });
      }
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
      });
    }).then(() => {
      this.usersService.getOwners().then((response) => {
        if (response.success) {
          this.owners = response.data[0].users;
        }
      });
    });
  }

  private resetForm(): void {
    this.form.reset();
    this.isSubmitted = false;
    this.form.get('plot_meters').setValue(0);
    this.form.get('built_meters').setValue(0);
    this.form.get('rooms').setValue(0);
    this.form.get('baths').setValue(0);
    this.form.get('longitude').setValue(0);
    this.form.get('latitude').setValue(0);
    this.form.get('sold').setValue(0);
    this.form.get('active').setValue(true);
    this.form.get('price').setValue(0);
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
      formValues[key] =
        key === 'active'
          ? Boolean(this.property[key])
          : this.property[key];
    });
    this.form.setValue(formValues);
  }

  get categoryId(): AbstractControl { return this.form.get('category_id'); }

  get cityId(): AbstractControl { return this.form.get('city_id'); }

  get title(): AbstractControl { return this.form.get('title'); }

  get reference(): AbstractControl { return this.form.get('reference'); }
}
