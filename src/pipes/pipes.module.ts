import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { TruncatePipe } from './truncate/truncate';
import { UniquePipe } from './unique/unique';
import { RoundPipe } from './round/round';
import { SafehtmlPipe } from './safehtml/safehtml';
import { DateFormatPipe } from './date-format/date-format';
@NgModule({
	declarations: [FilterPipe,
    TruncatePipe,
    UniquePipe,
    RoundPipe,
    SafehtmlPipe,
    DateFormatPipe],
	imports: [],
	exports: [FilterPipe,
    TruncatePipe,
    UniquePipe,
    RoundPipe,
    SafehtmlPipe,
    DateFormatPipe]
})
export class PipesModule {}
