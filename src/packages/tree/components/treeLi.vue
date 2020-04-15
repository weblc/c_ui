<template>
    <li :class="liClass">
        <div>
            <span
                @click="expandNode(item)"
                v-if="showExpand"
                :class="[item.expanded ? 'tree-open' : 'tree-close', 'tree-expand']"
            ></span>
            <span :class="[item.checked ? 'box-checked' : 'box-unchecked', 'inputCheck']">
                <input
                    :checked="item.checked"
                    type="checkbox"
                    class="check"
                    @change="changeCheckStatus(item, $event)"
                />
            </span>

            <Render :node="item" />
        </div>
        <template v-if="showNextUl">
            <collapse-transition>
                <TreeUl :data="item.children" v-show="item.expanded" :parent="item" />
            </collapse-transition>
        </template>
    </li>
</template>

<script>
import Render from './render'
import CollapseTransition from '../collapse-transition'
export default {
    name: '',
    props: {
        item: {
            type: Object,
            default: () => {},
        },
        index: Number,
        parent: {
            type: Object,
            default: () => null,
        },
        dataLength: {
            type: Number,
            default: 0,
        },
    },
    inject: ['isLeaf', 'setAttr', 'childChecked', 'parentChecked'],
    data() {
        return {}
    },
    beforeCreate() {
        this.$options.components.TreeUl = require('./treeUl.vue').default
    },
    components: {
        Render,
        CollapseTransition,
    },

    computed: {
        liClass() {
            const index = this.index
            let res
            if (this.parent) {
                res = {
                    leaf: this.isLeaf(this.item),
                }
            } else {
                // top node
                res = {
                    'first-node': index === 0,
                    'only-node': this.dataLength === 1,
                    'second-node': index === 1,
                }
            }
            return res
        },
        itemVisible() {
            const { visible = true } = this.item
            return visible
        },

        showExpand() {
            const isShow = !this.parent ? this.topMustExpand : false
            return isShow || this.hasChildren
        },
        hasChildren() {
            const item = this.item
            return item.children && item.children.length > 0
        },
        showNextUl() {
            return this.hasExpanded
        },
        hasExpanded() {
            // 已经展开过
            let { hasExpanded = false, expanded = false } = this.item
            return this.itemVisible && (expanded || hasExpanded)
        },
    },

    beforeMount() {},

    mounted() {},

    methods: {
        nodeCheck(node, checked) {
            this.$set(node, 'checked', checked)
            this.childChecked(node, checked)
        },
        expandNode(node) {
            const expended = !node.expanded
            this.setAttr(node, 'hasExpanded', true)
            this.setAttr(node, 'expanded', expended)
        },
        changeCheckStatus(node, $event) {
            const checked = $event.target.checked
            this.nodeCheck(node, checked)
        },
        theParentChecked(checked) {
            const parentNode = this.parent
            this.parentChecked(parentNode, checked)
        },
        checkedChange() {
            const { checked = false } = this.item
            this.theParentChecked(checked)
        },
    },

    watch: {
        'item.checked': {
            handler() {
                this.checkedChange()
            },
            immediate: true,
        },
    },
}
</script>
<style lang="scss"></style>
