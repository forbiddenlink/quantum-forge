'use client';

import { useState, useMemo } from 'react';

// Document types
type FileType = 'pdf' | 'doc' | 'xls' | 'ppt' | 'img' | 'other';
type Category = 'Policies' | 'Templates' | 'Training' | 'Team Resources';

interface Document {
  id: string;
  title: string;
  description: string;
  fileType: FileType;
  fileSize: string;
  category: Category;
  lastUpdated: Date;
  author: string;
}

// Mock document data
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Employee Handbook',
    description: 'Complete guide to company policies, benefits, and workplace expectations',
    fileType: 'pdf',
    fileSize: '2.4 MB',
    category: 'Policies',
    lastUpdated: new Date('2025-12-15'),
    author: 'HR Department',
  },
  {
    id: '2',
    title: 'Project Brief Template',
    description: 'Standard template for initiating new projects with stakeholder requirements',
    fileType: 'doc',
    fileSize: '156 KB',
    category: 'Templates',
    lastUpdated: new Date('2026-01-20'),
    author: 'PMO Team',
  },
  {
    id: '3',
    title: 'Onboarding Checklist',
    description: 'Step-by-step guide for new employee orientation and setup',
    fileType: 'pdf',
    fileSize: '890 KB',
    category: 'Training',
    lastUpdated: new Date('2026-01-08'),
    author: 'HR Department',
  },
  {
    id: '4',
    title: 'Brand Guidelines',
    description: 'Official brand standards including logo usage, colors, and typography',
    fileType: 'pdf',
    fileSize: '8.2 MB',
    category: 'Templates',
    lastUpdated: new Date('2025-11-30'),
    author: 'Marketing Team',
  },
  {
    id: '5',
    title: 'Team Directory',
    description: 'Contact information and org chart for all departments',
    fileType: 'xls',
    fileSize: '324 KB',
    category: 'Team Resources',
    lastUpdated: new Date('2026-02-01'),
    author: 'Operations',
  },
  {
    id: '6',
    title: 'Security Policy',
    description: 'Information security guidelines and data protection protocols',
    fileType: 'pdf',
    fileSize: '1.8 MB',
    category: 'Policies',
    lastUpdated: new Date('2025-10-22'),
    author: 'IT Security',
  },
  {
    id: '7',
    title: 'Expense Report Template',
    description: 'Standard form for submitting travel and business expenses',
    fileType: 'xls',
    fileSize: '98 KB',
    category: 'Templates',
    lastUpdated: new Date('2026-01-15'),
    author: 'Finance Team',
  },
  {
    id: '8',
    title: 'Remote Work Guidelines',
    description: 'Best practices and expectations for remote and hybrid work arrangements',
    fileType: 'pdf',
    fileSize: '1.1 MB',
    category: 'Policies',
    lastUpdated: new Date('2025-12-01'),
    author: 'HR Department',
  },
  {
    id: '9',
    title: 'Product Training Deck',
    description: 'Comprehensive overview of product features and use cases',
    fileType: 'ppt',
    fileSize: '15.6 MB',
    category: 'Training',
    lastUpdated: new Date('2026-01-25'),
    author: 'Product Team',
  },
  {
    id: '10',
    title: 'Meeting Room Schedule',
    description: 'Weekly booking calendar for conference rooms and shared spaces',
    fileType: 'xls',
    fileSize: '45 KB',
    category: 'Team Resources',
    lastUpdated: new Date('2026-02-03'),
    author: 'Office Admin',
  },
];

const categories: Category[] = ['Policies', 'Templates', 'Training', 'Team Resources'];

// File type icons as inline SVGs
const FileTypeIcon = ({ type, className = 'size-8' }: { type: FileType; className?: string }) => {
  switch (type) {
    case 'pdf':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" rx="2" fill="#DC2626" />
          <path d="M8 12h8M8 16h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 2v6h6" fill="#991B1B" />
          <text x="8" y="9" fill="white" fontSize="5" fontWeight="bold">PDF</text>
        </svg>
      );
    case 'doc':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" rx="2" fill="#2563EB" />
          <path d="M8 10h8M8 13h8M8 16h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 2v6h6" fill="#1D4ED8" />
        </svg>
      );
    case 'xls':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" rx="2" fill="#16A34A" />
          <path d="M8 9h3v3H8zM13 9h3v3h-3zM8 14h3v3H8zM13 14h3v3h-3z" stroke="white" strokeWidth="1" />
          <path d="M14 2v6h6" fill="#15803D" />
        </svg>
      );
    case 'ppt':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" rx="2" fill="#EA580C" />
          <rect x="7" y="8" width="10" height="8" rx="1" stroke="white" strokeWidth="1.5" />
          <path d="M14 2v6h6" fill="#C2410C" />
        </svg>
      );
    case 'img':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" rx="2" fill="#7C3AED" />
          <circle cx="10" cy="10" r="2" fill="white" />
          <path d="M7 18l4-5 3 3 3-4 3 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" rx="2" fill="#6B7280" />
          <path d="M8 12h8M8 16h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 2v6h6" fill="#4B5563" />
        </svg>
      );
  }
};

