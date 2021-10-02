/**
 * Footnotes.
 */

// Import WordPress Components.
import { createBlock } from '@wordpress/blocks';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { create, insert, registerFormatType } from '@wordpress/rich-text';

const setFootnoteNumbers = () => {
	let i = 1;

	const blocks = wp.data.select( 'core/block-editor' ).getBlocks();
	const newBlocks = {};

	blocks.forEach( ( block ) => {
		const { content } = block.attributes;
		if ( content.includes( 'class="wholesome-footnote"' ) ) {
			const matches = content.match( /<a[\S\s]*? class="wholesome-footnote">[\S\s]*?<\/a>/gi );
			matches.forEach( ( match ) => {
				const newNumber = `<sup>${ i }</sup>`;

				if ( ! match.includes( newNumber ) ) {
					const originalNumber = match.match( /<sup>[\S\s]*?<\/sup>/gi );
					const newMatch = match.replace( originalNumber, newNumber );

					const selectedBlock = newBlocks[ block.clientId ];
					if ( selectedBlock ) {
						selectedBlock.newContent = selectedBlock.newContent.replace( match, newMatch );
					} else {
						newBlocks[ block.clientId ] = {
							...block,
							newContent: content.replace( match, newMatch ),
						};
					}
				}
				i++;
			} );
		}
	} );

	Object.values( newBlocks ).forEach( ( block ) => {
		const { name, newContent } = block;
		const newBlock = createBlock( name, { content: newContent } );
		dispatch( 'core/block-editor' ).replaceBlock(
			block.clientId,
			newBlock,
		);
	} );
};

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
