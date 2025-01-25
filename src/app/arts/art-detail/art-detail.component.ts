import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-art-detail',
	templateUrl: './art-detail.component.html',
	styleUrl: './art-detail.component.css',
})
export class ArtDetailComponent {
	id: number | undefined;
	private subscription: Subscription;
	constructor(private activateRoute: ActivatedRoute) {
		this.subscription = activateRoute.params.subscribe(
			(params) => (this.id = params['id'])
		);
	}
}
