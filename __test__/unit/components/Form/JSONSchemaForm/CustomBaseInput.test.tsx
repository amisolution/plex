import * as React from 'react';
import { shallow } from 'enzyme';
import { CustomBaseInput } from 'src/components/Form/JSONSchemaForm/CustomBaseInput';
import { PressEnter } from 'src/components/Form/JSONSchemaForm/PressEnter';

describe('<CustomBaseInput />', () => {
	let wrapper;
	const props = {
		id: 'input-id',
		placeholder: 'Some placeholder',
		required: true,
		disabled: false,
		readonly: false,
		value: '',
		options: {
			pressEnter: true
		},
		onChange: jest.fn()
	};

	beforeEach(() => {
		wrapper = shallow(<CustomBaseInput {... props} />);
	});

	it('should render the component', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('should render an <input /> component', () => {
		expect(wrapper.find('input').length).toEqual(1);
	});

	it('should render the correct id', () => {
		expect(wrapper.find('input').prop('id')).toBe(props.id);
	});

	it('should render the correct placeholder', () => {
		expect(wrapper.find('input').prop('placeholder')).toBe(props.placeholder);
	});

	it('should have the correct required attr', () => {
		expect(wrapper.find('input').prop('required')).toBe(props.required);
	});

	it('should have the correct disabled attr', () => {
		expect(wrapper.find('input').prop('disabled')).toBe(props.disabled);
	});

	it('should have the correct readOnly attr', () => {
		expect(wrapper.find('input').prop('readOnly')).toBe(props.readonly);
	});

	it('should not render a <PressEnter /> component when options.pressEnter is false', () => {
		wrapper.setProps({ options: {pressEnter: false}});
		expect(wrapper.find(PressEnter).length).toEqual(0);
	});

	it('should render a <PressEnter /> component when options.pressEnter is undefined', () => {
		wrapper.setProps({ options: {pressEnter: undefined}});
		expect(wrapper.find(PressEnter).length).toEqual(1);
	});

	it('calls onChange prop when the input is changed', () => {
		wrapper.find('input').simulate('change', {target: {value: 'some value'}});
		expect(props.onChange.mock.calls.length).toBe(1);
	});
});
