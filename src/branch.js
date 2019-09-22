(() => {
    'use strict'

    const { Pedicel, Vec2 } = window.joq

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

            if (plant.bareMode) {
                if (random > .9) {
                    const branch = new Branch(this.position, this.rotation, -this.rotationIncrement * 1.3)
                    branch.scale = this.scale * .6

                    plant.add(branch)
                } else {
                    blobbery.add('needle', this.position, this.rotation, Math.random() * .5 + .5)
                }
            } else {
                if (random > .9) {
                    const branch = new Branch(this.position, this.rotation, -this.rotationIncrement * 1.3)
                    branch.scale = this.scale * .7

                    plant.add(branch)
                } else if (random > .8) {
                    const pedicel = new Pedicel(this.position, this.rotation, -this.rotationIncrement * 1.3)
                    pedicel.scale = this.scale * .7

                    plant.add(pedicel)
                } else {
                    const image = random > .5 ? 'leaf' : 'needle'
                    blobbery.add(image, this.position, this.rotation, Math.random() * .5 + .5)
                }
            }
        }
    }

    Object.assign(window.joq, {
        Branch,
    })
})()
