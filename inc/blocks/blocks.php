<?php
/**
 * Blocks
 *
 * @package wholesome-footnotes
 */

namespace Wholesome\Footnotes\Blocks; // @codingStandardsIgnoreLine

/**
 * Setup
 *
 * @return void
 */
function setup() : void {
	// Register meta.
	add_action( 'init', __NAMESPACE__ . '\\register_post_meta' );

	// Register blocks.
	add_action( 'init', __NAMESPACE__ . '\\register_blocks', 20 );
}

/**
 * Register Meta.
 *
 * Register the meta fields so that we can update them directly from Gutenberg.
 *
 * @return void
 */
function register_post_meta() {
	$post_types = get_post_types();

	foreach ( $post_types as $post_type ) {
		register_meta(
			$post_type,
			'wholesome_footnotes',
			array(
				'auth_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
				'default'       => array(),
				'show_in_rest'  => array(
					'schema' => array(
						'type'  => 'array',
						'items' => array(
							'footnote' => 'string',
							'order'    => 'number',
							'uid'      => 'string',
						),
					),
				),
				'single'        => true,
				'type'          => 'array',
			)
		);
	}
}

/**
 * Register Blocks.
 *
 * @return void
 */
function register_blocks() {
	register_block_type(
		'wholesome/footnote-list',
		array(
			'render_callback' => function() {
				$footnotes = get_post_meta( get_the_ID(), 'wholesome_footnotes', true );
				if ( ! $footnotes ) {
					return '';
				}

				ob_start();
				?>
				<aside class="wholesome-footnote-list">
					<h2 id="wholesome-footnote-list__heading" class="screen-reader-text"><?php esc_html_e( 'Footnotes', 'wholesome-footnotes' ); ?></h2>
					<ol>
						<?php
						foreach ( $footnotes as $footnote ) {
							$link    = ' <a class="wholesome-footnote-list__item-back" href="#' . esc_attr( $footnote['uid'] ) . '" aria-label="' . esc_html__( 'Back to content', 'wholesome-footnotes' ) . ' title="' . esc_html__( 'Back to content', 'wholesome-footnotes' ) . '">↵</a>';
							$matches = null;
							preg_match_all(
								'/<.+?>/im',
								$footnote['footnote'],
								$matches,
								PREG_PATTERN_ORDER
							);

							$tags = $matches[0];
							$note = $footnote['footnote'] . $link;

							if ( is_array( $tags ) && ! empty( $tags ) ) {
								$end_tag = $tags[ count( $tags ) - 1 ];
								if ( '</ul>' === $end_tag || '</ol>' === $end_tag ) {
									$end_tag = $tags[ count( $tags ) - 2 ];
								}
								$note = str_replace( $end_tag, $link . $end_tag, $footnote['footnote'] );
							}
							?>
								<li id="footnote-<?php echo esc_attr( $footnote['uid'] ); ?>" class="wholesome-footnote-list__item"><?php echo wp_kses_post( $note ); ?></li>
							<?php
						}
						?>
					</ol>
				</aside>
				<?php
				return ob_get_clean();
			},
		)
	);
}
