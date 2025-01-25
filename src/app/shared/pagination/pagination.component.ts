import { Component } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-pagination',
	imports: [NgbPaginationModule],
	templateUrl: './pagination.component.html',
	styleUrl: './pagination.component.css',
})
export class PaginationComponent {
	page: number = 4;
}
