(()=>{"use strict";function t(t){return t%2==0?t/2-1:t/2-1.5}function n(e,r,l=[]){let o,i=e,s=r;if(0===i.length&&0===s.length)return l;function u(n){o=n.shift();const e=t(o.length),r=e+1;return i=n.slice(0,e+1),s=n.slice(r),o}return void 0===i[0]&&void 0!==s[0]?o=u(s):void 0!==i[0]&&void 0===s[0]?o=u(i):i[0]<s[0]?o=i.shift():i[0]>=s[0]&&(o=s.shift()),l.push(o),n(i,s,l)}function e(r){if(r.length<2)return r;const l=t(r.length),o=l+1;return n(e(r.slice(0,l+1)),e(r.slice(o)))}const r=(t=>{const n=(()=>{let n=new Set(t);return n=Array.from(n),e(n)})(),r=(t=0,e=n.length-1)=>{if(t>e)return null;const l=Math.floor((e+t)/2),o={data:n[l],leftChild:null,rightChild:null};console.log(`ROOT: ${o.data}`);const i=r(t,l-1),s=r(l+1,e);return o.leftChild=i,o.rightChild=s,o},l=r();return{sortedArray:n,mainRoot:l}})([1,7,4,23,8,9,4,3,5,7,9,67,6345,324]);console.log(r.mainRoot)})();