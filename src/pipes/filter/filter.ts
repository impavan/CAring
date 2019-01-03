import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Array<any>, filter: {[key: string]: any }): Array<any> {
            return items.filter(item => {
                let notMatchingField = Object.keys(filter)
                                             .find(key => item[key] !== filter[key]);

                return !notMatchingField; // true if matches all fields
            });
        }
}
