import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ArtsService } from '../arts.service';
import { Art } from '../art.model';

@Component({
	selector: 'app-art-detail',
	templateUrl: './art-detail.component.html',
	styleUrl: './art-detail.component.css',
})
export class ArtDetailComponent implements OnInit, OnDestroy {
	id!: number;
	art!: Art;
	favorite: boolean = false;
	private subscription!: Subscription;
	constructor(
		private activateRoute: ActivatedRoute,
		private artsService: ArtsService
	) {}

	ngOnInit(): void {
		this.subscription = this.activateRoute.params.subscribe((params) => {
			this.id = params['id'];
			this.artsService
				.getArtById(this.id)
				.subscribe((art: any) => (this.art = art.data));
		});
		if (localStorage.getItem(String(this.id))) {
			this.favorite = true;
		}
	}

	onAddToFavorites() {
		if (!this.favorite) {
			const art = new Art(
				this.art.id,
				this.art.title,
				this.art.artist_title,
				this.art.is_public_domain,
				this.art.image_id
			);
			localStorage.setItem(String(this.id), JSON.stringify(art));
		} else {
			localStorage.removeItem(String(this.id));
		}
		this.favorite = !this.favorite;
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
