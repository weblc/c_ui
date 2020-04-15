<template>
    <div class="all">
        <!-- <div>
            <p>switch: </p>
             <c-switch  v-model="lightSwitch" @change="test" title="是否欠债:" />
             <c-switch  v-model="lightSwitch1" @change="test" title="穷:" />
        </div>
        <div class="tooltip">
            <p>tooltip: </p>
            <c-tooltip content="白主题"  placement="left" theme="light" always>
                <span>右</span>
             </c-tooltip>
            <c-tooltip content="白bauasdklajk主题"  placement="top" theme="light" always>
                <span>上</span>
             </c-tooltip>
            <c-tooltip content="黑主题"  placement="bottom" theme="dark" always>
                <span>下</span>
             </c-tooltip>
            <c-tooltip content="黑主题"  placement="left" theme="dark" always>
                <span>左</span>
             </c-tooltip>
        </div>
        <div class="btn-style">
            <p>button:</p>
             <div class="button">
            <c-button >默认</c-button>
            <c-button type="primary">primary</c-button>
            <c-button type="success">success</c-button>
            <c-button type="warning">warning</c-button>
            <c-button type="error">error</c-button>
            </div>
        <div class="ghost">
            <c-button type="ghost">穿透ghost</c-button>
        </div>
        </div>
        <div class="message">
            <c-button   @click="test1">message</c-button>
            <c-button   @click="test2">success</c-button>
            <c-button   @click="test3">warn</c-button>
            <c-button   @click="test4">error</c-button>
        </div> -->
        <!-- <div class="tree">
            <c-tree :data="treeData" multiple="true"></c-tree>
        </div> -->
        <c-button @click="notice"></c-button>
    </div>
</template>
<script>
import CSwitch from './packages/switch/index'
import CTooltip from './packages/tooltip/index'
import CButton from './packages/button/index'
import CTree from './packages/tree/index'
export default {
    components: { CSwitch, CTooltip, CButton, CTree },
    data() {
        return {
            lightSwitch: true,
            lightSwitch1: false,
            treeData: [
                {
                    title: 'this is title1',
                    children: [
                        {
                            title: 'this is title1-2',
                            children: [{ title: 'this is title1-2' }],
                        },
                        { title: 'this is title1-2' },
                        { title: 'this is title1-1' },
                        { title: 'this is title1-1' },
                        { title: 'this is title1-1' },
                        { title: 'this is title1-1' },
                        { title: 'this is title1-1' },
                        { title: 'this is title1-1' },
                    ],
                },
                { title: 'this is title2' },
                { title: 'this is title3' },
            ],
        }
    },
    methods: {
        notice() {
            this.$notice.open({
                title:'测试',
                date:'2020-03-23',
               
            })
        },
        test1() {
            this.$message({
                message: '测试1111111111111111111',
            })
        },
        test2() {
            this.$message({
                type: 'success',
                message: '测试22221',
            })
        },
        test3() {
            this.$message({
                type: 'warning',
                message: '测试22221',
            })
        },
        test4() {
            this.$message({
                type: 'error',
                message: '测试22221',
            })
        },
        test() {
            console.log(123)
        },
    },
    mounted() {},
}
</script>
<style lang="scss" scoped>
.all > div {
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
}
.all > .tooltip {
    padding-bottom: 60px;
    > div {
        margin-right: 100px;
    }
}
.btn-style {
    padding: 10px;
    .ghost {
        margin: 2px auto;
        display: flex;
        padding: 10px 20px;
        background: #42b983;
    }
    .button {
        .c-btn {
            margin: 0 10px;
        }
    }
}
.message {
    .c-btn {
        margin: 0 10px;
    }
}
.all > .tree {
    padding-left: 50px;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
