import { notFound } from 'next/navigation'
import { getDocBySlug, getDocSlugs } from '@/lib/markdown'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

interface DocPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getDocSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: DocPageProps) {
  const doc = getDocBySlug(params.slug)
  
  if (!doc) {
    return {
      title: 'Document Not Found',
    }
  }

  return {
    title: `${doc.metadata.title} - OpenLaunch Documentation`,
    description: doc.metadata.description,
  }
}

export default function DocPage({ params }: DocPageProps) {
  const doc = getDocBySlug(params.slug)

  if (!doc) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/docs"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            Back to Documentation
          </Link>
        </div>

        {/* Document Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {doc.metadata.title}
          </h1>
          {doc.metadata.description && (
            <p className="text-xl text-gray-600">
              {doc.metadata.description}
            </p>
          )}
          {(doc.metadata.date || doc.metadata.author) && (
            <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
              {doc.metadata.date && (
                <span>Updated: {new Date(doc.metadata.date).toLocaleDateString()}</span>
              )}
              {doc.metadata.author && (
                <span>By: {doc.metadata.author}</span>
              )}
            </div>
          )}
        </div>

        {/* Document Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <MarkdownRenderer content={doc.content} />
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <Link
            href="/docs"
            className="inline-flex items-center px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            All Documentation
          </Link>
          
          <Link
            href="/community"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Join Community
          </Link>
        </div>
      </div>
    </div>
  )
}