export default {
    name: "render",
    functional: true,
    props: {
        node: Object,
        parent: null,
        tpl: Function,
        index: Number,
        nodeMouseOver: Function,
        level: Number
    },
    render(h, ctx) {
        const { node } = ctx.props;
        return <span domPropsInnerHTML={node.title} title={node.title}></span>;
    }
};
