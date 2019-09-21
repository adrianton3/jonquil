(() => {
    'use strict'

    function Plant (blobbery) {
        this.blobbery = blobbery
        this.threads = []

        this.bareMode = false
    }

    Plant.prototype.tick = function () {
        for (const thread of this.threads) {
            thread.tick(this.blobbery, this)
        }

        this.threads = this.threads.filter((thread) => thread.alive)
    }

    Plant.prototype.add = function (thread) {
        this.threads.push(thread)
    }

    Object.assign(window.joq, {
        Plant,
    })
})()
