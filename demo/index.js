const Preact = require('preact')
const App = require('./App')
require('./styles.css')
if (module.hot) module.hot.accept()
const root = document.getElementById('root')
Preact.render(<App />, root, root.lastChild)
