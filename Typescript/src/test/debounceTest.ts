// debounce.test.js
import { debounce } from '../functions/debounce'; // Assuming the debounce function is in debounce.js

describe('debounce', () => {
    jest.useFakeTimers(); // Use Jest's timer mocking features

    test('should delay function execution', () => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn();
        jest.advanceTimersByTime(50); // Advance timers by 50ms
        expect(mockFn).not.toHaveBeenCalled(); // Should not be called yet

        jest.advanceTimersByTime(50); // Advance another 50ms (total 100ms)
        expect(mockFn).toHaveBeenCalledTimes(1); // Should be called exactly once
    });

    test('should reset timer on subsequent calls', () => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn();
        jest.advanceTimersByTime(80); // Advance 80ms
        debouncedFn(); // Call again, resetting the timer
        jest.advanceTimersByTime(80); // Advance another 80ms (total 160ms, but new timer is at 80ms)
        expect(mockFn).not.toHaveBeenCalled(); // Not enough time for new timer

        jest.advanceTimersByTime(20); // Advance another 20ms (new timer reaches 100ms)
        expect(mockFn).toHaveBeenCalledTimes(1); // Should be called now
    });

    test('should preserve context and arguments', () => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 100);
        const context = { value: 42 };
        const args = [1, 'test', true];

        debouncedFn.apply(context, args);
        jest.runAllTimers(); // Execute all pending timers

        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith(...args); // Verify arguments are passed correctly
        expect(mockFn.mock.instances[0]).toBe(context); // Verify context (this) is preserved
    });
});