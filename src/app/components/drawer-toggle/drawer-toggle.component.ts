import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-drawer-toggle',
	templateUrl: './drawer-toggle.component.html',
	styleUrls: ['./drawer-toggle.component.css'],
})
export class DrawerToggleComponent {
	@Input() isOpen: boolean = false;
	@Output() onClick = new EventEmitter<boolean>();

	onToggle() {
		this.isOpen = !this.isOpen;
		this.onClick.emit(this.isOpen);
	}
}
