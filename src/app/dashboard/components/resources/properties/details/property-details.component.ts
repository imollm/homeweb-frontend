import {Component, OnInit} from '@angular/core';
import {IProperty} from '../../../../../models/property';
import {ActivatedRoute} from '@angular/router';
import {ImageService} from '../../../../../services/_image/image.service';
import {PropertiesService} from '../../../../../services/_property/properties.service';
import {ILocation, IMaps} from '../../../../../models/maps';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {AlertService} from '../../../../../_alert/alert.service';
import {ResponseStatus} from '../../../../../api/response-status';
import {IActionButtons} from '../../../../../models/action-buttons';
import {HelpersService} from '../../../../../services/_helpers/helpers.service';

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

  dataTable: IDashboardTable = {
    inverse: true
  } as IDashboardTable;
  actionButtons: IActionButtons = {
    active: false
  } as IActionButtons;
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
      { colName: 'reference', text: 'Referència' },
      { colName: 'category', text: 'Categoria'},
      { colName: 'city', text: 'Ciutat'},
      { colName: 'address', text: 'Adreça' },
      { colName: 'price', text: 'Preu inicial'},
      { colName: 'sold', text: 'Venuda?' },
      { colName: 'created_at', text: 'Creada'}
    ];
    this.dataTable.inverse = true;
    this.dataTable.data = this.property;
    this.dataTable.data.sold = this.property.sold ? 'Si' : 'No';
    this.dataTable.data.price = HelpersService.formatPrice(this.property.price);
    this.dataTable.data.created_at = HelpersService.formatDate(this.property.created_at);
    this.dataTable.data.category = this.property.category.name;
    this.dataTable.data.city = this.property.city.name;

    if (this.property.user_id !== null) {
      this.dataTable.colsName.push({colName: 'owner', text: 'Propietari'});
      this.dataTable.data.owner = this.property.owner.name;
    }
    if (this.property.sold && this.property.sales[0]) {
      this.dataTable.colsName.push({ colName: 'sale', text: 'Preu venda'});
      this.dataTable.data.sale = HelpersService.formatPrice(this.property.sales[0].amount);
    }
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
