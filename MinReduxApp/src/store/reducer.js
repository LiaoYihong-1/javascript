// store/reducers.js
import { ADD_TASK, DELETE_TASK, EDIT_TASK, TOGGLE_TASK } from './action';

const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    loading: false,
    error: null
};

export function tasksReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK:
            const newTask = {
                id: Date.now(),
                text: action.payload,
                completed: false
            };
            const newTasksAdd = [...state.tasks, newTask];
            return { ...state, tasks: newTasksAdd };

        case DELETE_TASK:
            const newTasksDelete = state.tasks.filter(task => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(newTasksDelete));
            return { ...state, tasks: newTasksDelete };

        case EDIT_TASK:
            const newTasksEdit = state.tasks.map(task =>
                task.id === action.payload.id
                    ? { ...task, text: action.payload.newText }
                    : task
            );
            return { ...state, tasks: newTasksEdit };

        case TOGGLE_TASK:
            const newTasksToggle = state.tasks.map(task =>
                task.id === action.payload
                    ? { ...task, completed: !task.completed }
                    : task
            );
            return { ...state, tasks: newTasksToggle };

        default:
            return state;
    }
}