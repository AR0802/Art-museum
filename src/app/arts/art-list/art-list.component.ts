import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { catchError, Subscription } from 'rxjs';

import { ArtItemComponent } from './art-item/art-item.component';
import { Art } from '../art.model';
import { ArtsService } from '../arts.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { PlaceholderDirective } from '../../shared/placeholder.directive';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
	selector: 'app-art-list',
	imports: [ArtItemComponent, LoaderComponent, PlaceholderDirective],
	templateUrl: './art-list.component.html',
	styleUrl: './art-list.component.css',
})
export class ArtListComponent implements OnInit, OnDestroy {
	artList: Art[] = [];
	private subscription: Subscription | undefined;
	private closeSub!: Subscription;
	@Input() favoriteArts: Art[] | undefined;
	@Input() isFavoritePage: boolean = false;
	@ViewChild(PlaceholderDirective)
	alertHost!: PlaceholderDirective;

	constructor(private artsService: ArtsService) {}

	ngOnInit(): void {
		if (this.isFavoritePage && this.favoriteArts) {
			this.artList = this.favoriteArts;
		} else {
			this.subscription = this.artsService
				.getArtList()
				.pipe(
					catchError((errorRes: any) => {
						this.showErrorAlert(errorRes.error.error);
						return [];
					})
				)
				.subscribe((arts: any) => (this.artList = arts.data));
		}
	}

	onSortByAlphabet() {
		for (let j = this.artList.length - 1; j > 0; j--) {
			for (let i = 0; i < j; i++) {
				if (this.artList[i].title > this.artList[i + 1].title) {
					const temp = this.artList[i];
					this.artList[i] = this.artList[i + 1];
					this.artList[i + 1] = temp;
				}
			}
		}
	}

	onSortByEndDate() {
		for (let j = this.artList.length - 1; j > 0; j--) {
			for (let i = 0; i < j; i++) {
				if (this.artList[i].date_end < this.artList[i + 1].date_end) {
					const temp = this.artList[i];
					this.artList[i] = this.artList[i + 1];
					this.artList[i + 1] = temp;
				}
			}
		}
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
		this.subscription?.unsubscribe();
		this.closeSub?.unsubscribe();
	}
}
