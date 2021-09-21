import { withSelect } from '@wordpress/data';
import { ifCondition,compose } from '@wordpress/compose';
import { createBlock, cloneBlock } from '@wordpress/blocks';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { registerFormatType, toggleFormat, insert, insertObject, slice, toHTMLString} from '@wordpress/rich-text';

class MyCustomButton extends Component {

	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		const blockOrder = wp.data.select( 'core/block-editor' ).getBlockOrder();
		let i = 1;
		wp.data.subscribe( () => {
			const newBlockOrder = wp.data.select( 'core/block-editor' ).getBlockOrder();

			if ( blockOrder === newBlockOrder ) {
				return;
			}

			console.log( 'ORDER CHANGED' );

			const { blocks } = this.props;

			blocks.forEach( ( block ) => {
				// console.log( block );
				if ( block.originalContent.includes( 'hello-world' ) ) {
					console.log( 'SPECIAL', i );
					i++;
				}
			} );

			
		});
	}
	
	render() {
		return ( <RichTextToolbarButton
			icon='editor-code'
			title='Matt'
			onClick={ () => {
				// const selection = slice( this.props.value, this.props.value.start, this.props.value.end);
				// console.log( selection.text );
				// const { blocks } = this.props;

				// const newBlock = createBlock('core/paragraph', { content: 'TEST' });

				// blocks.forEach( ( block ) => {
				// 	console.log( block );
				// 	wp.data.dispatch('core/block-editor').replaceBlock(
				// 		block.clientId,
				// 		cloneBlock(newBlock),
				// 	);
				// } );
				let imgWidth = 50;
				let url = 'http://wholesome-plugins.test/wp-content/uploads/2021/08/Wholesome-Code-Ident.png';
				let alt = 'alt';
				this.props.onChange(
				// 	console.log('test')
					toggleFormat( this.props.value, {
                        type: 'my-custom-format/sample-output',
						attributes: { url: 'http://www.google.com' },
                    } )
				// 	// insert( props.value, 'hello')
				// 	// insertObject( props.value, {
				// 	// 	type: 'core/image',
				// 	// 	attributes: {
				// 	// 		className: `wp-image-${ id }`,
				// 	// 		style: `width: ${ Math.min(
				// 	// 			imgWidth,
				// 	// 			150
				// 	// 		) }px;`,
				// 	// 		url,
				// 	// 		alt,
				// 	// 	}
				// 	// } )
				);
			} }
			isActive={ this.props.isActive }
		/>
	)}
};

var ConditionalButton = compose(
	withSelect( function( select ) {
		const blocks = select( 'core/block-editor' ).getBlocks()
		return {
			selectedBlock: select('core/block-editor').getSelectedBlock(),
			blocks,
		}
	} ),
	ifCondition( function( props ) {
		return (
			props.selectedBlock &&
			props.selectedBlock.name === 'core/paragraph'
		); 
	} )
)( MyCustomButton );

registerFormatType(
	'my-custom-format/sample-output', {
		title: 'Matt',
		tagName: 'span',
		className: 'hello-world',
		edit: ConditionalButton,
	}
);