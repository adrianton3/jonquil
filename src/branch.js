(() => {
    'use strict'

    const { Vec2 } = window.joq

    const step = 9.

    function Branch (position, rotation, rotationIncrement) {
        this.alive = true

        this.position = position.clone()
        this.rotation = rotation

        this.rotationIncrement = rotationIncrement
        this.scale = .9

        this.cooldown = 10
    }

    Branch.prototype.tick = function (blobbery, plant) {
        blobbery.add('body', this.position, this.rotation, this.scale)

        this.position.add(new Vec2(
            Math.cos(this.rotation) * this.scale * step,
            Math.sin(this.rotation) * this.scale * step,
        ))

        this.rotation += this.rotationIncrement
        this.rotationIncrement *= 1.02

        if (this.scale > .3) {
            this.scale -= .005
        } else {
            this.scale = .3
            this.alive = false
        }

        if (this.scale < .6) {
            return
        }

        if (this.cooldown > 0) {
            this.cooldown--
        } else {
            this.cooldown = Math.floor(Math.random() * 6 + 6)

            const random = Math.random()

            const image = random > .7 ? 'leaf'
                : random > .6 ? 'flower'
                : 'needle'

            blobbery.add(image, this.position, this.rotation, Math.random() * .5 + .5)
        }
    }

    Object.assign(window.joq, {
        Branch,
    })
})()
