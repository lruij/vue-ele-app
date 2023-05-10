"use strict";
// 获取 canvas 对象
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let { availWidth, availHeight } = screen;
canvas.width = availWidth;
canvas.height = availHeight;
let { width, height } = canvas;
// 生成对应屏幕宽度 10px 的数组
let arr = Array(Math.ceil(width / 10)).fill(0);
console.log(arr);
// 要展示的字符串
let str = 'LRJZX5201314';
// 样式
const rain = () => {
    // 颜色为黑色
    ctx.fillStyle = 'rgba(0,0,0,.05)';
    // 填充整个 canvas
    ctx.fillRect(0, 0, width, height);
    // 颜色为绿色
    ctx.fillStyle = '#0f0';
    // 填充文本
    arr.forEach((item, index) => {
        // 文本内容随机
        let text = str[Math.floor(Math.random() * str.length)];
        // 横向 x 坐标: 每列相隔 10px
        let x = index * 10;
        // 纵向 y 坐标: 每行高度都为 10 px
        let y = item + 10;
        // 每次填充一个
        ctx.fillText(text, x, y);
        // 每填充一个就变更当前值为 y 坐标
        // 如果当前 y 坐标超出了 canvas 高度则设置为 0
        // 如果当前 y 坐标超出了 0 ～ 10000 随机数字则设置为 0,该条件会对 y 坐标产生随机浮动
        // 当前项值变更后则会影响下一次 interval 相对的 y 坐标渲染
        arr[index] = item > height || item > 10000 * Math.random() ? 0 : y;
    });
};
setInterval(rain, 40);
