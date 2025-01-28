import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { catchError, Subscription } from 'rxjs';

import { GalleryArtItemComponent } from './gallery-art-item/gallery-art-item.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { Art } from '../art.model';
import { ArtsService } from '../arts.service';
import { PlaceholderDirective } from '../../shared/placeholder.directive';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
	selector: 'app-gallery-art-list',
	imports: [
		GalleryArtItemComponent,
		PaginationComponent,
		LoaderComponent,
		PlaceholderDirective,
	],
	templateUrl: './gallery-art-list.component.html',
	styleUrl: './gallery-art-list.component.css',
})
export class GalleryArtListComponent implements OnInit, OnDestroy {
	galleryArtList: Art[] | undefined | null;
	private subscription!: Subscription;
	private anotherSubscription: Subscription | undefined;
	private closeSub!: Subscription;
	@ViewChild(PlaceholderDirective)
	alertHost!: PlaceholderDirective;

	constructor(private artsService: ArtsService) {}

	ngOnInit(): void {
		this.subscription = this.artsService
			.getGalleryArtList()
			.pipe(
				catchError((errorRes: any) => {
					this.showErrorAlert(errorRes.error.error);
					return [];
				})
			)
			.subscribe(
				(arts: Partial<{ data: Art[] }>) => (this.galleryArtList = arts.data)
			);
	}

	onChange(pageNumber: number) {
		this.galleryArtList = null;
		this.anotherSubscription?.unsubscribe();
		this.anotherSubscription = this.artsService
			.getGalleryArtList(pageNumber)
			.subscribe(
				(arts: Partial<{ data: Art[] }>) => (this.galleryArtList = arts.data)
			);
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
		this.anotherSubscription?.unsubscribe();
		this.closeSub?.unsubscribe();
	}
}
