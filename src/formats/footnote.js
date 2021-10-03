/**
 * Footnotes.
 */

// Import WordPress Components.
import { RichTextToolbarButton, URLPopover } from '@wordpress/block-editor';
import { Button, Modal } from '@wordpress/components';
import { select } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { create, getTextContent, insert, registerFormatType, removeFormat, toggleFormat, useAnchorRef } from '@wordpress/rich-text';

import WysiwygControl from '../components/WysiwygControl';
import { setFootnoteNumbers } from '../plugins/transformations';

const name = 'wholesome/footnotes';

const FootnoteBlock = ( text, uid ) => {
	const number = '0';
	const matches = text.match( /<a[\S\s]*? class="wholesome-footnote">[\S\s]*?<\/a>/gi );
	return `<a class="wholesome-footnote" id="${ uid }" href="#footnote-${ uid }">${ text }<sup class="wholesome-footnote__number">${ number }</sup></a>`;
};

// Create Footnotes Button with Colour Selection Popover.
const FootnotesButton = ( props ) => {
	const { contentRef, isActive, onChange, value } = props;
	const { activeFormats } = value;

	// State to show popover.
	const [ showPopover, setShowPopover ] = useState( false );
	const [ footnote, setFootnote ] = useState( '' );

	// Function to get active colour from format.
	const getActiveFootnote = () => {
		const formats = activeFormats.filter( ( format ) => name === format.type );

		if ( formats.length > 0 ) {
			const format = formats[ 0 ];
			const { attributes, unregisteredAttributes } = format;

			let appliedAttributes = unregisteredAttributes;

			if ( attributes && attributes.length ) {
				appliedAttributes = attributes;
			}

			if ( Object.prototype.hasOwnProperty.call( appliedAttributes, 'id' ) ) {
				const { id } = appliedAttributes;
				console.log( id );
				return id;
			}
		}

		if ( footnote ) {
			return footnote;
		}

		return '';
	};

	const getActiveFootnoteUID = () => {
		const formats = activeFormats.filter( ( format ) => name === format.type );
		if ( formats.length > 0 ) {
			const format = formats[ 0 ];
			const { attributes, unregisteredAttributes } = format;

			let appliedAttributes = unregisteredAttributes;

			if ( attributes && attributes.length ) {
				appliedAttributes = attributes;
			}

			// If we have no attributes, use the active colour.
			if ( ! appliedAttributes ) {
				return '';
			}

			if ( Object.prototype.hasOwnProperty.call( appliedAttributes, 'id' ) ) {
				const { id } = appliedAttributes;
				return id;
			}
		}
		return '';
	};

	return (
		<>
			<RichTextToolbarButton
				icon="info-outline"
				// key={ isActive ? 'footnote' : 'footnotes-not-active' }
				// name={ isActive ? 'footnote' : undefined }
				onClick={ () => {
					setShowPopover( true );
				} }
				title={ __( 'Footnote', 'wholesome-footnotes' ) }
			/>
			{ showPopover && (
				<Modal
					className="footnotes-popover"
					onRequestClose={ () => { setShowPopover( false );  } }
					title={ __( 'Footnote', 'wholesome-footnotes' ) }
				>
					<WysiwygControl
						label={ __( 'Enter Footnote:', 'wholesome-footnotes' ) }
						slug={ `${ contentRef?.current?.id }-footnote` }
						onChange={ ( footnote ) => {
							setFootnote( footnote );
						} }
						onLoad={
							setTimeout( () => {
								const tinyMce = document.querySelector( `#editor-${ contentRef?.current?.id }-footnote` );
								if ( tinyMce ) {
									tinyMce.focus();
								}
							}, 300 )
						}
						value={ getActiveFootnote() }
						toolbars={ {
							toolbar1: 'bold,italic,bullist,numlist,link,removeformat',
							toolbar2: '',
							toolbar3: '',
							toolbar4: '',
						} }
					/>
					<Button  
						className="button button-secondary"
						onClick={ () => {
							let text = getTextContent( value ).substring( value.start, value.end );
							let uid = getActiveFootnoteUID();
						
							if ( ! footnote ) {
								console.log( 'getting rid' );
								onChange( toggleFormat( value, { type: name } ) ); // Remove Format.
							}

							if ( footnote && ! uid ) {
								uid = new Date().valueOf().toString();
								onChange(
									insert(
										value,
										create( {
											html: FootnoteBlock( text, uid ),
										} ),
									)
								);
							}

							// @todo: Do something with the footnote and the id.
							setShowPopover( false );
							setFootnote( '' );
							console.log( 'setting footnote numbers' );
							setFootnoteNumbers();
						}}
						variant="secondary"
					>
						{ __( 'Save', 'wholesome-footnotes' ) }
                    </Button>
				</Modal>
			)}
		</>
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
