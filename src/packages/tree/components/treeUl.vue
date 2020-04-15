<template>
    <ul class="master-tree">
        <TreeLi
            v-for="(item, index) in data"
            :key="item.id ? item.id : index"
            :item="item"
            :index="index"
            v-bind="childBind"
        />
    </ul>
</template>

<script>
import TreeLi from './treeLi'
export default {
    name: 'TreeUl',
    inheritAttrs: false,
    inject: ['isLeaf'],
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        parent: {
            type: Object,
            default: () => null,
        },
    },
    data() {
        return {}
    },
    components: { TreeLi },

    computed: {
        childBind() {
            const { data, ...otherObj } = this.$props
            const dataLength = data.filter(node => node.visible !== false).length
            return Object.assign({}, this.$attrs, otherObj, {
                dataLength,
                level: this.treeLevel,
            })
        },
    },

    beforeMount() {},

    created() {
        const parent = this.parent
    },

    methods: {},

    watch: {},
}
</script>
<style lang="scss" scoped></style>
