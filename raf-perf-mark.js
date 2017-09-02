const trackTime = id => {
  const [entry] = performance.getEntriesByName(id)
  if (!entry) {
    performance.mark(id)
    return 0
  }

  return performance.now() - entry.startTime
}

const getProgress = ({ duration, id }) => {
  const progress = Math.min(trackTime(id) / duration, 1)
  if (progress == 1) performance.clearMarks(id)
  return progress
}

const tick = () => {
  const progress = getProgress(animation)
  if (progress < 1) requestAnimationFrame(tick)
}

const animation = {
  duration: 500,
  id: requestAnimationFrame(tick)
}