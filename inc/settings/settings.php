<?php
/**
 * Settings.
 *
 * Plugin settings page.
 *
 * @package wholesome-footnotes
 */

namespace Wholesome\Footnotes\Settings; // @codingStandardsIgnoreLine

use const Wholesome\Footnotes\PLUGIN_PREFIX;
use const Wholesome\Footnotes\PLUGIN_SLUG;

const SETTING_REPORT_BUG_SECTION      = PLUGIN_PREFIX . '__report_bug_section';
const SETTING_REPORT_BUG              = PLUGIN_PREFIX . '__report_bug';
const SETTING_REQUEST_FEATURE_SECTION = PLUGIN_PREFIX . '__request_feature_section';
const SETTING_REQUEST_FEATURE         = PLUGIN_PREFIX . '__request_feature';
const SETTING_MANAGE_ACCOUNT_SECTION  = PLUGIN_PREFIX . '__manage_account_section';
const SETTING_MANAGE_ACCOUNT          = PLUGIN_PREFIX . '__manage_account';
const SUPPORT_EMAIL                   = 'support@wholesomecode.ltd';

/**
 * Setup
 *
 * @return void
 */
function setup() : void {
	add_action( 'admin_init', __NAMESPACE__ . '\\register_setting_fields' );
	add_action( 'admin_menu', __NAMESPACE__ . '\\add_settings_page' );
}

/**
 * Register Settings Fields.
 *
 * @return void
 */
function register_setting_fields() : void {

	// Add Section.
	add_settings_section(
		SETTING_REPORT_BUG_SECTION,
		__( 'Report a Bug', 'wholesome-footnotes' ),
		function() {
			$subject = esc_html__( 'Footnotes - Bug Report', 'wholesome-footnotes' );
			$content = esc_html__( 'Please describe the bug in as much detail as possible, provide step by step instructions on how it can be replicated and where possible provide screenshots.', 'wholesome-footnotes' );
			?>
			<p>
				<?php esc_html_e( 'Help us to keep the plugin running smoothly by reporting bugs. Use the button below to generate an email template so that you can report a bug.', 'wholesome-footnotes' ); ?>
			</p>
			<p class="submit">
				<a href="mailto:<?php echo esc_html( SUPPORT_EMAIL ); ?>?subject=<?php echo esc_html( $subject ); ?>&body=<?php echo esc_html( $content ); ?>" class="button button-primary"><?php esc_html_e( 'Report Bug', 'wholesome-footnotes' ); ?></a></p>
			<?php
		},
		PLUGIN_SLUG
	);

	// Add Section.
	add_settings_section(
		SETTING_REQUEST_FEATURE_SECTION,
		__( 'Request a Feature', 'wholesome-footnotes' ),
		function() {
			$subject = esc_html__( 'Footnotes - Feature Request', 'wholesome-footnotes' );
			$content = esc_html__( 'Please describe your requested feature in as much detail as possible, provide step by step instructions on how you would like to to work, and if possible provide diagrams or annotated screenshots.', 'wholesome-footnotes' );
			?>
			<p>
				<?php esc_html_e( 'Help us improve the plugin by requesting a feature. Use the button below to generate an email template so that you can request a feature. All feature requests are considered.', 'wholesome-footnotes' ); ?>
			</p>
			<p class="submit"><a href="mailto:<?php echo esc_html( SUPPORT_EMAIL ); ?>?subject=<?php echo esc_html( $subject ); ?>&body=<?php echo esc_html( $content ); ?>" class="button button-primary"><?php esc_html_e( 'Request Feature', 'wholesome-footnotes' ); ?></a></p>
			<?php
		},
		PLUGIN_SLUG
	);

	// Add Section.
	add_settings_section(
		SETTING_MANAGE_ACCOUNT_SECTION,
		__( 'Manage your Account', 'wholesome-footnotes' ),
		function() {
			?>
			<p>
				<?php esc_html_e( 'Manage your account via the Freemius system.', 'wholesome-footnotes' ); ?>
			</p>
			<p class="submit"><a href="<?php echo esc_url( admin_url( 'options-general.php?page=wholesome-footnotes-account' ) ); ?>" class="button button-primary"><?php esc_html_e( 'Manage Account', 'wholesome-footnotes' ); ?></a></p>
			<?php
		},
		PLUGIN_SLUG
	);
}

/**
 * Add Settings Page.
 *
 * Add a settings page to the settings menu item.
 *
 * @return void
 */
function add_settings_page() : void {
	add_submenu_page(
		'options-general.php',
		__( 'Footnotes', 'wholesome-footnotes' ),
		__( 'Footnotes', 'wholesome-footnotes' ),
		'manage_options',
		PLUGIN_SLUG,
		__NAMESPACE__ . '\\render_html'
	);
}

/**
 * Render HTML.
 *
 * Renders the settings page html. In this instance the WP Settings API fields.
 *
 * @return void
 */
function render_html() : void {
	?>
	<div class="wrap">
		<h2>
			<?php esc_html_e( 'Footnotes', 'wholesome-footnotes' ); ?>
		</h2>

		<form action="options.php" method="POST">
			<?php settings_fields( PLUGIN_SLUG ); ?>
			<?php do_settings_sections( PLUGIN_SLUG ); ?>
		</form>
	</div>
	<?php
}
