var mercury = require('mercury')
var h = require('micro-css/h')(mercury.h)

var externalEditors = {
  chunk: require('./chunk.js')
}

module.exports = function(node){
  var data = node()

  var setup = node.context.setup
  var collection = node.context.collection

  var innerData = node.resolved() || {}
  if (innerData.node && innerData.node !== 'external'){
    var editor = externalEditors[getRoot(innerData.node)]
    if (editor){
      return editor(node)
    }
  }
  return h('div ExternalNode', [
    h('header',[
      h('span', data.id + ' (external)'),
      h('button.remove Button -warn', {
        'ev-click': mercury.event(collection.remove, node),
      }, 'X')
    ])
  ])
}

function getRoot(nodeName){
  if (nodeName){
    var index = nodeName.indexOf('/')
    if (~index){
      return nodeName.slice(0, index)
    }
  }
  return nodeName
}