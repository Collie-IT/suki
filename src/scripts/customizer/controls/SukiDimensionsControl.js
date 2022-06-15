/**
 * Dimensions control (React)
 */

import SukiControlLabel from '../components/SukiControlLabel';
import SukiControlDescription from '../components/SukiControlDescription';
import SukiControlResponsiveSwitcher from '../components/SukiControlResponsiveSwitcher';
import SukiControlResponsiveContainer from '../components/SukiControlResponsiveContainer';

import { convertDimensionValueIntoNumberAndUnit } from '../utils';

import {
	__experimentalGrid as Grid,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

wp.customize.SukiDimensionsControl = wp.customize.SukiReactControl.extend( {
	renderContent: function() {
		const control = this;

		const directions = [
			SukiCustomizerData.l10n.top,
			SukiCustomizerData.l10n.right,
			SukiCustomizerData.l10n.bottom,
			SukiCustomizerData.l10n.left,
		];

		ReactDOM.render(
			<>
				{ control.params.label &&
					<SukiControlLabel target={ '_customize-input-' + control.id }>
						{ control.params.label }
						<SukiControlResponsiveSwitcher devices={ Object.keys( control.params.responsiveStructures ) }/>
					</SukiControlLabel>
				}

				{ control.params.description &&
					<SukiControlDescription id={ '_customize-description-' + control.id }>
						{ control.params.description }
					</SukiControlDescription>
				}
				
				{ Object.keys( control.params.responsiveStructures ).map( ( device ) => {
					const settingId = control.params.responsiveStructures[ device ];

					let value = control.settings[ settingId ].get();

					if ( 'string' === typeof value ) {
						value = value.split( ' ' );
					}

					const valueArray = [
						value[0] ?? '',
						value[1] ?? '',
						value[2] ?? '',
						value[3] ?? '',
					];
					
					return (
						<SukiControlResponsiveContainer
							key={ device }
							device={ device }
						>
							<Grid
								columns="4"
								gap="1"
							>
								{ valueArray.map( ( subValue, i ) => {
									/**
									 * @todo Wait for `parseQuantityAndUnitFromRawValue` to be available on UnitControl, and then we can replace our manual (non-safe) parsing with it instead.
									 */

									const [ subValueNumber, subValueUnit ] = convertDimensionValueIntoNumberAndUnit( subValue, control.params.units );

									const subValueUnitObj = control.params.units.find( ( item ) => {
										return subValueUnit === item.value
									} );

									return (
										<UnitControl
											key={ device + '-' + i }
											label={ directions[i] }
											labelPosition="bottom"
											value={ subValue }
											isResetValueOnUnitChange
											units={ control.params.units }
											min={ '' === subValueUnitObj.min ? -Infinity : subValueUnitObj.min }
											max={ '' === subValueUnitObj.max ? Infinity : subValueUnitObj.max }
											step={ '' === subValueUnitObj.step ? 1 : subValueUnitObj.step }
											className="suki-dimension"
											onChange={ ( newSubValue ) => {
												newSubValue = isNaN( parseFloat( newSubValue ) ) ? '' : newSubValue;

												valueArray[i] = newSubValue;

												// control.settings[ settingId ].set( '' );
												control.settings[ settingId ].set( valueArray );
											} }
										/>
									);
								} ) }
							</Grid>
						</SukiControlResponsiveContainer>
					);
				} ) }
			</>,
			control.container[0]
		);
	},
} );

wp.customize.controlConstructor['suki-dimensions'] = wp.customize.SukiDimensionsControl;