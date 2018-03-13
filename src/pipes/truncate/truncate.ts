import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TruncatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, args: string[]): string {

      let limit = args.length > 0 ? parseInt(args[0],15): 15;
       let trail = args.length > 1 ? args[1] : '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
