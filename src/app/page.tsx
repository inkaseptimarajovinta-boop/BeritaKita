
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import NewsCard from '@/components/NewsCard';
import { INITIAL_ARTICLES } from '@/lib/news-data';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Newspaper } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [currentYear, setCurrentYear] = useState<number>(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const featuredArticle = INITIAL_ARTICLES[0];
  const remainingArticles = INITIAL_ARTICLES.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-accent/20">
                <Sparkles className="h-3 w-3 text-accent" />
                <span>Berita Utama Hari Ini</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
                Kabar Terkini Untuk Kita
              </h1>
            </div>
            <Link href="/admin/new">
              <Button variant="outline" className="gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all">
                Mulai Menulis <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {featuredArticle && (
            <NewsCard article={featuredArticle} featured />
          )}
        </section>

        {/* Categories Preview */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-headline font-bold">Terbaru dari Seluruh Kategori</h2>
            <div className="h-px flex-1 mx-6 bg-border hidden sm:block"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="rounded-3xl bg-primary p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-headline font-bold mb-4">Dapatkan Berita Terbaik Setiap Hari</h2>
            <p className="text-white/80 mb-8">
              Berlangganan newsletter kami untuk mendapatkan ringkasan berita terpenting langsung di inbox Anda.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Alamat email anda" 
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button className="rounded-full bg-accent text-primary font-bold hover:bg-white hover:text-primary px-8">
                Berlangganan
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-border mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="bg-primary p-2 rounded-lg text-white">
                  <Newspaper className="h-5 w-5" />
                </div>
                <span className="text-xl font-headline font-bold text-primary">BeritaKita</span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-sm">
                Platform berita modern yang menghadirkan informasi terpercaya dan mendalam bagi seluruh lapisan masyarakat Indonesia.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-muted-foreground">Kategori</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="/category/politik" className="hover:text-primary">Politik</Link></li>
                <li><Link href="/category/ekonomi" className="hover:text-primary">Ekonomi</Link></li>
                <li><Link href="/category/olahraga" className="hover:text-primary">Olahraga</Link></li>
                <li><Link href="/category/teknologi" className="hover:text-primary">Teknologi</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-muted-foreground">Perusahaan</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="#" className="hover:text-primary">Tentang Kami</Link></li>
                <li><Link href="#" className="hover:text-primary">Redaksi</Link></li>
                <li><Link href="#" className="hover:text-primary">Kontak</Link></li>
                <li><Link href="#" className="hover:text-primary">Kebijakan Privasi</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {currentYear} BeritaKita. Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}
