import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { faUserAlt, faEnvelope, faAt, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import {IContact} from '../../models/contact';
import {ContactService} from '../../services/_contact/contact.service';
import {AlertService} from '../../_alert/alert.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  title = 'Contacte';
  contactForm: FormGroup;
  // @ts-ignore
  contact: IContact = {};

  faUserName = faUserAlt;
  faEmail = faAt;
  faSubject = faPenSquare;
  faMessage = faEnvelope;

  constructor(private fb: FormBuilder, private contactService: ContactService, private alertService: AlertService) {
    this.contactForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.setValues();
      this.contactService.sendEmail(this.contact).subscribe((res) => {
        console.log(res);
        if (res.success) {
          this.alertService.success(res.message);
        } else{
          this.alertService.error(res.message);
        }
      });
      this.clearForm();
    }
    console.log(this.contactForm.get('name').valid);
  }

  private setValues(): void {
    Object.keys(this.contactForm.controls).forEach((key) => {
      this.contact[key] = this.contactForm.get(key).value;
    });
  }

  private clearForm(): void {
    this.contactForm.reset();
  }

  get name(): AbstractControl { return this.contactForm.get('name'); }

  get email(): AbstractControl { return this.contactForm.get('email'); }

  get subject(): AbstractControl { return this.contactForm.get('subject'); }

  get message(): AbstractControl { return this.contactForm.get('message'); }

}
