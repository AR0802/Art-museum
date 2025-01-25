import { Component } from '@angular/core';

import { TopicComponent } from '../../shared/topic/topic.component';
import { ArtListComponent } from '../art-list/art-list.component';

@Component({
	selector: 'app-art-favorites',
	templateUrl: './art-favorites.component.html',
	styleUrl: './art-favorites.component.css',
	imports: [TopicComponent, ArtListComponent],
})
export class ArtFavoritesComponent {}
