(() => {
    'use strict'

    const { Vec2 } = window.joq

    const step = 9.

    function Pedicel (position, rotation, rotationIncrement) {
        this.alive = true

        this.position = position.clone()
        this.rotation = rotation

        this.rotationIncrement = rotationIncrement
        this.scale = .9

        this.cooldown = 40
    }

    Pedicel.prototype.tick = function (blobbery, plant) {
        console.log(this.cooldown)
        blobbery.add('body', this.position, this.rotation, this.scale)

        this.position.add(new Vec2(
            Math.cos(this.rotation) * this.scale * step,
            Math.sin(this.rotation) * this.scale * step,
        ))

        this.rotation += this.rotationIncrement
        this.rotationIncrement *= 1.02

        if (this.scale > .1) {
            this.scale -= .01
        } else {
            this.scale = .1
            this.alive = false
            blobbery.add(
                plant.bareMode ? 'spikes' : 'flower',
                this.position,
                this.rotation,
                Math.random() * .5 + .5
            )

            return
        }

        if (this.cooldown > 0) {
            this.cooldown--
        } else {
            this.alive = false
            blobbery.add(
                plant.bareMode ? 'spikes' : 'flower',
                this.position,
                this.rotation,
                Math.random() * .5 + .5
            )
        }
    }

    Object.assign(window.joq, {
        Pedicel,
    })
})()
