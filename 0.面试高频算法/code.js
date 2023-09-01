// 二分查找
function search(nums, target) {
    let low = 0, high = nums.length - 1
    while (low <= high) {
        let mid = Math.floor((high - low) / 2) + low
        let num = nums[mid]
        if (num === target) {
            return mid
        } else if (num > target) {
            high = mid - 1;
        } else {
            low = low + 1;
        }
    }
    return - 1
}
// 排序
arr.sort((a, b) => {
    return a - b
})
// 冒泡排序
function bubbleSort(arr) {
    let len = arr.length
    for (let i = 0; i < len; i++) {
        for (j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}
// 选择排序
function selectSort(arr) {
    let len = arr.length
    let minIndex
    for (let i = 0; i < len - 1; i++) {
        minIndex = i
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr
}
// 快速排序
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr
    }
    let pivotIndex = Math.floor(arr.length / 2)
    let pivot = arr.splice(pivotIndex, 1)[0]
    const left = []
    const right = []
    let len = arr.length
    for (let i = 0; i < len; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right))
}
// 回文数
function isPalindrome(x) {
    if (x < 0) {
        return false
    } else if (x === 0) {
        return true
    } else {
        return x.toString().split("").reverse().join("") === x
    }
}
// 爬楼梯
function climbStairs(n) {
    const f = []
    f[1] = 1
    f[2] = 2
    for (let i = 0; i <= n; i++) {
        f[i] = f[i - 2] + f[i - 1]
    }
    return f[n]
}
// 接雨水
function trap(height) {
    let leftCur = 0
    let rightCur = height.length - 1
    let res = 0
    let leftMax = 0
    let rightMax = 0
    while (leftCuu < rightCur) {
        const left = height[leftCur]
        const right = height[rightCur]
        if (left < right) {
            leftMax = Math.max(left, leftMax)
            res += leftMax - left
            leftCur++
        } else {
            rightMax = Math.max(left, rightMax)
            res += rightMax - right
            rightCur--
        }
    }
    return res
}
// 千位分隔符
function thousandSeparator(n) {
    const str = n.toString()
    const arr = []
    for (let length = str.length, i = length; i > 0; i -= 3) {
        arr.unshift(str.substring(i - 3, i))
    }
    return arr.join('.')
}
// 替换空格
function replaceSpace(s) {
    return s.replace(/ /g, "%20")
}
// 反转字符串
function reverseString(s) {
    reverse(s)
}
function reverse(s) {
    let l = -1, r = s.length
    while (++l < --r) {
        [s[l], s[r]] = [s[r], s[l]]
    }
}
// 回文字符串
function isPalindrome(str) {
    for (let i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - i - 1]) {
            return false
        }
    }
    return true
}
// 有效括号对
const leftToRight = {
    "(": ")",
    "[": "]",
    "{": "}"
}
function isValid(s) {
    if (!s) {
        return false
    }
    const stack = []
    const len = s.length
    if (len % 2 == 1) {
        return false
    }
    for (let i = 0; i < len; i++) {
        const ch = s[i]
        if (ch === "(" || ch === "{" || ch === "[") {
            stack.push(leftToRight[ch])
        } else {
            if (!stack.length || stack.pop() !== ch) {
                return false
            }
        }
    }
    return !stack.length
}
// 栈模拟队列
function CQuene() {
    this.stackA = []
    this.stackB = []
}
CQuene.prototype.appendTail = function (value) {
    this.stackA.push(value)
}
CQuene.prototype.deleteHead = function () {
    if (this.stackB.length) {
        return this.stackB.pop()
    } else {
        while (this.stackA.length) {
            this.stackB.push(this.stackA.pop())
        }
        if (!this.stackB.length) {
            return -1
        } else {
            return this.stackB.pop()
        }
    }
}
// 两数之和
function twoSum(nums, target) {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        const value = target - nums[i];
        if (map.has(value)) {
            return [map.get(value), i]
        } else {
            map.set(nums[i], i)
        }
    }
}
// 合并有序数组
function merge(nums1, m, nums2, n) {
    let i = m - 1, j = n - 1, k = m + n - 1
    while (i >= 0 && j >= 0) {
        if (nums1[i] >= nums2[j]) {
            nums1[k] = nums2[i]
            i--
            k--
        } else {
            nums1[k] = nums2[j]
            j--
            k--
        }
    }
    while (j >= 0) {
        nums1[k] = nums2[j]
        k--
        j--
    }
}
function merge(nums1, m, nums2, n) {
    nums1.splice(m, nums1.length - m, ...nums2);
    nums1.sort((a, b) => a - b)
}
// 数组中数字出现次数
function singleNumbers(nums) {
    let numsSort = nums.sort((a, b) => { return a - b }), result = []
    for (let i = 0; i < numsSort.length; i++) {
        if (numsSort[i] === numsSort[i + 1]) {
            i++
        } else {
            result.push(numsSort[i])
            if (result.length === 2)
                break
        }
    }
    return result
}
// 字符串去重
function duplicateRemoval(str) {
    return [...new Set(str.split(""))].join("")
}
// 最长递增子序列
function lengthOfLIS(nums) {
    const dp = new Array(nums.length).fill(1)
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }
    return Math.max(...dp)
}
// 删除链表节点
function deleteNode(head, val) {
    let dummy = new ListkNode()
    dummy.next = head
    let cur = dummy
    while (cur.next) {
        if (cur.next.val === val) {
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }
    return dummy.next
}
// 反转链表
function reverseList(head) {
    let pre = null;
    let cur = head;
    while (cur !== null) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
}
// 合并两个有序链表
function mergeTwoLists(l1, l2) {
    let head = new ListNode()
    let cur = head
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            cur.next = l1
            l1 = l1.next
        } else {
            cur.next = l2
            l2 = l2.next
        }
        cur = cur.next
    }
    cur.next = l1 !== null ? l1 : l2
    return head.next
}
// 删除链表重复元素
function deleteDuplicates(head) {
    let cur = head
    while (cur != null && cur.next != null) {
        if (cur.val === cur.next.val) {
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }
    return head
}
// 环形链表
function hasCycle(head) {
    while (head) {
        if (head.flag) {
            return true;
        } else {
            head.flag = true;
            head = head.next;
        }
    }
    return false;
}
// 对称二叉树
function isSymmetric(root) {
    return isSymmetricCore(root, root)
}
function isSymmetricCore(n1, n2) {
    if (!n1 && !n2)
        return true;
    if (!n1 || !n2)
        return false;
    if (n1.val !== n2.val)
        return false;
    return isSymmetricCore(n1.left, n2.right) && isSymmetricCore(n1.right, n2.left)
}
// 翻转二叉树
function invertTree(root) {
    if (!root) {
        return root;
    }
    let right = invertTree(root.right);
    let left = invertTree(root.left);
    root.left = right;
    root.right = left;
    return root;
}
// 中序遍历二叉树
function inorderTraversal(root) {
    const res = []
    const stack = []
    let cur = root
    while (cur || stack.length) {
        while (cur) {
            stack.push(cur)
            cur = cur.left
        }
        cur = stack.pop()
        res.push(cur.val)
        cur = cur.right
    }
    return res
}
// 层序遍历二叉树
function levelOrder(root) {
    const res = []
    if (!root) {
        return res
    }
    const queue = []
    queue.push(root)
    while (queue.length) {
        const lever = []
        const len = queue.length
        for (let i = 0; i < len; i++) {
            const top = queue.shift()
            lever.push(top.val)
            if (top.left) {
                queue.push(top.left)
            }
            if (top.right) {
                queue.push(top.right)
            }
        }
        res.push(lever)
    }
    return res
}
// 验证二叉搜索树
function isValidBST(root) {
    function dfs(root, minValue, maxValue) {
        if (!root) {
            return true
        }
        if (root.val <= minValue || root.val >= maxValue)
            return false
        return dfs(root.left, minValue, root.val) && dfs(root.right, root.val, maxValue)
    }
    return dfs(root, -Infinity, Infinity)
}
// 二叉树最近公共祖先
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);
    if (!left) return right;
    if (!right) return left;
    return root;
}




