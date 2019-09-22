(() => {
	'use strict'

	let renderer
	let stage, panner
	let images

    const textures = {}
    const spritesByImage = {}
    const containers = {}

	function init (canvas, _images) {
		const { width, height } = canvas

		images = _images

		renderer = new PIXI.Renderer({
			width,
			height,
			view: canvas,
			backgroundColor: 0xFFFFFF,
		})

        stage = new PIXI.Container()
        stage.position.x = width / 2
        stage.position.y = height / 2

		panner = new PIXI.Container()
        stage.addChild(panner)

        allocate(images)
	}

	function allocate (images) {
		for (const image of Object.keys(images)) {
			textures[image] = PIXI.Texture.from(images[image].image)
            spritesByImage[image] = []

            {
                const container = new PIXI.Container()
                containers[image] = container
                panner.addChild(container)
            }
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

		containers[image].addChild(sprite)
		spritesByImage[image].push(sprite)
	}

	function draw (image, blobs) {
		const sprites = spritesByImage[image]

		for (let i = sprites.length; i < blobs.length; i++) {
			addSprite(image)
		}

        {
            const container = containers[image]
            for (let i = blobs.length; i < sprites.length; i++) {
                const sprite = sprites.pop()
                container.removeChild(sprite)
            }
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
		panner.position.x = -position.x
		panner.position.y = -position.y
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
