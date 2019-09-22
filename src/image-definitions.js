(() => {
    'use strict'

    const imageDefinitions = {
        'body': {
            url: 'art/body.png',
            anchor: { x: .5, y: .5 },
        },
        'needle': {
            url: 'art/needle.png',
            anchor: { x: .5, y: .99 },
        },
        'leaf': {
            url: 'art/leaf.png',
            anchor: { x: .01, y: .99 },
        },
        'flower': {
            url: 'art/flower.png',
            anchor: { x: .5, y: .5 },
        },
    }

    Object.assign(window.joq, {
		imageDefinitions,
	})
})()
