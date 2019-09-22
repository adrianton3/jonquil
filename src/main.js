(() => {
    'use strict'

    const {
        imageDefinitions,
        loadImages,
        renderer,
        Blobbery,
        Plant,
        Trunk,
        Vec2,
    } = window.joq

    function setupCamera (canvas, renderer, startScale = 1.) {
		let scale = startScale

		canvas.addEventListener('wheel', (event) => {
            event.preventDefault()

			scale = Math.max(.25, Math.min(1.5, scale - event.deltaY * .0005))
            renderer.setScale(scale)
		})
    }

    function setupInteraction (canvas, renderer, plant) {
        let sign = -1.
        let factor = 0.

        const onInteraction = (event) => {
            event.preventDefault()

            plant.bareMode = !plant.bareMode
            sign = -sign
        }

        canvas.addEventListener('mousedown', onInteraction)
        canvas.addEventListener('touchstart', onInteraction)

        return {
            tick () {
                factor += sign * .007
                factor = factor < 0 ? 0 : factor > 1 ? 1 : factor

                renderer.setBackground(
                    (1 - factor) * 255 + factor * 170,
                    (1 - factor) * 255 + factor * 160,
                    (1 - factor) * 255 + factor * 180,
                )
            }
        }
    }

    function getDimensions () {
        const viewportSize = {
            width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        }

        const sizeActual = Math.min(viewportSize.width, viewportSize.height)
        const sizeCandidates = [256, 384, 512, 768, 1024, 1280]
        const sizeIndex = sizeCandidates.findIndex((size) => size > sizeActual)
        const sizeTarget = sizeCandidates[
            sizeIndex === -1 ? sizeCandidates[sizeCandidates.length - 1]
            : sizeIndex === 0 ? 0
            : sizeIndex - 1
        ]

        return {
            size: sizeTarget,
            scale: sizeTarget / 768.,
        }
    }

    function setup ({ images }) {
        const canvas = document.getElementById('canvas')

        const dimensions = getDimensions(canvas)

        canvas.width = dimensions.size
        canvas.height = dimensions.size

        renderer.init(canvas, images)
        renderer.setScale(dimensions.scale)

        setupCamera(canvas, renderer, dimensions.scale)

        const blobbery = new Blobbery(images)
        const plant = new Plant(blobbery)
        const trunk = new Trunk(new Vec2(0, 0))
        trunk.rotationIncrement = (Math.random() * .01 + .01) * (Math.random() < .5 ? 1 : -1)

        plant.add(trunk)

        const interaction = setupInteraction(canvas, renderer, plant)

        return { images, blobbery, plant, trunk, interaction }
    }

    function loop ({ plant, blobbery, trunk, interaction }) {
		let timePrevious = performance.now()

		function step (timeNow) {
            const delta = (timeNow - timePrevious) * .001
            plant.tick(delta)
            blobbery.tick(delta)

            interaction.tick(delta)

			timePrevious = timeNow

            renderer.setPosition(trunk.getPastPosition())

            renderer.draw('body', blobbery.getBlobs('body'))
            renderer.draw('needle0', blobbery.getBlobs('needle0'))
            renderer.draw('needle1', blobbery.getBlobs('needle1'))
            renderer.draw('leaf0', blobbery.getBlobs('leaf0'))
            renderer.draw('leaf1', blobbery.getBlobs('leaf1'))
            renderer.draw('flower', blobbery.getBlobs('flower'))
            renderer.draw('spikes', blobbery.getBlobs('spikes'))

			requestAnimationFrame(step)
		}

		requestAnimationFrame(step)
	}

	loadImages(imageDefinitions).then((images) => {
		loop(setup({ images }))
    })
})()
