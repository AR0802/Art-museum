import { Component } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
	imports: [RouterLink, RouterLinkActive],
})
export class HeaderComponent {}
