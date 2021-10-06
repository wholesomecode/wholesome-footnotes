import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

registerBlockType(
	'wholesome/footnote-list',
	{
		apiVersion: 2,
		category: 'design',
		description: __( 'A list of this posts footnotes.', 'wholesome-footnote' ),
		edit: () => {
			const blockProps = useBlockProps( {
				className: 'wholesome-footnote-list',
			} );

			const meta = useSelect( ( select ) => select( 'core/editor' ).getEditedPostAttribute( 'meta' ) );
			let footnotes = meta[ 'wholesome_footnotes' ] || [];

			if ( ! footnotes ) {
				return null; // @todo: put a message here.
			}

			footnotes = footnotes.sort( ( a, b ) => a.order - b.order );

			return (
				<div { ...blockProps }>
					<ol>
						{ footnotes.map( ( note ) => {
							return (
								<li key={ note.uid } dangerouslySetInnerHTML={ { __html: note.footnote } }/>
							);
						} )}
					</ol>
				</div>
			);
		},
		icon: 'editor-ol',
		save: () => {},
		supports: {
			align: true,
		},
		textdomain: 'wholesome-footnote',
		title: __( 'Footnote List', 'wholesome-footnote' ),
	}
);
