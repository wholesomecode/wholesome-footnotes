import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import withTimeStamp from '../containers/withTimeStamp';

registerBlockType(
	'wholesome/footnote',
	{
		attributes: {
			number: {
				type: 'string',
			},
			text: {
				type: 'string',
			},
			uid: {
				type: 'string',
				default: '',
			},
		},
		apiVersion: 2,
		category: 'design',
		description: __( 'Footnote.', 'wholesome-footnote' ),
		edit: withTimeStamp( ( { attributes } ) => {
			const { number, text, uid } = attributes;
			return (
				<a className="wholesome-footnote" href={ `#${ uid }` }>
					{text}
					<sup>{number}</sup>
				</a>
			);
		} ),
		icon: 'info-outline',
		// parent: [ 'wholesome/block' ],
		save: ( { attributes } ) => {
			const { number, text, uid } = attributes;
			return (
				<a className="wholesome-footnote" href={ `#${ uid }` }>
					{text}
					<sup>{number}</sup>
				</a>
			);
		},
		supports: false,
		textdomain: 'wholesome-footnote',
		title: __( 'Footnote', 'wholesome-footnote' ),
	}
);
