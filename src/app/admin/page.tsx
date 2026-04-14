
'use client';

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { INITIAL_ARTICLES } from '@/lib/news-data';
import { Plus, Edit, Trash2, Eye, LayoutDashboard, Settings, FileText } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-headline font-bold text-foreground">Dashboard Admin</h1>
            <p className="text-muted-foreground">Kelola semua artikel dan konten BeritaKita</p>
          </div>
          <Link href="/admin/new">
            <Button className="bg-primary text-white rounded-full px-6 py-6 h-auto font-bold shadow-lg hover:shadow-xl transition-all">
              <Plus className="h-5 w-5 mr-2" /> Artikel Baru
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <div className="space-y-2">
            <Button variant="secondary" className="w-full justify-start gap-3 rounded-xl bg-white border border-border font-bold">
              <LayoutDashboard className="h-4 w-4 text-primary" /> Ringkasan
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl font-medium">
              <FileText className="h-4 w-4" /> Semua Artikel
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl font-medium">
              <Settings className="h-4 w-4" /> Pengaturan
            </Button>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="rounded-2xl border-none shadow-sm bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-primary">Total Artikel</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{INITIAL_ARTICLES.length}</p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl border-none shadow-sm bg-accent/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-accent-foreground">Dibaca Hari Ini</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">1,284</p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl border-none shadow-sm bg-muted/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Draft</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">3</p>
                </CardContent>
              </Card>
            </div>

            {/* Articles Table */}
            <Card className="rounded-2xl border-border shadow-sm overflow-hidden">
              <CardHeader className="bg-white border-b border-border">
                <CardTitle className="text-lg">Artikel Terbaru</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[400px]">Judul</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Penulis</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {INITIAL_ARTICLES.map((article) => (
                      <TableRow key={article.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{article.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">{article.category}</Badge>
                        </TableCell>
                        <TableCell>{article.author}</TableCell>
                        <TableCell className="text-muted-foreground text-xs">{article.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/article/${article.id}`}>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
