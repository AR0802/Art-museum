import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { BackdropComponent } from '../backdrop/backdrop.component';

@Component({
	selector: 'app-side-drawer',
	templateUrl: './side-drawer.component.html',
	styleUrls: ['./side-drawer.component.css'],
	imports: [RouterLink, RouterLinkActive, BackdropComponent],
})
export class SideDrawerComponent {
	@Input() show!: boolean;
	@Output() onToggle = new EventEmitter<boolean>();

	onClick() {
		this.show = !this.show;
		this.onToggle.emit(this.show);
	}
}
