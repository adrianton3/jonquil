(() => {
    'use strict'

    const imageDefinitions = {
        'body': {
            url: 'art/body.png',
            anchor: { x: .5, y: .5 },
        },
        'needle0': {
            url: 'art/needle0.png',
            anchor: { x: .5, y: .99 },
        },
        'needle1': {
            url: 'art/needle1.png',
            anchor: { x: .5, y: .01 },
        },
        'leaf0': {
            url: 'art/leaf0.png',
            anchor: { x: .01, y: .99 },
        },
        'leaf1': {
            url: 'art/leaf1.png',
            anchor: { x: .01, y: .01 },
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
