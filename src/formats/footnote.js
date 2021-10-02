/**
 * Footnotes.
 */

// Import WordPress Components.
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { create, insert, registerFormatType } from '@wordpress/rich-text';

import { setFootnoteNumbers } from '../plugins/transformations';

const name = 'wholesome/footnotes';

const FootnoteBlock = ( text ) => {
	const number = '0';
	const uid = new Date().valueOf().toString();
	return `<a class="wholesome-footnote" href="#${ uid }">${ text }<sup>${ number }</sup></a>`;
};

// Create Footnotes Button with Colour Selection Popover.
const FootnotesButton = ( props ) => {
	const { isActive, onChange, value } = props;
	return (
		<RichTextToolbarButton
			icon="info-outline"
			onClick={ () => {
				const text = wp.richText.getTextContent( value ).substring( value.start, value.end );
				onChange(
					insert(
						value,
						create( {
							html: FootnoteBlock( text ),
						} ),
					)
				);
				setFootnoteNumbers();
			} }
			title={ __( 'Footnote', 'wholesome-footnotes' ) }
		/>
	);
};

// Register the Format.
registerFormatType(
	name, {
		className: 'wholesome-footnote',
		edit: FootnotesButton,
		tagName: 'a',
		title: __( 'Footnote', 'wholesome-footnotes' ),
	}
);
