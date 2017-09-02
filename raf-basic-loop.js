const getProgress = ({elapsed, total}) => Math.min(elapsed / total, 1)
const easeOut = progress => Math.pow(--progress, 5) + 1

const element = document.querySelector('span')
const finalPosition = 1180

const time = {
  start: performance.now(),
  total: 2000
}

const tick = now => {
  time.elapsed = now - time.start
  const progress = getProgress(time)
  const easing = easeOut(progress)
  const position = easing * finalPosition
  
  element.style.transform = `translate(${position}px)`
  
  console.table({
    state: {
      time: time.elapsed,
      progress: progress,
      position: position
    }
  })
  
  if (time.elapsed < time.total) requestAnimationFrame(tick)
}

requestAnimationFrame(tick)