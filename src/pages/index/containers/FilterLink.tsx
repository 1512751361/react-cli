import reduxComponent from '@src/common/redux/connect';
import { namespace, SET_VISIBILITY_FILTER } from '../actions';
import Link from '../components/Link';
import { ModelState } from '../reducer';

interface TStateProps {
  active: boolean;
}

interface TDispatchProps {
  onClick: () => void;
}

interface TOwnProps {
  filter: string;
}

const mapStateToProps = (state: ModelState, ownProps: any): TStateProps => ({
  active: ownProps.filter === state.visibilityFilter,
});

const FilterLink = reduxComponent<ModelState, TStateProps, TDispatchProps, TOwnProps>(
  namespace,
  mapStateToProps,
  ({ emit }, { filter }) => ({
    onClick: () => emit(SET_VISIBILITY_FILTER, { filter }),
  }),
)(Link);

export default FilterLink;
