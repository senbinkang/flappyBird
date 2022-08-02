var e = (sel) => document.querySelector(sel)
var es = sel => document.querySelectorAll(sel)
var log = console.log.bind(console)

var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

// 创建随机函数
const randomBetween = function(start, end) {
    // var n = Math.random() * (4 - 0 + 1)
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

var aInb = function(x, x1, x2) {
    return x >= x1 && x <= x2
}

// 碰撞检测函数
var rectIntersects = function (a, b) {
    if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
        if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
            return true
        }
    }
    return false
}

var isImpact = rectIntersects