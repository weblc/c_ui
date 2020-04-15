<template>
    <TreeUl v-bind="DataBind" />
</template>

<script>
import TreeUl from './treeUl'
export default {
    name: 'Tree',
    components: { TreeUl },
    provide() {
        return {
            isLeaf: this.isLeaf,
            setAttr: this.setAttr,
            childChecked: this.childCheckedHandle,
            parentChecked: this.parentCheckedHandle,
        }
    },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        DataBind() {
            return Object.assign({}, this.$attrs, this.$props)
        },
    },
    data() {
        return {}
    },

    beforeMount() {},

    mounted() {},

    methods: {
        isLeaf(node) {
            return !(node.children && node.children.length)
        },
        childCheckedHandle(node, checked) {
            const { children } = node
            if (children && children.length) {
                children.forEach(child => {
                    this.$set(child, 'checked', checked)
                    this.$set(child, 'parentCheckedToChildren', true)
                    this.childCheckedHandle(child, checked)
                })
            }
        },
        parentCheckedHandle(parentNode, checked) {
            if (!parentNode || !!parentNode.checked === checked) return false
            let allBortherNodeChecked = checked
            const childNodes = parentNode.children
            if (checked) {
                allBortherNodeChecked = childNodes.every(child => child.checked)
            }
            this.$set(parentNode, 'checked', allBortherNodeChecked)
        },

        setAttr(node, attr, val = true) {
            this.$set(node, attr, val)
        },
    },

    watch: {},
}
</script>
<style lang="scss">
.v-enter-active {
    transition: all 0.3s ease;
    height: 50px;
    overflow: hidden;
}
.v-leave-active {
    transition: all 0.3s ease;
    height: 0px;
    overflow: hidden;
}

.master-tree {
    font-size: 14px;
    /deep/ul,
    li {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    ul {
        padding-left: 17px;
        padding-top: 10px;
    }
    li {
        padding: 5px 5px 5px 15px;
        position: relative;
        list-style: none;
        &::before,
        &::after {
            content: '';
            left: -8px;
            position: absolute;
            right: auto;
            border-width: 1px;
        }
        &::before {
            border-left: 1px dashed #999;
            bottom: 50px;
            height: 100%;
            top: -8px;
            width: 1px;
        }
        &::after {
            top: 17px;
            border-top: 1px dashed #999;
            height: 20px;
            width: 21px;
        }
        &:last-child {
            &::before {
                height: 26px;
            }
        }
        &.first-node {
            &::before {
                top: 17px;
            }
        }
        &.second-node {
            &::before {
                top: 4px;
            }
        }
    }
    /deep/.tree-expand {
        display: inline-block;
        width: 14px;
        height: 14px;
        text-align: center;
        line-height: 13px;
        border: 1px solid #888;
        border-radius: 2px;
        background: #fff;
        font-style: normal;
        &.tree-open::after {
            content: '\2013';
        }
        &.tree-close::after {
            content: '+';
        }
    }
    .inputCheck {
        display: inline-block;
        position: relative;
        width: 14px;
        height: 14px;
        border: 1px solid #888;
        border-radius: 2px;
        top: 3px;
        text-align: center;
        font-size: 14px;
        line-height: 14px;
        margin: 0 3px;
        .check {
            display: block;
            position: absolute;
            font-size: 14px;
            width: 16px;
            height: 16px;
            left: -5px;
            top: -4px;
            border: 1px solid #000;
            opacity: 0;
            cursor: pointer;
            -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
            filter: alpha(opacity=0);
            z-index: 2;
        }
        &.box-checked:after {
            content: '\2713';
            display: block;
            position: absolute;
            z-index: 1;
            width: 100%;
            text-align: center;
        }
    }
}
</style>
