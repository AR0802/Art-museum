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
	artList!: Art[];
	subscription: Subscription | undefined;
	@Input() favoriteArts: Art[] | undefined;

	constructor(private artsService: ArtsService) {}

	ngOnInit(): void {
		if (this.favoriteArts) {
			this.artList = this.favoriteArts;
		} else {
			this.subscription = this.artsService
				.getArtList()
				.subscribe((arts: any) => (this.artList = arts.data));
		}
	}

	onSortByAlphabet() {
		for (let j = this.artList.length - 1; j > 0; j--) {
			for (let i = 0; i < j; i++) {
				if (this.artList[i].title > this.artList[i + 1].title) {
					const temp = this.artList[i];
					this.artList[i] = this.artList[i + 1];
					this.artList[i + 1] = temp;
				}
			}
		}
	}

	onSortByEndDate() {
		for (let j = this.artList.length - 1; j > 0; j--) {
			for (let i = 0; i < j; i++) {
				if (this.artList[i].date_end < this.artList[i + 1].date_end) {
					const temp = this.artList[i];
					this.artList[i] = this.artList[i + 1];
					this.artList[i + 1] = temp;
				}
			}
		}
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
