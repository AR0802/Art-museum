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
	art: Art | undefined;
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
				.subscribe((art: Partial<{ data: Art }>) => (this.art = art.data));
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
