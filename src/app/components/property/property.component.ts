import {Component, OnInit} from '@angular/core';
import {IProperty} from '../../models/property';
import {ActivatedRoute, Router} from '@angular/router';
import {PropertiesService} from '../../services/_property/properties.service';
import {ApiResponseI} from '../../models/api-response';
import {ImageService} from '../../services/_image/image.service';
import {ILocation, IMaps} from '../../models/maps';
import {IDashboardTable} from '../../models/dashboard-table';
import {IActionButtons} from '../../models/action-buttons';
import {HelpersService} from '../../services/_helpers/helpers.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  property: IProperty = {
    features: []
  } as IProperty;
  dataTable: IDashboardTable = {
    title: 'Especificacions propietat',
    inverse: true
  } as IDashboardTable;
  actionButtons: IActionButtons = {
    active: false
  } as IActionButtons;
  propertyId: string;
  mapData: IMaps = {
    location: {} as ILocation,
    markers: [],
    zoom: 6,
    mapType: 'ROADMAP',
    getLocation: false
  } as IMaps;

  constructor(
    private activatedRoute: ActivatedRoute,
    private propertiesService: PropertiesService,
    private imageService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.propertyId = this.activatedRoute.snapshot.params.id;
    this.getPropertyById().then((res) => {
      if (!res.success) {
        this.router.navigate(['**']);
      } else {
        this.property = res.data;
        if (this.property.image) {
          this.getBase64Image();
        }
        this.setLocation();
        this.setPropertyTableInfo();
      }
    });
  }

  private async getPropertyById(): Promise<ApiResponseI> {
    return await this.propertiesService.getPropertyById(this.propertyId);
  }

  private getBase64Image(): void {
    this.imageService.sanitizeBase64EncodedImage(this.property.image, 'properties').then((imageDecoded) => {
      this.property.imageBase64 = imageDecoded;
    });
  }

  private setLocation(): void {
    if (this.property.latitude && this.property.longitude) {
      this.mapData.location.lat = Number(this.property.latitude);
      this.mapData.location.lng = Number(this.property.longitude);
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
      { colName: 'sold', text: 'Venuda?' },
      { colName: 'price', text: 'Preu'},
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
  }

}
