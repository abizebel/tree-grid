import Tree from './Tree';



class CompositionTree extends Tree {

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
   * @description flat to composition {falat data always have parentid and id dont let to generate it server need real ids}
   */
  convertModel(model, parentId = '#', result = [],  level = 1 ) {
    model.forEach((o, i) => {
      if(!o[this.parentId]) o[this.parentId] = '#';
      if (o[this.parentId] == parentId) {
        var obj = o;
        obj[this.children] = [] ;
        obj.level = 1;
        obj[this.children] = this.convertModel(model, obj[this.id], obj[this.children], level+1)

        result.push(obj)
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
      var obj = {
        title: newId,
        [this.parentId]: parentId,
        level: level + 1,
        [this.children]: [],
        [this.parentId]: newId
      }
      if (level + 1 <= maxLevel) {
        this.generateModel(maxLevel, maxChild, obj[this.children], level + 1, newId, newId);
      }
      arr.push(obj)
    }
    return arr;
  }

  /**
   * @param {Array} model
   * @param {Number} level
   * @param {String} parentId
   * @param {String} id
   * @description Update model for generating new parentID & id after delete or any change action
   */
  updateModel(model, level = 1, parentId = '#', id = '') {
    for (var i = 0; i < model.length; i++) {
      
      var newId = id + String(i);
      model[i].level = level;
      model[i][this.id] = newId;
      model[i].show =  model[i].show != undefined ?  model[i].show : true;
      model[i].open =  model[i].open != undefined ?  model[i].open : true;
      model[i][this.parentId] = parentId;
      model[i][this.children] = model[i][this.children] != undefined ? model[i][this.children] : [];
      if (this.hasChild(model[i])) {
        this.updateModel(model[i][this.children], level + 1, newId, newId);
      }
    }
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
      var node = this.findParent(model, id);
    }
    //add as a child
    else {
      var node = this.findNode(model, id);
    }
    if (node == null) {
      model.push({ title: 'blank', [this.children]: [] });
      return model
    }
    node[this.children].push({ title: 'blank', [this.children]: [] })
    this.updateModel(model);

    return model
  }

  /**
   * @param {Array} model
   * @param {String} id
   * @description Remove a requested node by id
   */
  removeNode(model, id) {
    let removed  = false;
    for (var i=0; i<model.length; i++) {
      if (model[i][this.id] == id) {
        model.splice(i, 1);
        removed = true
        break;
      }
      else {
        if (this.hasChild(model[i])){
          this.removeNode(model[i][this.children], id);
          if(removed) break;
        }
      }
    }
  }

  /**
   * @param {Array} model
   * @param {Object} newNode
   * @description Send changed to for updating in the modle
   */
  updateNode(model, newNode) {
    var updated = false;
    for (var i = 0; i < model.length; i++) {
      if (model[i] == newNode[this.id]) {
        model[i] = newNode;
        updated = true
        break;
      }
      else {
        if (this.hasChild(model[i])) {
          this.updateNode(model[i][this.children], newNode);
          if (updated) break;
        }
      }
    }
    return model;
  }

  /**
   * @param {Object} node
   * @description Check a node is leaf or not 
   * @return {Boolean}
   */
  isLeaf(node) {
    return (this.hasChild(node) == false)
  }

  /**
   * @param {Object} node
   * @description Check a node has a child or not
   * @return {Boolean}
   */
  hasChild(node) {
    return (node[this.children] && node[this.children].length > 0)
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
   * @description Find node based on id
   */
  findNode(model, id) {
    var result = null;
    for (var i = 0; i < model.length; i++) {
      if (model[i][this.id] == id) {
        result = model[i];
        break;
      }
      else {
        if (this.hasChild(model[i])) {
          result = this.findNode(model[i][this.children], id);
          if (result != null) break;
        }
      }
    }
    return result
  }

  /**
   * @param {Array} model
   * @param {String} id
   * @description Find node childs
   */
  findChilds (model, id){
    let obj = this.findNode(model, id);
    return obj[this.children];
  }

  /**
   * @param {Array} model
   * @param {String} id
   * @description toggle "open property on a node"
   */
  toggleNode (model, id, rootState = null){
    let obj = this.findNode(model, id);
    obj.open = !obj.open;
    if (rootState == null) rootState = obj.open;
    obj[this.children].forEach(o => {
      o.show = rootState;
      if (this.hasChild(o)) {
        this.toggleNode(model, o[this.id], (rootState ? null :rootState  ))
      }
    })

    this.updateNode(model, obj);

    return model
  }

  /**
   * @param {Array} model
   * @param {String} id
   * @description Find parent based on id
   */
  findParent(model, id) {
    var obj = this.findNode(model, id);
    if (obj.parentId == '#') return null;
    return this.findNode(model, obj.parentId)
  }

  /**
   * @param {Array} model
   * @param {Array} leafs
   * @description Find leafs of tree
   */
  findLeafs(model, leafs = []) {
    model.forEach(node => {
      if (this.isLeaf(node) == true) {
        leafs.push(node);
      }
      if (this.hasChild(node)) {
        this.findLeafs(node[this.children], leafs)
      }
    })
    return leafs
  }

  /**
   * @param {Array} model
   * @param {Function} fn
   * @param {Array} result
   * @param {String} parentId
   * @param {Number} level
   * @description Traverse all nodes Respectively
   */
  traverseTree (model ,fn , result = [], level = 1,){
    model.forEach((node, i) => {
      node.level = level;
      result.push(fn(node, i))
      if(this.hasChild(node)) {
        this.traverseTree(node[this.children],fn, result, level+1)
      }
    })
    return result;
  }

  /**
   * Default Rendering
   * 
   * @param {Array} modle
   */
  defaultRender(model) {
    this.updateModel(model)
    var str = '<ul>'
    model.forEach(item => {
      str += `<li id="${item[this.id]}" level="${item.level}">${item.title}`;

      if (this.hasChild(item)) {
        str += this.render(item[this.children]);
      }

      str += `</li>`;
    })
    str += '</ul>';

    return str
  }
}




export default CompositionTree