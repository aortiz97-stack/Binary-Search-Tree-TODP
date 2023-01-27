import mergeSort from './merge-sort';

const Node = (value) => {
  const data = value;
  const leftChild = null;
  const rightChild = null;
  const parent = null;

  return {
    data, leftChild, rightChild, parent,
  };
};

const Tree = (array) => {
  const prepareArray = () => {
    let processingArray = new Set(array);
    processingArray = (Array.from(processingArray));
    const finalArray = mergeSort(processingArray);
    return finalArray;
  };

  let sortedArray = prepareArray();

  const getSortedArray = () => sortedArray;
  const setSortedArray = (newSortedArray) => { sortedArray = newSortedArray; };

  const buildTree = (start = 0, end = getSortedArray().length - 1) => {
    if (start > end) return null;
    const mid = Math.floor((end + start) / 2);
    const root = Node(getSortedArray()[mid]);
    const leftChild = buildTree(start, mid - 1);
    const rightChild = buildTree(mid + 1, end);
    root.leftChild = leftChild;
    root.rightChild = rightChild;
    if (leftChild !== null) {
      leftChild.parent = root;
    }
    if (rightChild !== null) {
      rightChild.parent = root;
    }
    return root;
  };

  // prettyPrint code provided by The Odin Project
  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  let mainRoot = buildTree();

  const getMainRoot = () => mainRoot;
  const setMainRoot = (newRoot) => { mainRoot = newRoot; };

  const insertNode = (value, root = getMainRoot()) => {
    const newNode = Node(value);
    getSortedArray().push(value);
    const newSortedArray = mergeSort(Array.from(new Set(getSortedArray())));
    setSortedArray(newSortedArray);
    const currRoot = root;
    if (currRoot === null || newNode.data === currRoot.data) {
      return currRoot;
    }
    if (newNode.data < currRoot.data) {
      if (currRoot.leftChild === null) {
        currRoot.leftChild = newNode;
        newNode.parent = currRoot;
        return currRoot;
      }
      return insertNode(value, currRoot.leftChild);
    } if (newNode.data > currRoot.data) {
      if (currRoot.rightChild === null) {
        currRoot.rightChild = newNode;
        newNode.parent = currRoot;
        return currRoot;
      }
      return insertNode(value, currRoot.rightChild);
    }
    return currRoot;
  };

  const find = (value, stack = [getMainRoot()]) => {
    const nodeStack = stack;
    const popped = stack.pop();
    if (popped.data === value) {
      return popped;
    }
    if (popped.leftChild === null && popped.rightChild === null
      && popped.data !== value && stack.length === 0) {
      return null;
    }
    if (popped.leftChild !== null) {
      nodeStack.push(popped.leftChild);
    }
    if (popped.rightChild !== null) {
      nodeStack.push(popped.rightChild);
    }
    return find(value, nodeStack);
  };

  const levelOrder = (callBack = undefined, queue = [getMainRoot().data], visited = []) => {
    const dequeuedValue = queue.shift();
    const dequeuedNode = find(dequeuedValue);
    if (!visited.includes(dequeuedValue)) {
      visited.push(dequeuedValue);
    }
    if (queue.length === 0 && dequeuedNode.leftChild === null
    && dequeuedNode.rightChild === null) {
      if (callBack !== undefined) {
        return callBack(visited);
      }
      return visited;
    }
    if (dequeuedNode.leftChild !== null) {
      queue.push(dequeuedNode.leftChild.data);
    } if (dequeuedNode.rightChild !== null) {
      queue.push(dequeuedNode.rightChild.data);
    }
    return levelOrder(callBack, queue, visited);
  };

  const preorder = (stack = [getMainRoot().data], visited = []) => {
    const unstackedValue = stack.pop();
    const unstackedNode = find(unstackedValue);
    if (!visited.includes(unstackedValue)) {
      visited.push(unstackedValue);
    }

    if (unstackedNode.leftChild === null && unstackedNode.rightChild === null
      && stack.length === 0) {
      return visited;
    }

    if (unstackedNode.rightChild !== null) {
      stack.push(unstackedNode.rightChild.data);
    } if (unstackedNode.leftChild !== null) {
      stack.push(unstackedNode.leftChild.data);
    }
    return preorder(stack, visited);
  };

  const inorder = (stack = [getMainRoot().data], visited = []) => {
    if (stack.length === 0) {
      return visited;
    }
    const rootValue = stack.pop();
    const root = find(rootValue);

    if (rootValue === null) {
      const additionalPop = stack.pop();
      visited.push(additionalPop);
      return inorder(stack, visited);
    }

    if (root === null) {
      return visited;
    }
    if (root.leftChild === null && root.rightChild === null) {
      visited.push(rootValue);
      const additionalPop = stack.pop();
      if (additionalPop !== undefined) {
        visited.push(additionalPop);
      }
      return inorder(stack, visited);
    }
    if (root.leftChild === null) {
      if (root.rightChild !== null) {
        stack.push(root.rightChild.data);
      }
      visited.push(rootValue);
      return inorder(stack, visited);
    }
    if (root.rightChild === null) {
      stack.push(null);
      stack.push(rootValue);
      if (root.leftChild !== null) {
        stack.push(root.leftChild.data);
      }
      return inorder(stack, visited);
    }
    if (root.rightChild !== null) {
      stack.push(root.rightChild.data);
    }
    stack.push(rootValue);
    stack.push(root.leftChild.data);
    return inorder(stack, visited);
  };

  const postorder = (stack = [getMainRoot().data], visited = []) => {
    if (stack.length === 0) {
      return visited;
    }
    let rootValue = stack.pop();
    let root = find(rootValue);
    if (rootValue === null) {
      rootValue = stack.pop();
      root = find(rootValue);
    }
    if (root === null) {
      return visited;
    }
    if (root.leftChild === null && root.rightChild === null) {
      visited.push(rootValue);
      return postorder(stack, visited);
    }

    function allChildrenVisited() {
      const bothChildrenVisited = root.rightChild !== null && root.leftChild !== null
      && visited.includes(root.leftChild.data) && visited.includes(root.rightChild.data);
      const leftNullRightVisited = root.rightChild !== null && root.leftChild === null
      && visited.includes(root.rightChild.data);
      const leftVisitedRightNull = root.leftChild !== null && root.rightChild === null
      && visited.includes(root.leftChild.data);
      return (bothChildrenVisited || leftNullRightVisited || leftVisitedRightNull);
    }

    if (allChildrenVisited()) {
      visited.push(rootValue);
      return postorder(stack, visited);
    }
    if (root.rightChild === null && root.leftChild !== null) {
      if (!visited.includes(rootValue)) {
        stack.push(rootValue);
      }
      stack.push(null);
      if (!visited.includes(root.leftChild.data)) {
        stack.push(root.leftChild.data);
      }
      return postorder(stack, visited);
    }
    if (root.leftChild === null && root.rightChild !== null) {
      if (visited.includes(root.rightChild.data)) {
        visited.push(rootValue);
        return postorder(stack, visited);
      }
    }
    stack.push(rootValue);
    if (root.rightChild !== null && !visited.includes(root.rightChild.data)) {
      stack.push(root.rightChild.data);
    }
    if (root.leftChild !== null && !visited.includes(root.leftChild.data)) {
      stack.push(root.leftChild.data);
    }
    return postorder(stack, visited);
  };

  const deleteNode = (value) => {
    const toDeleteNode = find(value);
    if (toDeleteNode.data === getMainRoot().data) {
      const mid = Math.floor((0 + sortedArray.length - 1) / 2);
      getSortedArray().splice(mid, 1);
      setMainRoot(buildTree());
    } else if (toDeleteNode.leftChild === null && toDeleteNode.rightChild === null) {
      const { parent } = toDeleteNode;
      if (parent.leftChild === toDeleteNode) {
        parent.leftChild = null;
      } else if (parent.rightChild === toDeleteNode) {
        parent.rightChild = null;
      }
      toDeleteNode.parent = null;
    }
  };

  return {
    getSortedArray,
    getMainRoot,
    prettyPrint,
    insertNode,
    levelOrder,
    find,
    deleteNode,
    preorder,
    inorder,
    postorder,
  };
};

const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insertNode(63);
tree.insertNode(65);
tree.insertNode(64);
tree.insertNode(0);
tree.insertNode(10000);
tree.insertNode(-1);
tree.insertNode(100000);
tree.insertNode(-2);
tree.deleteNode(-2);

tree.prettyPrint(tree.getMainRoot());
console.log(tree.postorder());