// -----------------------------



// 手写防抖
function debounce(callback, time) {
    let timer = null;
    return function (e) {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            callback(this, e)
            timer = null
        }, time);
    }
}
// 手写节流
function throttle(callback, wait) {
    let strat = Date.now();
    return function (e) {
        let now = Date.now()
        if (now - start >= wait) {
            callback.call(this, e);
            state = now;
        }
    }
}
// 手写call函数
Function.prototype.myCall = function (content) {
    if (typeof this !== "function") {
        console.log("type error");
    }
    content = content || windows;
    let args = [...arguments].slice(1), result = null;
    content.fn = this;
    result = content.fn(...args);
    delete content.fn;
    return result;
}
// 手写apply函数
Function.prototype.myApply = function (content) {
    if (typeof this !== "function") {
        console.log("type error");
    }
    content = content || window;
    let result = null;
    content.fn = this;
    if (arguments[1]) {
        result = content.fn(...args);
    } else {
        result = content.fn();
    }
    delete content.fn;
    return result;
}
// 手写bind函数
Function.prototype.myBind = function (content) {
    if (typeof this !== "function") {
        console.log("type error");
    }
    var args = [...arguments].slice(1),
        fn = this;
    return function Fu() {
        return fn.apply(
            this instanceof Fn ? this : content,
            args.concat(...arguments)
        )
    }
}
// 函数柯里化实现
function curry(fn) {
    return function curried(...args1) {
        if (args1.length >= fn.length) {
            return fn.apply(this, args1);
        } else {
            return function (...args2) {
                return curried.apply(this, args1.concat(args2));
            };
        }
    };
}
// 手写Promise
// ...
// 手写浅拷贝
function shallowCopy(object) {
    if (!object || typeof object !== "object")
        return;
    let newObject = Array.isArray(object) ? [] : {};
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            newObject[key] = object[key];
        }
    }
    return newObject;
}
// 手写深拷贝
function deepCopy(object) {
    if (!object || typeof object !== "object")
        return;
    let newObject = Array.isArray(object) ? [] : {};
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            newObject[key] = typeof object[key] === "object" ? deepCopy(object[key]) : object[key];
        }
    }
    return newObject;
}
// 实现数组的flat方法
function myFlat(arr, depth) {
    if (!Array.isArray(arr) || depth <= 0)
        return arr;
    return arr.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return pre.concat(myFlat(cur, depth - 1));
        } else {
            return pre.concat(cur);
        }
    }, [])
}
// 解析URL Params为对象
function parseParam(url) {
    const paramsStr = /.+\?(.+)$/.exec(url)[1];
    const paramsArr = paramsStr.split('&');
    let paramsObj = {};
    paramsArr.forEach(param => {
        if (/=/.test(param)) {
            let [key, val] = param.split('=')
            val = decodeURIComponent(val);  //解码
            val = /^\d+$/.test(val) ? parseFloat(val) : val;
            if (paramsObj.hasOwnProperty(key)) {
                paramsObj[key] = [].concat(paramsObj[key], val);
            } else {
                paramsObj[key] = val;
            }
        } else {
            paramsObj[param] = true;
        }
    })
    return paramsObj;
}
// 手写红黄绿灯
const taskRunner = (light, timeout) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(console.log(light)), timeout);
    })
}
const task = async () => {
    await taskRunner('红', 1000)
    await taskRunner('绿', 3000)
    await taskRunner('黄', 2000)
    task()
}

