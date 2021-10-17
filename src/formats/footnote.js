/**
 * Footnotes.
 */

// React Imports.
import PropTypes from 'prop-types';

// Import WordPress Components.
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { Button, Modal } from '@wordpress/components';
import { dispatch, useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	create,
	getTextContent,
	insert,
	registerFormatType,
	toggleFormat,
} from '@wordpress/rich-text';

import WysiwygControl from '../components/WysiwygControl';
import { setFootnoteNumbers } from '../plugins/transformations';

const name = 'wholesome/footnotes';

const FootnoteBlock = ( text, uid ) => {
	const number = '0';
	return `<a aria-describedby="wholesome-footnote-list__heading" `
	+ `title="${ __( 'Footnote' ) }" class="wholesome-footnote" id="${ uid }" `
	+ `href="#footnote-${ uid }">${ text }<sup class="wholesome-footnote__number">${ number }</sup></a>`;
};

// Create Footnotes Button with Colour Selection Popover.
const FootnotesButton = ( props ) => {
	const { contentRef, isActive, onChange, value } = props;
	const { activeFormats } = value;

	// State to show popover.
	const [ showPopover, setShowPopover ] = useState( false );
	const [ footnote, setFootnote ] = useState( '' );

	const meta = useSelect( ( select ) => select( 'core/editor' ).getEditedPostAttribute( 'meta' ) );
	const footnotes = meta?.wholesome_footnotes || [];

	const getActiveFootnote = () => {
		// eslint-disable-next-line no-use-before-define
		const uid = getActiveFootnoteUID();
		const selectedFootnote = footnotes?.filter( ( footnote ) => uid === footnote.uid );
		if ( selectedFootnote && selectedFootnote.length ) {
			return selectedFootnote[ 0 ]?.footnote || '';
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
				isActive={ isActive }
				onClick={ () => {
					setShowPopover( true );
				} }
				title={ __( 'Footnote', 'wholesome-footnotes' ) }
			/>
			{ showPopover && (
				<Modal
					className="footnotes-popover"
					onRequestClose={ ( { type } ) => {
						if ( type !== 'blur' ) {
							setShowPopover( false );
						}
					} }
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
								const tinyMce = document
									.querySelector( `#editor-${ contentRef?.current?.id }-footnote` );
								if ( tinyMce ) {
									tinyMce.focus();
								}
							}, 500 )
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
							const text = getTextContent( value ).substring( value.start, value.end );
							let uid = getActiveFootnoteUID();

							if ( ! footnote ) {
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

							const newFootnotes = [ ...footnotes ];
							const key = Object.keys( newFootnotes )
								.find( ( key ) => newFootnotes[ key ].uid === uid ) || null;
							const order = newFootnotes[ uid ]?.order || 0;

							const note = {
								uid,
								footnote,
								order,
							};

							if ( key ) {
								newFootnotes[ key ] = note;
							} else {
								newFootnotes.push( note );
							}

							dispatch( 'core/editor' ).editPost( {
								meta: {
									wholesome_footnotes: newFootnotes,
									wholesome_footnotes_updated: new Date().valueOf().toString(),
								},
							} );

							setShowPopover( false );
							setFootnote( '' );
							setFootnoteNumbers();
						} }
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

FootnotesButton.propTypes = {
	isActive: PropTypes.bool.isRequired,
	contentRef: PropTypes.shape( {
		current: PropTypes.objectOf( PropTypes.shape( {
			id: PropTypes.string,
		} ) ),
	} ).isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.shape( {
		activeFormats: PropTypes.arrayOf( PropTypes.shape( {} ) ),
		end: PropTypes.number,
		start: PropTypes.number,
	} ).isRequired,
};
