import { Observable } from "./index.js";
import { it, expect, describe } from '@jest/globals';

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
});