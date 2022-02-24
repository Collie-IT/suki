<?php
/**
 * Customizer custom control: Heading
 *
 * @package Suki
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( class_exists( 'WP_Customize_Control' ) && ! class_exists( 'Suki_Customize_Control_Heading' ) ) {
	/**
	 * Heading control class
	 */
	class Suki_Customize_Control_Heading extends Suki_Customize_Control {
		/**
		 * Control type.
		 *
		 * @var string
		 */
		public $type = 'suki-heading';

		/**
		 * Render control's content
		 */
		protected function render_content() {
			if ( ! empty( $this->label ) ) {
				?>
				<span class="tabindex" tabindex="0"></span>
				<h4 class="suki-heading"><span><?php echo $this->label; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span></h4>
				<?php
				if ( ! empty( $this->description ) ) {
					?>
					<p class="description customize-control-description"><?php echo $this->description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
					<?php
				}
			}
		}
	}
}
