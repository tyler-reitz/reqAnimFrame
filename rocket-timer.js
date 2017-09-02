'use strict'

// Helpers
// =======

const random = (min, max) => Math.random() * (max - min) + min

const randomInterval = (cb, min, max) => {
  
  const time = {
    start: performance.now(),
    total: random(min, max)
  }

  const tick = now => {
    if (time.total <= now - time.start) {
      time.start = now
      time.total = random(min, max)
      cb()
    }
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// Flame animation
// ===============

{
  const flame = document.querySelector('#rocket .flame')

  const from = { x: 1, y: 1 }
  const to = {}
  const delta = {}
  const keys = Object.keys(from)

  const next = timestamp => {
    Object.assign(from, to)
    keys.forEach(axis => {
      to[axis] = random(.8, 1)
      delta[axis] = from[axis] - to[axis]
    })
    time.start = timestamp
  }

  const time = {
    total: 40
  }

  const tick = timestamp => {
    if (time.elapsed > time.total || !to.x) next(timestamp)
    
    time.elapsed = timestamp - time.start
    const progress = time.elapsed / time.total
    const [x, y] = keys.map(axis => from[axis] - progress * delta[axis])
    flame.style.transform = `scale(${x}, ${y})`

    requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

// Moving Stars
// ============

{
  const rocket = document.getElementById('rocket')
  const [size] = /[1-9]\d*/.exec(rocket.getAttribute('viewBox'))

  const createStar = (min, max) => {
    const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    star.setAttribute('r', min)
    star.setAttribute('cx', max)
    star.setAttribute('cy', random(min, max))
    star.setAttribute('fill', '#AAB7C4')
    star.setAttribute('fill-opacity', 0)
    return star
  }
  
  const fly = () => {
    const min = random(.2, 1.2)
    const max = size - min
    const delta = max - min
    const star = createStar(min, max)

    const time = {
      start: performance.now(),
      total: random(2000, 2200)
    }
    
    const tick = timestamp => {
      time.elapsed = timestamp - time.start
      const progress = Math.min(time.elapsed / time.total, 1)
      const opacity = progress * 2
      
      star.setAttribute('cx', max - progress * delta)
      star.setAttribute('fill-opacity', progress < .5 ? opacity : 2 - opacity)
    
      time.elapsed < time.total
        ? requestAnimationFrame(tick)
        : rocket.removeChild(star)
    }
    
    requestAnimationFrame(tick)
    rocket.insertBefore(star, rocket.firstChild)
  }

  randomInterval(fly, 80, 200)
}
