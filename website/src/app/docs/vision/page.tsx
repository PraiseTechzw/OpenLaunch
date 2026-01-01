import { readFile } from 'fs/promises'
import { join } from 'path'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vision & Mission - OpenLaunch Documentation',
  description: 'Our goals and values for the OpenLaunch project',
}

export default async function VisionPage() {
  let content = ''
  
  try {
    content = await readFile(join(process.cwd(), 'docs/vision.md'), 'utf-8')
  } catch (error) {
    content = `# Vision & Mission

## Our Vision

OpenLaunch envisions a world where collaborative software development is accessible, inclusive, and empowering for developers of all skill levels. We believe in the power of community-driven innovation to solve real-world problems and create meaningful impact.

## Our Mission

To democratize software development by providing:

### 1. Inclusive Community
- Welcome developers from all backgrounds and experience levels
- Foster mentorship and knowledge sharing
- Create safe spaces for learning and growth

### 2. Open Collaboration
- Transparent development processes
- Community-driven decision making
- Open source by default

### 3. Innovation Focus
- Encourage experimentation and creativity
- Support cutting-edge technologies
- Promote sustainable development practices

### 4. Real Impact
- Build solutions that matter
- Address community needs
- Create lasting value for users

## Core Values

### Transparency
We believe in open communication, clear processes, and honest feedback. All decisions are made transparently with community input.

### Inclusivity
Everyone is welcome in our community regardless of background, experience level, or identity. We actively work to remove barriers to participation.

### Quality
We strive for excellence in everything we do, from code quality to community interactions. We believe that quality is everyone's responsibility.

### Sustainability
We build for the long term, considering the environmental, social, and economic impact of our work.

### Learning
We embrace continuous learning and growth, both individually and as a community. Mistakes are learning opportunities.

## 2026 Goals

### Q1: Foundation
- Establish core community guidelines
- Launch initial project infrastructure
- Onboard first 100 contributors

### Q2: Growth
- Scale to 500+ active contributors
- Launch mentorship program
- Establish partnerships with educational institutions

### Q3: Impact
- Release flagship products
- Achieve industry recognition
- Establish sustainable funding model

## Join Our Mission

Ready to be part of something bigger? Here's how you can contribute:

1. **Start Contributing** - Check out our [getting started guide](/docs/onboarding)
2. **Join Discussions** - Participate in our [community forums](https://github.com/PraiseTechzw/OpenLaunch/discussions)
3. **Spread the Word** - Share OpenLaunch with your network
4. **Provide Feedback** - Help us improve by sharing your thoughts

Together, we can build the future of collaborative software development! 🚀`
  }

  return (
    <div className="prose prose-lg max-w-4xl mx-auto">
      <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/50">
        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>').replace(/^# (.+)$/gm, '<h1>$1</h1>').replace(/^## (.+)$/gm, '<h2>$1</h2>').replace(/^### (.+)$/gm, '<h3>$1</h3>') }}
        />
      </div>
    </div>
  )
}