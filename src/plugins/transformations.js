import { createBlock } from '@wordpress/blocks';
import { dispatch, select, subscribe } from '@wordpress/data';

export const setFootnoteNumbers = () => {
	let i = 1;

	const blocks = wp.data.select( 'core/block-editor' ).getBlocks();
	const currentBlock = wp.data.select( 'core/block-editor' ).getSelectedBlock();
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
							isSelected: currentBlock && currentBlock.clientId === block.clientId,
						};
					}
				}
				i++;
			} );
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
};

const doReorderAndResubscribe = ( blockOrder, lastBlockOrder ) => {
	setFootnoteNumbers();
	// eslint-disable-next-line no-use-before-define
	setFootnotesOnOrderChange( blockOrder, lastBlockOrder );
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
			doReorderAndResubscribe( blockOrder, lastBlockOrder );
			unsubscribe();
		}, 500 );
	} );
};
