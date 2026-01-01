import { readFile } from 'fs/promises'
import { join } from 'path'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Getting Started - OpenLaunch Documentation',
  description: 'Quick start guide for new contributors to OpenLaunch',
}

export default async function OnboardingPage() {
  let content = ''
  
  try {
    content = await readFile(join(process.cwd(), 'docs/onboarding.md'), 'utf-8')
  } catch (error) {
    content = `# Getting Started with OpenLaunch

Welcome to OpenLaunch! This guide will help you get started as a contributor to our open-source project.

## Quick Start

1. **Fork the Repository**
   - Visit our [GitHub repository](https://github.com/PraiseTechzw/OpenLaunch)
   - Click the "Fork" button to create your own copy

2. **Clone Your Fork**
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/OpenLaunch.git
   cd OpenLaunch
   \`\`\`

3. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

4. **Start Development**
   \`\`\`bash
   npm run dev
   \`\`\`

## Project Structure

- \`/frontend\` - React/Next.js frontend application
- \`/backend\` - Node.js/Express backend API
- \`/docs\` - Documentation files
- \`/community\` - Community guidelines and resources

## Contributing Guidelines

1. **Create a Branch**
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

2. **Make Your Changes**
   - Follow our coding standards
   - Write tests for new features
   - Update documentation as needed

3. **Submit a Pull Request**
   - Push your changes to your fork
   - Create a pull request with a clear description
   - Wait for review and feedback

## Getting Help

- Join our [Discord community](https://discord.gg/openlaunch)
- Check out our [GitHub Discussions](https://github.com/PraiseTechzw/OpenLaunch/discussions)
- Read our [Code of Conduct](/community/code-of-conduct)

## Next Steps

- Explore our [project roadmap](/docs/roadmap)
- Learn about our [architecture](/docs/architecture)
- Check out [good first issues](https://github.com/PraiseTechzw/OpenLaunch/labels/good%20first%20issue)

Happy coding! 🚀`
  }

  return (
    <div className="prose prose-lg max-w-4xl mx-auto">
      <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/50">
        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>').replace(/```bash/g, '<pre><code class="language-bash">').replace(/```/g, '</code></pre>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/^# (.+)$/gm, '<h1>$1</h1>').replace(/^## (.+)$/gm, '<h2>$1</h2>').replace(/^### (.+)$/gm, '<h3>$1</h3>') }}
        />
      </div>
    </div>
  )
}