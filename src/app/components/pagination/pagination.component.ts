import { Component, EventEmitter, Output } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-pagination',
	imports: [NgbPaginationModule],
	templateUrl: './pagination.component.html',
	styleUrl: './pagination.component.css',
})
export class PaginationComponent {
	totalItems: number = 15;
	pageSize: number = 3;
	currentPage: number = 1;
	@Output() onChange = new EventEmitter<number>();

	pageChanged(pageIndex: number) {
		this.onChange.emit(pageIndex);
	}
}
