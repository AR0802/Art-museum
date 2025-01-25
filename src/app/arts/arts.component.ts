import { Component } from '@angular/core';

import { ArtListComponent } from './art-list/art-list.component';
import { TopicComponent } from '../shared/topic/topic.component';
import { GalleryArtListComponent } from './gallery-art-list/gallery-art-list.component';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';

@Component({
	selector: 'app-arts',
	templateUrl: './arts.component.html',
	styleUrl: './arts.component.css',
	imports: [
		ArtListComponent,
		TopicComponent,
		GalleryArtListComponent,
		SearchBarComponent,
	],
})
export class ArtsComponent {}
