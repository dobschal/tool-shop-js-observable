import { Observable, ObservableArray } from "./index.js";
import { jest, it, expect, describe } from '@jest/globals';

describe("Observable", () => {

    it("should call the subscriber if value changes", () => {
        let i = 0;
        const observableData = Observable({
            text: "yeah"
        });
        observableData.$on("text", newText => {
            if (i === 0) {
                expect(newText).toBe("yeah");
            } else {
                expect(newText).toBe("uuuh");
            }
            i++
        });
        observableData.text = "uuuh";
    });

    it("should create an observable array", () => {
        const observableArray = ObservableArray([{ id: 4 }, { id: 3 }, { id: 1 }, { id: 9 }, { id: 7 }]);
        expect(typeof observableArray.sort).toBe("function");
        expect(typeof observableArray.$on).toBe("function");
        expect(observableArray[0].id).toBe(4);
        expect(observableArray[1].id).toBe(3);
    });

    it("should handle array length correctly", () => {
        const observableArray = ObservableArray([{ id: 4 }, { id: 3 }, { id: 1 }, { id: 9 }, { id: 7 }]);
        expect(observableArray.length).toBe(5);
        observableArray.push({ id: 10 });
        expect(observableArray.length).toBe(6);
    });

    it("should sort array correctly", () => {
        let observableArray = ObservableArray([{ id: 4 }, { id: 3 }, { id: 1 }, { id: 9 }, { id: 7 }]);
        observableArray.sort((a, b) => b.id - a.id);
        expect(observableArray[0].id).toBeGreaterThan(observableArray[1].id);
        expect(observableArray[1].id).toBeGreaterThan(observableArray[2].id);
        expect(observableArray[2].id).toBeGreaterThan(observableArray[3].id);
        expect(observableArray[3].id).toBeGreaterThan(observableArray[4].id);
        expect(observableArray.map(i => i.id).join(", ")).toBe("9, 7, 4, 3, 1");
    });

    it("should call when array is sorted", () => {
        const mockFn = jest.fn();
        let observableArray = ObservableArray([{ id: 4 }, { id: 3 }, { id: 1 }, { id: 9 }, { id: 7 }]);
        observableArray.$on("sort", sortedArray => {
            mockFn();
            expect(sortedArray[0].id).toBe(9);
            expect(typeof sortedArray.$on).toBe("function");
        });
        observableArray.sort((a, b) => b.id - a.id);
        expect(mockFn).toBeCalledTimes(1);
    });

    it("should return the index on findIndex", () => {
        let observableArray = ObservableArray([{ id: 4 }, { id: 3 }, { id: 1 }, { id: 9 }, { id: 7 }]);
        const index = observableArray.findIndex(({ id }) => id === 1);
        expect(index).toBe(2);
    });
});