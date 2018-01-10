import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';


@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string) {
    if(value == null || value == '')
      return value;
    return moment(value).format('DD MMM YYYY hh:mm A');
  }
}
