(()=>{"use strict";function l(l){return l%2==0?l/2-1:l/2-1.5}function t(i,h,n=[]){let e,d=i,r=h;if(0===d.length&&0===r.length)return n;function u(t){e=t.shift();const i=l(e.length),h=i+1;return d=t.slice(0,i+1),r=t.slice(h),e}return void 0===d[0]&&void 0!==r[0]?e=u(r):void 0!==d[0]&&void 0===r[0]?e=u(d):d[0]<r[0]?e=d.shift():d[0]>=r[0]&&(e=r.shift()),n.push(e),t(d,r,n)}function i(h){if(h.length<2)return h;const n=l(h.length),e=n+1;return t(i(h.slice(0,n+1)),i(h.slice(e)))}const h=l=>({data:l,leftChild:null,rightChild:null,parent:null}),n=(l=>{let t=(()=>{let t=new Set(l);return t=Array.from(t),i(t)})();const n=()=>t,e=(l=0,t=n().length-1)=>{if(l>t)return null;const i=Math.floor((t+l)/2),d=h(n()[i]),r=e(l,i-1),u=e(i+1,t);return d.leftChild=r,d.rightChild=u,null!==r&&(r.parent=d),null!==u&&(u.parent=d),d},d=(l,t="",i=!0)=>{null!==l.rightChild&&d(l.rightChild,`${t}${i?"│   ":"    "}`,!1),console.log(`${t}${i?"└── ":"┌── "}${l.data}`),null!==l.leftChild&&d(l.leftChild,`${t}${i?"    ":"│   "}`,!0)};let r=e();const u=()=>r,a=(l,e=u())=>{const d=h(l);var r;n().push(l),r=i(Array.from(new Set(n()))),t=r;const s=e;return null===s||d.data===s.data?s:d.data<s.data?null===s.leftChild?(s.leftChild=d,d.parent=s,s):a(l,s.leftChild):d.data>s.data?null===s.rightChild?(s.rightChild=d,d.parent=s,s):a(l,s.rightChild):s},s=(l,t=[u()])=>{const i=t,h=t.pop();return h.data===l?h:null===h.leftChild&&null===h.rightChild&&h.data!==l&&0===t.length?null:(null!==h.leftChild&&i.push(h.leftChild),null!==h.rightChild&&i.push(h.rightChild),s(l,i))},C=(l,t=[u().data],i=[])=>{const h=t.shift(),n=s(h);return i.includes(h)||i.push(h),0===t.length&&null===n.leftChild&&null===n.rightChild?void 0!==l?l(i):i:(null!==n.leftChild&&t.push(n.leftChild.data),null!==n.rightChild&&t.push(n.rightChild.data),C(l,t,i))},o=(l=[u().data],t=[])=>{const i=l.pop(),h=s(i);return t.includes(i)||t.push(i),null===h.leftChild&&null===h.rightChild&&0===l.length?t:(null!==h.rightChild&&l.push(h.rightChild.data),null!==h.leftChild&&l.push(h.leftChild.data),o(l,t))},f=(l=[u().data],t=[])=>{if(0===l.length)return t;const i=l.pop(),h=s(i);if(null===i){const i=l.pop();return t.push(i),f(l,t)}if(null===h)return t;if(null===h.leftChild&&null===h.rightChild){t.push(i);const h=l.pop();return void 0!==h&&t.push(h),f(l,t)}return null===h.leftChild?(null!==h.rightChild&&l.push(h.rightChild.data),t.push(i),f(l,t)):null===h.rightChild?(l.push(null),l.push(i),null!==h.leftChild&&l.push(h.leftChild.data),f(l,t)):(null!==h.rightChild&&l.push(h.rightChild.data),l.push(i),l.push(h.leftChild.data),f(l,t))},p=(l=[u().data],t=[])=>{if(0===l.length)return t;let i=l.pop(),h=s(i);return null===i&&(i=l.pop(),h=s(i)),null===h?t:null===h.leftChild&&null===h.rightChild||function(){const l=null!==h.rightChild&&null!==h.leftChild&&t.includes(h.leftChild.data)&&t.includes(h.rightChild.data),i=null!==h.rightChild&&null===h.leftChild&&t.includes(h.rightChild.data),n=null!==h.leftChild&&null===h.rightChild&&t.includes(h.leftChild.data);return l||i||n}()?(t.push(i),p(l,t)):null===h.rightChild&&null!==h.leftChild?(t.includes(i)||l.push(i),l.push(null),t.includes(h.leftChild.data)||l.push(h.leftChild.data),p(l,t)):null===h.leftChild&&null!==h.rightChild&&t.includes(h.rightChild.data)?(t.push(i),p(l,t)):(l.push(i),null===h.rightChild||t.includes(h.rightChild.data)||l.push(h.rightChild.data),null===h.leftChild||t.includes(h.leftChild.data)||l.push(h.leftChild.data),p(l,t))};return{getSortedArray:n,getMainRoot:u,prettyPrint:d,insertNode:a,levelOrder:C,find:s,deleteNode:l=>{const i=s(l);if(i.data===u().data){const l=Math.floor((0+t.length-1)/2);n().splice(l,1),h=e(),r=h}else if(null===i.leftChild&&null===i.rightChild){const{parent:l}=i;l.leftChild===i?l.leftChild=null:l.rightChild===i&&(l.rightChild=null),i.parent=null}var h},preorder:o,inorder:f,postorder:p}})([1,7,4,23,8,9,4,3,5,7,9,67,6345,324]);n.insertNode(63),n.insertNode(65),n.insertNode(64),n.insertNode(0),n.insertNode(1e4),n.insertNode(-1),n.insertNode(1e5),n.insertNode(-2),n.deleteNode(-2),n.prettyPrint(n.getMainRoot()),console.log(n.postorder())})();