// 把 GameScene 改成面向对象的形式
class Scene extends GameScene {
    constructor(game) {
        super(game)

        this.setup()
        this.setupInputs()
    }

    setup() {
        window.score = 0
        let game = this.game
        // bg
        let bg = GameImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)

        // 循环移动的地面
        this.grounds = []
        for (let i = 0; i < 20; i++) {
            let g = GameImage.new(game, 'ground')
            g.x = i * 24
            g.y = 540
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4
        // 小鸟速度
        this.birdSpeed = 2

        // bird
        let b = GameAnimation.new(game, 'b')
        b.x = 180
        b.y = 200
        this.bird = b
        this.addElement(b)

        this.setupInputs()
    }

    debug() {
        this.birdSpeed = config.bird_speed.value
    }

    update() {
        this.debug()
        super.update()

        window.fps = 30
        // 获取所有管子
        let allPipes = this.pipe.pipes
        // 检测 小鸟与管道 的碰撞
        this.checkImpact(this.bird, allPipes)

        // 地面移动
        this.skipCount--
        let offset = -5
        if (this.skipCount === 0) {
            this.skipCount = 4
            offset = 15
            // 计分
            this.setScore(this.bird, allPipes)
        }
        for (let i = 0; i < 20; i++) {
            let g = this.grounds[i]
            g.x += offset
        }

        // 计分
        this.setScore(this.bird, allPipes)

        // 撞到地面
        let groundY = 516
        if (this.bird.y > groundY) {
            this.gameOver()
        }

    }

    setScore(a, arr) {
        for (let i = 0; i < arr.length; i += 2) {
            const e = arr[i]
            let aRight = a.x + a.w

            if (e.x > a.x && e.x < aRight) {
                window.score++
            }
        }
    }

    draw() {
        super.draw()
        let context = this.game.canvas.getContext('2d')
        context.fillStyle = 'red'
        let score = Math.floor(window.score / 7) || 0
        // context.fillText('得分：' + score, 10, 590)

        // context.fillText('fps：' + window.fps, 110, 590)
        context.save()
        context.fillStyle = '#fff'
        context.shadowBlur = 8
        context.shadowColor = "#878787"
        context.font = `40px Arial`
        context.fillText(score, 200, 90)
        context.restore()
    }

    checkImpact(a, arr) {
        for (let i = 0; i < arr.length; i++) {
            const e = arr[i]
            if (isImpact(a, e)) {
                this.gameOver()
            }
        }
    }

    gameOver() {
        setTimeout(() => {
            let sceneEnd = SceneEnd.new(this.game)
            this.game.runWithScene(sceneEnd)
        }, 100)
    }

    setupInputs() {
        let b = this.bird
        // let sp = b.game.scene?.birdSpeed || 2
        this.game.registerAction('a', function (keyStatus) {
            let sp = b.game.scene.birdSpeed
            b.move(-sp, keyStatus)
        })
        this.game.registerAction('d', function (keyStatus) {
            let sp = b.game.scene.birdSpeed
            b.move(sp, keyStatus)
        })
        this.game.registerAction('j', function () {
            b.jump()
        })
    }
}