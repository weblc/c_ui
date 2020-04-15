"use strict";

var Transition = {
    "before-enter"(el) {
        if (!el.dataset) el.dataset = {};

        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;

        el.style.height = "0";
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
    },
    enter(el) {
        console.log(el);
        el.dataset.oldOverflow = el.style.overflow;
        if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + "px";
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        } else {
            el.style.height = "";
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }
        el.style.overflow = "hidden";
    },
    "after-enter"(el) {
        el.style.height = "";
        el.style.overflow = el.dataset.oldOverflow;
    },
    "before-leave"(el) {
        if (!el.dataset) el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;

        el.style.height = el.scrollHeight + "px";
        el.style.overflow = "hidden";
    },
    leave(el) {
        if (el.scrollHeight !== 0) {
            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
        }
    },
    "after-leave"(el) {
        el.style.height = "";
        el.style.overflow = el.dataset.oldOverflow;
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
};
export default {
    name: "CollapseTransition",
    functional: true,
    render(h, { children }) {
        const data = {
            on: Transition
        };
        return h("transition", data, children);
    }
};
