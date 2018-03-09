import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SortdescPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'sortdesc',
})
export class SortdescPipe implements PipeTransform {
  
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if (a[args] > b[args]) {
        return -1;
      } else if (a[args] < b[args]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
