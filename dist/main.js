(()=>{"use strict";function t(t){return t%2==0?t/2-1:t/2-1.5}function l(o,e,i=[]){let n,r=o,d=e;if(0===r.length&&0===d.length)return i;function h(l){n=l.shift();const o=t(n.length),e=o+1;return r=l.slice(0,o+1),d=l.slice(e),n}return void 0===r[0]&&void 0!==d[0]?n=h(d):void 0!==r[0]&&void 0===d[0]?n=h(r):r[0]<d[0]?n=r.shift():r[0]>=d[0]&&(n=d.shift()),i.push(n),l(r,d,i)}function o(e){if(e.length<2)return e;const i=t(e.length),n=i+1;return l(o(e.slice(0,i+1)),o(e.slice(n)))}const e=t=>({data:t,leftChild:null,rightChild:null}),i=(t=>{const l=(()=>{let l=new Set(t);return l=Array.from(l),o(l)})(),i=(t=0,o=l.length-1)=>{if(t>o)return null;const n=Math.floor((o+t)/2),r=e(l[n]),d=i(t,n-1),h=i(n+1,o);return r.leftChild=d,r.rightChild=h,r},n=(t,l="",o=!0)=>{null!==t.rightChild&&n(t.rightChild,`${l}${o?"│   ":"    "}`,!1),console.log(`${l}${o?"└── ":"┌── "}${t.data}`),null!==t.leftChild&&n(t.leftChild,`${l}${o?"    ":"│   "}`,!0)},r=i(),d=(t,l=r)=>{const o=e(t),i=l;if(null===i||o.data===i.data)return console.log(`single root ${i.data} was returned`),i;let n;if(o.data<i.data){if(null===i.leftChild)return i.leftChild=o,console.log(`left child added to root ${i.data}`),i;n=d(t,i.leftChild),n.leftChild=o,console.log(`left child added to foundRoot ${n.data}`)}else if(o.data>i.data){if(null===i.rightChild)return i.rightChild=o,console.log(`right child added to root ${i.data} `),i;n=d(t,i.rightChild),n.rightChild=o,console.log(`right child added to foundRoot ${n.data}`)}return console.log(`foundRoot: ${n.data}`),n};return{sortedArray:l,mainRoot:r,prettyPrint:n,insert:d}})([1,7,4,23,8,9,4,3,5,7,9,67,6345,324]);i.insert(63),i.prettyPrint(i.mainRoot)})();