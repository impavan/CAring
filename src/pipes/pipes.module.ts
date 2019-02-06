import  { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { TruncatePipe } from './truncate/truncate';


@NgModule({
    declarations: [FilterPipe,TruncatePipe],
    imports: [],
    exports: [FilterPipe,TruncatePipe]
})
export class PipesModule {}