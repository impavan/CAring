import { NgModule } from '@angular/core';
import { FooterButtonComponent } from './footer-button/footer-button';
import { StorebannerComponent } from './storebanner/storebanner';
import { HotdealsComponent } from './hotdeals/hotdeals';
// import { ModalComponent } from './modal/modal';
// import { MymodalComponent } from './mymodal/mymodal';
// import { HeaderComponent } from './header/header';
@NgModule({
	declarations: [FooterButtonComponent,
    StorebannerComponent,
    HotdealsComponent,
    // ModalComponent,
    // MymodalComponent,
    // HeaderComponent
],
	imports: [],
	exports: [FooterButtonComponent,
    StorebannerComponent,
    HotdealsComponent,
    // ModalComponent,
    // MymodalComponent,
    // HeaderComponent
]
})
export class ComponentsModule {}
