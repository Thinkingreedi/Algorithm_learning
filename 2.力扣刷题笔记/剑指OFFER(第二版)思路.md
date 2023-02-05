# 剑指 offer 思路总结

本部分主要是笔者在练习剑指 offer 时所做的笔记，如果出现错误，希望大家指出！

## 题目(题号同 剑指offer第二版)

#### 3.数组中重复的数字
```
题目：在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

// 第一种，先对原数组进行排序，然后一次循环片段输出任意一个重复的数字
// var findRepeatNumber = function(nums) {
//     nums.sort((a,b) => {return a - b})
//     for(let i = 0;i<nums.length;i++){
//          if(nums[i] === nums[i+1]){
//              return nums[i]
//          }
//     }
// };

// 第二种，使用set，set自动忽略重复元素，遍历数组中元素，若set中存在该元素则输出当前元素
var findRepeatNumber = function(nums) {
    let set = new Set();
    for(let num of nums) {
        if(set.has(num)) {
            return num;
        } else {
            set.add(num);
        }
    }
};
```

#### 4. 二维数组中的查找

   ```
   题目：
   在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样 一个二维数组和一个整数，判断数组中是否含有该整数。

   思路：
   （1）第一种方式是使用两层循环依次遍历，判断是否含有该整数。这一种方式最坏情况下的时间复杂度为 O(n^2)。
   （2）第二种方式是利用递增序列的特点，我们可以从二维数组的右上角开始遍历。如果当前数值比所求的数要小，则将位置向下移动，再进行判断。如果当前数值比所求的数要大，则将位置向左移动，再进行判断。这一种方式最坏情况下的时间复杂度为 O(n)。
   
// 第一种：暴力循环
// var findNumberIn2DArray = function(matrix, target) {
//     for(let i=0;i<matrix.length;i++){
//         if(matrix[i].indexOf(target) !== -1){
//             return true
//         }
//     }
//     return false
// };

// 第二种：递增序列
var findNumberIn2DArray = function(matrix, target) {
    const rowNum = matrix.length
    if(!rowNum){
        return false
    }
    const colNum = matrix[0].length
    if(!colNum){
        return false
    }
    let row=0,col=colNum-1;
    while(row<rowNum && col>=0){
        if(matrix[row][col]===target){
            return true
        }else if(matrix[row][col]>target){
            --col
        }else{
            ++row
        }
    }
    return false
};
   ```

#### 5. 替换空格
   ```
   题目：
   请实现一个函数，将一个字符串中的空格替换成“%20”。例如，当字符串为 We Are Happy.则经过替换之后的字符串为 We%20Are%20Happy

   思路：

   使用正则表达式，结合字符串的 replace 方法将空格替换为 “%20”
   str.replace(/\s/g,"%20")
   
var replaceSpace = function(s) {
  return s.replace(/ /g, "%20");
 };
   ```

#### 6. 从尾到头打印链表
   ```
   题目：
   输入一个链表，从尾到头打印链表每个节点的值。

   思路：
   利用栈来实现，首先根据头结点以此遍历链表节点，将节点加入到栈中。当遍历完成后，再将栈中元素弹出并打印，以此来实现。栈的实现可以利用 Array 的 push 和 pop 方法来模拟。
   
var reversePrint = function(head) {
    let cur = head
    let i = 0
    //遍历到链尾
    while(cur!=null){
        i++
        cur=cur.next
    }
    const arr = new Array(i)
    //按照倒序装入数组
    cur = head
    i--
    while(i>-1){
        arr[i]=cur.val
        cur=cur.next
        i--
    }
    return arr
};
   ```

#### 7. 重建二叉树
   ```
   题目：
   输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输
   入前序遍历序列 {1,2,4,7,3,5,6,8} 和中序遍历序列 {4,7,2,1,5,3,8,6}，则重建二叉树并返回。

   思路：
   利用递归的思想来求解，首先先序序列中的第一个元素一定是根元素。然后我们去中序遍历中寻找到该元素的位置，找到后该元素的左边部分就是根节点的左子树，右边部分就是根节点的右子树。因此我们可以分别截取对应的部分进行子树的递归构建。使用这种方式的时间复杂度为 O(n)，空间复杂度为 O(logn)。
   
var buildTree = function(preorder, inorder) {
    const len = preorder.length
    function build(preL,preR,inL,inR){
        if(preL>preR){
            return null
        }
        const root = new TreeNode()
        //目标结点映射的是当前前序遍历序列的头部结点
        root.val = preorder[preL]
        //定位到根结点在中序遍历序列中的位置
        const k = inorder.indexOf(root.val)
        //计算出左子树中结点的个数
        const numLeft = k - inL
        root.left = build(preL+1,preL+numLeft,inL,k-1)
        root.right = build(preL+numLeft+1,preR,k+1,inR)
        return root
    }
    return build(0,len-1,0,len-1)

};
   ```

#### 9. 用两个栈实现队列
   ```
   题目：
   用两个栈来实现一个队列，完成队列的 Push 和 Pop 操作。


   思路：
   队列的一个基本特点是，元素先进先出。通过两个栈来模拟时，首先我们将两个栈分为栈1和栈2。当执行队列的 push 操作时，直接将元素 push 进栈1中。当队列执行 pop 操作时，首先判断栈2是否为空，如果不为空则直接 pop 元素。如果栈2为空，则将栈1中的所有元素 pop 然后 push 到栈2中，然后再执行栈2的 pop 操作。
   扩展：
   当使用两个长度不同的栈来模拟队列时，队列的最大长度为较短栈的长度的两倍。
   
var CQueue = function() {
    this.stackA = []
    this.stackB = []
};
//入队操作，直接压入入队栈
CQueue.prototype.appendTail = function(value) {
    this.stackA.push(value)
};
//出队操作需要优先检查出队栈是否有数据，若无，需要从入队栈倒入后再操作
CQueue.prototype.deleteHead = function() {
    if(this.stackB.length){
        return this.stackB.pop()
    }else{
        while(this.stackA.length){
            this.stackB.push(this.stackA.pop())
        }
        if(!this.stackB.length){
            return -1
        }else{
            return this.stackB.pop()
        }
    }
};
   ```

#### 10. 斐波那契数列
   ```
   题目：
   大家都知道斐波那契数列，现在要求输入一个整数 n，请你输出斐波那契数列的第 n 项。 n<=39

   思路：
   斐波那契数列的规律是，第一项为0，第二项为1，第三项以后的值都等于前面两项的和，因此我们可以通过循环的方式，不断通过叠加来实现第 n 项值的构建。通过循环而不是递归的方式来实现，时间复杂度降为了 O(n)，空间复杂度为 O(1)。
 
var fib = function(n) {
    if(n===0){
        return 0
    }
    let num1=1
    let num2=1
    let tmp =1
    while(n>2){
        tmp = (num1+num2)%1000000007
        num1 = (num2)
        num2 = tmp
        n--
    }
    return tmp
};
   ```

#### 10. 青蛙跳台阶问题
   ```
   题目：
   一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
   
   思路：
   跳台阶的问题是一个动态规划的问题，由于一次只能够跳1级或者2级，因此跳上 n 级台阶一共有两种方案，一种是从 n-1 跳上，一种是从 n-2 级跳上，因此 f(n) = f(n-1) + f(n-2)。和斐波那契数列类似，不过初始两项的值变为了 1 和 2，后面每项的值等于前面两项的和。

var numWays = function(n) {
    const f = []
    f[0] = 1
    f[1] = 1
    f[2] = 2
    for(let i = 3;i <= n;i++){
        f[i] = f[i-2] + f[i-1]
        f[i] = f[i]%1000000007
    }
    return f[n]
};
   ```

