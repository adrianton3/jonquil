(() => {
    'use strict'

    const { Branch, Vec2 } = window.joq

    const step = 6.

    function Trunk (position) {
        this.alive = true

        this.position = position.clone()
        this.rotation = Math.PI * 1.5
        this.scale = 1.

        this.rotationIncrement = 0.
        this.rotationIncrementIncrement = 0.

        this.rotationIncrementCount = 0

        this.cooldown = {
            rotation: 0,
            branch: 0,
        }

        this.pastPositions = []
    }

    Trunk.prototype.tick = function (blobbery, plant) {
        blobbery.add('body', this.position, this.rotation, this.scale)

        this.position.add(new Vec2(
            Math.cos(this.rotation) * this.scale * step,
            Math.sin(this.rotation) * this.scale * step,
        ))

        this.pastPositions.push(this.position.clone())
        if (this.pastPositions.length > 50) {
            this.pastPositions.shift()
        }

        if (this.cooldown.rotation > 0) {
            this.cooldown.rotation--

            if (this.rotationIncrementCount > 0) {
                this.rotationIncrementCount--
                this.rotationIncrement += this.rotationIncrementIncrement
            }

            this.rotation += this.rotationIncrement
        } else {
            this.cooldown.rotation = Math.floor(Math.random() * 15 + 30)

            const rotationIncrementTarget = plant.bareMode
                ? -Math.sign(this.rotationIncrement) * Math.random() * .02 + .01
                : -Math.sign(this.rotationIncrement) * Math.random() * .03 + .015

            this.rotationIncrementCount = Math.floor(Math.random() * 12 + 4)
            this.rotationIncrementIncrement = (rotationIncrementTarget - this.rotationIncrement) / this.rotationIncrementCount
        }

        if (this.cooldown.branch > 0) {
            this.cooldown.branch--
        } else {
            this.cooldown.branch = Math.floor(Math.random() * 10 + 20)

            const branch = new Branch(
                this.position,
                this.rotation,
                -Math.sign(this.rotationIncrement) * (Math.random() * .02 + .02) * (plant.bareMode ? 1.2 : 1.)
            )

            plant.add(branch)
        }
    }

    Trunk.prototype.getPastPosition = function () {
        return this.pastPositions[0]
    }

    Object.assign(window.joq, {
        Trunk,
    })
})()
