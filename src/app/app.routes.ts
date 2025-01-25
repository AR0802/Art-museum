import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./arts/arts.component').then((m) => m.ArtsComponent),
	},
	{
		path: 'art/:id',
		loadComponent: () =>
			import('./arts/art-detail/art-detail.component').then(
				(m) => m.ArtDetailComponent
			),
	},
	{
		path: 'favorites',
		loadComponent: () =>
			import('./arts/art-favorites/art-favorites.component').then(
				(m) => m.ArtFavoritesComponent
			),
	},
	{
		path: '**',
		loadComponent: () =>
			import('./shared/not-found.component').then((m) => m.NotFoundComponent),
	},
];
