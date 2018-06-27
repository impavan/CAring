import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'safehtml',
})
export class SafehtmlPipe implements PipeTransform {
  
  constructor(private sanitized: DomSanitizer) { }
  
  transform(value: string) {
    if(value)
   return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
