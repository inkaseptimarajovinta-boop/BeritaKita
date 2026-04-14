
export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Politik' | 'Ekonomi' | 'Olahraga' | 'Teknologi';
  author: string;
  date: string;
  imageUrl: string;
}

export const CATEGORIES = ['Politik', 'Ekonomi', 'Olahraga', 'Teknologi'] as const;

export const INITIAL_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Transformasi Digital Nasional: Menuju Indonesia Emas 2045',
    summary: 'Pemerintah terus mendorong percepatan infrastruktur digital di seluruh pelosok negeri guna mendukung pertumbuhan ekonomi kreatif.',
    content: 'Pemerintah Indonesia melalui Kementerian Komunikasi dan Informatika secara resmi meluncurkan roadmap transformasi digital nasional yang menargetkan konektivitas 100% pada tahun 2030. Langkah ini merupakan pondasi utama untuk mencapai visi Indonesia Emas 2045. Dalam pidatonya, Menteri menekankan bahwa pemerataan akses internet bukan hanya soal teknologi, melainkan soal keadilan sosial bagi seluruh rakyat Indonesia dari Sabang sampai Merauke.',
    category: 'Teknologi',
    author: 'Admin Kita',
    date: '2023-11-20',
    imageUrl: 'https://picsum.photos/seed/tech1/800/600'
  },
  {
    id: '2',
    title: 'Analisis Ekonomi: Dampak Fluktuasi Pasar Global Terhadap Rupiah',
    summary: 'Nilai tukar rupiah terhadap dolar AS terpantau masih stabil meski dibayangi ketidakpastian kebijakan moneter internasional.',
    content: 'Pasar keuangan domestik menunjukkan resiliensi yang cukup baik di tengah gejolak pasar global. Bank Indonesia melaporkan cadangan devisa tetap kuat, memberikan ruang bagi intervensi pasar jika diperlukan. Pengamat ekonomi menyebutkan bahwa diversifikasi perdagangan menjadi kunci bagi Indonesia untuk tetap tumbuh di atas 5% tahun ini.',
    category: 'Ekonomi',
    author: 'Dian Permata',
    date: '2023-11-21',
    imageUrl: 'https://picsum.photos/seed/economy1/800/600'
  },
  {
    id: '3',
    title: 'Langkah Baru Diplomasi Luar Negeri Indonesia di Kancah Regional',
    summary: 'Indonesia memperkuat peran kepemimpinannya di ASEAN melalui inisiatif kolaborasi keamanan maritim yang lebih erat.',
    content: 'Dalam pertemuan tingkat tinggi yang diadakan di Jakarta kemarin, delegasi Indonesia memaparkan kerangka kerja baru untuk stabilitas kawasan. Fokus utamanya adalah pada penyelesaian sengketa wilayah secara damai dan peningkatan patroli bersama untuk menjaga kedaulatan ekonomi di zona ekonomi eksklusif.',
    category: 'Politik',
    author: 'Budi Santoso',
    date: '2023-11-22',
    imageUrl: 'https://picsum.photos/seed/politics1/800/600'
  },
  {
    id: '4',
    title: 'Persiapan Timnas Menuju Kualifikasi Piala Dunia Mendatang',
    summary: 'Pelatih kepala optimis dengan perkembangan skuad muda yang baru saja menyelesaikan pemusatan latihan di luar negeri.',
    content: 'Skuad Garuda saat ini sedang dalam kondisi fisik yang prima. Setelah menjalani serangkaian uji coba internasional, chemistry antar pemain semakin solid. Pelatih menekankan pentingnya disiplin taktis untuk menghadapi lawan-lawan berat di grup kualifikasi nanti.',
    category: 'Olahraga',
    author: 'Rico J.',
    date: '2023-11-23',
    imageUrl: 'https://picsum.photos/seed/sports1/800/600'
  }
];
