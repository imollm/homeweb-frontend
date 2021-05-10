import {Component, Input, OnInit} from '@angular/core';
import {IProperty} from '../../../models/property';
import {ImageService} from '../../../services/_image/image.service';
import {HelpersService} from '../../../services/_helpers/helpers.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() property: IProperty;

  detailsPropertyLink: string;

  constructor(
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.getRequiredFrom();
    this.getImage();
  }

  private getRequiredFrom(): void {
    if (window.location.href.includes('dashboard')) {
      this.detailsPropertyLink = '/dashboard/properties/details';
    } else {
      this.detailsPropertyLink = '/property';
    }
  }

  private getImage(): void {
    if (this.property.image &&
      ( this.property.image.endsWith('.jpg') ||
        this.property.image.endsWith('.png') ||
        this.property.image.endsWith('.jpeg'))
    ) {
      this.imageService.sanitizeBase64EncodedImage(this.property.image, 'properties').then((base64ImageDecoded) => {
        this.property.imageBase64 = base64ImageDecoded;
      });
    }
  }

  formatPrice(price: number): string {
    return HelpersService.formatPrice(price);
  }
}
