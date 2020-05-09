import { connect } from 'react-redux';
import { setVisibilityFilter, namespace } from '../actions';
import Link from '../components/Link';

const mapStateToProps = (state: any, ownProps: any): object => ({
  active: ownProps.filter === state[namespace].visibilityFilter,
});

const mapDispatchToProps = (dispatch: any, ownProps: any): object => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
});

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Link);

export default FilterLink;
