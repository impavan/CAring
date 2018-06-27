import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { TruncatePipe } from './truncate/truncate';
import { UniquePipe } from './unique/unique';
import { RoundPipe } from './round/round';
import { SortdescPipe } from './sortdesc/sortdesc';
@NgModule({
	declarations: [FilterPipe,
    TruncatePipe,
    UniquePipe,
    RoundPipe,
    SortdescPipe],
	imports: [],
	exports: [FilterPipe,
    TruncatePipe,
    UniquePipe,
    RoundPipe,
    SortdescPipe]
})
export class PipesModule {}
