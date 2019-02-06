import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'


@Pipe({
  name: 'safeurl',
})
export class SafeurlPipe implements PipeTransform {

  constructor(private sanitizer:DomSanitizer){}
 
  transform(value: string) {
    console.log(value,"value----------------");
    if(value)
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
