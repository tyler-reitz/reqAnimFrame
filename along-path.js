const getProgress = ({ elapsed, total }) => Math.min(elapsed / total, 1)

const [circle, path] = document.querySelectorAll('circle, path')
const pathLength = path.getTotalLength()

const time = {
  start: performance.now(),
  total: 3000
}

const tick = now => {
  time.elapsed = now - time.start
  const progress = getProgress(time)
  const { x, y } = path.getPointAtLength(pathLength * progress)
  circle.setAttribute('cx', x)
  circle.setAttribute('cy', y)
  if (progress == 1) time.start = now
  requestAnimationFrame(tick)
}

requestAnimationFrame(tick)