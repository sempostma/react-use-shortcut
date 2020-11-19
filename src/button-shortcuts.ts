
const shortcutSeperator = /[+, \t-]/

const matchShortcutExtraKey = (key: string, e: KeyboardEvent) => {
  switch (key.toLowerCase()) {
    case 'ctrl':
      return e.ctrlKey
    case 'shift':
      return e.shiftKey
    case 'meta':
    case 'command':
    case 'cmd':
      return e.metaKey
    case 'option':
    case 'opt':
    case 'alt':
      return e.altKey
  }
}

export const matchParsedShortcut = (key: string, extraKeys: string[], e: KeyboardEvent) => {
  key = key.toLowerCase()
  let matchKey = e.key.toLowerCase()
  if (key !== matchKey) {
    matchKey = e.code && e.code.replace('Key', '').replace('Digit', '').toLowerCase()
    if (key !== matchKey) return false
  }
  const extraKeysAllMatch = extraKeys.every(extraKey => matchShortcutExtraKey(extraKey, e))
  if (extraKeysAllMatch) {
    e.preventDefault()
  }
  return extraKeysAllMatch
}


// tslint:disable-next-line: ban-types

const cache: { [key: string]: { key: string, extraKeys: string[] } } = {}

export const parseShortcut = (shortcut: string) => {
  if ((shortcut in cache) === false) {
    const allKeys = shortcut.toLowerCase().split(shortcutSeperator)
    const key = allKeys[allKeys.length - 1]
    const extraKeys = allKeys.slice(0, -1)
    cache[shortcut] = { key, extraKeys }
  }
  return cache[shortcut]
}

export const matchShortcut = (shortcut: string, e: KeyboardEvent) => {
  const parsed = parseShortcut(shortcut)
  if (!parsed) return false
  return matchParsedShortcut(parsed.key, parsed.extraKeys, e)
}

