const getProgress = ({ elapsed, total }) => Math.min(elapsed / total, 1)

const easeInOut = progress =>
  (progress *= 2) < 1
  ? .5 * Math.pow(progress, 5)
  : .5 * ((progress -= 2) * Math.pow(progress, 4) + 2)

const element = document.querySelector('polygon')

const shapes = {
  play: [85, 70, 180, 125, 180, 125, 85, 180],
  stop: [85, 85, 165, 85, 165, 165, 85, 165]
}

const time = {
  start: performance.now(),
  total: 1200
}

const tick = now => {
  time.elapsed = now - time.start

  const progress = getProgress(time)
  const easing = easeInOut(progress)
  const { play, stop } = shapes
  
  const points = play.map((start, index) => {
    const end = stop[index]
    const distance = end - start
    const point = start + easing * distance
    return point
  })
  
  element.setAttribute('points', points.join(' '))
  if (time.elapsed < time.total) requestAnimationFrame(tick)
}

requestAnimationFrame(tick)