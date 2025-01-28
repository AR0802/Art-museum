import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpService {
	constructor(private http: HttpClient) {}

	getArtList() {
		return this.http.get(
			'https://api.artic.edu/api/v1/artworks?page=102&limit=9'
		);
	}

	getGalleryArtList(currentPage: number = 1, pageSize: number = 3) {
		return this.http.get(
			`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=${pageSize}`
		);
	}

	getArtById(id: number) {
		return this.http.get(`https://api.artic.edu/api/v1/artworks/${id}`);
	}

	getArtBySearch(name: string) {
		return this.http.get(
			`https://api.artic.edu/api/v1/artworks/search?q=${name}&limit=9`
		);
	}
}
