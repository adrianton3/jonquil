(() => {
    'use strict'

    function Vec2 (x, y) {
        this.x = x
        this.y = y
    }

    Vec2.prototype.clone = function () {
        return new Vec2(this.x, this.y)
    }

    Vec2.prototype.add = function (that) {
        this.x += that.x
        this.y += that.y

        return this
    }

    Vec2.prototype.sub = function (that) {
        this.x -= that.x
        this.y -= that.y

        return this
    }

    Vec2.prototype.scale = function (factor) {
        this.x *= factor
        this.y *= factor

        return this
    }

    Object.assign(window.joq, {
        Vec2,
    })
})()
