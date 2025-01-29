import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { DrawerToggleComponent } from '../drawer-toggle/drawer-toggle.component';
import { SideDrawerComponent } from '../side-drawer/side-drawer.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
	imports: [
		RouterLink,
		RouterLinkActive,
		DrawerToggleComponent,
		SideDrawerComponent,
	],
})
export class HeaderComponent {
	isOpen: boolean = false;

	onToggle(isOpen: boolean) {
		this.isOpen = isOpen;
	}
}
