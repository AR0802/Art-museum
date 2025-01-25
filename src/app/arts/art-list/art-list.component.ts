import { Component } from '@angular/core';

import { ArtItemComponent } from './art-item/art-item.component';

@Component({
	selector: 'app-art-list',
	imports: [ArtItemComponent],
	templateUrl: './art-list.component.html',
	styleUrl: './art-list.component.css',
})
export class ArtListComponent {
	arts = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
}
