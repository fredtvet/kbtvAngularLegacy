import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[ifRole]'
})
export class IfRoleDirective {

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {
    console.log('template ref', templateRef);
    console.log('view container', viewContainer);
  }

  @Input()
  set ifRole(roles) {

    console.log(roles);
    if(roles.includes(this.userService.getUserRole())) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }

  }


}
