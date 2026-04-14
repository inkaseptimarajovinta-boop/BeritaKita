
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/news-data';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function NewsCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link href={`/article/${article.id}`} className="group block">
      <div className={`overflow-hidden rounded-2xl bg-white border border-border shadow-sm transition-all hover:shadow-md hover:border-primary/20 ${featured ? 'md:grid md:grid-cols-2 md:gap-0' : 'flex flex-col h-full'}`}>
        <div className={`relative overflow-hidden ${featured ? 'h-[300px] md:h-full' : 'h-48'}`}>
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint="news thumbnail"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary/90 hover:bg-primary text-white border-none backdrop-blur-sm">
              {article.category}
            </Badge>
          </div>
        </div>
        
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Calendar className="h-3 w-3" />
              <span>{format(new Date(article.date), 'dd MMMM yyyy', { locale: id })}</span>
            </div>
            <h3 className={`font-headline font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-3 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
              {article.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2 text-sm md:text-base mb-4">
              {article.summary}
            </p>
          </div>
          
          <div className="flex items-center text-primary font-medium text-sm group/btn">
            Baca Selengkapnya
            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
