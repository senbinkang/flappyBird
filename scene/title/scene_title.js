class SceneTitle extends GameScene {
    constructor(game) {
        super(game)
        game.registerAction('Enter', function () {
            // 如果游戏已经开始（已经是开始游戏的场景），则不生效
            if (game.scene instanceof Scene || game.scene instanceof SceneEnd) {
                return
            }
            var s = Scene.new(game)
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
        let title = game.images.title
        let x = (canvas.width / 2) - (title.width / 2)
        let y = (canvas.height / 2) - (title.height / 2)
        context.drawImage(title, x, y)
        // text
        let text = `按 Enter 开始游戏`
        let x1 = canvas.width / 2 - 40
        let y1 = y + title.height + 20
        game.context.fillStyle = '#543847'
        context.fillText(text, x1, y1)

        context.save()
        let text2 = `按 j 跳跃`
        context.font = `15px Arial`
        context.fillStyle = `#f00`
        context.fillText(text2, x1 + 12, y1 + 30)
        context.restore()
    }
}