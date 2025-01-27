import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Art } from '../../art.model';

@Component({
	selector: 'app-art-item',
	templateUrl: './art-item.component.html',
	styleUrl: './art-item.component.css',
})
export class ArtItemComponent implements OnInit {
	favorite: boolean = false;
	@Input() id!: number;
	@Input() description: string = '';
	@Input() author: string = '';
	@Input() privacy: string = '';
	@Input() imageId: string = '';

	constructor(private router: Router) {}

	ngOnInit(): void {
		if (localStorage.getItem(String(this.id))) {
			this.favorite = true;
		}
	}

	onNavigate() {
		this.router.navigate(['/art', this.id]);
	}

	onAddToFavorites() {
		if (!this.favorite) {
			const art = new Art(
				this.id,
				this.description,
				this.author,
				this.privacy === 'Public' ? true : false,
				this.imageId
			);
			localStorage.setItem(String(this.id), JSON.stringify(art));
		} else {
			localStorage.removeItem(String(this.id));
		}
		this.favorite = !this.favorite;
	}
}
