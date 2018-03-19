import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

/**
 * Generated class for the SafehtmlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'safehtml',
})
export class SafehtmlPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor(private sanitized: DomSanitizer) { }
  
  transform(value: string) {
   return this.sanitized.bypassSecurityTrustHtml(value);
  }
}



 
