import { JSONSchema4 } from 'json-schema';

export const schema: JSONSchema4 = {
	type: 'object',
	required: [
		'principalAmount',
		'principalTokenSymbol',
		'interestRate',
		'amortizationUnit',
		'termLength'
	],
	properties: {
		principalAmount: {
			type: 'number',
			title: 'Principal Amount',
			description: 'Enter the amount of tokens you would like to borrow'
		},
		principalTokenSymbol: {
			type: 'string',
			title: 'Principal Token',
			enum: [
				'REP',
				'MKR',
				'ZRX'
			],
			enumNames: [
				'Augur (REP)',
				'Maker DAO (MKR)',
				'0x Token (ZRX)'
			]
		},
		interestRate: {
			type: 'number',
			title: 'Interest Rate',
			description: 'Specify your desired interest rate'
		},
		amortizationUnit: {
			type: 'string',
			title: 'Installments Type',
			enum: [
				'hours',
				'days',
				'weeks',
				'months',
				'years'
			],
			enumNames: [
				'Hourly',
				'Daily',
				'Weekly',
				'Monthly',
				'Yearly'
			],
			description: 'Specify how often you would like repayments to be due'
		},
		termLength: {
			type: 'number',
			title: 'Term Length',
			description: 'Enter the length of the entire debt agreement, in units of the chosen installments (e.g. a term length of 2 with an installment type of "monthly" would be equivalent to a 2 month long loan)'
		}
	}
};

export const uiSchema = {
	principalAmount: {
		'ui:autofocus': true,
		'ui:placeholder': '100.3'
	},
	principalTokenSymbol: {
		'ui:placeholder': 'select'
	},
	interestRate: {
		'ui:placeholder': '8.12%'
	},
	amortizationUnit: {
		'ui:placeholder': 'select'
	},
	termLength: {
		'ui:placeholder': '3'
	}
};