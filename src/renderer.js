(() => {
	'use strict'

	let renderer
	let stage, blobContainer
	let images
	const textures = {}
	const spritesByImage = {}

	function init (canvas, _images) {
		const { width, height } = canvas

		images = _images
		allocate(images)

		renderer = new PIXI.Renderer({
			width,
			height,
			view: canvas,
			backgroundColor: 0xFFFFFF,
		})

		stage = new PIXI.Container()

		// blobContainer = new PIXI.ParticleContainer(3000, {
		// 	scale: true,
		// 	position: true,
		// 	rotation: true,
		// 	uvs: false,
		// 	alpha: false,
		// 	tint: false,
		// })

		blobContainer = new PIXI.Container()

		stage.position.x = width / 2
		stage.position.y = height / 2

		stage.addChild(blobContainer)
	}

	function allocate (images) {
		for (const image of Object.keys(images)) {
			textures[image] = PIXI.Texture.from(images[image].image)
			spritesByImage[image] = []
		}
	}

	function copyPosition (sprite, blob) {
		sprite.position.x = blob.position.x
		sprite.position.y = blob.position.y

		sprite.rotation = blob.rotation

		sprite.scale.x = blob.scale
		sprite.scale.y = blob.scale
	}

	function addSprite (image) {
		const sprite = new PIXI.Sprite(textures[image])

		const { anchor } = images[image]
		sprite.anchor.set(anchor.x, anchor.y)

		blobContainer.addChild(sprite)
		spritesByImage[image].push(sprite)
	}

	function draw (image, blobs) {
		const sprites = spritesByImage[image]

		for (let i = sprites.length; i < blobs.length; i++) {
			addSprite(image)
		}

		for (let i = blobs.length; i < sprites.length; i++) {
			const sprite = sprites.pop()
			blobContainer.removeChild(sprite)
		}

		let index = 0
		for (let i = 0; i < blobs.length; i++) {
			copyPosition(sprites[index], blobs[i])
			index++
		}

		renderer.render(stage)
	}

	function setScale (scale) {
		stage.scale.x = scale
		stage.scale.y = scale
	}

	function setPosition (position) {
		blobContainer.position.x = -position.x
		blobContainer.position.y = -position.y
    }

    function setBackground (red, green, blue) {
        renderer.backgroundColor = red << 16 | green << 8 | blue
    }

	Object.assign(window.joq, {
		renderer: {
			init,
			draw,
			setScale,
            setPosition,
            setBackground,
		},
	})
})()
