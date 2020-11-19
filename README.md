# react-use-shortcut

React keyboard shortcut hook.

## Install 

```bash
npm install --save react-use-shortcut
```

## Usage

```javascript
import useShortcut from 'react-use-shortcut'

const FunctionalComponent = props => {
    const submitForm = keyboardEvent => console.log('submitForm', keyboardEvent)
    const runsBeforeSubmit = keyboardEvent => console.log('runsBeforeSubmit', keyboardEvent)

    useShortcut('ctrl+shift+e', submitForm)
    useShortcut('enter', submitForm)

    // set with priority
    useShortcut('ctrl+shift+e', runsBeforeSubmit, 10)
    useShortcut('enter', runsBeforeSubmit, 10)
}
```

## License

License: MIT