#### 11. 旋转数组的最小数字

   ```
   题目：
   把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。 例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。 NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。

   思路：
   （1）我们输入的是一个非递减排序的数组的一个旋转，因此原始数组的值递增或者有重复。旋转之后原始数组的值一定和一个值相邻，并且不满足递增关系。因此我们就可以进行遍历，找到不满足递增关系的一对值，后一个值就是旋转数组的最小数字。
   （2）二分法
   
var minArray = function(numbers) {
    let low = 0,high = numbers.length-1
    while(low < high){
        const mid = Math.floor((high-low)/2)+low
        if(numbers[mid] > numbers[high]){
            low = mid +1
        }else if(numbers[mid] < numbers[high]){
            high = mid
        }else {
            high--
        }
    }
    return numbers[low]
};
   ```

   相关资料可以参考：
   [《旋转数组的最小数字》](https://www.cnblogs.com/edisonchou/p/4746561.html)

#### 12. 矩阵中的路径

   ```
    题目：
    请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。如果一条路径经过了矩阵中的某一个格子，则该路径不能再进入该格子；例如 a b c e|s f c s|a d e e 矩阵中包含一条字符串"bcced"的路径，但是矩阵中不包含"abcb"路径，因为字符串的第一个字符 b 占据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。
    
    思路：
    典型的dfs算法，第一步先遍历一遍board，寻找第一个符合的位置，然后再使用dfs递归，因为寻找路径，要记录一下路径，防止每次递归会回到之前的路径

var exist = function(board, word) {
    var row = board.length;//行
    var col = board[0].length;//列

    var dfs = function(i,j,board,word,index){
        if(i < 0 || i >= row || j < 0 || j > col || board[i][j] !== word[index]) 
        return false; // 判断不符合条件
        if(index === word.length - 1) 
        return true;  // word遍历完了
        var tmp = board[i][j];  // 记录到board的值
        board[i][j] = '-'      // 锁上，因为后续的递归是4个方向上的，无法保证上一个方向的值
        var res =  dfs(i - 1,j,board,word,index + 1) || dfs(i + 1,j,board,word,index + 1) || dfs(i,j - 1,board,word,index + 1) || dfs(i,j + 1,board,word,index + 1);
        board[i][j] = tmp;   // 恢复现场
        return res;
    }

    // 遍历整个board，找到初始位置点
    for(var i = 0;i < row; i++){
        for(var j = 0; j < col; j++){
            if(dfs(i,j,board,word,0)) return true;
        }
    }
    // 没找到
    return false
};
   ```

#### 14. 剪绳子I

~~~
	题目：
	给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 k[0],k[1]...k[m-1] 。请问 k[0]*k[1]*...*k[m-1] 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
	
	思路：
	动态规划：状态数组dp[i]表示：数字 i 拆分为至少两个正整数之和的最大乘积。为了方便计算，dp 的长度是 n + 1，值初始化为 1。显然dp[2]等于 1，外层循环从 3 开始遍历，一直到 n 停止。
	内层循环 j 从 1 开始遍历，一直到 i 之前停止，它代表着数字 i 可以拆分成 j + (i - j)。但 j * (i - j)不一定是最大乘积，因为i-j不一定大于dp[i - j]（数字i-j拆分成整数之和的最大乘积），这里要选择最大的值作为 dp[i] 的结果。
	贪心算法：把长度尽可能的分成3的小段，最后为4就返回4，这样乘积最大

var cuttingRope = function(n) {
    const dp = new Array(n+1).fill(1);
    for(let i = 3;i<=n;++i){
        for(let j=1;j<i;++j){
            dp[i]=Math.max(dp[i],j*(i-j),j*dp[i-j])
        }
    }
    return dp[n]
};
----------------------------------------
var cuttingRope = function(n) {
  let arr=[0,0,1,2,4];
  if(n<5) return arr[n];
  let res=1;
  while(n>=5){
      res=res*3;
      n=n-3;
  }
  return  res*n;
};
~~~

#### 14. 剪绳子 II

~~~
	题目：
	给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 k[0],k[1]...k[m - 1] 。请问 k[0]*k[1]*...*k[m - 1] 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
	
	思路：主要考虑边界溢出问题

var cuttingRope = function(n) {
  let arr=[0,0,1,2,4];
  if(n<5) return arr[n];
  const max=1e9+7;
  let res=1;
  while(n>=5){
      res=res%max*3;
      n=n-3;
  }
  return  res*n%max;
};
~~~

#### 15. 二进制中1的个数

~~~
	问题：
	编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为 汉明重量).）。
	
	思路：
	正则表达式、位运算
	
var hammingWeight = function(n) {
    const r =  n.toString(2).match(/1/g)
    return r ? r.length : 0
};
	
~~~

#### 16. 数值的整数次方
   ```
    题目：
    实现 pow(x, n) ，即计算 x 的 n 次幂函数。不得使用库函数，同时不需要考虑大数问题。

    思路：
    首先我们需要判断n正负和零取值三种情况，根据不同的情况通过递归来实现。
    
var myPow = function(x, n) {
    if(n===0)return 1;
    if(n===1)return x;
    if(n===-1)return 1/x;
    if(n%2===0){
        let a = myPow(x,n/2);
        return a*a;
    }else{
        let b = myPow(x,(n-1)/2);
        return b*b*x;
    }
};
    
  
   ```

#### 17. 打印从1到最大的n位数

~~~
	题目：
	输入数字 n，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。

	思路：
	1.暴力解法，直接用for循环进行输出
	2.针对大数问题n，无法通过Math.pow得出的情况下，我们找到规律，知道n代表位数，然后就可以得出max值为m个'9'的组合。然后for循环。
	
var printNumbers = function(n) {
    let arr = [];
    for(let i=1;i<Math.pow(10,n);i++){
        arr[i-1] = i;
    }
    return arr;
};
-------------------------------------------------------
var printNumbers = function(n) {
    let max = '';
    let arr = [];
    while(n--){
        max += '9';
    }
    for(let i = 1,l=max-'0';i<=l;i++){
        arr[i-1] = i;
    }
    return arr;
};
~~~

#### 18. 删除链表的节点

~~~
	题目：
	给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。返回删除后的链表的头节点。
	
	思路：
	用一个dummy结点(人为制造出来的第一个结点的前驱结点)[头指针？]来解决这个问题
	
var deleteNode = function(head, val) {
    let dummy = new ListNode() 
    dummy.next = head   
    let cur = dummy 
    while(cur.next) {
        if(cur.next.val === val) {
            cur.next = cur.next.next
            break;
        } else {
            cur = cur.next
        }
    }
    return dummy.next;
};
~~~

#### 19. 正则表达式匹配

~~~
	题目：
	请实现一个函数用来匹配包含'.'和'*'的正则表达式。模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（含0次）。在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但与"aa.a"和"ab*a"均不匹配。
	
	思路：
	待深究
	
var isMatch = function(s, p) {
    return new RegExp("^" + p + "$", "g").test(s);
};	
~~~

#### 20. 表示数值的字符串

~~~
	题目：
	请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。
	数值（按顺序）可以分成以下几个部分：
	若干空格
	一个 小数 或者 整数
	（可选）一个 'e' 或 'E' ，后面跟着一个 整数
	若干空格
	小数（按顺序）可以分成以下几个部分：
	（可选）一个符号字符（'+' 或 '-'）
	下述格式之一：
	至少一位数字，后面跟着一个点 '.'
	至少一位数字，后面跟着一个点 '.' ，后面再跟着至少一位数字
	一个点 '.' ，后面跟着至少一位数字
	整数（按顺序）可以分成以下几个部分：
	（可选）一个符号字符（'+' 或 '-'）
	至少一位数字
	
	思路：
	正则表达式一把梭
	
