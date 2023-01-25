const Node = (value) => {
  const data = value;
  const leftChild = null;
  const rightChild = null;

  return { data, leftChild, rightChild };
};

const Tree = (array) => {
  const prepareArray = () => {
    const processingArray = new Set(array);
    let finalArray = (Array.from(processingArray));
    finalArray = finalArray.sort();
    console.log(`finallArr: ${finalArray}`);
    return finalArray;
  };

  const sortedArray = prepareArray();

  const buildTree = (start = 0, end = sortedArray.length - 1) => {
    if (start > end) return null;

    const mid = Math.floor((end - start) / 2);

    const root = sortedArray[mid];
    const leftChild = buildTree(start, mid - 1);
    const rightChild = buildTree(mid + 1, end);

    root.leftChild = leftChild;
    root.rightChild = rightChild;

    return root;
  };

  return { sortedArray };
};

const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree.sortedArray);
