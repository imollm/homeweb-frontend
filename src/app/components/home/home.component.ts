import {Component, OnInit} from '@angular/core';
import {IProperty} from '../../models/property';
import {PropertiesService} from '../../services/_property/properties.service';
import {AlertService} from '../../services/_alert/alert.service';
import {ImageService} from '../../services/_image/image.service';
import {ResponseStatus} from '../../api/response-status';

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
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.propertiesService.getLastActiveProperties().then((response) => {
      if (response.success) {
        this.properties = response.data;
      } else {
        this.alertService.warn(response.message);
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.log(error);
    });
  }
}
