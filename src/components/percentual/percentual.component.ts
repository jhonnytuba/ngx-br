import {Component, EventEmitter, forwardRef, Input, Output} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ValueAccessorBase} from "../value-acessor-base";
import {percentualPlaceholder} from "../constants";

@Component({
  selector: 'percentual',
  template: `
    <input class="form-control" 
           currencyMask
           maxlength="{{maxLength}}"
           id="{{id}}"
           (blur)="blurEvt()"
           [disabled]="disabled"
           [placeholder]="placeholder"
           [(ngModel)]="value"
           (ngModelChange)="notifyChanges($event)"
           [ngStyle]="style"
           [options]="{ suffix: ' %', prefix: '', thousands: '.', decimal: ',', allowNegative: true }">`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PercentualComponent),
    multi: true
  }]
})
export class PercentualComponent extends ValueAccessorBase<string> {
  pattern: string;

  @Input() style: any;
  @Input() maxLength: number = 11;
  @Input() placeholder: string = percentualPlaceholder;
  @Input() id: string;

  @Output() blur: EventEmitter<any> = new EventEmitter();

  public blurEvt(event): void {
    this.blur.emit(event);
  }

  transform(T: any): string {
    throw new Error("Method not implemented.");
  }
}
