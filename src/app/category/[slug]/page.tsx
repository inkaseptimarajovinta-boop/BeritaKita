
import Navbar from '@/components/Navbar';
import NewsCard from '@/components/NewsCard';
import { INITIAL_ARTICLES } from '@/lib/news-data';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const articles = INITIAL_ARTICLES.filter(a => a.category.toLowerCase() === slug.toLowerCase());

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">Beranda</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-primary font-bold">{categoryName}</span>
        </div>

        <div className="mb-12 border-b border-border pb-8">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4 capitalize">
            {categoryName}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Berita terkini dan liputan mendalam seputar dunia {slug} baik dari dalam negeri maupun internasional.
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-border">
            <h3 className="text-xl font-headline font-bold mb-2">Belum ada berita</h3>
            <p className="text-muted-foreground">Maaf, kategori ini belum memiliki konten saat ini.</p>
          </div>
        )}
      </main>
    </div>
  );
}
