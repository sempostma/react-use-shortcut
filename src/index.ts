import { useEffect, useRef, MutableRefObject } from "react";
import { matchShortcut } from "./button-shortcuts";

type ListItem = MutableRefObject<{
  shortcut: string;
  onTrigger: (e: KeyboardEvent) =>  any;
  priority: number
}>

const listeners: ListItem[] = []

window.addEventListener('keydown', async e => {
  for (const listener of listeners) {
    if (!e.key) return
    const isMatch = matchShortcut(listener.current.shortcut, e)
    if (isMatch) {
      const r = await listener.current.onTrigger(e)
      if (r === 'CANCEL') break;
    }
  }
})

// Hook
function useShortcut(shortcut: string, onTrigger: (e: KeyboardEvent) => any, priority = 0) {
  const references = useRef({ shortcut, onTrigger, priority })
  references.current.shortcut = shortcut
  references.current.onTrigger = onTrigger

  useEffect(() => {
    listeners.push(references)
    listeners.sort((a1, a2) => a2.current.priority - a1.current.priority)
    return () => {
      listeners.splice(listeners.indexOf(references), 1)
    }
  }, [])
}

export default useShortcut