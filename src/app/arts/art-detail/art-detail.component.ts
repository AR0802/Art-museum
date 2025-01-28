import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Subscription } from 'rxjs';

import { ArtsService } from '../arts.service';
import { Art } from '../art.model';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { PlaceholderDirective } from '../../shared/placeholder.directive';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
	selector: 'app-art-detail',
	templateUrl: './art-detail.component.html',
	styleUrl: './art-detail.component.css',
	imports: [LoaderComponent, PlaceholderDirective],
})
export class ArtDetailComponent implements OnInit, OnDestroy {
	id!: number;
	art!: Art;
	favorite: boolean = false;
	private subscription!: Subscription;
	private closeSub!: Subscription;
	@ViewChild(PlaceholderDirective)
	alertHost!: PlaceholderDirective;

	constructor(
		private activateRoute: ActivatedRoute,
		private artsService: ArtsService
	) {}

	ngOnInit(): void {
		this.subscription = this.activateRoute.params.subscribe((params) => {
			this.id = params['id'];
			this.artsService
				.getArtById(this.id)
				.pipe(
					catchError((errorRes: any) => {
						this.showErrorAlert(
							errorRes.error.error || 'Sorry, something went wrong.'
						);
						return [];
					})
				)
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
				this.art.image_id,
				this.art.date_end
			);
			localStorage.setItem(String(this.id), JSON.stringify(art));
		} else {
			localStorage.removeItem(String(this.id));
		}
		this.favorite = !this.favorite;
	}

	showErrorAlert(message: string) {
		const hostViewContainerRef = this.alertHost.viewContainerRef;
		hostViewContainerRef.clear();

		const componentRef = hostViewContainerRef.createComponent(AlertComponent);

		componentRef.instance.message = message;
		this.closeSub = componentRef.instance.close.subscribe(() => {
			this.closeSub.unsubscribe();
			hostViewContainerRef.clear();
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
		this.closeSub?.unsubscribe();
	}
}
