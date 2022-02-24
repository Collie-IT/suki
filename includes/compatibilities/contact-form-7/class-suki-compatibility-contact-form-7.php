<?php
/**
 * Plugin compatibility: Contact Form 7
 *
 * @package Suki
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Contact Form 7 compatibility class.
 */
class Suki_Compatibility_Contact_Form_7 {

	/**
	 * Singleton instance
	 *
	 * @var Suki_Compatibility_Contact_Form_7
	 */
	private static $instance;

	/**
	 * ====================================================
	 * Singleton & constructor functions
	 * ====================================================
	 */

	/**
	 * Get singleton instance.
	 *
	 * @return Suki_Compatibility_Contact_Form_7
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Class constructor
	 */
	protected function __construct() {
		// Compatibility CSS (via theme inline CSS).
		add_filter( 'suki/frontend/dynamic_css', array( $this, 'add_compatibility_css' ) );
	}

	/**
	 * ====================================================
	 * Hook functions
	 * ====================================================
	 */

	/**
	 * Add compatibility CSS via inline CSS.
	 *
	 * @param string $inline_css Inline CSS string.
	 * @return string
	 */
	public function add_compatibility_css( $inline_css ) {
		$inline_css .= "\n/* Contact Form 7 compatibility CSS */\n" . suki_minify_css_string( '.wpcf7 input:not([type="submit"]):not([type="checkbox"]):not([type="radio"]), .wpcf7 textarea, .wpcf7 select { width: 100%; }' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		return $inline_css;
	}
}

Suki_Compatibility_Contact_Form_7::instance();
