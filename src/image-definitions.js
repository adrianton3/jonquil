(() => {
    'use strict'

    const imageDefinitions = {
        'body': {
            url: 'art/body.png',
            anchor: { x: .5, y: .5 },
        },
        'flower': {
            url: 'art/flower.png',
            anchor: { x: .01, y: .99 },
        },
        'leaf': {
            url: 'art/leaf.png',
            anchor: { x: .01, y: .99 },
        },
        'needle': {
            url: 'art/needle.png',
            anchor: { x: .5, y: .99 },
        },
    }

    Object.assign(window.plant, {
		imageDefinitions,
	})
})()