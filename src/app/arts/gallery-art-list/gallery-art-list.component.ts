import { Component } from '@angular/core';

import { GalleryArtItemComponent } from './gallery-art-item/gallery-art-item.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
	selector: 'app-gallery-art-list',
	imports: [GalleryArtItemComponent, PaginationComponent],
	templateUrl: './gallery-art-list.component.html',
	styleUrl: './gallery-art-list.component.css',
})
export class GalleryArtListComponent {
	arts = [{ id: 1 }, { id: 2 }, { id: 3 }];
}
