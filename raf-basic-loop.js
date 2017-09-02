const easeOutElastic = progress =>
  Math.pow(2, -10 * progress) * Math.sin((progress - .1) * 5 * Math.PI) + 1 

const element = document.querySelector('span')

const time = {
  start: performance.now(),
  total: 10000
}

const tick = now => {
  time.elapsed = now - time.start
  const progress = time.elapsed / time.total
  const value = easeOutElastic(progress)

  element.style.transform = `scale(${value}) rotate(${value}turn)`
  
  console.table({
    state: {
      time: time.elapsed,
      progress: progress,
      value: value
    }
  })
  
  if (time.elapsed < time.total) requestAnimationFrame(tick)
}

requestAnimationFrame(tick)