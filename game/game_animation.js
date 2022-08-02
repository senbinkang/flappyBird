class GameAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        this.animations = {
            b: [],
        }
        // flappy bird
        for (var i = 1; i < 4; i++) {
            var name = `b${i}`
            var t = game.textureByName(name)
            this.animations['b'].push(t)
        }

        this.animationName = 'b'
        // 存储第一张图片
        this.texture = this.frames()[0]
        this.w = this.texture.w
        this.h = this.texture.h
        this.frameIndex = 0
        this.frameCount = 2

        // 用于水平翻转
        this.flipX = false
        this.rotation = 0
        this.alpha = 1

        // 重力和加速度
        this.gy = 10
        // 加速度
        this.vy = 0
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -10
        this.rotation = -45
    }
    inTheArea() {
        var h = 517
        if (this.y > h) {
            this.y = h
        }
        var h2 = 0
        if (this.y < 0) {
            this.y = h2
        }
        var w = 369
        if (this.x > w) {
            this.x = w
        }
        var w2 = -3
        if (this.x < w2) {
            this.x = w2
        }
    }
    update() {
        // 更新 alpha
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }

        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        this.inTheArea()

        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }

        this.frameCount--
        if (this.frameCount === 0) {
            this.frameCount = 2
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        // 实现运动图像的翻转
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        // 实现小鸟的旋转
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha

        context.rotate(this.rotation * Math.PI / 180)
        // 将中心点偏移，旋转后再移回去
        context.translate(-w2, -h2)
        // 画在坐标顶点
        context.drawImage(this.texture.image, 0, 0)

        context.restore()
    }
    move(x) {
        // 以上几行注释的为垃圾代码
        this.flipX = (x < 0)
        this.x += x
    }
    changeAnimation(name) {
        this.animationName = name
    }
}