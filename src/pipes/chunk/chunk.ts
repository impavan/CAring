import { Pipe, PipeTransform } from '@angular/core';
import { chunk }  from 'lodash'; 


@Pipe({
  name: 'chunk',
})
export class ChunkPipe implements PipeTransform {
  
  transform(args,value: any) {
    if (value !== undefined && value !== null || args !== undefined && args !== null) {
      return chunk(args,value)
    }
    return value;
  }
}
