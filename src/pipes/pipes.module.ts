import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { TruncatePipe } from './truncate/truncate';
import { UniquePipe } from './unique/unique';
import { RoundPipe } from './round/round';
import { SafehtmlPipe } from './safehtml/safehtml';
import { DateFormatPipe } from './date-format/date-format';
import { SortdescPipe } from './sortdesc/sortdesc';
@NgModule({
	declarations: [FilterPipe,
    TruncatePipe,
    UniquePipe,
    RoundPipe,
    SafehtmlPipe,
    DateFormatPipe,
    SortdescPipe],
	imports: [],
	exports: [FilterPipe,
    TruncatePipe,
    UniquePipe,
    RoundPipe,
    SafehtmlPipe,
    DateFormatPipe,
    SortdescPipe]
})
export class PipesModule {}
