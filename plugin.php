<?php
/**
 * Plugin Name:       Footnotes
 * Description:       Select some text in your gutenberg blocks and insert a footnote. Includes a footnote block to insert at the bottom of your page, or template tag for your template.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            wholesomecode
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wholesome-footnotes
 *
 * @package           wholesome-footnotes
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function wholesome_footnotes_wholesome_footnotes_block_init() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'wholesome_footnotes_wholesome_footnotes_block_init' );
