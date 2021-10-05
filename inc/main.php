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
	// add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\enqueue_block_styles', 10 );

	add_action( 'init', __NAMESPACE__ . '\\register_meta' );
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
		PLUGIN_SLUG . '-block-styles',
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
function register_meta() {
	register_post_meta(
		'post',
		'wholesome_footnotes',
		array(
			'show_in_rest' => true,
			'single'       => true,
			'type'         => 'array',
		)
	);
}
