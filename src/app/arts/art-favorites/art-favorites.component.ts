import { Component, OnInit } from '@angular/core';

import { TopicComponent } from '../../shared/topic/topic.component';
import { ArtListComponent } from '../art-list/art-list.component';
import { Art } from '../art.model';
import { LoaderComponent } from '../../shared/loader/loader.component';

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
