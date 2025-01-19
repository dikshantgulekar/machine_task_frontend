import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abcd'
})
export class AbcdPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
