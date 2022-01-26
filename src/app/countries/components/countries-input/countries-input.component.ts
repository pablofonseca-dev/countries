import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-countries-input',
  templateUrl: './countries-input.component.html',
  styles: [],
})
export class CountriesInputComponent implements OnInit {
  @Output() onSearchTermData: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() placeholderValue: string = '';

  debouncer: Subject<string> = new Subject();

  searchTerm: string = '';

  constructor() {}

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(300)).subscribe({
      next: (value) => this.onDebounce.emit(value),
    });
  }

  searchByName = () => {
    this.onSearchTermData.emit(this.searchTerm);
  };

  keyPressed = () => {
    this.debouncer.next(this.searchTerm);
  };
}
