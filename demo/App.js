const Preact = require('preact')
const detectLingering = require('../index')

module.exports = class App extends Preact.Component {
  constructor (props) {
    super(props)
    this.state = { lingering: false }
    this.initLingerDetector()
    this.cards = new Array(100).fill(null).map((val, i) => createCard(i))
  }
  render () {
    return (
      <div className='App'>
        <div onScroll={e => this.lingerDetector(e.target.scrollTop)} className='Container'>
          {this.cards}
        </div>
        <div className={'Lingering Lingering--' + (this.state.lingering ? 'on' : 'off')} />
      </div>
    )
  }
  initLingerDetector () {
    this.lingerDetector = detectLingering(() => {
      this.setState({ lingering: true })
      setTimeout(() => this.setState({ lingering: false }), 1000)
    })
  }
}

function createCard (i) {
  return (
    <div className='Card' style={{ background: colour(i) }}>
      <div>{i}</div>
    </div>
  )
}

function colour (i) {
  return `rgb(${256 - Math.ceil((256 / 100) * i)}, ${Math.ceil((256 / 100) * i)}, ${Math.floor((Math.random() * 256))})`
}