var isNumber = function(s) {
    return /^[+-]?(\d+(\.\d*)?|(\.\d+))(e[+-]?\d+)?$/i.test(s.trim());
};
	
~~~

#### 21. 调整数组顺序使奇数位于偶数前面

~~~
	题目：
	输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数在数组的前半部分，所有偶数在数组的后半部分。
	
	思路：
	一：首先想到的可以利用“双指针”，分别是指向数组头部的指针 i，与指向数组尾部的指针 j，然后进行交换操作。过程如下：
	1.i 向右移动，直到遇到偶数；j 向左移动，直到遇到奇数
	2.检查 i 是否小于 j，若小于，交换 i 和 j 的元素，回到上一步骤继续移动；否则结束循环
	二：莫得感情的排序，逆序且偶数排后面。
	三：可以使用辅助数组的方式。首先对数组中的元素进行遍历，每遇到一个奇数就将它加入到奇数辅助数组中，每遇到一个偶数，就将它将入到偶数辅助数组中。最后再将两个数组合并。这一种方法的时间复杂度为 O(n)，空间
	
var exchange = function(nums) {
    const length = nums.length;
    if(!length){
        return [];
    }
    let i = 0;
    let j=length-1;
    while(i<j){
        while(i<length&&nums[i]%2){
            i++;
        }
        while(j>=0&&nums[j]%2===0){
            j--;
        }
        if(i<j){
            [nums[i],nums[j]] = [nums[j],nums[i]];
            i++;
            j--;
        }
    }
    return nums;
};
-------------------------------------
var exchange = function(nums) {
    return nums.sort((a,b)=>b%2-a%2);
};
~~~

#### 22. 链表中倒数第k个节点

~~~
	题目：
	输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。
	
	思路：
	快慢指针。使用两个指针，先让第一个和第二个指针都指向头结点，然后再让第二个指针走 k-1 步，到达第 k 个节点。然后两个指针同时向后移动，当第二个指针到达末尾时，第一个指针指向的就是倒数第 k 个节点了。

var getKthFromEnd = function(head, k) {
    let fast = head
    let slow = head
    while(k!==0){
        fast = fast.next
        k--
    }
    while(fast){
        fast = fast.next
        slow = slow.next
    }
    return slow
};
~~~

#### 24. 反转链表

~~~
	题目：
	定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

	思路：
	多指针法。处理链表的本质是处理链表之间的指针关系。

var reverseList = function(head) {
    let pre = null;
    let cur = head;
    while(cur){
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre
};
~~~

#### 25. 合并两个排序的链表

~~~
	题目：
	输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。
	
	思路：
	处理指针之间的关系即可。
	
const mergeTwoLists = function(l1, l2) {
  let head = new ListNode()
  let cur = head
  while(l1 && l2) {
      if(l1.val<=l2.val) {
          cur.next = l1
          l1 = l1.next
      } else {
          cur.next = l2
          l2 = l2.next
      }
      cur = cur.next 
  }
  cur.next = l1!==null?l1:l2
  return head.next
};
~~~

#### 26. 树的子结构

~~~
	题目：
	输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)。B是A的子结构， 即 A中有出现和B相同的结构和节点值。
	
	思路：
	递归判断当前节点、左子树、右子树是否都同时相等。
	
var isSubStructure = function(A, B) {
    if(!A || !B) {
        return false
    }
    return isSameTree(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
};
var isSameTree = function(A, B) {
    if(!B) {
        return true;
    }
    if(!A) {
        return false;
    }
    if(A.val !== B.val) {
        return false;
    }
    return isSameTree(A.left, B.left) && isSameTree(A.right, B.right);
};
~~~

#### 27. 二叉树的镜像

~~~
	题目：
	请完成一个函数，输入一个二叉树，该函数输出它的镜像。
	
	思路：
	翻转二叉树
	
var mirrorTree = function(root) {
    if(!root){
        return root;
    }
    let right = mirrorTree(root.right);
    let left = mirrorTree(root.left)
    root.left = right;
    root.right = left;
    return root;
};
~~~

#### 28. 对称的二叉树

~~~
	题目：
	请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。
	
	思路：
	通过二叉树的前序遍历和其对称二叉树的前序遍历做比较，如果两个序列是一样的，那么该二叉树就是对称的。n1.left和n2.right做比较，就相当与对称二叉树在做比较。

var isSymmetric = function(root) {
    return isSymmetricCore(root,root)
};
var isSymmetricCore = function(n1,n2) {
    if(!n1 && !n2) 
        return true;
    if(!n1 || !n2) 
        return false;
    if(n1.val!==n2.val)
        return false;
    return isSymmetricCore(n1.left,n2.right) && isSymmetricCore (n1.right,n2.left)
};
~~~

#### 29. 顺时针打印矩阵

~~~
	题目：
	输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
	
	思路：
	几个关键位置 四个拐弯角 top 、right、bottom、left 顺时针 [left, right] -> [top, bottom] -> [right, left] -> [bottom, top]一次性遍历完 当res的长度等于row * col 即所有元素遍历完成 终止while循环

var spiralOrder = function(matrix) {
     if (!matrix.length) return [];
    const res = [], row = matrix.length, col = matrix[0].length, size = row * col;
    let t = 0, r = col - 1, b = row - 1, l = 0;
    while (res.length !== size) {
        // 从左往右
        for (let i = l; i <= r; i++) res.push( matrix[t][i] )
        t++
        // 从上往下
        for (let i = t; i <= b; i++) res.push( matrix[i][r] )
        r--
        // 检查一次是否遍历完
        if (res.length === size) break
        // 从右往左
        for (let i = r; i >= l; i--) res.push( matrix[b][i] )
        b--
        // 从下往上
        for (let i = b; i >= t; i--) res.push( matrix[i][l] )
        l++
    }
    return res
};
~~~

#### 30. 包含min函数的栈

~~~
	题目：
	定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。
	
	思路：
	利用辅助栈来实现。
	
const MinStack = function() {
    this.stack = [];
    // 定义辅助栈
    this.stack2 = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x);
    // 若入栈的值小于当前最小值，则推入辅助栈栈顶
    if(this.stack2.length == 0 || this.stack2[this.stack2.length-1] >= x){
        this.stack2.push(x);
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    // 若出栈的值和当前最小值相等，那么辅助栈也要对栈顶元素进行出栈，确保最小值的有效性
    if(this.stack.pop() == this.stack2[this.stack2.length-1]){
        this.stack2.pop();
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length-1];
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    // 辅助栈的栈顶，存的就是目标中的最小值
    return this.stack2[this.stack2.length-1];
};
~~~

#### 31. 栈的压入、弹出序列

~~~
	题目：
	输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如，序列 {1,2,3,4,5} 是某栈的压栈序列，序列 {4,5,3,2,1} 是该压栈序列对应的一个弹出序列，但 {4,3,5,1,2} 就不可能是该压栈序列的弹出序列。
	
	思路:
	我们可以使用一个辅助栈的方式来实现，首先遍历压栈顺序，依次将元素压入辅助栈中，每次压入元素后我们首先判断该元素是否与出栈顺序中的此刻位置的元素相等，如果不相等，则将元素继续压栈，如果相等，则将辅助栈中的栈顶元素出栈，出栈后，将出栈顺序中的位置后移一位继续比较。当压栈顺序遍历完成后，如果辅助栈不为空，则说明该出栈顺序不正确。
	
var validateStackSequences = function(pushed, popped) {
    const stack = [];
    let index = 0;
    for(let i=0,len=pushed.length-1;i<=len;i++){
        stack.push(pushed[i])
        while(stack.length!==0&&stack[stack.length-1]===popped[index]){
            stack.pop();
            index++;
        }
    }
    return !stack.length
};	
~~~

#### 32 - I. 从上到下打印二叉树

~~~
	题目：
	从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。
	
	思路：
	本质上是二叉树的层序遍历，可以通过队列来实现。首先将根节点入队。然后对队列进行出队操作，每次出队时，将出队元素的左右子节点依次加入到队列中，直到队列长度变为 0 时，结束遍历。

var levelOrder = function(root) {
    if(!root){
        return [];
    }
    const queue = [root];
    const arr = [];
    while(queue.length){
        for(let i = 0;i<queue.length;i++){
            let cur =  queue.shift();
            arr.push(cur.val)
            if(cur.left!==null){
                queue.push(cur.left)
            }
            if(cur.right!==null){
                queue.push(cur.right)
            }
        }
    }
    return arr;
};
~~~

#### 32 - II. 从上到下打印二叉树 II

~~~
	题目：
	从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。
	
	思路：
	大致同上，增添换行。
	
var levelOrder = function(root) {
    if(!root){
        return [];
    }
    const queue = [root];
    const res = [];
    let level = 0;
    while(queue.length){
        res[level] = [];
        let levelNum = queue.length;
        while(levelNum--){
            const cur =  queue.shift();
            res[level].push(cur.val);
            if(cur.left!==null){
                queue.push(cur.left)
            }
            if(cur.right!==null){
                queue.push(cur.right)
            }
        }
        level++;
    }
    return res;
};
~~~

#### 32 - III. 从上到下打印二叉树 III

~~~
	题目：
	请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。
	
	思路：
	添加一层判断，通过数组push和unshift方法进行数据入栈处理。
	
var levelOrder = function(root) {
    if(!root){
        return [];
    }
    const queue = [root];
    const res = [];
    let level = 0;
    while(queue.length){
        res[level] = [];
        let levelNum = queue.length;
        while(levelNum--){
            const cur =  queue.shift();

            if(level%2 !== 0){
                res[level].unshift(cur.val);
            }else{
                res[level].push(cur.val);
            }

            if(cur.left!==null){
                queue.push(cur.left)
            }
            if(cur.right!==null){
                queue.push(cur.right)
            }
        }
        level++;
    }
    return res;
};
~~~

#### 33. 二叉搜索树的后序遍历序列

~~~
	题目：
	输入一个整数数组，判断该数组是不是某`二叉搜索树`的后序遍历结果。如果是则返回 true，否则返回 false。假设输入的数组的任意两个数字都互不相同。
	
	思路：
	二叉搜索树的左子树均小于根节点，右子树均大于根节点。 判断二叉搜索树的后续遍历是否合法，只需判断右子树是否均大于根节点，左子树是否均小于根节点。 显然对于每个节点的操作都是一样的(问题拆解成子问题))，所以使用递归来实现。
	
