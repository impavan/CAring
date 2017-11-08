import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { TruncatePipe } from './truncate/truncate';
import { UniquePipe } from './unique/unique';
@NgModule({
	declarations: [FilterPipe,
    TruncatePipe,
    UniquePipe],
	imports: [],
	exports: [FilterPipe,
    TruncatePipe,
    UniquePipe]
})
export class PipesModule {}
