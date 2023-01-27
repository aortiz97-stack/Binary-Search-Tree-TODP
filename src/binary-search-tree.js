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

  const buildTree = (start = 0, end = sortedArray.length - 1) => {
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

  const getRightMost = (root) => {
    let rightMostRoot;
    if (root.rightChild === null) {
      rightMostRoot = root;
      return rightMostRoot;
    }
    rightMostRoot = getRightMost(root.rightChild);
    return rightMostRoot;
  };

  const getLeftMost = (root) => {
    let leftMostRoot;
    if (root.leftChild === null) {
      leftMostRoot = root;
      return leftMostRoot;
    }
    leftMostRoot = getLeftMost(root.leftChild);
    return leftMostRoot;
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

  const deleteNode = (value) => {
    const toDeleteNode = find(value);
    if (toDeleteNode.data === getMainRoot().data) {
      const mid = Math.floor((0 + sortedArray.length - 1) / 2);
      getSortedArray().splice(mid, 1);
      setMainRoot(buildTree());
    } else if (toDeleteNode.leftChild === null && toDeleteNode.rightChild === null) console.log('wut');
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
    getRightMost,
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

tree.prettyPrint(tree.getMainRoot());
console.log(tree.inorder());

/* console.log(`the stack before pop: ${stack}`);
    const rootValue = stack.pop();
    console.log(`the stack after the pop: ${stack}`)
    const root = find(rootValue);
    console.log(`the rootValue: ${rootValue}`);

    if (root === null || (root.rightChild === null && root.leftChild === null)) {
      if (root !== null && stack.length === 0) {
        visited.push(root);
        return visited;
      }
      if (stack.length === 0) {
        return rootValue;
      }
      return rootValue;
    }

    if (root.leftChild !== null) {
      console.log(`the leftChild: ${root.leftChild.data}`);
      stack.push(root.leftChild.data);
      const leftMostChildData = inorder(stack, visited);
      visited.push(leftMostChildData);
    }
    visited.push(rootValue);
    if (root.rightChild !== null) {
      const rightChild = inorder(stack, visited);
      stack.push(rightChild);
    }
    return inorder(stack, visited); */

/*
    const root = find(rootValue);
    if (rootValue === null) {
      return visited;
    }
    if (root.leftChild === null && root.rightChild === null) {
      console.log('pushing is happening');
      visited.push(rootValue);
      if (root === getMainRoot()) {
        return visited;
      }
      console.log(`what's the matter?`);
      visited.push(root.parent.data);
      console.log(`it passed this!~`);
      if (root.parent.rightChild !== null) {
        visited.push(root.parent.rightChild.data);
      }
    }

    if (root.rightChild !== null && !hasPopped.includes(root.rightChild.data)) {
      stack.push(root.rightChild.data);
    }
    if (!hasPopped.includes(rootValue)) stack.push(rootValue);
    if (root.leftChild !== null && !hasPopped.includes(root.leftChild.data)) {
      stack.push(root.leftChild.data);
    }

    console.log(`stack: ${stack}`);
    const popped = stack.pop();
    console.log(`stack after pop: ${stack}`);
    hasPopped.push(popped);
    if (stack.length === 0) {
      return visited;
    }
    return inorder(popped, stack, visited, hasPopped);
    */
