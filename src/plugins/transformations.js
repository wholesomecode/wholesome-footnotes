import { createBlock } from '@wordpress/blocks';
import { dispatch, select, subscribe } from '@wordpress/data';
import { debounce } from 'lodash';

export const setFootnoteNumbers = () => {
	let i = 1;

	const blocks = select( 'core/block-editor' ).getBlocks();
	const currentBlock = select( 'core/block-editor' ).getSelectedBlock();
	const newBlocks = {};
	const existingBlocks = [];
	const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' );
	const footnotes = meta?.wholesome_footnotes || [];
	const uidOrder = {};

	blocks.forEach( ( block ) => {
		const { content } = block.attributes;
		if ( content?.includes( 'class="wholesome-footnote__number"' ) ) {
			// Remove orphans.
			const childMatches = content.match( /<sup[^<>]+"wholesome-footnote__number">[^<>]+<\/sup>\s/gi );
			if ( childMatches ) {
				childMatches.forEach( ( match ) => {
					const selectedBlock = newBlocks[ block.clientId ];
					if ( selectedBlock ) {
						selectedBlock.newContent = selectedBlock.newContent.replace( match, '' );
					} else {
						newBlocks[ block.clientId ] = {
							...block,
							newContent: content.replace( match, '' ),
							isSelected: currentBlock && currentBlock.clientId === block.clientId,
						};
					}
				} );
			}

			// Reorder numbers.
			const matches = content.match( /<a[\S\s]*? class="wholesome-footnote">[\S\s]*?<\/a>/gi );
			if ( matches ) {
				matches.forEach( ( match ) => {
					const newNumber = `<sup class="wholesome-footnote__number">${ i }</sup>`;
					const regex = new RegExp( 'id="(.*?)"', 'gi' );
					const uid = regex.exec( match )[ 1 ];
					existingBlocks.push( uid );
					if ( ! match.includes( newNumber ) ) {
						const originalNumber = match
							.match( /<sup class="wholesome-footnote__number">[\S\s]*?<\/sup>/gi );
						const newMatch = match.replace( originalNumber, newNumber );

						const selectedBlock = newBlocks[ block.clientId ];
						if ( selectedBlock ) {
							selectedBlock.newContent = selectedBlock.newContent.replace( match, newMatch );
						} else {
							newBlocks[ block.clientId ] = {
								...block,
								newContent: content.replace( match, newMatch ),
								isSelected: currentBlock && currentBlock.clientId === block.clientId,
							};
						}

						uidOrder[ uid ] = i;
					}
					i++;
				} );
			}
		}
	} );

	Object.values( newBlocks ).forEach( ( block ) => {
		const { name, newContent, isSelected } = block;
		const newBlock = createBlock( name, { content: newContent } );
		dispatch( 'core/block-editor' ).replaceBlock(
			block.clientId,
			newBlock,
		);

		if ( isSelected ) {
			dispatch( 'core/block-editor' ).selectBlock( newBlock.clientId );
		}
	} );

	const newFootnotes = [ ...footnotes.filter( ( { uid } ) => existingBlocks.includes( uid ) ) ];
	let hasFootnotesChanged = false;

	if ( newFootnotes.length !== footnotes.length ) {
		hasFootnotesChanged = true;
	}

	// Reorder UIDs.
	if ( Object.keys( uidOrder ).length > 0 ) {
		for ( const [ uid, order ] of Object.entries( uidOrder ) ) {
			const key = Object.keys( newFootnotes ).find( ( key ) => newFootnotes[ key ].uid === uid ) || null;
			if ( key ) {
				newFootnotes[ key ] = {
					...newFootnotes[ key ],
					order,
				};
				hasFootnotesChanged = true;
			}
		}
	}

	if ( hasFootnotesChanged ) {
		dispatch( 'core/editor' ).editPost( {
			meta: {
				wholesome_footnotes: newFootnotes,
				wholesome_footnotes_updated: new Date().valueOf().toString(),
			},
		} );
	}

	return Promise.resolve();
};

const doReorderAndResubscribe = async () => {
	await setFootnoteNumbers();
	const newBlockOrder = select( 'core/block-editor' ).getBlockOrder();
	// eslint-disable-next-line no-use-before-define
	setFootnotesOnOrderChange( newBlockOrder, newBlockOrder );
};

export const setFootnotesOnOrderChange = ( blockOrder = [], lastBlockOrder = [] ) => {
	const unsubscribe = subscribe( () => {
		if ( ! blockOrder.length ) {
			blockOrder = select( 'core/block-editor' ).getBlockOrder();
		}

		const blocks = select( 'core/block-editor' ).getBlocks();
		const newBlockOrder = select( 'core/block-editor' ).getBlockOrder();

		if ( ! blocks || blockOrder === newBlockOrder ) {
			return;
		}

		if ( lastBlockOrder === newBlockOrder ) {
			return;
		}

		lastBlockOrder = newBlockOrder;

		// Wait until Gutenberg has done the move.
		setTimeout( () => {
			doReorderAndResubscribe();
			unsubscribe();
		}, 500 );
	} );
};

export const setFootnotesOnDeletion = () => {
	let footnoteInitialCount = 0;

	document.addEventListener( 'keydown', debounce( () => {
		const footnoteCount = document.querySelectorAll( '.wholesome-footnote' )?.length;
		if ( footnoteInitialCount < footnoteCount ) {
			footnoteInitialCount = footnoteCount;
		}
	} ), 500 );

	document.addEventListener( 'keyup', debounce( () => {
		const footnoteCount = document.querySelectorAll( '.wholesome-footnote' )?.length;
		if ( footnoteInitialCount > footnoteCount ) {
			setFootnoteNumbers();
			footnoteInitialCount = footnoteCount;
		}
	} ), 500 );
};
