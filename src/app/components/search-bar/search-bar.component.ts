import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

import { ArtItemComponent } from '../art-list/art-item/art-item.component';
import { LoaderComponent } from '../loader/loader.component';
import { HttpService } from '@shared/http.service';
import { Art } from '@shared/art.model';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	imports: [ReactiveFormsModule, ArtItemComponent, LoaderComponent],
	styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements OnInit, OnDestroy {
	arts: Art[] = [];
	loading: boolean = false;
	private searchSubscription: Subscription | undefined;
	private subscription: Subscription | undefined;
	searchString: string = '';
	searchControl = new FormControl(this.searchString, [
		Validators.required,
		Validators.maxLength(50),
	]);

	constructor(private httpService: HttpService) {}

	ngOnInit(): void {
		this.searchSubscription = this.searchControl.valueChanges
			.pipe(debounceTime(1000), distinctUntilChanged())
			.subscribe((newSearchString: any) => {
				this.loading = true;
				this.searchString = newSearchString;
				if (!this.searchControl.valid) {
					this.arts = [];
					this.loading = false;
					return;
				}
				this.arts = [];
				this.subscription?.unsubscribe();
				this.subscription = this.httpService
					.getArtBySearch(newSearchString)
					.subscribe((arts: any) => {
						for (const art of arts.data) {
							this.httpService
								.getArtById(art.id)
								.subscribe((art: any) => this.arts.push(art.data));
						}
						this.loading = false;
					});
			});
	}

	onSortByAlphabet() {
		for (let j = this.arts.length - 1; j > 0; j--) {
			for (let i = 0; i < j; i++) {
				if (this.arts[i].title > this.arts[i + 1].title) {
					const temp = this.arts[i];
					this.arts[i] = this.arts[i + 1];
					this.arts[i + 1] = temp;
				}
			}
		}
	}

	onSortByEndDate() {
		for (let j = this.arts.length - 1; j > 0; j--) {
			for (let i = 0; i < j; i++) {
				if (this.arts[i].date_end < this.arts[i + 1].date_end) {
					const temp = this.arts[i];
					this.arts[i] = this.arts[i + 1];
					this.arts[i + 1] = temp;
				}
			}
		}
	}

	ngOnDestroy(): void {
		this.searchSubscription?.unsubscribe();
	}
}
