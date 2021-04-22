import {Component, OnInit} from '@angular/core';
import {IProperty} from '../../../../../models/property';
import {ActivatedRoute} from '@angular/router';
import {ImageService} from '../../../../../services/_image/image.service';
import {PropertiesService} from '../../../../../services/_property/properties.service';
import {ILocation, IMaps} from '../../../../../models/maps';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {AlertService} from '../../../../../_alert/alert.service';
import {ResponseStatus} from '../../../../../api/response-status';

@Component({
  selector: 'app-dashboard-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  propertyId: string;
  property: IProperty = {} as IProperty;

  mapData: IMaps = {
    location: {} as ILocation,
    markers: [],
    zoom: 6,
    mapType: 'ROADMAP',
    getLocation: false
  } as IMaps;

  dataTable: IDashboardTable = {} as IDashboardTable;
  visibleOnWeb: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private propertiesService: PropertiesService,
    private imageService: ImageService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.propertyId = this.activatedRoute.snapshot.params.id;
    this.propertiesService.getPropertyById(this.propertyId).then((response) => {
      if (response.success) {
        this.property = response.data;
        this.visibleOnWeb = this.property.active;
      }
    }).then(() => { this.getImage(); })
      .then(() => { this.setLocation(); })
      .then(() => { this.setPropertyTableInfo(); })
      .catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
  }

  private getImage(): void {
    if (this.property.image) {
      this.imageService.sanitizeBase64EncodedImage(this.property.image, 'properties').then((imageDecoded) => {
        this.property.imageBase64 = imageDecoded;
      });
    }
  }

  private setLocation(): void {
    if (this.property.latitude && this.property.longitude) {
      this.mapData.location.lng = Number(this.property.longitude);
      this.mapData.location.lat = Number(this.property.latitude);
      this.mapData.markers.push({
        lat: Number(this.property.latitude),
        lng: Number(this.property.longitude)
      } as ILocation);
      this.mapData.zoom = 6;
      this.mapData.mapType = 'ROADMAP';
    }
  }

  private setPropertyTableInfo(): void {
    this.dataTable.title = 'Detalls de la propietat';
    this.dataTable.colsName = [
      { colName: 'characteristic', text: 'Característica' },
      { colName: 'value', text: 'Valor' }
    ];
    this.dataTable.inverse = true;
    this.dataTable.data = this.property;
  }

  setVisibleOnWeb(evt: boolean): void {
    let active: string;

    active = String(evt === true ? 1 : 0);

    this.propertiesService.setVisibilityOnWeb(this.propertyId, active).then((response) => {
      if (response.success) {
        this.alertService.success(response.message);
      } else {
        this.alertService.warn(response.message);
      }
    }).catch((error) => {
      console.error(error);
    });
  }
}
