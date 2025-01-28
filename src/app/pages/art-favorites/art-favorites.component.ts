import { Component, OnInit } from '@angular/core';

import { LoaderComponent } from '@components/loader/loader.component';
import { TopicComponent } from '@components/topic/topic.component';
import { ArtListComponent } from '@components/art-list/art-list.component';
import { Art } from '@shared/art.model';

@Component({
	selector: 'app-art-favorites',
	templateUrl: './art-favorites.component.html',
	styleUrl: './art-favorites.component.css',
	imports: [TopicComponent, ArtListComponent, LoaderComponent],
})
export class ArtFavoritesComponent implements OnInit {
	favoriteArts: Art[] = [];
	isLoading: boolean = false;

	ngOnInit(): void {
		this.isLoading = true;
		for (let i = 0; i < localStorage.length; i++) {
			this.favoriteArts.push(
				JSON.parse(localStorage.getItem(localStorage.key(i) || '') || '')
			);
		}
		this.isLoading = false;
	}
}
