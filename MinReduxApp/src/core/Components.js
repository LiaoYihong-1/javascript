export class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
        this.element = null;
        this.children = [];
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.update();
    }

    createElement(tag, attributes = {}, children = []) {
        let element = document.createElement(tag);

        // 设置属性
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'style' && typeof value === 'object') {
                Object.assign(element.style, value);
            } else if (key.startsWith('on') && typeof value === 'function') {
                element.addEventListener(key.substring(2).toLowerCase(), value);
            } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                element.setAttribute(key, value);
            }
        });

        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof HTMLElement) {
                element.appendChild(child);
            } else if (Array.isArray(child)) {
                child.forEach(c => element.appendChild(c));
            }
        });

        return element;
    }

// 默认 render 实现（返回空 div）
    render() {
        return this.createElement('div', {}, []); // 默认返回空容器
    }
    mount(parent) {
        if (!this.element) {
            this.element = this.render();
        }
        if (parent) {
            parent.appendChild(this.element);
        }
        return this.element;
    }

    unmount() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    update() {
        let oldElement = this.element;
        this.element = this.render();
        if (oldElement && oldElement.parentNode) {
            oldElement.parentNode.replaceChild(this.element, oldElement);
        }
    }
}