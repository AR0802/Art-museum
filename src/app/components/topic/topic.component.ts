import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-topic',
	templateUrl: './topic.component.html',
	styleUrl: './topic.component.css',
})
export class TopicComponent {
	@Input() intro: string = '';
	@Input() description: string = '';
}
