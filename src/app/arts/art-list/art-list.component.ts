import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ArtItemComponent } from './art-item/art-item.component';
import { Art } from '../art.model';
import { ArtsService } from '../arts.service';

@Component({
	selector: 'app-art-list',
	imports: [ArtItemComponent],
	templateUrl: './art-list.component.html',
	styleUrl: './art-list.component.css',
})
export class ArtListComponent implements OnInit, OnDestroy {
	artList: Art[] | undefined;
	subscription: Subscription | undefined;
	@Input() favoriteArts: Art[] | undefined;

	constructor(private artsService: ArtsService) {}

	ngOnInit(): void {
		if (this.favoriteArts) {
			this.artList = this.favoriteArts;
		} else {
			this.subscription = this.artsService
				.getArtList()
				.subscribe(
					(arts: Partial<{ data: Art[] }>) => (this.artList = arts.data)
				);
		}
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
