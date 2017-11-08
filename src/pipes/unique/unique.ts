import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 

/**
 * Generated class for the UniquePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'unique',
})
export class UniquePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if(value!== undefined && value!== null){
            return _.uniqBy(value, ...args);
        }
        return value;
  }
}
