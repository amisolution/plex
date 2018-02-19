import { JSONSchema4 } from 'json-schema';

export const schema: JSONSchema4 = {
	type: 'object',
	definitions: {
		currencyEnum: {
			type: 'string',
			enum: [
				'ETH',
				'BTC',
				'ADA'
			],
			default: 'ETH'
		}
	},
	properties: {
		loan: {
			type: 'object',
			title: 'How much do you want?',
			properties: {
				amount: {
					type: 'number',
					title: 'Amount'
				},
				currency: {
					'$ref': '#/definitions/currencyEnum'
				},
				description: {
					type: 'string'
				}
			},
			required: [
				'amount',
				'currency'
			]
		},
		collateral: {
			type: 'object',
			title: 'Do you want it collateralized?',
			properties: {
				collateralized: {
					type: 'boolean',
					title: 'Collateralized',
					default: true
				},
				source: {
					type: 'string',
					title: 'Collateral',
					enum: [
						'REP',
						'MKR',
						'SNT'
					],
					enumNames: [
						'Augur (REP)',
						'Maker (MKR)',
						'Status (SNT)'
					]
				},
				amount: {
					type: 'number',
				},
				currency: {
					'$ref': '#/definitions/currencyEnum'
				},
				lockupPeriod: {
					type: 'string',
					title: 'Lockup Period',
					enum: ['1Week', '1Day', 'Custom'],
					enumNames: ['1 Week', '1 Day', ' '],
					default: '1Week'
				},
				customPeriod: {
					type: 'number'
				}
			}
		},
		terms: {
			type: 'object',
			title: 'What terms would you like?',
			properties: {
				principle: {
					type: 'string',
					title: 'Principle',
					enum: ['option1'],
					enumNames: ['Selected option'],
					default: 'option1'
				},
				interest: {
					type: 'string',
					title: 'Interest',
					enum: ['option1'],
					enumNames: ['Selected option'],
					default: 'option1'
				},
				repaymentDate: {
					type: 'string',
					title: 'Repayment Date',
					enum: ['option1'],
					enumNames: ['Selected option'],
					default: 'option1'
				},
				repaymentTerms: {
					type: 'string',
					title: 'Repayment Terms',
					enum: ['option1'],
					enumNames: ['Selected option'],
					default: 'option1'
				}
			}
		}
	}
};

export const uiSchema = {
	loan: {
		classNames: 'loan-container',
		amount: {
			'ui:autofocus': true,
			'ui:placeholder': '0.00',
			classNames: 'amount-container group-field'
		},
		currency: {
			'ui:options': {
				label: false
			},
			classNames: 'currency-container group-field'
		},
		description: {
			'ui:options': {
				label: false
			},
			'ui:placeholder': 'Description (optional, but helpful to lenders)',
			classNames: 'description-container group-field'
		}

	},
	collateral: {
		classNames: 'collateral-container',
		collateralized: {
			'ui:help': 'A quick, layman\'s definition of what collateralized means and why it\'s a smart ideas goes here.',
			classNames: 'collateralized-container group-field',
			'ui:widget': 'CustomCheckbox'
		},
		source: {
			'ui:placeholder': 'Select your source of collateral',
			classNames: 'source-container group-field'
		},
		amount: {
			'ui:options': {
				label: false
			},
			'ui:placeholder': 'Amount of collateral',
			classNames: 'amount-container group-field'
		},
		currency: {
			'ui:options': {
				label: false
			},
			classNames: 'currency-container group-field'
		},
		lockupPeriod: {
			'ui:widget': 'radio',
			'ui:options': {
				inline: true
			},
			classNames: 'lockup-period-container group-field'
		},
		customPeriod: {
			'ui:options': {
				label: false
			},
			'ui:placeholder': 'X Weeks',
			classNames: 'custom-lockup-period-container group-field',
			'ui:disabled': true
		}
	},
	terms: {
		classNames: 'terms-container',
		'ui:description': 'The most commonly chosen options are selected by default.',
		principle: {
			classNames: 'principle-container group-field'
		},
		interest: {
			classNames: 'interest-container group-field'
		},
		repaymentDate: {
			classNames: 'repayment-date-container group-field'
		},
		repaymentTerms: {
			classNames: 'repayment-terms-container group-field'
		}
	}
};