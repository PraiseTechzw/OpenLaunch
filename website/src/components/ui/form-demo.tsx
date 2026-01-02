import React from 'react'
import { Input } from './input'
import { Textarea } from './textarea'
import { Select } from './select'
import { Button } from './button'

export function FormDemo() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    role: '',
    bio: '',
    skills: '',
    experience: '',
    newsletter: false
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [success, setSuccess] = React.useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
    
    // Simple validation examples
    if (field === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(value)) {
        setSuccess(prev => ({ ...prev, email: 'Valid email address' }))
        setErrors(prev => ({ ...prev, email: '' }))
      } else {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }))
        setSuccess(prev => ({ ...prev, email: '' }))
      }
    }
    
    if (field === 'name' && value.length >= 2) {
      setSuccess(prev => ({ ...prev, name: 'Name looks good!' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.role) newErrors.role = 'Please select a role'
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully!')
    }
  }

  const roleOptions = [
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Project Manager' },
    { value: 'contributor', label: 'Open Source Contributor' },
    { value: 'other', label: 'Other' }
  ]

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (2-5 years)' },
    { value: 'advanced', label: 'Advanced (5+ years)' },
    { value: 'expert', label: 'Expert (10+ years)' }
  ]

  return (
    <div className="p-8 bg-discord-background-primary min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-heading-1 text-discord-text-primary mb-8">
          Discord Form Components
        </h1>
        
        {/* Form Component Variants */}
        <section className="space-y-6">
          <h2 className="text-heading-2 text-discord-text-primary">Input Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              variant="default"
              placeholder="Default input"
              label="Default Variant"
            />
            <Input
              variant="filled"
              placeholder="Filled input"
              label="Filled Variant"
            />
            <Input
              variant="ghost"
              placeholder="Ghost input"
              label="Ghost Variant"
            />
          </div>
        </section>

        {/* Input Sizes */}
        <section className="space-y-6">
          <h2 className="text-heading-2 text-discord-text-primary">Input Sizes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              inputSize="sm"
              placeholder="Small input"
              label="Small Size"
            />
            <Input
              inputSize="default"
              placeholder="Default input"
              label="Default Size"
            />
            <Input
              inputSize="lg"
              placeholder="Large input"
              label="Large Size"
            />
          </div>
        </section>

        {/* Input States */}
        <section className="space-y-6">
          <h2 className="text-heading-2 text-discord-text-primary">Input States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              placeholder="Error state"
              label="Error State"
              error="This field has an error"
            />
            <Input
              placeholder="Success state"
              label="Success State"
              success="This field is valid"
            />
            <Input
              placeholder="Warning state"
              label="Warning State"
              warning="This field needs attention"
            />
            <Input
              placeholder="Helper text"
              label="With Helper Text"
              helperText="This is some helpful information"
            />
          </div>
        </section>

        {/* Complete Form Example */}
        <section className="space-y-6">
          <h2 className="text-heading-2 text-discord-text-primary">Complete Form Example</h2>
          <form onSubmit={handleSubmit} className="space-y-6 bg-discord-background-secondary p-6 rounded-discord-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name *"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                success={success.name}
              />
              
              <Input
                type="email"
                label="Email Address *"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                success={success.email}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Role *"
                placeholder="Select your role"
                options={roleOptions}
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                error={errors.role}
              />
              
              <Select
                label="Experience Level"
                placeholder="Select your experience"
                options={experienceOptions}
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                helperText="This helps us understand your background"
              />
            </div>

            <Textarea
              label="Bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              maxLength={500}
              showCharCount
              helperText="Share your background and interests"
              textareaSize="lg"
            />

            <Input
              label="Skills"
              placeholder="e.g., React, TypeScript, Node.js"
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              helperText="Comma-separated list of your skills"
            />

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="newsletter"
                checked={formData.newsletter}
                onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
                className="w-4 h-4 text-discord-brand-primary bg-discord-background-elevated border-discord-interactive-normal rounded focus:ring-discord-brand-primary focus:ring-2"
              />
              <label htmlFor="newsletter" className="text-sm text-discord-text-secondary">
                Subscribe to our newsletter for updates
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" variant="primary" size="lg">
                Submit Application
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                size="lg"
                onClick={() => {
                  setFormData({
                    name: '',
                    email: '',
                    role: '',
                    bio: '',
                    skills: '',
                    experience: '',
                    newsletter: false
                  })
                  setErrors({})
                  setSuccess({})
                }}
              >
                Reset Form
              </Button>
            </div>
          </form>
        </section>

        {/* Textarea Variants */}
        <section className="space-y-6">
          <h2 className="text-heading-2 text-discord-text-primary">Textarea Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textarea
              variant="default"
              placeholder="Default textarea"
              label="Default Variant"
            />
            <Textarea
              variant="filled"
              placeholder="Filled textarea"
              label="Filled Variant"
            />
            <Textarea
              variant="ghost"
              placeholder="Ghost textarea"
              label="Ghost Variant"
            />
          </div>
        </section>

        {/* Select Variants */}
        <section className="space-y-6">
          <h2 className="text-heading-2 text-discord-text-primary">Select Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select
              variant="default"
              placeholder="Choose an option"
              label="Default Variant"
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' }
              ]}
            />
            <Select
              variant="filled"
              placeholder="Choose an option"
              label="Filled Variant"
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' }
              ]}
            />
            <Select
              variant="ghost"
              placeholder="Choose an option"
              label="Ghost Variant"
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' }
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  )
}