import {Component, Input, OnInit} from '@angular/core';
import {Property} from '../../models/property';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() property: Property;

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  sendProperty(): void {
    this.messageService.changeMessage(this.property);
  }
}
