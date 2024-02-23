import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent {
  @Input() type: string = '';
  @Input() max: number | undefined;
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() isValid: boolean = true;

  handleChange(event: any): void {
    // You can add any additional logic here if needed
  }
}
