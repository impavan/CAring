import { NgModule } from '@angular/core';
import { FooterButtonComponent } from './footer-button/footer-button';
import { MymodalComponent } from './mymodal/mymodal';
@NgModule({
	declarations: [FooterButtonComponent,
    MymodalComponent],
	imports: [],
	exports: [FooterButtonComponent,
    MymodalComponent]
})
export class ComponentsModule {}
