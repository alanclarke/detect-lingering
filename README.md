# detect-lingering
Tiny utility for detecting when a user lingers, e.g. if they pause or slow down to look at something while scrolling

## installation
```js
npm install detect-lingering
```

## usage
```js
function onLinger () {
  console.log('user is lingering!')
}

var detector = createLingerDetector(onLinger, options)

el.onscroll = function () {
  // any actual calculations are deferred to a set interval
  // detector is very light method, and can be used in the scroll handler
  detector(el.scrollTop)
}

```

## options
- speed: 0.1 // speed below which we consider the user to be lingering
- time: 400 // time the user has to linger for in order for the linger to count
- timeout: 2000 // how long to keep monitoring for changes after the last change
- interval: 50 // how frequently to monitor for changes

## demo

```js
npm run demo
```

## run tests
` npm test `

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
