import {createEventEmitter} from "../functions/createEventEmitter";

describe('EventEmitter', () => {
    test('should register and emit event', () => {
        let emitter = createEventEmitter();
        let handler = jest.fn();

        emitter.on('message', handler);

        emitter.emit('message', 'hello');

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith('hello');
    });
    test('should register and emit events', () => {
        let emitter = createEventEmitter();
        let handler = jest.fn();
        let handler1 = jest.fn();
        emitter.on('message', handler);
        emitter.on('message', handler1)

        emitter.emit('message', 'hello');

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith('hello');
        expect(handler1).toHaveBeenCalledTimes(1);
        expect(handler1).toHaveBeenCalledWith('hello');
    });

    test('should remove events', () => {
        let emitter = createEventEmitter();
        let handler = jest.fn();
        emitter.on('message', handler);

        emitter.off('message');
        emitter.emit('message', 'hello');

        expect(handler).toHaveBeenCalledTimes(0);
    });
}
)