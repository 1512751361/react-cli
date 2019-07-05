import { connect } from 'react-redux';
import Login from './Login';
import { login } from './actions';


const mapStateToProps = (state, ownProps) => ({
	active: ownProps.filter === state.modules.index.visibilityFilter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	loginSubmit: (loginInfo) => {
		dispatch(login(loginInfo));
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
