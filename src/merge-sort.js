function getHalfIndex(length) {
  if (length % 2 === 0) {
    return (length / 2) - 1;
  }
  return (length / 2) - 1.5;
}

function merge(sortedLeftHalf, sortedRightHalf, sortedArr = []) {
  let toAppend;
  let left = sortedLeftHalf;
  let right = sortedRightHalf;
  if (left.length === 0 && right.length === 0) return sortedArr;

  function switchLeftRight(arr) {
    toAppend = arr.shift();
    const lastLeftIndex = getHalfIndex(toAppend.length);
    const firstRightIndex = lastLeftIndex + 1;
    left = arr.slice(0, lastLeftIndex + 1);
    right = arr.slice(firstRightIndex);
    return toAppend;
  }

  if (left[0] === undefined && right[0] !== undefined) {
    toAppend = switchLeftRight(right);
  } else if (left[0] !== undefined && right[0] === undefined) {
    toAppend = switchLeftRight(left);
  } else if (left[0] < right[0]) {
    toAppend = left.shift();
  } else if (left[0] >= right[0]) {
    toAppend = right.shift();
  }
  sortedArr.push(toAppend);
  return merge(left, right, sortedArr);
}

export default function mergeSort(array) {
  if (array.length < 2) return array;

  const lastLeftIndex = getHalfIndex(array.length);
  const firstRightIndex = lastLeftIndex + 1;

  // Sort the left half
  const sortedLeftHalf = mergeSort(array.slice(0, lastLeftIndex + 1));
  // Sort the right half
  const sortedRightHalf = mergeSort(array.slice(firstRightIndex));
  // Merge
  return merge(sortedLeftHalf, sortedRightHalf);
}
