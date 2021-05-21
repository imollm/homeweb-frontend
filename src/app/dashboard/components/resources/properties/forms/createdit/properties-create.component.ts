import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {IAuthUser} from '../../../../../../models/auth-user';
import {AuthService} from '../../../../../../services/_auth/auth.service';
import {ModalResultService} from '../../../../../../services/_modal/modal.service';
import {ImageService} from '../../../../../../services/_image/image.service';

@Component({
  selector: 'app-properties-create-form',
  templateUrl: './properties-create.component.html',
  styleUrls: ['./properties-create.component.css']
})
export class PropertiesCreateComponent implements OnInit {

  // This component can create or edit a property

  @ViewChild('ownerSelect') ownerSelect: ElementRef;

  form: FormGroup;
  isSubmitted = false;
  authUser: IAuthUser = {} as IAuthUser;
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
  imgPreview: string;
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
    private imageService: ImageService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private modalResultService: ModalResultService
  ) {
    this.form = this.fb.group({
      id: new FormControl(''),
      user_id: new FormControl(''),
      category_id: new FormControl(1, Validators.required),
      city_id: new FormControl(1, Validators.required),
      title: new FormControl('guyfcuyc', Validators.required),
      reference: new FormControl('gufgfg', Validators.required),
      plot_meters: new FormControl(0),
      built_meters: new FormControl(0),
      rooms: new FormControl(0),
      baths: new FormControl(0),
      address: new FormControl('', Validators.required),
      latitude: new FormControl(this.mapData.location.lat, [Validators.required, Validators.max(90), Validators.min(-90)]),
      longitude: new FormControl(this.mapData.location.lng, [Validators.required, Validators.max(180), Validators.min(-180)]),
      description: new FormControl(''),
      energetic_certification: new FormControl('obtingut'),
      sold: new FormControl(false),
      active: new FormControl(true),
      price: new FormControl(0),
      features: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.getAuthUser();
    this.getValues();
    this.mode = this.activateRoute.snapshot.url[1].path;
    this.propertyId = this.activateRoute.snapshot.params.id;
    if (this.mode === 'edit') {
      this.editMode();
      this.modeTitle = 'Actualitza';
      this.form.addControl('image', new FormControl(null));
    } else if (this.mode === 'create') {
      this.form.addControl('image', new FormControl(null, Validators.required));
    }
  }

  private getAuthUser(): void {
    this.authService.getAuthUser().then((response) => {
      if (response.success) {
        this.authUser = response.data[0];
      } else {
        this.alertService.warn(response.message);
      }
    }).then(() => {
      if (this.authUser.role.name === 'owner') {
        this.ownerSelect.nativeElement.style.display = 'none';
        this.owner.setValue(this.authUser.id);
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.sendFormData();
    }
  }

  private prepareDataToBeSendIt(propertyFormData: FormData): void {
    console.log(this.form.value);
    Object.keys(this.form.controls).forEach((key) => {
      if (key === 'active') {
        const value = this.form.get(key).value ? '1' : '0';
        propertyFormData.append(key, value);
      } else {
        propertyFormData.append(key, this.form.get(key).value);
      }
    });
  }

  private sendFormData(): void {
    const propertyFormData = new FormData();
    this.prepareDataToBeSendIt(propertyFormData);

    if (this.mode === 'edit') {
      this.propertiesService.updateProperty(propertyFormData).then((response) => {
        this.router.navigate(['/dashboard/properties']).then(() => {
          this.modalResultService.editResultModal(response);
        });
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
    } else if (this.mode === 'create') {
      this.propertiesService.createProperty(propertyFormData).then((response) => {
        this.router.navigate(['/dashboard/properties']).then(() => {
          this.modalResultService.createResultModal(response);
        });
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
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
      } else {
        this.alertService.warn(response.message);
      }
    }).then(() => {
      this.mapData.zoom = 6;
      this.preparePropertyValuesToEditForm();
    }).then(() => {
      this.imageService.sanitizeBase64EncodedImage(this.property.image, 'properties').then((imageDecoded) => {
        this.imgPreview = imageDecoded;
      });
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private preparePropertyValuesToEditForm(): void {
    const formValues = {};
    Object.keys(this.form.controls).map((key) => {
      if (key === 'features') {
        formValues[key] = [];
      } else if (key === 'active') {
        formValues[key] = Boolean(this.property.active);
      } else if (key === 'image') {
        formValues[key] = null;
      } else if (key === 'longitude') {
        this.mapData.location.lng = Number(this.property.longitude);
        this.mapData.markers[0].lng = Number(this.property.longitude);
        formValues[key] = this.property.longitude;
      } else if (key === 'latitude') {
        this.mapData.location.lat = Number(this.property.latitude);
        this.mapData.markers[0].lat = Number(this.property.latitude);
        formValues[key] = this.property.latitude;
      } else {
        formValues[key] = this.property[key];
      }
    });
    this.form.patchValue(formValues);
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

  previewImage(evt: any): void {
    if (evt.target.files && evt.target.files[0]) {
      const file = evt.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.form.get('image').setValue(file);
    }
  }

  get owner(): AbstractControl { return this.form.get('user_id'); }

  get categoryId(): AbstractControl { return this.form.get('category_id'); }

  get cityId(): AbstractControl { return this.form.get('city_id'); }

  get title(): AbstractControl { return this.form.get('title'); }

  get reference(): AbstractControl { return this.form.get('reference'); }

  get latitude(): AbstractControl { return this.form.get('latitude'); }

  get longitude(): AbstractControl { return this.form.get('longitude'); }

  get image(): AbstractControl { return this.form.get('image'); }

  get address(): AbstractControl { return this.form.get('address'); }
}
