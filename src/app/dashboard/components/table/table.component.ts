import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IDashboardTable} from '../../../models/dashboard-table';
import {HelpersService} from '../../../services/_helpers/helpers.service';
import {faTimes, faEye, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {IActionButtons} from '../../../models/action-buttons';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() toShow: IDashboardTable = {} as IDashboardTable;
  @Input() actionButtons: IActionButtons;
  dataTable: IDashboardTable = {} as IDashboardTable;

  faView = faEye;
  faEdit = faPencilAlt;
  faDelete = faTimes;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  showDeleteModal(url: string): void {
    Swal.fire({
      title: 'Estas segur de voler eliminar?',
      text: 'L\'acció no es podra desfer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#589c1d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimina!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate([url]);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataTable = changes.toShow.currentValue;
  }

  formatPrice(price: any): string {
    return HelpersService.formatPrice(price);
  }

  formatMeters(meters: any): string {
    return HelpersService.formatMeters(meters);
  }

  formatDate(timestamp: string): string {
    return HelpersService.formatDate(timestamp);
  }

  _isNumber(value: any): boolean {
    return HelpersService.isNumber(value);
  }

  _isString(value: any): boolean {
    return HelpersService.isString(value);
  }
}
