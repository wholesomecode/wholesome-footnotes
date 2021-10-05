import { createBlock } from '@wordpress/blocks';
import { dispatch, select, subscribe } from '@wordpress/data';

export const setFootnoteNumbers = () => {
	let i = 1;

	const blocks = select( 'core/block-editor' ).getBlocks();
	const currentBlock = select( 'core/block-editor' ).getSelectedBlock();
	const newBlocks = {};
	const meta = select('core/editor').getEditedPostAttribute('meta');
	const footnotes = meta[ 'wholesome_footnotes' ] || [];
	const uidOrder = {};

	blocks.forEach( ( block ) => {
		const { content } = block.attributes;
		if ( content.includes( 'class="wholesome-footnote__number"' ) ) {
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
					if ( ! match.includes( newNumber ) ) {
						const originalNumber = match.match( /<sup class="wholesome-footnote__number">[\S\s]*?<\/sup>/gi );
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
						console.log( uid );
						console.log( i );
						uidOrder[uid] = i;
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

	// Reorder UIDs.
	// console.log( uidOrder );
	// console.log( Object.keys(uidOrder).length );
	if ( Object.keys( uidOrder ).length > 0) {
		console.log( 'do reorder' );
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
		if ( ! blockOrder ) {
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
