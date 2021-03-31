import {Component, OnInit} from '@angular/core';
import {Property} from '../../models/property';
import {PropertiesService} from '../../services/_property/properties.service';
import {AlertService} from '../../_alert/alert.service';
import {ImageService} from '../../services/_image/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  properties: Property[] = [];
  property: Property[];

  constructor(
    private propertiesService: PropertiesService,
    private imageService: ImageService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.getLastProperties().then((res) => {
      if (res.length > 0) {
        res.map((property) => {
          this.properties.push(new Property(property));

        });
      }
    });
  }

  private async getLastProperties(): Promise<any> {
    const res = await this.propertiesService.getLastProperties();
    if (!res.success) {
      this.alertService.error(res.message);
    }
    return res.data;
  }
}
