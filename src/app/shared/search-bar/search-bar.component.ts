import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	imports: [FormsModule],
	styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
	onSubmit(form: NgForm) {
		if (!form.valid) {
			return;
		}
	}
}
