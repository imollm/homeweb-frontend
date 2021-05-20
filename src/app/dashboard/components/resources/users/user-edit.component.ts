import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../../../services/_user/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../services/_auth/auth.service';
import {IUser} from '../../../../models/user';
import {HelpersService} from '../../../../services/_helpers/helpers.service';
import {ModalResultService} from '../../../../services/_modal/modal.service';
import {MessageService} from '../../../../services/message.service';

@Component({
  selector: 'app-dashboard-',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  form: FormGroup;
  title = 'Edita les teves dades';
  @ViewChild('role') roleInput: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UsersService,
    private authService: AuthService,
    private router: Router,
    private modalResultService: ModalResultService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      email: new FormControl(''),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      fiscal_id: new FormControl('', Validators.required),
      role_id: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getAuthUser();
  }

  private getAuthUser(): void {
    this.authService.getAuthUser().then((response) => {
      if (response.success) {
        this.setFormData(response.data[0]);
      } else {
        this.router.navigate(['dashboard/home']).then(() => {
          this.modalResultService.errorResultModal(response);
        });
      }
    });
  }

  private setFormData(user: IUser): void {
    this.form.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      address: user.address,
      fiscal_id: user.fiscal_id,
      role_id: user.role_id
    });
    this.roleInput.nativeElement.value = HelpersService.capitalize(user.role.name);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService.updateUser(this.form.value).then((response) => {
        this.router.navigate(['dashboard']).then(() => {
          this.messageService.changeMessage(this.name.value);
          this.modalResultService.editResultModal(response);
        });
      });
    }
  }

  get name(): AbstractControl { return this.form.get('name'); }

  get phone(): AbstractControl { return this.form.get('phone'); }

  get address(): AbstractControl { return this.form.get('address'); }

  get fiscalId(): AbstractControl { return this.form.get('fiscal_id'); }
}
