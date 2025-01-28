import { Component } from '@angular/core';

import { ArtListComponent } from '@components/art-list/art-list.component';
import { TopicComponent } from '@components/topic/topic.component';
import { GalleryArtListComponent } from '@components/gallery-art-list/gallery-art-list.component';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';

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
