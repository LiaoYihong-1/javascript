import { Store, combineReducers } from '../core/Store';
import { tasksReducer } from './reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer
});

export const store = new Store(rootReducer);
