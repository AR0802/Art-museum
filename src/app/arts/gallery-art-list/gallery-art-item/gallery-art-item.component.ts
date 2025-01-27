import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-gallery-art-item',
	templateUrl: './gallery-art-item.component.html',
	styleUrl: './gallery-art-item.component.css',
})
export class GalleryArtItemComponent {
	@Input() id: number | undefined;
	@Input() description: string = '';
	@Input() author: string = '';
	@Input() privacy: string = '';
	@Input() imageId: string = '';

	constructor(private router: Router) {}

	onNavigate() {
		this.router.navigate(['/art', this.id]);
	}
}
