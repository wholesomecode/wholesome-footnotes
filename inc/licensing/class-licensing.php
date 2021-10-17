<?php
/**
 * Licensing.
 *
 * Connects the plugin to the Freemius plugin repository to allow it
 * to receive updates.
 *
 * @package wholesome-footnotes
 */

namespace Wholesome\Footnotes\Licensing; // @codingStandardsIgnoreLine

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use const Wholesome\Footnotes\ROOT_DIR;

/**
 * Licensing Class.
 */
class Licensing {

	/**
	 * Instance.
	 *
	 * @var object License Object.
	 */
	private static $instance = null;

	/**
	 * Licence.
	 *
	 * @var object Freemius Licence Object.
	 */
	private $license = null;

	/**
	 * Constructor.
	 */
	private function __construct() {

		// Include Freemius SDK.
		require_once ROOT_DIR . '/inc/licensing/freemius/start.php';

		$this->license = fs_dynamic_init(
			array(
				'id'               => '9159',
				'slug'             => 'wholesome-footnotes',
				'type'             => 'plugin',
				'public_key'       => 'pk_f5c8cf18241f3ca436f3bf317d8ca',
				'is_premium'       => true,
				'is_premium_only'  => true,
				'has_addons'       => false,
				'has_paid_plans'   => true,
				'is_org_compliant' => false,
				'menu'             => array(
					'slug'    => 'wholesome-footnotes',
					'contact' => false,
					'support' => false,
					'parent'  => array(
						'slug' => 'options-general.php',
					),
				),
			)
		);
	}

	/**
	 * Get instance.
	 *
	 * @return object License Object.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new Licensing();
		}

		return self::$instance;
	}

	/**
	 * Is Active.
	 *
	 * @return bool
	 */
	public function is_active() {
		return $this->license->can_use_premium_code();
	}

	/**
	 * Get License.
	 *
	 * @return object
	 */
	public function get_license() {
		return $this->license;
	}
}
