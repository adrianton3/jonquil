(() => {
    'use strict'

    function Blobbery (images) {
        this.blobs = {}
        this.allocate(images)
    }

    Blobbery.prototype.allocate = function (images) {
        for (const image of Object.keys(images)) {
			this.blobs[image] = []
		}
    }

    Blobbery.prototype.add = function (image, position, rotation, scaleMax) {
        this.blobs[image].push({
            age: 0,
            position: position.clone(),
            rotation,
            scale: .08,
            scaleMax,
        })
    }

    const ageMax = 110

    Blobbery.prototype.tick = function () {
        for (const image of Object.keys(this.blobs)) {
            for (const blob of this.blobs[image]) {
                blob.age++

                if (blob.age < ageMax) {
                    if (blob.scale < blob.scaleMax) {
                        blob.scale += .015
                    }
                } else {
                    blob.scale -= .05
                }
            }

            this.blobs[image] = this.blobs[image].filter((blob) => blob.scale > .05)
        }
    }

    Blobbery.prototype.getBlobs = function (image) {
        return this.blobs[image]
    }

    Object.assign(window.plant, {
        Blobbery,
    })
})()