var verifyPostorder = function (postorder) {
    let len = postorder.length;
    if (len < 2) return true
    let root = postorder[len - 1];
    let i = 0
    for (; i < len - 1; i++) {
        if (postorder[i] > root) break
    }
    let result = postorder.slice(i, len - 1).every(x => x > root);
    if (result) {
        return verifyPostorder(postorder.slice(0, i)) && verifyPostorder(postorder.slice(i, len - 1))
    } else {
        return false
    }
};
~~~

#### 34. 二叉树中和为某一值的路径

~~~
	题目：给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。叶子节点 是指没有子节点的节点。
	
	思路：
	关于slice的使用：这里传递的tmp路径是一个数组，如果不用slice复制的话实际上不同分支之间传递的是同一个引用地址，导致不同路径之间会互相污染。 slice返回的是一个原数组的浅拷贝，类似要记录路径的题目都需要slice一下。


var pathSum = function(root, sum) {
  if (root === null) return [];
  const res = [];
  const DFS = (root, sum, tmp) => {
    if (root.val === sum && !root.left && !root.right) {
        res.push(tmp);
    }
    tmp.push(root.val);
    if (root.left) DFS(root.left, sum - root.val, tmp.slice());
    if (root.right) DFS(root.right, sum - root.val, tmp.slice());
  }
  DFS(root, sum, []);
  return res;
};
~~~

#### 35. 复杂链表的复制

~~~
	题目：
	请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null
	
	思路：
	首先对原有链表每个节点进行复制，并且使用 Map 以键值对的方式将原有节点和复制节点保存下来。当链表复制完成之后，再来设置每个节点的 random 指针，这个时候我们通过 Map 中的键值关系就可以获取到对应的复制节点，因此不必再从头结点遍历，将时间的复杂度降低为了 O(n)，但是空间复杂度变为了 O(n)。这是一种以空间换时间的做法。
	
var copyRandomList = function(head) {
    if(!head) return null
    let copyHead = new Node()
    let copyNode = copyHead
    const hashMap = new Map()
    let curr = head
    while(curr){
        copyNode.val = curr.val
        copyNode.next = curr.next ? new Node() : null
        hashMap.set(curr,copyNode)
        curr = curr.next
        copyNode = copyNode.next
    }
    curr = head
    copyNode = copyHead
    while(curr){
        copyNode.random = curr.random ? hashMap.get(curr.random) : null
        copyNode = copyNode.next
        curr = curr.next
    }
    return copyHead
};
~~~

####  36. 二叉搜索树与双向链表

~~~
	题目：
	输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的循环双向链表。要求不能创建任何新的节点，只能调整树中节点指针的指向。
	
	思路：
	需要生成一个排序的双向列表，那么我们应该通过中序遍历的方式来调整树结构，因为只有中序遍历，返回才是一个从小到大的排序序列。基本的思路是我们首先从根节点开始遍历，先将左子树调整为一个双向链表，并将左子树双向链表的末尾元素的指针指向根节点，并将根节点的左节点指向末尾节点。再将右子树调整为一个双向链表，并将右子树双向链表的首部元素的指针指向根元素，再将根节点的右节点指向首部节点。通过对左右子树递归调整，因此来实现排序的双向链表的构建。

var treeToDoublyList = function(root) {
    if (root == null) return root
    let head, pre
    dfs(root)
    head.left = pre
    pre.right = head
    return head

    function dfs(node) {
        if (!node) return
        dfs(node.left)

        if (!pre) head = node
        else pre.right = node
        node.left = pre
        pre = node

        dfs(node.right)
    }
    
};
~~~

#### 37. 序列化二叉树(待探究)

~~~
	题目:
	请实现两个函数，分别用来序列化和反序列化二叉树。你需要设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。
	
	思路：
	
~~~

#### 38. 字符串的排列

~~~~
	题目：
	输入一个字符串，打印出该字符串中字符的所有排列。你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。
	
	思路：
	经典回溯
	
var permutation = function(s) {
  const n = s.length;
  const visited = {};
  const res = new Set();  // 利用集合来避免重复
  const backTrack = tmpPath => {
    if (tmpPath.length === n) {
      res.add(tmpPath);
      return;
    }
    for (let i = 0; i < n; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      backTrack(tmpPath + s[i]);  // 直接在这里修改tmpPath，减少了增添和复原的两行代码
      visited[i] = false;
    }
  }
  backTrack('');
  return [...res];
};
~~~~

#### 39. 数组中出现次数超过一半的数字

~~~~
	题目：
	数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。你可以假设数组是非空的，并且给定的数组总是存在多数元素。
	
	思路：
	1)对数组进行排序，排序后的中位数就是所求数字。这种方法的时间复杂度取决于我们采用的排序方法的时间复杂度，因此最快为O(nlogn)。
	2)哈希表
	
