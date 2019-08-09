import Tree from './Tree';

class FlatTree extends Tree {
  /**
   * {children : 'subtasks' , id :'taskID', parentId : 'ParentId'}
   */
  constructor(mapping) {
    if (!mapping) alert(`Pass mapping object like mapping = {children : 'subtasks' , id :'taskID', parentId : 'ParentId'}`)
    this.children = mapping.children;
    this.parentId = mapping.parentId;
    this.id = mapping.id;
  }

  /**
   * @param {Array} model
   * @param {String} parentId
   * @param {Array} result
   * @param {Number} level
   * @param {String} parentId
   * @param {String} id
   * @description Convert composition to falt
   */
  convertModel(model, result = [],  level = 1, parentId = '#', id = '') {
    model.forEach((o, i) => {
      var newId = id + String(i);
      var obj = {...o};
      delete obj[this.children];
      obj[this.id] = newId;
      obj.level = 1;
      obj[this.parentId] = parentId;
      result.push(obj);

      if (this.hasChild(o)) {
        this.convertModel(o[this.children], result, level + 1, newId, newId)
      }
    })
    return result
  }

  /**
   * @param {Number} maxLevel
   * @param {Number} maxChild
   * @param {Array} arr
   * @param {Number} level
   * @param {String} parentId
   * @param {String} id
   * @description Generate composition fake json for test
   */
  generateModel(maxLevel, maxChild, arr = [], level = 0, parentId = '#', id = '') {
    for (var i = 0; i < maxChild; i++) {
      var newId = id + String(i)
      if (level <= maxLevel) {
        arr.push({
          title: newId,
          [this.id]: newId,
          level: level + 1,
          [this.parentId]: parentId
        })
        this.generateModel(maxLevel, maxChild, arr, level + 1, newId, newId)
      }
    }
    return arr;
  }

  /**
  * در حالت کامپوزیت برای ساخت آیدی و آیدی پدر جدید بعد از حذف  و اعمالی مثل آن استفاده میشود
  * ولی اینجا نیاز نیست چون دیتا های تو در تو وجود ندراد
  */
  updateModel(model) {
    model.forEach(o =>{
      o.show =  o.show != undefined ?  o.show : true;
      o.open =  o.open != undefined ?  o.open : true;
    })
    return model
  }


  /**
   * @param {Array} model
   * @param {String} id
   * @param {Boolean} upLevel {means add as a parent}
   * @description Add a node to as a child or parent {default is as a child}
   */
  addNode(model, id, upLevel) {
    //add as a parnet
    if (upLevel) {
      var parentNode = this.findParent(model, id);
      let parentId = (parentNode == null) ? '#' : parentNode[this.id];
      let level =(parentNode == null) ? 1 :  parentNode.level  ;
      model.push({ title: 'blank', parentId: parentId, id: (Math.random() * 100), level: level })
    }
    //add as a child
    else {
      var node = this.findNode(model, id);
      model.push({ title: 'blank', parentId: node[this.id], [this.id]: (Math.random() * 100), level: node.level })
    }

    return model
  }

  /**
   * @param {Array} model
   * @param {String} id
   * @description Remove a requested node by id
   */
  removeNode(model, id) {
    var index = this.findNodeIndex(model, id);
    model.splice(index, 1)
  }

  /**
   * @param {Array} model
   * @param {Object} newNode
   * @description Send changed to for updating in the modle
   */
  updateNode(model, newNode) {
    for (var i = 0; i < model.length; i++) {
      if (model[i][this.id] == newNode[this.id]) {
        model[i] = newNode;
        return model
      }
    }
  }


  /**
   * @param {} model
   * @param {} id
   * @description Check a node is leaf or not 
   * @return {Boolean}
   */
  isLeaf(model, node) {
    return (this.hasChild(node[this.id], model ) == false)
  }

  /**
   * @param {Object} node
   * @description Check a node has a child or not
   * @return {Boolean}
   */
  hasChild(node, model) {
    let id = node[this.id];
    for (var i = 0; i < model.length; i++) {
      if (model[i][this.parentId] == id) {
        return true
      }
    }
    return false
  }

  /**
   * @param {Object} node
   * @description Check node has a parent or not
   * @return {Boolean}
   */
  hasParent(model, id) {
    return (this.findParent(model, id) == null ? false : true)
  }

  /**
   * @param {Array} model
   * @param {String} id
   * @description Find  node based on id
   */
  findNode(model, id) {
    for (var i = 0; i < model.length; i++) {
      if (model[i][this.id] == id) {
        return model[i]
      }
    }
    return null
  }


 /**
   * @param {Array} model
   * @param {String} id
   * @description Find node childs
   */
  findChilds (model, id){
    let childs = [];
    model.forEach(o => {
      if (o[this.parentId] == id) {
        childs.push(o)
      }
    })
    return childs;
  }

  /**
   * @param {Array} model
   * @param {String} id
   * @description toggle "open property on a node"
   */
  toggleNode (model, id , rootState = null){
    model.forEach(o => {
      if (o[this.id] == id) {
        o.open = !o.open;
        if (rootState == null) rootState = o.open;
      }
      else if (o[this.parentId] == id) {
        o.show = rootState;
        if (this.hasChild(o, model)) {
          this.toggleNode(model, o[this.id], (rootState ? null :rootState  ))
        }
      }
    })
    return model
  }

  /**
   * @param {Array} model
   * @param {String} id
   * @description Find a parent based on id
   */
  findParent(model, id) {
    var obj = this.findNode(model, id);
    return this.findNode(model, obj.parentId)
  }

  /**
   * @param {Array} model
   * @param {String} id
   * @description Find  node index based on id
   */
  findNodeIndex(model, id) {
    for (var i = 0; i < model.length; i++) {
      if (model[i].id == id) {
        return i
      }
    }
    return null
  }

  /**
   * @param {Array} model
   * @description Find leafs of tree
   */
  findLeafs(model) {
    return model.filter(node => (this.isLeaf(model, node) == true))
  }

  /**
   * @param {Array} model
   * @param {Function} fn
   * @param {Array} result
   * @param {String} parentId
   * @param {Number} level
   * @description Traverse all nodes Respectively
   */
  traverseTree (model ,fn , result = [], parentId = '#', level = 1){
    model.forEach((node, i) => {
      if (node[this.parentId] == parentId) {
        node.level = level
        result.push(fn(node, i));
        if (this.hasChild(node, model) ) {
          this.traverseTree(model, fn, result, node[this.id], level+1)
        }
      }
    })
    return result;
    
  }


  /**
  * Default Rendering
  * 
  * @param {Array} modle
  */
  defaultRender(model, parentId = '#') {
    var str = '<ul>'
    model.forEach((item) => {
      if (item[this.parentId] == parentId) {
        str += `<li id="${item[this.id]}" level="${item.level}">${item.title}`;

        if (this.hasChild(item, model)) {
          str += this.render(model, item.id)
        }

        str += `</li>`;
      }
    })
    str += '</ul>';
    return str
  }

}


export default FlatTree