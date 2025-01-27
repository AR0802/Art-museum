import { Component, OnInit } from '@angular/core';

import { TopicComponent } from '../../shared/topic/topic.component';
import { ArtListComponent } from '../art-list/art-list.component';
import { Art } from '../art.model';

@Component({
	selector: 'app-art-favorites',
	templateUrl: './art-favorites.component.html',
	styleUrl: './art-favorites.component.css',
	imports: [TopicComponent, ArtListComponent],
})
export class ArtFavoritesComponent implements OnInit {
	favoriteArts: Art[] = [];

	ngOnInit(): void {
		for (let i = 0; i < localStorage.length; i++) {
			this.favoriteArts.push(
				JSON.parse(localStorage.getItem(localStorage.key(i) || '') || '')
			);
		}
	}
}
