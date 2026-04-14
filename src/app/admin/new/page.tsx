
'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Save, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { rephraseNewsArticle } from '@/ai/flows/rephrase-news-article';
import { toast } from '@/hooks/use-toast';

export default function NewArticle() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    originalHeadline: '',
    originalSummary: '',
    originalContent: '',
    category: 'Teknologi'
  });

  const [result, setResult] = useState<{
    rephrasedHeadline: string;
    uniqueSummary: string;
    rephrasedContent?: string;
  } | null>(null);

  const handleAIRephrase = async () => {
    if (!formData.originalHeadline || !formData.originalSummary) {
      toast({
        title: "Input Kurang",
        description: "Mohon isi judul dan ringkasan asli terlebih dahulu.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const output = await rephraseNewsArticle({
        originalHeadline: formData.originalHeadline,
        originalSummary: formData.originalSummary,
        originalContent: formData.originalContent || undefined
      });
      setResult(output);
      toast({
        title: "Berhasil Rephrase",
        description: "AI telah membuat versi unik dari artikel Anda.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Kesalahan AI",
        description: "Gagal memproses rephrase berita. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    toast({
      title: "Artikel Disimpan",
      description: "Artikel telah berhasil ditambahkan ke database (simulasi).",
    });
    // In a real app, logic to save to Firebase/DB would go here
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/admin" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Dashboard Admin</span>
        </Link>

        <h1 className="text-3xl font-headline font-bold text-foreground mb-8">Tambah Berita Baru</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <Card className="rounded-2xl border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Sumber Konten</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="headline">Judul Asli</Label>
                  <Input 
                    id="headline" 
                    placeholder="Masukkan judul dari sumber berita..."
                    value={formData.originalHeadline}
                    onChange={(e) => setFormData({...formData, originalHeadline: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select value={formData.category} onValueChange={(val) => setFormData({...formData, category: val})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Politik">Politik</SelectItem>
                      <SelectItem value="Ekonomi">Ekonomi</SelectItem>
                      <SelectItem value="Olahraga">Olahraga</SelectItem>
                      <SelectItem value="Teknologi">Teknologi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Ringkasan Asli</Label>
                  <Textarea 
                    id="summary" 
                    className="h-24" 
                    placeholder="Masukkan ringkasan singkat artikel..."
                    value={formData.originalSummary}
                    onChange={(e) => setFormData({...formData, originalSummary: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Konten Lengkap (Opsional)</Label>
                  <Textarea 
                    id="content" 
                    className="h-48" 
                    placeholder="Tempelkan isi artikel lengkap di sini..."
                    value={formData.originalContent}
                    onChange={(e) => setFormData({...formData, originalContent: e.target.value})}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-border pt-6">
                <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setFormData({originalHeadline:'', originalSummary:'', originalContent:'', category:'Teknologi'})}>
                  <Trash2 className="h-4 w-4 mr-2" /> Reset
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-8" 
                  onClick={handleAIRephrase}
                  disabled={loading}
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Memproses AI...</>
                  ) : (
                    <><Sparkles className="h-4 w-4 mr-2" /> Rephrase dengan AI</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* AI Result Panel */}
          <div className="space-y-6">
            <Card className="rounded-2xl border-accent/20 bg-accent/5 shadow-sm min-h-[500px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Hasil Rephrase AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 flex-1">
                {!result ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-12 text-muted-foreground opacity-50">
                    <Sparkles className="h-12 w-12 mb-4" />
                    <p>Hasil AI akan muncul di sini setelah Anda menekan tombol "Rephrase dengan AI".</p>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-xs uppercase font-bold text-accent">Judul Unik</Label>
                      <h3 className="text-2xl font-headline font-bold text-primary">{result.rephrasedHeadline}</h3>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs uppercase font-bold text-accent">Ringkasan Unik</Label>
                      <p className="text-sm italic text-muted-foreground leading-relaxed">"{result.uniqueSummary}"</p>
                    </div>

                    {result.rephrasedContent && (
                      <div className="space-y-2">
                        <Label className="text-xs uppercase font-bold text-accent">Konten Terformat</Label>
                        <div className="text-sm leading-relaxed p-4 bg-white rounded-xl border border-border">
                          {result.rephrasedContent}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              {result && (
                <CardFooter className="border-t border-accent/10 pt-6">
                  <Button className="w-full bg-accent hover:bg-accent/80 text-primary font-bold rounded-full" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" /> Simpan Artikel
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