var majorityElement = function(nums) {
    nums.sort((a,b) => {return a-b})
    const n = Math.floor(nums.length/2)
    return nums[n]
};
-------------------------------------------
var majorityElement = function(nums) {
   if(!nums||!nums.length){
       return null
   }
   let map = new Map()
   for(let i=0;i<nums.length;i++){
       let cur = nums[i]
       if(map.has(cur)){
           map.set(cur,map.get(cur)+1)
       }else{
           map.set(cur,1)
       }
   }
   let mid = nums.length >> 1
   for([key,value] of map){
       if(value > mid){
           return key
       }
   }
};
~~~~

#### 40. 最小的k个数

~~~
	题目：
	输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。
	
	思路：
	首先将数组排序，排序后再取最小的 k 个数。这一种方法的时间复杂度取决于我们选择的排序算法的时间复杂度，最好的情况下为 O(nlogn)。

var getLeastNumbers = function(arr, k) {
    return arr.sort((a, b) => a - b).slice(0, k);
};
~~~

#### 41. 数据流中的中位数（待探究）

~~~
	题目：
	如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。
例如，
[2,3,4] 的中位数是 3
[2,3] 的中位数是 (2 + 3) / 2 = 2.5
设计一个支持以下两种操作的数据结构：
void addNum(int num) - 从数据流中添加一个整数到数据结构中。
double findMedian() - 返回目前所有元素的中位数。
	
	思路：
	
~~~

#### 42. 连续子数组的最大和

~~~
	题目：
	输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。要求时间复杂度为O(n)。
	
	思路：
	首先我们观察一个最大和的连续数组的规律，我们可以发现，子数组一定是以正数开头的，中间包含了正负数。因此我们可以从第一个数开始向后叠加，每次保存最大的值。叠加的值如果为负数，则将叠加值初始化为0，因为后面的数加上负数只会更小，因此需要寻找下一个正数开始下一个子数组的判断。一直往后判断，直到这个数组遍历完成为止，得到最大的值。使用这一种方法的时间复杂度为 O(n)。
	
var maxSubArray = function(nums) {
    let i,len=nums.length,max=nums[0]
    for(i=1;i<len;i++){
        if(nums[i-1]>0){
            nums[i] = nums[i-1]+nums[i]
        }
        if(nums[i]>max){
            max = nums[i]
        }
    }
    return max
};
~~~

#### 43. 1～n 整数中 1 出现的次数(待探究)

~~~
	题目：
	输入一个整数 n ，求1～n这n个整数的十进制表示中1出现的次数。例如，输入12，1～12这些整数中包含1 的数字有1、10、11和12，1一共出现了5次。
	
	
	思路：
	数学规律
	
var countDigitOne = function(n) {
    let high = Math.floor(n / 10), cur = n % 10, low = 0,  digit = 1
    let res = 0
    while(high != 0 || cur != 0) {
        if (cur == 0) res += high * digit
        else if (cur == 1) res += high * digit + low + 1
        else res += (high + 1) * digit
        low += cur * digit
        cur = high % 10
        high = Math.floor(high / 10)
        digit *= 10
    }
    return res
};	
~~~

#### 44. 数字序列中某一位的数字

~~~
	题目：
	数字以0123456789101112131415…的格式序列化到一个字符序列中。在这个序列中，第5位（从下标0开始计数）是5，第13位是1，第19位是4，等等。请写一个函数，求任意第n位对应的数字。
	
	思路：
	找规律
	
var findNthDigit = function(n) {
  // 0-9
  if (n>=0 && n <=9) return n
  // 10-99       90    Math.pow(10, 1) * 9个
  // 100-999     900   Math.pow(10, 2) * 9个
  //...... 
  var start = 9
  var i = 1
  // 求出第n个字符所在的数字是几位
  while(start < n) {
      i += 1
      start += Math.pow(10, i - 1) * 9 * i
  }
  // 最后一个字符与第n个字符之间相差多少个数
  var diff_n = Math.floor((start - n) / i)
  // 余数
  var diff_y = (start - n) % i
  // 由规律可知最后一个数为Math.pow(10, i) - 1
  // 相差diff_n个数切余数为diff_y
  return `${Math.pow(10, i) - 1 - diff_n}`.charAt(i - 1 - diff_y)
};	
~~~

#### 46. 把数字翻译成字符串

~~~
	题目：
	给定一个数字，我们按照如下规则把它翻译为字符串：0 翻译成 “a” ，1 翻译成 “b”，……，11 翻译成 “l”，……，25 翻译成 “z”。一个数字可能有多个翻译。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。
	
	思路：
	动态规划
	
var translateNum = function(num) {
    let str = num + ''
    let dp = [1,1]
    for(let i = 1;i<str.length;i++){
        let temp = parseInt(str.slice(i-1,i+1),10)||0
        if(temp >=10 && temp <= 25){
            dp[i+1]=dp[i]+dp[i-1]
        }else{
            dp[i+1] = dp[i]
        }
    }
    return dp[dp.length-1]
};	
~~~

#### 47. 礼物的最大价值

~~~
	题目：
	在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？
	
	思路：
	动态规划。从左上角开始，每次有两个选择，从上面格子过来或者从左面格子过来， 每次选择路径总和较大的一个，注意：如果左侧或者上方的格子越界视为 0

var maxValue = function(grid) {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  
  let rowLimit = grid.length,
      colLimit = grid[0].length;
  
  for (let row = 0; row < rowLimit; row++) {
    for (let col = 0; col < colLimit; col++) {
      let left = col - 1 < 0 ? 0 : grid[row][col - 1],
          top = row - 1 < 0 ? 0 : grid[row - 1][col];
      
      grid[row][col] += Math.max(left, top);
    }
  }
  
  return grid[rowLimit - 1][colLimit - 1];
};
~~~

#### 48. 最长不含重复字符的子字符串

~~~
	题目：
	请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。
	
	思路：
	维护一个数组arr，对原字符串遍历，判断字符是否在arr里面，不在的话就直接push进去，再重新判断max的大小；在的话就将之前重复arr字符之前的项全部去除，再重新push进去。

var lengthOfLongestSubstring = function(s) {
    let arr = [];
    let max = 0;
    for(let item of s){
        if(arr.includes(item)){
            let index = arr.indexOf(item);
            arr.splice(0, index + 1);
        }
        arr.push(item);
        max = max > arr.length ? max : arr.length;
    }
    return max;
};	
~~~

#### 49. 丑数（待探究）

~~~
	题目：
	我们把只包含质因子 2、3 和 5 的数称作丑数（Ugly Number）。求按从小到大的顺序的第 n 个丑数。
	
	思路：
	判断一个数是否为丑数，可以判断该数不断除以2，最后余数是否为1。判断该数不断除以3，最后余数是否为1。判断不断除以 5，最后余数是否为1。在不考虑时间复杂度的情况下，可以依次遍历找到第 N 个丑数。

	
~~~

#### 50、第一个只出现一次的字符

~~~
	题目：
	在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。
	
	思路：
	1）首先对字符串进行一次遍历，将字符和字符出现的次数以键值对的形式存储在 Map 结构中。然后第二次遍历时，去 Map 中获取对应字符出现的次数，找到第一个只出现一次的字符。这一种方法的时间复杂度为 O(n)
	2）正则表达式

