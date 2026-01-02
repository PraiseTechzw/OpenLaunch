"use client"

import * as React from "react"
import { Button } from "./button"
import { 
  Modal, 
  ModalHeader, 
  ModalTitle, 
  ModalDescription, 
  ModalContent, 
  ModalFooter 
} from "./modal"

export function ModalDemo() {
  const [isBasicModalOpen, setIsBasicModalOpen] = React.useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false)
  const [isLargeModalOpen, setIsLargeModalOpen] = React.useState(false)

  return (
    <div className="space-y-4">
      <h3 className="text-heading-3 text-discord-text-primary mb-4">Modal Components</h3>
      
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => setIsBasicModalOpen(true)}>
          Basic Modal
        </Button>
        
        <Button 
          variant="secondary" 
          onClick={() => setIsConfirmModalOpen(true)}
        >
          Confirmation Modal
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={() => setIsLargeModalOpen(true)}
        >
          Large Modal
        </Button>
      </div>

      {/* Basic Modal */}
      <Modal 
        isOpen={isBasicModalOpen} 
        onClose={() => setIsBasicModalOpen(false)}
      >
        <ModalHeader>
          <ModalTitle>Basic Modal</ModalTitle>
          <ModalDescription>
            This is a basic modal with Discord-style design.
          </ModalDescription>
        </ModalHeader>
        
        <ModalContent>
          <p className="text-discord-text-secondary">
            This modal demonstrates the basic functionality with Discord-inspired styling.
            It includes proper focus management, keyboard navigation, and accessibility features.
          </p>
        </ModalContent>
        
        <ModalFooter>
          <Button 
            variant="ghost" 
            onClick={() => setIsBasicModalOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={() => setIsBasicModalOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>

      {/* Confirmation Modal */}
      <Modal 
        isOpen={isConfirmModalOpen} 
        onClose={() => setIsConfirmModalOpen(false)}
        size="sm"
      >
        <ModalHeader>
          <ModalTitle>Confirm Action</ModalTitle>
          <ModalDescription>
            Are you sure you want to proceed with this action?
          </ModalDescription>
        </ModalHeader>
        
        <ModalContent>
          <p className="text-discord-text-secondary">
            This action cannot be undone. Please confirm that you want to continue.
          </p>
        </ModalContent>
        
        <ModalFooter>
          <Button 
            variant="ghost" 
            onClick={() => setIsConfirmModalOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => setIsConfirmModalOpen(false)}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>

      {/* Large Modal */}
      <Modal 
        isOpen={isLargeModalOpen} 
        onClose={() => setIsLargeModalOpen(false)}
        size="xl"
      >
        <ModalHeader>
          <ModalTitle>Large Modal</ModalTitle>
          <ModalDescription>
            This is a larger modal for more complex content.
          </ModalDescription>
        </ModalHeader>
        
        <ModalContent>
          <div className="space-y-4">
            <p className="text-discord-text-secondary">
              This larger modal can contain more complex content and forms.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-discord-background-secondary rounded-discord">
                <h4 className="text-discord-text-primary font-medium mb-2">Feature 1</h4>
                <p className="text-discord-text-muted text-sm">
                  Description of the first feature with more details.
                </p>
              </div>
              
              <div className="p-4 bg-discord-background-secondary rounded-discord">
                <h4 className="text-discord-text-primary font-medium mb-2">Feature 2</h4>
                <p className="text-discord-text-muted text-sm">
                  Description of the second feature with more details.
                </p>
              </div>
            </div>
          </div>
        </ModalContent>
        
        <ModalFooter>
          <Button 
            variant="ghost" 
            onClick={() => setIsLargeModalOpen(false)}
          >
            Close
          </Button>
          <Button onClick={() => setIsLargeModalOpen(false)}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}