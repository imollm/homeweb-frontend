import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../services/message.service';
import {ISearch} from '../../models/search';
import {ResultsService} from '../../services/results/results.service';
import {Property} from '../../models/property';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  searchParams: ISearch = {};
  results: Property[] = [];

  constructor(
    private messageService: MessageService,
    private resultsService: ResultsService,
  ) { }

  ngOnInit(): void {
    this.getSearchParamsThroughService().then(r => this.getResults().then(t => {}));
  }

  async getResults(): Promise<any> {
    const results = await this.resultsService.getShowByFilter(this.searchParams);

    this.results = (results !== null) ? results.data : [];
  }

  getSearchParams(params: ISearch): void {
    this.searchParams = params;
    this.getResults().then(r => {});
  }

  private async getSearchParamsThroughService(): Promise<void> {
    this.messageService.currentMessage.subscribe(params => {
      this.searchParams = params;
    });
  }
}