var firstUniqChar = function(s) {
    var map = new Map()
    for(let i=0;i<s.length;i++){
        var cur = s.charAt(i) //返回索引位置的char
        if(map.has(cur)){
            map.set(cur,false);
        }else{
            map.set(cur,true)
        }
    }
    for([key,value] of map){
        if(value){
            return key
        }
    }
    return ' '
};
------------------------------------
var firstUniqChar = function(s) {
    for(let char of new Set(s)){
        if(s.match(new RegExp(char,'g')).length === 1){
            return char;
        }
    }
    return ' '
};
~~~

#### 51. 数组中的逆序对

~~~
	题目：
	在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。
	
	思路：
	（1）第一种思路是直接求解的方式，顺序扫描整个数组。每扫描到一个数字的时候，逐个比较该数字和它后面的数字的大小。如果后面的数字比它小，则这两个数字就组成了一个逆序对。假设数组中含有 n 个数字。由于每个数字都要和 O(n）个数字作比较，因此这个算法的时间复杂度是 O(n^2)。
    （2）第二种方式是使用归并排序的方式，通过利用归并排序分解后进行合并排序时，来进行逆序对的统计，这一种方法的时间复杂度为 O(nlogn)。
	
var reversePairs = function(nums) {
    let res = 0;
    const length = nums.length;
    for (let i = 0; i < length; ++i) {
        for (let j = i + 1; j < length; ++j) {
            nums[i] > nums[j] && ++res;
        }
    }
    return res;
};
-----------------------------------------------------------
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
    // 归并排序
    let sum = 0;
    mergeSort(nums);
    return sum;

    function mergeSort (nums) {
        if(nums.length < 2) return nums;
        const mid = parseInt(nums.length / 2);
        let left = nums.slice(0,mid);
        let right = nums.slice(mid);
        return merge(mergeSort(left), mergeSort(right));
    }

    function merge(left, right) {
        let res = [];
        let leftLen = left.length;
        let rightLen = right.length;
        let len = leftLen + rightLen;
        for(let index = 0, i = 0, j = 0; index < len; index ++) {
            if(i >= leftLen) res[index] = right[j ++];
            else if (j >= rightLen) res[index] = left[i ++];
            else if (left[i] <= right[j]) res[index] = left[i ++];
            else {
                res[index] = right[j ++];
                sum += leftLen - i;//在归并排序中唯一加的一行代码
            }
        }
        return res;
    }
};

作者：静尾
链接：https://leetcode.cn/problems/shu-zu-zhong-de-ni-xu-dui-lcof/solutions/155093/ni-yi-ding-neng-kan-dong-de-gui-bing-jie-fa-by-tan/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
~~~

#### 52. 两个链表的第一个公共节点

~~~
	题目：
	输入两个链表，找出它们的第一个公共节点。
	
	
	思路：
	双指针
	
var getIntersectionNode = function(headA, headB) {
  let a = headA,
    b = headB;
  while (a != b) {
    // a 走一步，如果走到 headA 链表末尾，转到 headB 链表
    a = a != null ? a.next : headB;
    // b 走一步，如果走到 headB 链表末尾，转到 headA 链表
    b = b != null ? b.next : headA;
  }
  return a;
};	
~~~

#### 53 - I. 在排序数组中查找数字 I

~~~
	题目：
	统计一个数字在排序数组中出现的次数。
	
	思路：
	1.暴力循环
	2.二分查找
	
