import { createStore, combineReducers } from 'redux';
import usersReducer from './reducers/usersReducer';
import occurrencesReducer from './reducers/occurrencesReducer';


const rootReducer = combineReducers({
    users: usersReducer,
    occurrences: occurrencesReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;