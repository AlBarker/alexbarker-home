import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinal'
})
export class OrdinalPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) {
      return '';
    }
    
    return `${value}${this.nth(value)}`;
  }

  private nth(value: number): string {

    if (value > 10) {
      return 'th';
    }
    
    switch(value % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

}
