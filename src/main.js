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
    } = plant

    function setupCamera (canvas, renderer) {
		let scale = 1.

		canvas.addEventListener('wheel', (event) => {
			scale = Math.max(.25, Math.min(1.5, scale - event.deltaY * .0005))
            renderer.setScale(scale)

            event.preventDefault()
		})
    }

    function setup ({ images }) {
        const canvas = document.getElementById('canvas')

        renderer.init(canvas, images)

        setupCamera(canvas, renderer)

        const blobbery = new Blobbery(images)
        const plant = new Plant(blobbery)
        const trunk = new Trunk(new Vec2(0, 0))
        trunk.rotationIncrement = (Math.random() * .01 + .01) * (Math.random() < .5 ? 1 : -1)

        plant.add(trunk)

        return { images, blobbery, plant, trunk }
    }

    function loop ({ plant, blobbery, trunk }) {
		let timePrevious = performance.now()

		function step (timeNow) {
            const delta = (timeNow - timePrevious) * .001
            plant.tick(delta)
            blobbery.tick(delta)

			timePrevious = timeNow

            renderer.setPosition(trunk.getPastPosition())

            renderer.draw('body', blobbery.getBlobs('body'))
            renderer.draw('leaf', blobbery.getBlobs('leaf'))
            renderer.draw('flower', blobbery.getBlobs('flower'))
            renderer.draw('needle', blobbery.getBlobs('needle'))

			requestAnimationFrame(step)
		}

		requestAnimationFrame(step)
	}

	loadImages(imageDefinitions).then((images) => {
		loop(setup({ images }))
    })
})()