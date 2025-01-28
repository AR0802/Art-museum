export class Art {
	constructor(
		public id: number,
		public title: string,
		public artist_title: string,
		public is_public_domain: boolean,
		public image_id: string,
		public date_end?: any,
		public date_display?: string,
		public style_title?: string,
		public place_of_origin?: string,
		public dimensions?: string,
		public credit_line?: string
	) {}
}