task()
// 手写实现发布-订阅模式
class EventCenter {
    // 1.定义事件容器
    constructor() {
        this.handlers = {}
    }
    // 2.添加事件方法（事件名，事件方法）
    addEventListener(type, handler) {
        // 创建新数组容器
        if (!this.handlers[type]) {
            this.handlers[type] = []
        }
        // 存入事件
        this.handlers[type].push(handler)
    }
    // 3.触发事件（事件名，事件参数）
    dispatchEvent(type, params) {
        // 没有注册该事件则抛出错误
        if (!this.handlers[type]) {
            return new Error('该事件未注册')
        }
        // 触发事件
        this.handlers[type].forEach(handler => {
            handler(...params)
        });
    }
    // 4.事件移除      （事件名，事件方法）
    removeEventListener(type, handler) {
        if (!this.handlers[type]) {
            return new Error('事件无效')
        }
        if (!handler) {
            // 移除事件
            delete this.handlers[type]
        } else {
            const index = this.handlers[type].findIndex(el => el === handler)
            if (index === -1) {
                return new Error('无法绑定该事件')
            }
        }
        // 移除事件
        this.handlers[type].splice(index, 1)
        if (this.handlers[type].length === 0) {
            delete this.handlers[type]
        }
    }
}
// 实现双向数据绑定
<body>
    <input type="text" id="input">
        <span id="span"></span>

        <script>
            let obj = { }
            let input = document.getElementById('input')
            let sapn = document.getElementById('span')
            Object.defineProperty(obj, 'text', {
                get() {
                console.log('获取数据了')
            },
            set(newVal) {
                console.log('获取数据了')
                input.value = newVal
            span.innerHTML = newVal
            }
        })
            input.addEventListener('keyup', function (e) {
                obj.text = e.target.value
            })
        </script>
</body>