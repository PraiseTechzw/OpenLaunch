'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { clsx } from 'clsx'

interface MarkdownRendererProps {
  content: string
  className?: string
  variant?: 'default' | 'discord'
}

export function MarkdownRenderer({ content, className, variant = 'discord' }: MarkdownRendererProps) {
  const isDiscord = variant === 'discord'
  
  return (
    <div className={clsx(
      'prose prose-lg max-w-none',
      isDiscord ? 'prose-invert' : '',
      className
    )}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className={clsx(
              'text-4xl font-bold mb-6 border-b pb-4',
              isDiscord 
                ? 'text-white border-gray-700' 
                : 'text-gray-900 border-gray-200'
            )}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className={clsx(
              'text-3xl font-bold mt-12 mb-6 border-b pb-2',
              isDiscord 
                ? 'text-white border-gray-700' 
                : 'text-gray-900 border-gray-200'
            )}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className={clsx(
              'text-2xl font-semibold mt-8 mb-4',
              isDiscord ? 'text-white' : 'text-gray-900'
            )}>
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className={clsx(
              'text-xl font-semibold mt-6 mb-3',
              isDiscord ? 'text-white' : 'text-gray-900'
            )}>
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className={clsx(
              'leading-relaxed mb-4',
              isDiscord ? 'text-gray-300' : 'text-gray-700'
            )}>
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className={clsx(
              'list-disc list-inside space-y-2 mb-4',
              isDiscord ? 'text-gray-300' : 'text-gray-700'
            )}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className={clsx(
              'list-decimal list-inside space-y-2 mb-4',
              isDiscord ? 'text-gray-300' : 'text-gray-700'
            )}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className={clsx(
              'border-l-4 pl-6 py-2 my-6 rounded-r-lg',
              isDiscord 
                ? 'border-blue-500 bg-blue-900/20 text-gray-300' 
                : 'border-primary-500 bg-primary-50 text-gray-700'
            )}>
              <div className="italic">
                {children}
              </div>
            </blockquote>
          ),
          code: ({ children, className, ...props }: any) => {
            const isInline = !className?.includes('language-')
            if (isInline) {
              return (
                <code 
                  className={clsx(
                    'px-2 py-1 rounded text-sm font-mono',
                    isDiscord 
                      ? 'bg-gray-800 text-gray-200' 
                      : 'bg-gray-100 text-gray-800'
                  )} 
                  {...props}
                >
                  {children}
                </code>
              )
            }
            return (
              <code 
                className={clsx(
                  'block p-4 rounded-lg overflow-x-auto text-sm font-mono',
                  isDiscord 
                    ? 'bg-gray-900 text-gray-100' 
                    : 'bg-gray-900 text-gray-100'
                )} 
                {...props}
              >
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className={clsx(
              'p-4 rounded-lg overflow-x-auto mb-6',
              isDiscord 
                ? 'bg-gray-900 text-gray-100' 
                : 'bg-gray-900 text-gray-100'
            )}>
              {children}
            </pre>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className={clsx(
                'underline transition-colors',
                isDiscord 
                  ? 'text-blue-400 hover:text-blue-300 decoration-blue-400/50 hover:decoration-blue-300' 
                  : 'text-primary-600 hover:text-primary-700 decoration-primary-300 hover:decoration-primary-500'
              )}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-6">
              <table className={clsx(
                'min-w-full divide-y border rounded-lg',
                isDiscord 
                  ? 'divide-gray-700 border-gray-700' 
                  : 'divide-gray-200 border-gray-200'
              )}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className={isDiscord ? 'bg-gray-800' : 'bg-gray-50'}>
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className={clsx(
              'divide-y',
              isDiscord 
                ? 'bg-gray-900 divide-gray-700' 
                : 'bg-white divide-gray-200'
            )}>
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className={isDiscord ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}>
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className={clsx(
              'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider',
              isDiscord ? 'text-gray-300' : 'text-gray-500'
            )}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className={clsx(
              'px-6 py-4 whitespace-nowrap text-sm',
              isDiscord ? 'text-gray-300' : 'text-gray-900'
            )}>
              {children}
            </td>
          ),
          // Discord-specific enhancements
          strong: ({ children }) => (
            <strong className={clsx(
              'font-semibold',
              isDiscord ? 'text-white' : 'text-gray-900'
            )}>
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className={clsx(
              'italic',
              isDiscord ? 'text-gray-200' : 'text-gray-800'
            )}>
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}