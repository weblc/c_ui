<template>
    <div class="c-switch">
        <div class="wrapper">
            <span>
                <slot></slot>
            </span>
            <span class="c-switch_title">{{ title }}</span>
            <div
                :class="[
                    { checked: checked },
                    { 'is-disable': disabled },
                    'switch-box'
                ]"
                @click="switchValue"
            >
                <span :class="{ checked: !checked }"></span>
            </div>
            <!--
    <input
    type="checkbox"
    @change="handleChange"
    :true-value="activeValue"
    :false-value="inactiveValue"
    :disabled="disabled"
    :value="value"> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "CSwitch",
    data() {
        return {};
    },
    props: {
        value: {
            type: [Boolean, String, Number],
            default: false
        },
        activeValue: {
            type: [Boolean, String, Number],
            default: true
        },
        inactiveValue: {
            type: [Boolean, String, Number],
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ""
        }
    },
    computed: {
        checked() {
            return this.value === this.activeValue;
        }
    },
    methods: {
        switchValue() {
            !this.disabled && this.handleChange();
        },
        handleChange() {
            const val = this.checked ? this.inactiveValue : this.activeValue;
            this.$emit("input", val);
            this.$emit("change", val);
        }
    }
};
</script>

<style lang="scss" scoped>
.c-switch {
    font-size: 14px;
    display: inline-block;
    div.wrapper {
        display: flex;

        input {
            display: none;
        }
        .c-switch_title {
            margin-right: 2px;
        }
        .switch-box {
            display: inline-flex;
            align-items: center;
            width: 40px;
            height: 20px;
            background-color: rgb(255, 73, 73);
            border-radius: 10px;
            display: flex;
            align-items: center;
            padding: 0 2px;
            box-sizing: border-box;
            position: relative;
            cursor: pointer;
            margin-left: 6px;

            &.checked {
                background-color: rgb(19, 206, 102);
            }

            &.is-disable {
                background-color: #ccc;

                span {
                    left: 2px;
                }
            }

            span {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                display: inline-block;
                background-color: #fff;
                position: absolute;
                left: 22px;
                transition: 200ms;

                &.checked {
                    left: 2px;
                }
            }
        }
    }
}
</style>
