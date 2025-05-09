
export class Store {
    constructor(reducer, initialState = {}) {
        this.state = initialState;
        this.reducer = reducer;
        this.listeners = [];
        this.dispatch({ type: '@@INIT' });
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach(listener => listener());
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
}

export function combineReducers(reducers) {
    return (state = {}, action) => {
        const newState = {};
        Object.keys(reducers).forEach(key => {
            newState[key] = reducers[key](state[key], action);
        });
        return newState;
    };
}
