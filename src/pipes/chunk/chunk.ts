import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 

/**
 * Generated class for the ChunkPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'chunk',
})
export class ChunkPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if (value !== undefined && value !== null || args !== undefined && args !== null) {
      return _.chunk(value,...args)
    }
    return value;
  }
}
