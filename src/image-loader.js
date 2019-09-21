(() => {
	'use strict'

	function loadImages (definitions) {
		return Promise.all(Object.entries(definitions).map(([name, definition]) =>
			new Promise((resolve, reject) => {
				const image = document.createElement('img')
				image.src = definition.url
				image.addEventListener('load', () => { resolve({ name, image }) })
			})
		)).then((imagesArray) => {
			imagesArray.forEach(({ name, image }) => {
				definitions[name].image = image
			})

			return definitions
		})
	}

	Object.assign(window.plant, {
		loadImages,
	})
})()