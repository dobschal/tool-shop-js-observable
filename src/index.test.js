import { Widget } from "./index.js";
import { jest, it, expect, describe } from '@jest/globals';

describe("Widget", () => {
    it("should set children from callback", () => {
        const el = Widget({
            children: cb => cb([Widget({
                text: "yeah"
            })])
        });
        expect(el.childNodes[0].innerText).toBe("yeah");
    });
    it("should set text passed to the callback", () => {
        const el = Widget({
            text: (cb) => {
                cb("Nice Text");
            }
        });
        expect(el.innerText).toBe("Nice Text");
    });
    it("should return an instance of HTMLElement with tag div as default", () => {
        const el = Widget();
        expect(el instanceof HTMLElement).toBeTruthy();
        expect(el.tagName.toLowerCase()).toBe("div");
    });
    it("should set the given text as innerText", () => {
        const testString = "Yeah";
        const el = Widget({
            text: testString
        });
        expect(el.innerText).toBe(testString);
    });
    it("should call onclick callback", () => {
        const onClickMock = jest.fn();
        const el = Widget({
            tag: "button",
            onClick: onClickMock
        });
        el.click();
        expect(onClickMock).toBeCalled();
    });
    it("should add the widget to the given HTML parent element", () => {
        const parent = document.createElement("div");
        const el = Widget({ parent });
        expect(el).toBe(parent.children[0]);
    });
    it("should add a child", () => {
        const el = Widget({
            child: Widget({
                text: "yeah"
            })
        });
        expect(el.children[0].innerText).toBe("yeah");
    });
    it("should add children", () => {
        const el = Widget({
            children: [Widget({
                text: "yeah"
            }), Widget({
                text: "yeah2"
            })]
        });
        expect(el.children[0].innerText).toBe("yeah");
        expect(el.children[1].innerText).toBe("yeah2");
    });
    it("should set attributes", () => {
        const el = Widget({
            attr: {
                id: "yeah"
            }
        });
        expect(el.getAttribute("id")).toBe("yeah");
    });
});