const getCategoryColor = (category: Category): string => {
  switch (category) {
    case 'Policies':
      return 'bg-accent-critical/20 text-accent-critical border-accent-critical';
    case 'Templates':
      return 'bg-accent-primary/20 text-accent-primary border-accent-primary';
    case 'Training':
      return 'bg-accent-success/20 text-accent-success border-accent-success';
    case 'Team Resources':
      return 'bg-accent-warning/20 text-accent-warning border-accent-warning';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
};

const formatDate = (date: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredDocuments = useMemo(() => {
    return mockDocuments.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const documentStats = useMemo(() => {
    const byCategory = categories.reduce((acc, cat) => {
      acc[cat] = mockDocuments.filter((d) => d.category === cat).length;
      return acc;
    }, {} as Record<Category, number>);

    return {
      total: mockDocuments.length,
      byCategory,
    };
  }, []);

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 mb-2">Documents</h1>
          <p className="text-muted-foreground">Access company resources and files</p>
        </div>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="animate-smooth flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          Upload
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="glass-panel rounded-xl p-4">
          <div className="caption mb-2 text-muted-foreground">Total Documents</div>
          <div className="heading-1">{documentStats.total}</div>
        </div>
        {categories.map((cat) => (
          <div key={cat} className="glass-panel rounded-xl p-4">
            <div className="caption mb-2 text-muted-foreground">{cat}</div>
            <div className={`heading-2 ${getCategoryColor(cat).split(' ')[1]}`}>
              {documentStats.byCategory[cat]}
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <svg
            className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="animate-smooth w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-sm outline-none transition-colors focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`animate-smooth caption rounded-lg border px-4 py-2 transition-colors ${
              selectedCategory === 'All'
                ? 'border-accent-primary bg-accent-primary/20 text-accent-primary'
                : 'border-border bg-background hover:border-accent-primary/50'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`animate-smooth caption rounded-lg border px-4 py-2 transition-colors ${
                selectedCategory === cat
                  ? getCategoryColor(cat)
                  : 'border-border bg-background hover:border-accent-primary/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="glass-panel animate-smooth group cursor-pointer rounded-2xl p-6 transition-transform hover:scale-[1.02]"
            >
              {/* Header with icon and category */}
              <div className="mb-4 flex items-start justify-between">
                <div className="rounded-xl bg-background/50 p-3">
                  <FileTypeIcon type={doc.fileType} className="size-10" />
                </div>
                <span className={`caption rounded border px-2 py-1 ${getCategoryColor(doc.category)}`}>
                  {doc.category}
                </span>
              </div>

              {/* Title and description */}
              <h3 className="mb-2 text-lg font-semibold">{doc.title}</h3>
              <p className="caption mb-4 line-clamp-2 text-muted-foreground">{doc.description}</p>

              {/* Metadata */}
              <div className="flex items-center justify-between border-t border-border/50 pt-4">
                <div className="caption flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                      />
                    </svg>
                    {doc.fileSize}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {formatDate(doc.lastUpdated)}
                  </span>
                </div>
              </div>

              {/* Hover actions */}
              <div className="mt-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button className="animate-smooth flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent-primary/20 px-4 py-2 text-sm font-medium text-accent-primary transition-colors hover:bg-accent-primary/30">
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </button>
                <button
                  aria-label="Preview document"
                  className="animate-smooth rounded-lg bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80"
                >
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
                <button
                  aria-label="Share document"
                  className="animate-smooth rounded-lg bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80"
                >
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel rounded-2xl p-12 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
            <svg className="size-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold">No documents found</h3>
          <p className="mb-4 text-muted-foreground">
            {searchQuery || selectedCategory !== 'All'
              ? 'Try adjusting your search or filter criteria'
              : 'Upload your first document to get started'}
          </p>
          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="animate-smooth inline-flex items-center gap-2 rounded-lg bg-accent-primary/20 px-4 py-2 text-sm font-medium text-accent-primary transition-colors hover:bg-accent-primary/30"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="glass-panel animate-smooth m-4 w-full max-w-lg rounded-2xl p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="heading-2">Upload Document</h2>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Upload dropzone */}
            <div className="mb-6 rounded-xl border-2 border-dashed border-border p-8 text-center transition-colors hover:border-accent-primary/50">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-accent-primary/20">
                <svg className="size-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <p className="mb-2 font-medium">Drop files here or click to browse</p>
              <p className="caption text-muted-foreground">Supports PDF, DOC, XLS, PPT up to 50MB</p>
            </div>

            {/* Category selector */}
            <div className="mb-6">
              <label className="label mb-2 block text-muted-foreground">Category</label>
              <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent-primary">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="animate-smooth flex-1 rounded-lg border border-border px-6 py-3 font-medium transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="animate-smooth flex-1 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
