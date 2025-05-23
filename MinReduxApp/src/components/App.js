import { Component } from '../core/Components';
import { Navbar } from './Navbar';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import {About} from "./About";
import {Router} from "../core/Router";
import {store} from "../store/store";

export class App extends Component {
    constructor() {
        super();
        this.loaded = false;
        this.taskList = new TaskList();
        this.taskForm = new TaskForm();
        this.router = new Router();
        this.about = new About();
        this.router.addRoute("/",()=> {
            this.loadTask()
        });
        this.router.addRoute("/about",()=>{
            this.loadAbout()
        });
        this.nav = new Navbar(this.router)
        this.appRoot = document.createElement('div')
        this.router.handleRoute()
        this.loaded = true;
        if (store) {
            store.subscribe(() => this.update());
        }
    }

    loadTask(){
        console.log("loadTask")
        // 删除所有子元素
        while (this.appRoot.firstChild) {
            this.appRoot.removeChild(this.appRoot.firstChild);
        }
        this.appRoot.appendChild(this.nav.mount())
        this.appRoot.appendChild(this.taskForm.mount())
        this.appRoot.appendChild(this.taskList.mount())
    }
    loadAbout(){
        console.log("loadAbout")
        while (this.appRoot.firstChild) {
            this.appRoot.removeChild(this.appRoot.firstChild);
        }
        this.appRoot.appendChild(this.about.mount())
    }
    render() {
        // 创建整个应用结构
        return this.createElement('div', {
            style: {
                fontFamily: 'Arial, sans-serif',
                maxWidth: '800px',
                margin: '0 auto',
                padding: '20px'
            }
        }, [
            this.appRoot
        ]);
    }
}