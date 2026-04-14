
import Navbar from '@/components/Navbar';
import { INITIAL_ARTICLES } from '@/lib/news-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Share2, MessageCircle, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { notFound } from 'next/navigation';

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = INITIAL_ARTICLES.find(a => a.id === id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Kembali ke Beranda</span>
        </Link>

        <header className="mb-10">
          <Badge className="bg-accent text-primary mb-6">{article.category}</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground leading-tight mb-8">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-border">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-foreground">{article.author}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{format(new Date(article.date), 'dd MMMM yyyy', { locale: localeId })}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-full gap-2">
                <Share2 className="h-4 w-4" /> Bagikan
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full gap-2">
                <MessageCircle className="h-4 w-4" /> Komentar
              </Button>
            </div>
          </div>
        </header>

        <div className="relative aspect-video w-full mb-12 rounded-3xl overflow-hidden shadow-xl">
          <Image 
            src={article.imageUrl} 
            alt={article.title} 
            fill 
            className="object-cover"
            priority
            data-ai-hint="news full image"
          />
        </div>

        <article className="prose prose-lg max-w-none">
          <p className="text-xl font-medium text-foreground/80 leading-relaxed mb-8 border-l-4 border-accent pl-6">
            {article.summary}
          </p>
          
          <div className="text-foreground/90 leading-loose space-y-6 text-lg">
            {article.content.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </article>

        <div className="mt-20 p-8 rounded-3xl bg-white border border-border">
          <h3 className="text-xl font-headline font-bold mb-6">Artikel Terkait</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {INITIAL_ARTICLES.filter(a => a.id !== article.id).slice(0, 2).map((rel) => (
              <Link key={rel.id} href={`/article/${rel.id}`} className="group flex gap-4">
                <div className="relative h-20 w-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={rel.imageUrl} alt={rel.title} fill className="object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{rel.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
