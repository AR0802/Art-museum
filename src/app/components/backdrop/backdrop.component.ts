import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-backdrop',
	templateUrl: './backdrop.component.html',
	styleUrls: ['./backdrop.component.css'],
})
export class BackdropComponent {
	@Input() show!: boolean;
	@Output() onToggle = new EventEmitter<boolean>();

	onClick() {
		this.show = !this.show;
		this.onToggle.emit(this.show);
	}
}
