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
			let footnotes = meta.wholesome_footnotes || [];

			if ( ! footnotes ) {
				return null; // @todo: put a message here.
			}

			footnotes = footnotes.sort( ( a, b ) => a.order - b.order );

			return (
				<aside { ...blockProps }>
					<h2 id="wholesome-footnote-list__heading" className="screen-reader-text">{ __( 'Footnotes' ) }</h2>
					<ol>
						{ footnotes.map( ( note ) => {
							const tags = note.footnote.match( /<.+?>/ig );
							const backLink = ' <a class="wholesome-footnote-list__item-back" href="#${ note.uid }" aria-label="${__(\'Back to content\')}" title="${__(\'Back to content\')}">↵</a>';
							
							let footnote = note.footnote + backLink;

							if ( tags ) {
								let endTag = tags.at( -1 );
								if ( endTag === '</ul>' || endTag === '</ol>' ) {
									endTag = tags[ tags.length - 2 ];
								}
								footnote = note.footnote.replace( new RegExp( `${ endTag }$` ), backLink + endTag );
							}

							return (
								<li id={ 'footnote-' + note.uid } className="wholesome-footnote-list__item" key={ note.uid } dangerouslySetInnerHTML={ { __html: footnote } }/>
							);
						} )}
					</ol>
				</aside>
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
