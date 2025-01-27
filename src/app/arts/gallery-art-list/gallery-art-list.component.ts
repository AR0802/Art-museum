import { Component, OnDestroy, OnInit } from '@angular/core';

import { GalleryArtItemComponent } from './gallery-art-item/gallery-art-item.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { Art } from '../art.model';
import { ArtsService } from '../arts.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-gallery-art-list',
	imports: [GalleryArtItemComponent, PaginationComponent],
	templateUrl: './gallery-art-list.component.html',
	styleUrl: './gallery-art-list.component.css',
})
export class GalleryArtListComponent implements OnInit, OnDestroy {
	galleryArtList: Art[] | undefined;
	subscription!: Subscription;
	anotherSubscription: Subscription | undefined;

	constructor(private artsService: ArtsService) {}

	ngOnInit(): void {
		this.subscription = this.artsService
			.getGalleryArtList()
			.subscribe(
				(arts: Partial<{ data: Art[] }>) => (this.galleryArtList = arts.data)
			);
	}

	onChange(pageNumber: number) {
		this.anotherSubscription?.unsubscribe();
		this.anotherSubscription = this.artsService
			.getGalleryArtList(pageNumber)
			.subscribe(
				(arts: Partial<{ data: Art[] }>) => (this.galleryArtList = arts.data)
			);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
		this.anotherSubscription?.unsubscribe();
	}
}
