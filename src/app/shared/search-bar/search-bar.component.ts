import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

import { ArtItemComponent } from '../../arts/art-list/art-item/art-item.component';
import { ArtsService } from '../../arts/arts.service';
import { Art } from '../../arts/art.model';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	imports: [ReactiveFormsModule, ArtItemComponent],
	styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements OnInit, OnDestroy {
	arts: Art[] = [];
	searchSubscription: Subscription | undefined;
	subscription: Subscription | undefined;
	searchString: string = '';
	searchControl = new FormControl();

	constructor(private artsService: ArtsService) {}

	ngOnInit(): void {
		this.searchSubscription = this.searchControl.valueChanges
			.pipe(debounceTime(1000), distinctUntilChanged())
			.subscribe((newSearchString) => {
				this.searchString = newSearchString;
				if (!newSearchString.trim()) {
					this.arts = [];
					return;
				}
				this.arts = [];
				this.subscription?.unsubscribe();
				this.subscription = this.artsService
					.getArtBySearch(newSearchString)
					.subscribe((arts: any) => {
						for (const art of arts.data) {
							this.artsService
								.getArtById(art.id)
								.subscribe((art: any) => this.arts.push(art.data));
						}
					});
			});
	}

	ngOnDestroy(): void {
		this.searchSubscription?.unsubscribe();
	}
}
