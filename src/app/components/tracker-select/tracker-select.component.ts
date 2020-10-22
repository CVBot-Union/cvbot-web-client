import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserKVEntity} from '../../models/RTGroupResponse';

@Component({
  selector: 'app-tracker-select',
  templateUrl: './tracker-select.component.html',
  styleUrls: ['./tracker-select.component.scss']
})
export class TrackerSelectComponent implements OnInit {

  @Input() trackerList: UserKVEntity[];
  @Input() isSelectDisabled = false;
  @Output() selectTrackerChange = new EventEmitter<string>();

  selectedTracker = 'ALL';

  constructor() { }

  ngOnInit(): void {
  }

  onSelectTracker = () => {
    this.selectTrackerChange.emit(this.selectedTracker);
  }

}
