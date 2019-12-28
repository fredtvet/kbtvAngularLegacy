import { Component,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nested-nav',
  templateUrl: './nested-nav.component.html',
  styleUrls: ['./nested-nav.component.css']
})
export class NestedNavComponent {

  @Input() vertMenuDisabled:boolean = false;
  @Input() title:string;
  @Input() icon:string;

  @Output() deleteClicked = new EventEmitter();
  @Output() editClicked = new EventEmitter();
  @Output() backClicked = new EventEmitter();

  constructor() { }

  ngOnChanges(){
    this.title = this.title.replace(/;/g, "<br />");
  }

  handleDeleteClicked(){
    this.deleteClicked.emit('1');
  }

  handleEditClicked(){
    this.editClicked.emit('1');
  }

  handleBackClicked(){
    this.backClicked.emit('1');
  }
}
