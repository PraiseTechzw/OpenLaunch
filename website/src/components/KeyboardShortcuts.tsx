'use client'

import { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CommandLineIcon } from '@heroicons/react/24/outline'

interface KeyboardShortcut {
  keys: string[]
  description: string
  category: string
}

const shortcuts: KeyboardShortcut[] = [
  // Navigation shortcuts
  {
    keys: ['Tab'],
    description: 'Navigate to next interactive element',
    category: 'Navigation'
  },
  {
    keys: ['Shift', 'Tab'],
    description: 'Navigate to previous interactive element',
    category: 'Navigation'
  },
  {
    keys: ['Arrow Keys'],
    description: 'Navigate within menus and lists',
    category: 'Navigation'
  },
  {
    keys: ['Home'],
    description: 'Go to first item in a list',
    category: 'Navigation'
  },
  {
    keys: ['End'],
    description: 'Go to last item in a list',
    category: 'Navigation'
  },
  
  // Activation shortcuts
  {
    keys: ['Enter'],
    description: 'Activate buttons and links',
    category: 'Activation'
  },
  {
    keys: ['Space'],
    description: 'Activate buttons and checkboxes',
    category: 'Activation'
  },
  
  // Modal and dialog shortcuts
  {
    keys: ['Escape'],
    description: 'Close modals and menus',
    category: 'Dialogs'
  },
  
  // Application shortcuts
  {
    keys: ['?'],
    description: 'Show keyboard shortcuts (this dialog)',
    category: 'Help'
  },
  {
    keys: ['Alt', '1'],
    description: 'Skip to main content',
    category: 'Skip Links'
  },
  {
    keys: ['Alt', '2'],
    description: 'Skip to navigation',
    category: 'Skip Links'
  },
]

const shortcutsByCategory = shortcuts.reduce((acc, shortcut) => {
  if (!acc[shortcut.category]) {
    acc[shortcut.category] = []
  }
  acc[shortcut.category].push(shortcut)
  return acc
}, {} as Record<string, KeyboardShortcut[]>)

interface KeyboardShortcutsProps {
  isOpen: boolean
  onClose: () => void
}

export function KeyboardShortcuts({ isOpen, onClose }: KeyboardShortcutsProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalHeader>
        <div className="flex items-center gap-3">
          <CommandLineIcon className="w-6 h-6 text-discord-brand-primary" />
          <ModalTitle>Keyboard Shortcuts</ModalTitle>
        </div>
      </ModalHeader>
      
      <ModalContent className="max-h-96 overflow-y-auto">
        <div className="space-y-6">
          {Object.entries(shortcutsByCategory).map(([category, categoryShortcuts]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-discord-text-primary mb-3">
                {category}
              </h3>
              <div className="space-y-2">
                {categoryShortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-discord-background-secondary"
                  >
                    <span className="text-discord-text-secondary">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <span key={keyIndex} className="flex items-center gap-1">
                          <kbd className="px-2 py-1 text-xs font-mono bg-discord-background-elevated border border-discord-interactive-normal rounded text-discord-text-primary">
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-discord-text-muted">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ModalContent>
    </Modal>
  )
}

/**
 * Hook to manage keyboard shortcuts dialog
 */
export function useKeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Show shortcuts dialog with '?' key
      if (event.key === '?' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        // Don't trigger if user is typing in an input
        const target = event.target as HTMLElement
        const isInputElement = target.tagName === 'INPUT' || 
                              target.tagName === 'TEXTAREA' || 
                              target.contentEditable === 'true'
        
        if (!isInputElement) {
          event.preventDefault()
          setIsOpen(true)
        }
      }
      
      // Close dialog with Escape
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }
}

/**
 * Component to show keyboard shortcuts help button
 */
export function KeyboardShortcutsButton() {
  const { isOpen, open, close } = useKeyboardShortcuts()

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={open}
        aria-label="Show keyboard shortcuts"
        className="fixed bottom-4 right-4 z-40 bg-discord-background-elevated border border-discord-interactive-normal shadow-discord-elevation-medium"
      >
        <CommandLineIcon className="w-4 h-4 mr-2" />
        Shortcuts
      </Button>
      
      <KeyboardShortcuts isOpen={isOpen} onClose={close} />
    </>
  )
}