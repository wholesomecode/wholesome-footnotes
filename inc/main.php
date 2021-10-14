<?php
/**
 * Main plugin file.
 *
 * @package wholesome-footnotes
 */

namespace Wholesome\Footnotes; // @codingStandardsIgnoreLine

/**
 * Setup
 *
 * @return void
 */
function setup() : void {
	// Load text domain.
	load_plugin_textdomain( 'wholesome-footnotes', false, ROOT_DIR . '\languages' );

	// Enqueue Block Editor Assets.
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets', 10 );

	// Enqueue Block Styles for Frontend and Backend.
	add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\enqueue_block_styles', 10 );

	// Register meta.
	add_action( 'init', __NAMESPACE__ . '\\register_post_meta' );

	// Register blocks.
	add_action( 'init', __NAMESPACE__ . '\\register_blocks', 20 );
}

/**
 * Enqueue Block Editor Assets
 *
 * @throws \Error Warn if asset dependencies do not exist.
 *
 * @return void
 */
function enqueue_block_editor_assets() : void {

	$asset_path = ROOT_DIR . '/build/index.asset.php';

	if ( ! file_exists( $asset_path ) ) {
		throw new \Error(
			esc_html__( 'You need to run `npm start` or `npm run build` in the root of the plugin "wholesome-footnotes" first.', 'wholesome-footnotes' )
		);
	}

	$scripts = '/build/index.js';
	$assets  = include $asset_path;

	wp_enqueue_script(
		PLUGIN_SLUG . '-block-scripts',
		plugins_url( $scripts, ROOT_FILE ),
		$assets['dependencies'],
		$assets['version'],
		false
	);

	$styles = '/build/index.css';

	wp_enqueue_style(
		PLUGIN_SLUG . '-block-styles',
		plugins_url( $styles, ROOT_FILE ),
		array(),
		filemtime( ROOT_DIR . $styles )
	);

	wp_set_script_translations(
		PLUGIN_SLUG . '-block-scripts',
		'wholesome-footnotes',
		ROOT_DIR . '\languages'
	);
}

/**
 * Enqueue Block Styles for Frontend and Backend.
 *
 * @return void
 */
function enqueue_block_styles() : void {

	$styles = '/build/style-index.css';

	wp_enqueue_style(
		PLUGIN_SLUG . '-styles',
		plugins_url( $styles, ROOT_FILE ),
		array(),
		filemtime( ROOT_DIR . $styles )
	);
}

/**
 * Register Meta.
 *
 * Register the meta fields so that we can update them directly from Gutenberg.
 *
 * @return void
 */
function register_post_meta() {

	register_meta(
		'post', // @todo, make this work on any post type.
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

	register_meta(
		'post', // @todo, make this work on any post type.
		'wholesome_footnotes',
		array(
			'auth_callback' => function() {
				return current_user_can( 'edit_posts' );
			},
			'default'       => array(),
			'show_in_rest'  => true,
			'single'        => true,
			'type'          => 'number',
		)
	);
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
							$link    = ' <a class="wholesome-footnote-list__item-back" href="#' . esc_attr( $footnote['uid'] ) . 'aria-label="' . esc_html__( 'Back to content', 'wholesome-footnotes' ) . ' title="' . esc_html__( 'Back to content', 'wholesome-footnotes' ) . '">↵</a>';
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
								if ( $end_tag === '</ul>' || $end_tag === '</ol>' ) {
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
