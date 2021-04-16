import {Component, OnInit} from '@angular/core';
import {IProperty} from '../../models/property';
import {PropertiesService} from '../../services/_property/properties.service';
import {AlertService} from '../../_alert/alert.service';
import {ImageService} from '../../services/_image/image.service';
import {HelpersService} from '../../services/_helpers/helpers.service';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  properties: IProperty[] = [] as IProperty[];

  constructor(
    private propertiesService: PropertiesService,
    private imageService: ImageService,
    private alertService: AlertService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.getLastProperties().then(() => {
      if (this.properties.length > 0) {
        this.properties.map((property) => {
          property.price = HelpersService.formatPrice(property.price);
          if (property.image) {
            this.imageService.sanitizeBase64EncodedImage(property.image, 'properties').then((base64ImageDecoded) => {
              property.imageBase64 = base64ImageDecoded;
            });
          }
        });
      }
    });
  }

  private async getLastProperties(): Promise<any> {
    const res = await this.propertiesService.getLastProperties();
    if (!res.success) {
      this.alertService.error(res.message);
    }
    this.properties = res.data;
  }
}
