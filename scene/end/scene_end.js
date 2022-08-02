class SceneEnd extends GameScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function () {
            // 如果游戏已经开始（已经是开始游戏的场景），则不生效
            if (game.scene instanceof Scene) {
                return
            }
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }

    draw() {
        let game = this.game
        let canvas = game.canvas
        let context = game.context

        // bg
        let bg = game.images.title_bg
        context.drawImage(bg, 0, 0)

        // title
        let title = game.images.game_over
        let x = (canvas.width / 2) - (title.width / 2)
        let y = (canvas.height / 2) - (title.height / 2)
        context.drawImage(title, x, y)

        // text
        context.save()
        let text = '游戏结束，按 r 返回标题界面'
        let x1 = canvas.width / 2 - 80
        let y1 = y + title.height + 20
        game.context.fillStyle = '#000'
        context.font = '12px Arial'
        context.fillText(text, x1, y1)

        // 得分
        let scoreText = '得分：'
        context.font = '20px Arial'
        context.fillStyle = '#f00'
        let w = context.measureText(scoreText).width
        let scoreX = canvas.width / 2 - w
        let scoreY = y + title.height - 90
        context.fillText(scoreText, scoreX, scoreY)

        context.font = '60px Arial'
        context.fillStyle = '#fff'
        let score = (Math.floor(window.score / 7) || 0)
        context.fillText(score, scoreX + 55, scoreY + 10)
        context.restore()
    }
}