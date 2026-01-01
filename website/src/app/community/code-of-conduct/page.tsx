import Link from 'next/link'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { 
  HeartIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

const codeOfConductContent = `
# Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, caste, color, religion, or sexual identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

## Our Standards

Examples of behavior that contributes to a positive environment for our community include:

- Demonstrating empathy and kindness toward other people
- Being respectful of differing opinions, viewpoints, and experiences
- Giving and gracefully accepting constructive feedback
- Accepting responsibility and apologizing to those affected by our mistakes, and learning from the experience
- Focusing on what is best not just for us as individuals, but for the overall community
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior include:

- The use of sexualized language or imagery, and sexual attention or advances of any kind
- Trolling, insulting or derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or email address, without their explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

## Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of acceptable behavior and will take appropriate and fair corrective action in response to any behavior that they deem inappropriate, threatening, offensive, or harmful.

Community leaders have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, and will communicate reasons for moderation decisions when appropriate.

## Scope

This Code of Conduct applies within all community spaces, and also applies when an individual is officially representing the community in public spaces. Examples of representing our community include using an official e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community leaders responsible for enforcement through GitHub issues or discussions. All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the reporter of any incident.

## Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining the consequences for any action they deem in violation of this Code of Conduct:

### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing clarity around the nature of the violation and an explanation of why the behavior was inappropriate. A public apology may be requested.

### 2. Warning

**Community Impact**: A violation through a single incident or series of actions.

**Consequence**: A warning with consequences for continued behavior. No interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, for a specified period of time. This includes avoiding interactions in community spaces as well as external channels like social media. Violating these terms may lead to a temporary or permanent ban.

### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public communication with the community for a specified period of time. No public or private interaction with the people involved, including unsolicited interaction with those enforcing the Code of Conduct, is allowed during this period. Violating these terms may lead to a permanent ban.

### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community standards, including sustained inappropriate behavior, harassment of an individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within the community.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant](https://www.contributor-covenant.org/), version 2.1, available at [https://www.contributor-covenant.org/version/2/1/code_of_conduct.html](https://www.contributor-covenant.org/version/2/1/code_of_conduct.html).

Community Impact Guidelines were inspired by [Mozilla's code of conduct enforcement ladder](https://github.com/mozilla/diversity).

For answers to common questions about this code of conduct, see the FAQ at [https://www.contributor-covenant.org/faq](https://www.contributor-covenant.org/faq). Translations are available at [https://www.contributor-covenant.org/translations](https://www.contributor-covenant.org/translations).
`

const highlights = [
  {
    title: 'Be Respectful',
    description: 'Treat everyone with kindness and respect, regardless of their background or experience level.',
    icon: HeartIcon,
    color: 'bg-pink-500'
  },
  {
    title: 'Stay Professional',
    description: 'Maintain a professional and welcoming environment in all interactions.',
    icon: ShieldCheckIcon,
    color: 'bg-blue-500'
  },
  {
    title: 'Communicate Constructively',
    description: 'Provide helpful feedback and engage in meaningful discussions.',
    icon: ChatBubbleLeftRightIcon,
    color: 'bg-green-500'
  },
  {
    title: 'Report Issues',
    description: 'Help us maintain a safe community by reporting inappropriate behavior.',
    icon: ExclamationTriangleIcon,
    color: 'bg-yellow-500'
  }
]

export default function CodeOfConductPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Code of Conduct
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to fostering an open, welcoming, and inclusive community for everyone.
          </p>
        </div>

        {/* Key Highlights */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {highlights.map((highlight) => (
            <div
              key={highlight.title}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center"
            >
              <div className={`w-12 h-12 ${highlight.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <highlight.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {highlight.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        {/* Full Code of Conduct */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-16">
          <MarkdownRenderer content={codeOfConductContent} />
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Questions or Concerns?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            If you have questions about our Code of Conduct or need to report an issue, 
            please don't hesitate to reach out to our community leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://github.com/PraiseTechzw/OpenLaunch/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
              Contact Us
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              Back to Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}