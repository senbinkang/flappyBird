class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.pipeBetweenPipe = 200
        this.columsOfPipe = 3
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GameImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.pipeBetweenPipe
            var p2 = GameImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    debug() {
        this.pipeBetweenPipe = config.pipe_between_pipe.value
        this.pipeSpace = config.pipe_space.value
    }
    update() {
        for (var i = 0; i < this.pipes.length; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -200) {
                p1.x += this.pipeBetweenPipe * this.columsOfPipe
            }
            if (p2.x < -100) {
                p2.x += this.pipeBetweenPipe * this.columsOfPipe
            }
        }
        this.debug()
    }
    draw() {
        // 实现运动图像的翻转
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()

            var w2 = p.w / 2
            var h2 = p.h / 2
            // 实现小鸟的旋转
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            // 将中心点偏移，旋转后再移回去
            context.translate(-w2, -h2)
            // 画在坐标顶点
            context.drawImage(p.texture.image, 0, 0)

            context.restore()
        }
    }
}