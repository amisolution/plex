import { connect } from 'react-redux';
import { ActiveDebtOrder } from './ActiveDebtOrder';

const mapStateToProps = (state: any) => {
	return {
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
	};
};

export const ActiveDebtOrderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ActiveDebtOrder);
