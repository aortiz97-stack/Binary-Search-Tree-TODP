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

  const sortedArray = prepareArray();

  const buildTree = (start = 0, end = sortedArray.length - 1) => {
    if (start > end) return null;

    const mid = Math.floor((end + start) / 2);

    const root = Node(sortedArray[mid]);
    const leftChild = buildTree(start, mid - 1);
    const rightChild = buildTree(mid + 1, end);

    root.leftChild = leftChild;
    root.rightChild = rightChild;

    return root;
  };

  //prettyPrint code provided by The Odin Project
  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  const mainRoot = buildTree();

  return { sortedArray, mainRoot, prettyPrint };
};

const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.prettyPrint(tree.mainRoot);
