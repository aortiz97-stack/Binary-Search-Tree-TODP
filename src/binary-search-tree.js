import mergeSort from './merge-sort';

const Node = (value) => {
  const data = value;
  const leftChild = null;
  const rightChild = null;

  return { data, leftChild, rightChild };
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
        return currRoot;
      }
      return insertNode(value, currRoot.leftChild);
    } if (newNode.data > currRoot.data) {
      if (currRoot.rightChild === null) {
        currRoot.rightChild = newNode;
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
    if (popped.leftChild !== null) {
      nodeStack.push(popped.leftChild);
    }
    if (popped.rightChild !== null) {
      nodeStack.push(popped.rightChild);
    }
    return find(value, nodeStack);
  };

  const deleteNode = (value) => {
    const toDeleteNode = Node(value);
    if (toDeleteNode.data === getMainRoot().data) {
      const mid = Math.floor((0 + sortedArray.length - 1) / 2);
      getSortedArray().splice(mid, 1);
      setMainRoot(buildTree());
    }
  };

  return {
    getSortedArray, getMainRoot, prettyPrint, insertNode, find, deleteNode,
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
tree.deleteNode(8);
tree.insertNode(-2);
console.log(tree.find(-2).data);
//tree.prettyPrint(tree.getMainRoot());
