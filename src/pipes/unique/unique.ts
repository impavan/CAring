import { Pipe, PipeTransform } from '@angular/core';
import { uniqBy } from 'lodash'; 


@Pipe({
  name: 'unique',
})
export class UniquePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(args,value: string) {
    if(value!== undefined && value!== null){
            return uniqBy(args,value);
        }
        return value;
  }
}
