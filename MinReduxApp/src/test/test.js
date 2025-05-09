import { addTask, deleteTask, editTask, toggleTask } from '../store/action';
import {tasksReducer} from '../store/reducer'
import expect from "expect";
// import { tasksReducer } from '../store/reducer';
function sleep(t){
    var timeStamp = new Date().getTime();
    var endTime = timeStamp + t;
    while(true){
        if (new Date().getTime() > endTime){
            return;
        }
    }
}
describe('Test for reducer',()=>{
    test('Test add task',()=>{
        let initialState = {
            tasks: JSON.parse(localStorage.getItem('tasks')) || [],
            loading: false,
            error: null
        };

        expect(JSON.parse(localStorage.getItem("tasks"))).toBe(null)
        initialState = tasksReducer(initialState,addTask("new Task"))
        expect(initialState.tasks.length).toBe(1)
        expect(JSON.parse(localStorage.getItem("tasks")).length).toBe(1)
        localStorage.clear()
    });
    test('Test delete task',()=>{
        let initialState = {
            tasks: JSON.parse(localStorage.getItem('tasks')) || [],
            loading: false,
            error: null
        };
        expect(JSON.parse(localStorage.getItem("tasks"))).toBe(null)
        initialState = tasksReducer(initialState,addTask("new Task"))
        sleep(1)
        initialState = tasksReducer(initialState,addTask("another new Task"))
        let tasksInLocal = JSON.parse(localStorage.getItem("tasks"));
        expect(tasksInLocal.length).toBe(2)
        initialState = tasksReducer(initialState,deleteTask(tasksInLocal[0].id))
        tasksInLocal = JSON.parse(localStorage.getItem("tasks"));
        expect(tasksInLocal.length).toBe(1)
        expect(initialState.tasks.length).toBe(1)
        localStorage.clear()
    });
    test('Test edit task',()=>{
        let initialState = {
            tasks: JSON.parse(localStorage.getItem('tasks')) || [],
            loading: false,
            error: null
        };
        expect(JSON.parse(localStorage.getItem("tasks"))).toBe(null)
        initialState = tasksReducer(initialState,addTask("new Task"))
        let tasksInLocal = JSON.parse(localStorage.getItem("tasks"));
        expect(tasksInLocal.length).toBe(1)
        expect(initialState.tasks.length).toBe(1)

        initialState = tasksReducer(initialState, editTask(initialState.tasks[0].id, "edited"))
        tasksInLocal = JSON.parse(localStorage.getItem("tasks"));
        expect(tasksInLocal[0].text).toBe("edited")
        expect(initialState.tasks[0].text).toBe("edited")
        localStorage.clear()
    });

    test('Test toggle task',()=>{
        let initialState = {
            tasks: JSON.parse(localStorage.getItem('tasks')) || [],
            loading: false,
            error: null
        };
        expect(JSON.parse(localStorage.getItem("tasks"))).toBe(null)
        initialState = tasksReducer(initialState,addTask("new Task"))
        let tasksInLocal = JSON.parse(localStorage.getItem("tasks"));
        expect(tasksInLocal.length).toBe(1)
        expect(initialState.tasks.length).toBe(1)
        expect(tasksInLocal[0].completed).toBe(false)
        expect(initialState.tasks[0].completed).toBe(false)

        initialState = tasksReducer(initialState, toggleTask(initialState.tasks[0].id))
        tasksInLocal = JSON.parse(localStorage.getItem("tasks"));
        expect(tasksInLocal[0].completed).toBe(true)
        expect(initialState.tasks[0].completed).toBe(true)
        localStorage.clear()
    });
})