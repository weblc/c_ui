import Tree from './components'

Tree.install = function (Vue) {
  Vue.component(Tree.name, Tree)
}

export default Tree
