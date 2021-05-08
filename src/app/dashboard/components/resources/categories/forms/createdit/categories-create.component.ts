import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../../../../../services/_category/categories.service';
import {AlertService} from '../../../../../../services/_alert/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ICategory} from '../../../../../../models/category';
import {ImageService} from '../../../../../../services/_image/image.service';
import {ResponseStatus} from '../../../../../../api/response-status';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.css']
})
export class CategoriesCreateComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;
  modeTitle = 'Crear';
  mode: string;
  categoryId: string;
  category: ICategory = {} as ICategory;
  imgPreview: string;
  formData: FormData;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private alertService: AlertService,
    private activateRoute: ActivatedRoute,
    private imageService: ImageService,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: new FormControl({value: null, readonly: true}),
      name: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.mode = this.activateRoute.snapshot.url[1].path;
    this.categoryId = this.activateRoute.snapshot.params.id;
    if (this.mode === 'edit') {
      this.editMode();
      this.modeTitle = 'Actualitza';
      this.form.addControl('image', new FormControl(null));
    } else if (this.mode === 'create') {
      this.form.addControl('image', new FormControl(null, Validators.required));
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.sendFormData();
    }
  }

  private sendFormData(): void {
    const categoryFormData = new FormData();
    categoryFormData.append('id', this.form.get('id').value);
    categoryFormData.append('name', this.form.get('name').value);
    if (this.form.get('image').value !== null) {
      categoryFormData.append('image', this.form.get('image').value);
    }

    if (this.mode === 'edit') {
      this.categoriesService.updateCategory(categoryFormData).then((response) => {
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
      this.categoriesService.createCategory(categoryFormData).then((response) => {
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
    this.router.navigate(['/dashboard/categories']);
  }

  private editMode(): void {
    this.categoriesService.getCategoryById(this.categoryId).then((response) => {
      if (response.success) {
        this.category = response.data;
        this.form.setValue({
          id: this.category.id,
          name: this.category.name,
          image: null
        });
      } else {
        this.alertService.warn(response.message);
      }
    }).then(() => {
      this.imageService.sanitizeBase64EncodedImage(this.category.image, 'categories').then((imageDecoded) => {
        this.imgPreview = imageDecoded;
      });
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
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

  get name(): AbstractControl { return this.form.get('name'); }

  get image(): AbstractControl { return this.form.get('image'); }

}
