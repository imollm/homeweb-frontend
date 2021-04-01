import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../services/message.service';
import {Property} from '../../models/property';
import {HelpersService} from '../../services/_helpers/helpers.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  property: Property;

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe((msg) => {
      this.property = msg;
      this.property.energetic_certificate = HelpersService.EnergeticCertificate(this.property.energetic_certificate);
      console.log(this.property);
    });
  }

}