var search = function(nums, target) {
    let j = 0;
    for(let i = 0;i<nums.length;i++){
        if(nums[i] === target){
            j++;
        }
    }
    return j;
};
-----------------------------------------------------
var search = function(nums, target) {
  let count = 0,n = nums.length,left = 0,right = n - 1;

  while (left < right) {
    let mid = (left + right) >> 1;
    if (nums[mid] === target) {
      left = mid;
      break;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (nums[left] !== target) return 0;

  let copy = left - 1;
  
  while (copy >= 0 && nums[copy] === target) {
    copy--;
    count++;
  }
  
  while (nums[left] === target && left < n) {
    left++;
    count++;
  }
  
  return count;
};
~~~

#### 53 - II. 0～n-1中缺失的数字

~~~
	题目：
	一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。
	
	思路：
	1.循环
	2.二分查找
	
var missingNumber = function(nums) {
    let j = 0;
    for(let i=0;i<nums.length;i++){
        if(nums[i] !== j){
            return j;
        }
        j++;
    }
    return j;
};
-----------------------------------------------------
var missingNumber = function (nums) {
    var start = 0, end = nums.length - 1, mid;
    while (start <= end) {
        mid = start + Math.floor((end - start) / 2);
        if (nums[mid] === mid) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return start;
};	
~~~

#### 54. 二叉搜索树的第k大节点

~~~
	题目：
	给定一棵二叉搜索树，请找出其中第 k 大的节点的值。
	
	思路：
	中序遍历（右 根 左），将值添加到数组，然后通过索引输出
	
var kthLargest = function(root, k) {
    let res = [];
    function midSort(root){
        if(!root) return ;
        midSort(root.right,res);
        res.push(root.val);
        midSort(root.left,res);
    }
    midSort(root)
    return res[k-1]
};	
~~~

#### 55 - I. 二叉树的深度

~~~
	题目：
	输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度
	
	思路：
	根节点的深度等于左右深度较大值加一，因此可以通过递归遍历来实现。
	
var maxDepth = function(root) {
    if(!root) return 0;
    return Math.max(maxDepth(root.left),maxDepth(root.right))+1;
};	
~~~

#### 55 - II. 平衡二叉树

~~~
	题目：
	输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树
	
	思路：
	在求一个节点的深度时，同时判断它是否平衡。如果不平衡则直接返回 -1，否则返回树高度。如果一个节点的一个子树的深度为-1，那么就直接向上返回 -1 ，该树已经是不平衡的了。通过这种方式确保了节点只能够被访问一遍。
	
var isBalanced = function(root) {
    let flag = true;
    function dfs(root){
        if(!root||!flag){
            return 0;
        }
        const left = dfs(root.left);
        const right = dfs(root.right);
        if(Math.abs(left-right)>1){
            flag = false;
            return 0;
        }
        return Math.max(left,right)+1
    }
    dfs(root);
    return flag;
};	
~~~

#### 56 - I. 数组中数字出现的次数

~~~
	题目：
	一个整型数组 nums 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度是O(1)。
	
	思路：
	1.使用map
	2.先排序后遍历
	
var singleNumbers = function(nums) {
    const arr = [];
    let map = new Map();
    for(let i = 0;i<nums.length;i++){
        let cur = nums[i];
        if(map.has(cur)){
            map.set(cur,false);
        }else{
            map.set(cur,true);
        }
    }
    for([key,value] of map){
        if(value){
            arr.push(key);
        }
    }
    return arr;
};
--------------------------------------------------------------
var singleNumbers = function(nums) {
    let numsSort = nums.sort((a,b)=>{ return a-b }),result = []
    for(let i=0;i<numsSort.length;i++){
        if(numsSort[i]===numsSort[i+1]){
            i++
        }else{
            result.push(numsSort[i])
            if(result.length===2) break
        }
    }
    return result
};
~~~

#### 56 - II. 数组中数字出现的次数 II

~~~
	题目：
	在一个数组 nums 中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。
	
	思路：
	使用map
	
var singleNumber = function(nums) {
    let map = new Map();
    for(let i = 0;i<nums.length;i++){
        let cur = nums[i];
        if(map.has(cur)){
            map.set(cur,false);
        }else{
            map.set(cur,true);
        }
    }
    for([key,value] of map){
        if(value){
            return key;
        }
    }
};
~~~

#### 57. 和为s的两个数字

~~~
	题目：
	输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。
	
	思路：
	1.两数之和转换为两数之差，巧妙利用map
	2.双指针法

var twoSum = function(nums, target) {
    const map = new Map();
    let len = nums.length;
    for(let i = 0;i < len;i++){
        let value = target - nums[i];
        if(map.has(value)){
            return [value,nums[i]];
        }else{
            map.set(nums[i],i)
        }
    }
};
--------------------------------------------------------------
var twoSum = function(nums, target) {
    var arr = [];
    var left = 0;
    var right = nums.length - 1;
    while(left < right){
        var temp = nums[left] + nums[right];
        if(temp == target){
            arr.push(nums[left]);
            arr.push(nums[right]);
            break;
        }else if(temp < target){
            left ++;
        }else{
            right --;
        }
    }
    return arr;
};
~~~

#### 57 - II. 和为s的连续正数序列

~~~
	题目：
	输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。
	
	思路：
	滑动窗口（双指针）
	
var findContinuousSequence = function(target) {
    let l=1
    let r=2
    let sum = 3
    let res=[]
    // 滑动窗口框架
    while(l<r){
        if(sum===target){
            let ans =[]
            for(let k=l;k<=r;k++){
                ans[k-l]=k
            }
            res.push(ans)
            // 等于的情况 我们可以继续窗口往右搜索 同时缩小左边的
             sum=sum-l
             l++
        } else if(sum>target){
            // 大于的条件 缩小窗口 sum已经加过了
            sum=sum-l
            l++
        } else {
            // 小于的情况 滑动窗口继续扩大
            r++
            sum=sum+r
        }
    }
    return res
};	
~~~

#### 5

~~~
	题目：
	
	
	思路：
	
	
~~~



























# temp. ----------------


#### 43. 左旋转字符串
   ```
    题目：

    汇编语言中有一种移位指令叫做循环左移（ROL），现在有个简单的任务，就是用字符串模拟这个指令的运算结果。对于一个给定的
    字符序列 S，请你把其循环左移 K 位后的序列输出。例如，字符序列 S=”abcXYZdef”，要求输出循环左移3位后的结果，即 “X
    YZdefabc”。是不是很简单？OK，搞定它！


    思路：

    字符串裁剪后拼接
   ```

#### 44. 翻转单词顺序列
   ```
    题目：

    牛客最近来了一个新员工 Fish，每天早晨总是会拿着一本英文杂志，写些句子在本子上。同事 Cat 对 Fish 写的内容颇感兴趣，有
    一天他向 Fish 借来翻看，但却读不懂它的意思。例如，“student. a am I”。后来才意识到，这家伙原来把句子单词的顺序翻转了
    ，正确的句子应该是“I am a student.”。Cat 对一一的翻转这些单词顺序可不在行，你能帮助他么？


    思路：

    通过空格将单词分隔，然后将数组反序后，重新拼接为字符串。
   ```

#### 45. 扑克牌的顺子
   ```
    题目：

    LL 今天心情特别好，因为他去买了一副扑克牌，发现里面居然有2个大王，2个小王（一副牌原本是54张^_^）...他随机从中抽出
    了5张牌，想测测自己的手气，看看能不能抽到顺子，如果抽到的话，他决定去买体育彩票，嘿嘿！！“红心 A，黑桃3，小王，大王
    ，方片5”，“Oh My God!”不是顺子..... LL 不高兴了，他想了想，决定大\小王可以看成任何数字，并且 A 看作1，J 为11，
    Q 为12，K 为13。上面的5张牌就可以变成“1,2,3,4,5”（大小王分别看作2和4），“So Lucky!”。LL 决定去买体育彩票啦。
    现在，要求你使用这幅牌模拟上面的过程，然后告诉我们 LL 的运气如何。为了方便起见，你可以认为大小王是0。


    思路：

    首先判断5个数字是不是连续的，最直观的方法是把数组排序。值得注意的是，由于 0 可以当成任意数字，我们可以用 0 去补满数
    组中的空缺。如果排序之后的数组不是连续的，即相邻的两个数字相隔若干个数字，但只要我们有足够的。可以补满这两个数字的空
    缺，这个数组实际上还是连续的。

    于是我们需要做 3 件事情：首先把数组排序，再统计数组中 0 的个数，最后统计排序之后的数组中相邻数字之间的空缺总数。如
    果空缺的总数小于或者等于 0 的个数，那么这个数组就是连续的：反之则不连续。最后，我们还需要注意一点：如果数组中的非 0
    数字重复出现，则该数组不是连续的。换成扑克牌的描述方式就是如果一副牌里含有对子，则不可能是顺子。
   ```
   详细资料可以参考：
   [《扑克牌的顺子》](http://wiki.jikexueyuan.com/project/for-offer/question-forty-four.html)

#### 46. 圆圈中最后剩下的数字（约瑟夫环问题）
   ```
    题目：

    0, 1, … , n-1 这 n 个数字排成一个圈圈，从数字 0 开始每次从圆圏里删除第 m 个数字。求出这个圈圈里剩下的最后一个数
    字。


    思路：

    （1）使用环形链表进行模拟。

    （2）根据规律得出（待深入理解）
   ```
   详细资料可以参考：
   [《圆圈中最后剩下的数字》](http://wiki.jikexueyuan.com/project/for-offer/question-forty-five.html)


#### 47. 1+2+3+...+n
   ```
    题目：

    求 1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case 等关键字及条件判断语句（A?B:C）。


    思路：

    由于不能使用循环语句，因此我们可以通过递归来实现。并且由于不能够使用条件判断运算符，我们可以利用 && 操作符的短路特
    性来实现。
   ```

#### 48. 不用加减乘除做加法
   ```
    题目：

    写一个函数，求两个整数之和，要求在函数体内不得使用 ＋、－、×、÷ 四则运算符号。


    思路：

    通过位运算，递归来实现。
   ```

#### 49. 把字符串转换成整数。
   ```
    题目：

    将一个字符串转换成一个整数，要求不能使用字符串转换整数的库函数。数值为0或者字符串不是一个合法的数值则返回 0。输入描
    述：输入一个字符串，包括数字字母符号，可以为空。输出描述：如果是合法的数值表达则返回该数字，否则返回0。


    思路：

    首先需要进行符号判断，其次我们根据字符串的每位通过减0运算转换为整数和，依次根据位数叠加。
   ```

#### 50. 数组中重复的数字
   ```
    题目：

    在一个长度为 n 的数组里的所有数字都在 0 到 n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知
    道每个数字重复了几次。请找出数组中任意一个重复的数字。


    思路：

    （1）首先将数组排序，排序后再进行判断。这一种方法的时间复杂度为 O(nlogn)。

    （2）使用 Map 结构的方式，依次记录下每一个数字出现的次数，从而可以判断是否出现重复数字。这一种方法的时间复杂度为 O
        (n)，空间复杂度为 O(n)。

    （3）从数组首部开始遍历，每遍历一个数字，则将该数字和它的下标相比较，如果数字和下标不等，则将该数字和它对应下标的值
        交换。如果对应的下标值上已经是正确的值了，那么说明当前元素是一个重复数字。这一种方法相对于上一种方法来说不需要
        额外的内存空间。
   ```

#### 51. 构建乘积数组
   ```
    题目：

    给定一个数组 A[0,1,...,n-1]，请构建一个数组 B[0,1,...,n-1]，其中 B 中的元素 B[i]=A[0]*A[1]*...*A[i-1]*A
    [i+1]*...*A[n-1]。不能使用除法。


    思路：
    
    （1）  C[i]=A[0]×A[1]×...×A[i-1]=C[i-1]×A[i-1] 

          D[i]=A[i+1]×...×A[n-1]=D[i+1]×A[i+1] 

          B[i]=C[i]×D[i]

          将乘积分为前后两个部分，分别循环求出后，再进行相乘。

    （2）上面的方法需要额外的内存空间，我们可以引入中间变量的方式，来降低空间复杂度。（待深入理解）
   ```
   详细资料可以参考：
   [《构建乘积数组》](https://zhuanlan.zhihu.com/p/34804711)


#### 52. 正则表达式的匹配
   ```
    题目：

    请实现一个函数用来匹配包括'.'和'*'的正则表达式。模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任
    意次（包含0次）。 在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，
    但是与"aa.a"和"ab*a"均不匹配。


    思路：

    （1）状态机思路（待深入理解）
   ```
   详细资料可以参考：
   [《正则表达式匹配》](http://wiki.jikexueyuan.com/project/for-offer/question-fifty-three.html)


#### 53. 表示数值的字符串
   ```
    题目：

    请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。例如，字符串"+100","5e2","-123","3.1416"和"-1E-
    16"都表示数值。 但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是。、


    思路：

    利用正则表达式实现
   ```

#### 54. 字符流中第一个不重复的字符
   ```
    题目：

    请实现一个函数用来找出字符流中第一个只出现一次的字符。例如，当从字符流中只读出前两个字符 "go" 时，第一个只出现一次
    的字符是 "g" 。当从该字符流中读出前六个字符 "google" 时，第一个只出现一次的字符是 "l"。 输出描述：如果当前字符流
    没有存在出现一次的字符，返回#字符。


    思路：

    同第 34 题
   ```

#### 55. 链表中环的入口结点
   ```
    题目：

    一个链表中包含环，如何找出环的入口结点？


    思路：

    首先使用快慢指针的方式我们可以判断链表中是否存在环，当快慢指针相遇时，说明链表中存在环。相遇点一定存在于环中，因此我
    们可以从使用一个指针从这个点开始向前移动，每移动一个点，环的长度加一，当指针再次回到这个点的时候，指针走了一圈，因此
    通过这个方法我们可以得到链表中的环的长度，我们将它记为 n 。

    然后我们设置两个指针，首先分别指向头结点，然后将一个指针先移动 n 步，然后两个指针再同时移动，当两个指针相遇时，相遇
    点就是环的入口节点。
   ```
   详细资料可以参考：
   [《链表中环的入口结点》](http://wiki.jikexueyuan.com/project/for-offer/question-fifty-six.html)
   [《《剑指offer》——链表中环的入口结点》](https://blog.csdn.net/shansusu/article/details/50285735)


#### 56. 删除链表中重复的结点
   ```
    题目：

    在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。例如，链表1->2->3-
    >3->4->4->5 处理后为 1->2->5


    思路：

    解决这个问题的第一步是确定删除的参数。当然这个函数需要输入待删除链表的头结点。头结点可能与后面的结点重复，也就是说头
    结点也可能被删除，所以在链表头额外添加一个结点。

    接下来我们从头遍历整个链表。如果当前结点的值与下一个结点的值相同，那么它们就是重复的结点，都可以被删除。为了保证删除
    之后的链表仍然是相连的而没有中间断开，我们要把当前的前一个结点和后面值比当前结点的值要大的结点相连。我们要确保 prev
    要始终与下一个没有重复的结点连接在一起。
   ```

#### 57. 二叉树的下一个结点
   ```
    题目：

    给定一棵二叉树和其中的一个结点，如何找出中序遍历顺序的下一个结点？树中的结点除了有两个分别指向左右子结点的指针以外，
    还有一个指向父节点的指针。


    思路：

    这个问题我们可以分为三种情况来讨论。

    第一种情况，当前节点含有右子树，这种情况下，中序遍历的下一个节点为该节点右子树的最左子节点。因此我们只要从右子节点
    出发，一直沿着左子节点的指针，就能找到下一个节点。

    第二种情况是，当前节点不含有右子树，并且当前节点为父节点的左子节点，这种情况下中序遍历的下一个节点为当前节点的父节
    点。

    第三种情况是，当前节点不含有右子树，并且当前节点为父节点的右子节点，这种情况下我们沿着父节点一直向上查找，直到找到
    一个节点，该节点为父节点的左子节点。这个左子节点的父节点就是中序遍历的下一个节点。
   ```

#### 58. 对称二叉树
   ```
    题目：

    请实现一个函数来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。


    思路：

    我们对一颗二叉树进行前序遍历的时候，是先访问左子节点，然后再访问右子节点。因此我们可以定义一种对称的前序遍历的方式
    ，就是先访问右子节点，然后再访问左子节点。通过比较两种遍历方式最后的结果是否相同，以此来判断该二叉树是否为对称二叉
    树。
   ```

#### 59. 按之字形顺序打印二叉树（待深入理解）
   ```
    题目：

    请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，即第一行按照
    从左到右的顺序打印，第二层按照从右到左顺序打印，第三行再按照从左到右的顺序打印，其他以此类推。


    思路：

    按之字形顺序打印二叉树需要两个栈。我们在打印某一行结点时，把下一层的子结点保存到相应的栈里。如果当前打印的是奇数层
    ，则先保存左子结点再保存右子结点到一个栈里；如果当前打印的是偶数层，则先保存右子结点再保存左子结点到第二个栈里。每
    一个栈遍历完成后进入下一层循环。
   ```
   详细资料可以参考：
   [《按之字形顺序打印二叉树》](https://www.cnblogs.com/wuguanglin/p/Print.html)


#### 60. 从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行。
   ```
    题目：

    从上到下按层打印二叉树，同一层的结点按从左到右的顺序打印，每一层打印一行。


    思路：

    用一个队列来保存将要打印的结点。为了把二叉树的每一行单独打印到一行里，我们需要两个变量：一个变量表示在当前的层中还
    没有打印的结点数，另一个变量表示下一次结点的数目。
   ```

#### 61. 序列化二叉树（待深入理解）
   ```
    题目：

    请实现两个函数，分别用来序列化和反序列化二叉树。


    思路：

    数组模拟
   ```

#### 62. 二叉搜索树的第 K 个节点
   ```
    题目：

    给定一颗二叉搜索树，请找出其中的第 k 小的结点。


    思路：

    对一颗树首先进行中序遍历，在遍历的同时记录已经遍历的节点数，当遍历到第 k 个节点时，这个节点即为第 k 大的节点。
   ```

#### 63. 数据流中的中位数（待深入理解）
   ```
    题目：

    如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有值排序之后位于中间的数值。如果数据
    流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。

   ```

#### 64. 滑动窗口中的最大值（待深入理解）
   ```
    题目：

    给定一个数组和滑动窗口的大小，找出所有滑动窗口里数值的最大值。例如，如果输入数组{2,3,4,2,6,2,5,1}及滑动窗口的
    大小3，那么一共存在6个滑动窗口，他们的最大值分别为{4,4,6,6,6,5}； 针对数组{2,3,4,2,6,2,5,1}的滑动窗口有以下
    6个： {[2,3,4],2,6,2,5,1}， {2,[3,4,2],6,2,5,1}， {2,3,[4,2,6],2,5,1}， {2,3,4,[2,6,2],5,1}， {2
    ,3,4,2,[6,2,5],1}， {2,3,4,2,6,[2,5,1]}。


    思路：

    使用队列的方式模拟
   ```





#### 66. 机器人的运动范围（待深入理解）

   ```
    题目：

    地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，但是不能
    进入行坐标和列坐标的数位之和大于k的格子。 例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。但是
    ，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？
   ```

剑指 offer 相关资料可以参考：
[《JS 版剑指 offer》](https://www.cnblogs.com/wuguanglin/p/code-interview.html)s
