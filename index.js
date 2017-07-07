const DEFAULTS = {
  speed: 0.1, // speed below which we consider the user to be lingering
  time: 400, // time the user has to linger for in order for the linger to count
  timeout: 2000, // how long to keep monitoring for changes after the last change
  interval: 50 // how frequently to monitor for changes
}

module.exports = function createLingerDetector (onLinger, options) {
  options = initOptions(options)
  var interval, timeout, time, lingering
  var snapshots = []

  return function updateValue (value) {
    snapshots.push(snapshot(value))
    start()
  }

  function start () {
    clearTimeout(timeout)
    if (!interval) interval = setInterval(monitor, options.interval)
    timeout = setTimeout(stop, options.timeout)
  }

  function stop () {
    clearInterval(interval)
    clearTimeout(timeout)
    interval = false
  }

  function checkLingerTime () {
    clearTimeout(time)
    time = setTimeout(function () {
      if (lingering) onLinger()
    }, options.time)
  }

  function monitor () {
    var averageSpeed = 0
    if (snapshots.length >= 2) {
      averageSpeed = snapshots.reduce((memo, val, i) => {
        if (snapshots[i + 1]) memo += speed(val, snapshots[i + 1])
        return memo
      }, 0) / snapshots.length
      snapshots = []
    }
    if (averageSpeed < options.speed) {
      if (!lingering) {
        lingering = true
        checkLingerTime()
      }
    } else {
      lingering = false
    }
  }
}

function initOptions (options) {
  options = options || {}
  return {
    speed: options.speed || DEFAULTS.speed,
    time: options.time || DEFAULTS.time,
    interval: options.interval || DEFAULTS.interval,
    timeout: options.timeout || DEFAULTS.timeout
  }
}

function snapshot (value) {
  return { value: value, ts: Date.now() }
}

function speed (current, next) {
  return Math.abs(next.value - current.value) / Math.abs(next.ts - current.ts)
}
