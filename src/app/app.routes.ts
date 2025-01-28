import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('@pages/arts/arts.component').then((m) => m.ArtsComponent),
	},
	{
		path: 'art/:id',
		loadComponent: () =>
			import('@pages/art-detail/art-detail.component').then(
				(m) => m.ArtDetailComponent
			),
	},
	{
		path: 'favorites',
		loadComponent: () =>
			import('@pages/art-favorites/art-favorites.component').then(
				(m) => m.ArtFavoritesComponent
			),
	},
	{
		path: '**',
		loadComponent: () =>
			import('@pages/not-found.component').then((m) => m.NotFoundComponent),
	},
];
