/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants
} from 'framer-motion';
import {
  Play,
  X,
  Search,
  Sparkles,
  Film,
  Sliders,
  Volume2,
  Smartphone,
  Palette,
  FolderCheck,
  Check,
  Copy,
  Download,
  Mail,
  Menu,
  Star,
  ArrowRight,
  Code,
  Briefcase,
  GraduationCap,
  Tv,
  CheckCircle2,
  FileText,
  ExternalLink,
  Video,
  Edit3,
  Lock,
  Unlock,
  ShieldCheck
} from 'lucide-react';

// Utility helper untuk mengekstrak Video ID YouTube & thumbnail asli langsung dari videonya
export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

export function getVideoThumbnail(url: string, quality: 'maxres' | 'hq' | 'mq' = 'maxres'): string {
  const id = getYouTubeId(url);
  if (id) {
    if (id === 'SqDPx9iTZ4A') return '/assets/thumbnails/filler-natal-2020.jpg';
    if (id === 'n0w-dbrjVk0') return '/assets/thumbnails/japan-event-trip.jpg';
    if (id === 'ctsVkIFDnvc') return '/assets/thumbnails/sodok-bola-reza.jpg';
    if (id === '73m7qWjkjEg') return '/assets/thumbnails/greeting-tahun-baru-2019.jpg';
    if (quality === 'maxres') return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    if (quality === 'hq') return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  }
  return '';
}

// Komponen Thumbnail Video yang mengambil frame langsung dari video dengan graceful fallback
function VideoThumbnailImage({
  videoUrl,
  thumbnailUrl,
  alt,
  className = ''
}: {
  videoUrl: string;
  thumbnailUrl?: string;
  alt: string;
  className?: string;
}) {
  const [src, setSrc] = useState(() => thumbnailUrl || getVideoThumbnail(videoUrl, 'maxres'));
  const [fallbackStep, setFallbackStep] = useState(0);

  useEffect(() => {
    setSrc(thumbnailUrl || getVideoThumbnail(videoUrl, 'maxres'));
    setFallbackStep(0);
  }, [videoUrl, thumbnailUrl]);

  const handleError = () => {
    const id = getYouTubeId(videoUrl);
    if (!id) return;

    if (id === 'SqDPx9iTZ4A') {
      setSrc('/assets/thumbnails/filler-natal-2020.jpg');
      return;
    }
    if (id === 'n0w-dbrjVk0') {
      setSrc('/assets/thumbnails/japan-event-trip.jpg');
      return;
    }
    if (id === 'ctsVkIFDnvc') {
      setSrc('/assets/thumbnails/sodok-bola-reza.jpg');
      return;
    }
    if (id === '73m7qWjkjEg') {
      setSrc('/assets/thumbnails/greeting-tahun-baru-2019.jpg');
      return;
    }

    if (fallbackStep === 0) {
      setSrc(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
      setFallbackStep(1);
    } else if (fallbackStep === 1) {
      setSrc(`https://img.youtube.com/vi/${id}/mqdefault.jpg`);
      setFallbackStep(2);
    } else if (fallbackStep === 2) {
      setSrc(`https://img.youtube.com/vi/${id}/0.jpg`);
      setFallbackStep(3);
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-108 group-hover:brightness-105 ${className}`}
      loading="lazy"
    />
  );
}

interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: 'shortform' | 'broadcast' | 'commercial' | 'motion' | 'audio';
  categories?: ('shortform' | 'broadcast' | 'commercial' | 'motion' | 'audio')[];
  categoryLabel: string;
  duration: string;
  aspectRatio: '9:16' | '16:9';
  videoUrl: string;
  thumbnailUrl?: string;
  description: string;
  software: string[];
  role: string;
  highlight?: string;
}

const initialProjects: ProjectItem[] = [
  {
    id: 'proj-pay-later-2-talkshow',
    title: 'NGOBROL BARENG CAST PAY LATER 2',
    client: 'Vision+ / Pay Later 2',
    category: 'commercial',
    categories: ['commercial', 'broadcast'],
    categoryLabel: 'Talkshow & Cast Interview',
    duration: '03:00',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/-hYEVL8QUiQ',
    description: 'Eksklusif interview dan bincang hangat bersama jajaran cast serial Pay Later 2 dengan ritme percakapan dinamis, multi-cam editing, audio leveling jernih, dan motion branding khas Vision+.',
    software: ['Adobe Premiere Pro', 'After Effects', 'Photoshop'],
    role: 'Video Editor',
    highlight: 'Cast Talkshow & Series Promo'
  },
  {
    id: 'proj-pay-later-2-tika-umar-jefri',
    title: 'Tika, Umar, dan Jefri yang bakal bikin Pay Later 2 jadi makin seru!! 😍❤️',
    client: 'Vision+ / Pay Later 2',
    category: 'shortform',
    categories: ['shortform', 'commercial'],
    categoryLabel: 'Short-Form Reels (9:16)',
    duration: '00:30',
    aspectRatio: '9:16',
    videoUrl: 'https://youtube.com/shorts/y1Jx_1LhcDQ?feature=share',
    description: 'Konten vertikal promosi karakter Tika, Umar, dan Jefri dalam Pay Later 2 dengan hook transisi cepat, sound effects kekinian, subtitle animasi responsif, dan pacing retensi tinggi.',
    software: ['Adobe Premiere Pro', 'CapCut', 'After Effects'],
    role: 'Video Editor',
    highlight: 'Short-Form Character Reels'
  },
  {
    id: 'proj-pay-later-2-amanda-kenny-challenge',
    title: 'Amanda Manopo dan Kenny Austin adu kompak di THIS OR THAT CHALLENGE 🤭💗',
    client: 'Vision+ / Pay Later 2',
    category: 'shortform',
    categories: ['shortform', 'commercial'],
    categoryLabel: 'Challenge Reels (9:16)',
    duration: '00:45',
    aspectRatio: '9:16',
    videoUrl: 'https://youtube.com/shorts/TgQbbOHajjE?feature=share',
    description: 'Reels This or That Challenge menampilkan chemistry seru Amanda Manopo dan Kenny Austin dengan dynamic pop-up graphics, sound cues interaktif, serta color grading segar ceria.',
    software: ['Adobe Premiere Pro', 'CapCut', 'After Effects'],
    role: 'Video Editor',
    highlight: 'Celebrity Challenge Reels'
  },
  {
    id: 'proj-adlibs-radio-pay-later-2',
    title: 'ADLIBS RADIO - PAY LATER 2',
    client: 'Radio Adlibs & Audio Sync',
    category: 'audio',
    categories: ['audio', 'shortform', 'commercial'],
    categoryLabel: 'Radio & Audio Sync',
    duration: '00:30',
    aspectRatio: '9:16',
    videoUrl: 'https://youtube.com/shorts/-hUiJsf8Wxk?feature=share',
    description: 'Video konten promosi digital Adlibs Radio - Pay Later 2 dengan sinkronisasi presisi audio dan dialog, ritme voice over dinamis, serta motion text graphics responsif.',
    software: ['Adobe Premiere Pro', 'Adobe Audition', 'After Effects'],
    role: 'Video Editor',
    highlight: 'Radio Adlibs & Audio Sync'
  },
  {
    id: 'proj-padel-sport',
    title: 'PADEL',
    client: 'Sports & Lifestyle',
    category: 'shortform',
    categories: ['shortform', 'commercial'],
    categoryLabel: 'Sports Reels & Lifestyle',
    duration: '00:30',
    aspectRatio: '9:16',
    videoUrl: 'https://youtube.com/shorts/yQLmOVdjRQs?feature=share',
    description: 'Reels olahraga Padel berenergi tinggi dengan potongan dinamis on-beat, sound design pukulan raket tajam, speed ramping, dan grading warna segar sporty.',
    software: ['Adobe Premiere Pro', 'CapCut', 'DaVinci Resolve'],
    role: 'Video Editor',
    highlight: 'Sports Energetic Reels'
  },
  {
    id: 'proj-greeting-coivnect-02',
    title: 'GREETING COIVNECT 02',
    client: 'COIVNECT',
    category: 'shortform',
    categories: ['shortform', 'commercial'],
    categoryLabel: 'Short-Form Greeting',
    duration: '00:20',
    aspectRatio: '9:16',
    videoUrl: 'https://youtube.com/shorts/yHIzyBAvToM?feature=share',
    description: 'Video greeting vertikal seri kedua untuk COIVNECT yang mengedepankan komunikasi brand bersahabat, penyesuaian rasio 9:16 untuk Stories/Reels, dan audio clarity.',
    software: ['Adobe Premiere Pro', 'After Effects'],
    role: 'Video Editor',
    highlight: 'Digital Greeting Series 02'
  },
  {
    id: 'proj-greeting-coivnect-01',
    title: 'GREETING COIVNECT 01',
    client: 'COIVNECT',
    category: 'shortform',
    categories: ['shortform', 'commercial'],
    categoryLabel: 'Short-Form Greeting',
    duration: '00:20',
    aspectRatio: '9:16',
    videoUrl: 'https://youtube.com/shorts/nzv4SHNXsBA?feature=share',
    description: 'Video greeting vertikal seri pertama untuk COIVNECT dengan penataan branding tajam, motion lower-thirds, dan color treatment sinematik media sosial.',
    software: ['Adobe Premiere Pro', 'After Effects'],
    role: 'Video Editor',
    highlight: 'Digital Greeting Series 01'
  },
  {
    id: 'proj-rcti-butter-baby',
    title: 'HIGHLIGHT BUTTER BABY x RCTI+',
    client: 'RCTI+ x Butter Baby',
    category: 'shortform',
    categories: ['shortform', 'broadcast', 'commercial'],
    categoryLabel: 'Short-Form Highlight',
    duration: '00:30',
    aspectRatio: '9:16',
    videoUrl: 'https://youtube.com/shorts/jTKNGvXybJc?feature=share',
    description: 'Highlight video vertikal kolaborasi kreatif Butter Baby di platform digital RCTI+, dirancang dengan ritme visual trendy, sound effects pop, dan pacing engaging.',
    software: ['Adobe Premiere Pro', 'CapCut'],
    role: 'Video Editor',
    highlight: 'Digital Highlight Collaboration'
  },
  {
    id: 'proj-greeting-tahun-baru-2019',
    title: 'Greeting Tahun Baru 2019',
    client: 'Broadcast / Matrix TV',
    category: 'motion',
    categories: ['motion', 'shortform', 'broadcast'],
    categoryLabel: 'Motion Graphics Greeting',
    duration: '00:15',
    aspectRatio: '9:16',
    videoUrl: 'https://youtube.com/shorts/73m7qWjkjEg?feature=share',
    thumbnailUrl: '/assets/thumbnails/greeting-tahun-baru-2019.jpg',
    description: 'Animasi greeting Tahun Baru dengan desain motion graphic festive, partikel cahaya dinamis, dan kinetic text reveal elegan berstandar penyiaran.',
    software: ['Adobe After Effects', 'Photoshop'],
    role: 'Motion Graphic Designer',
    highlight: 'Festive Season Greeting'
  },
  {
    id: 'proj-rcti-sodok-bola-reza',
    title: 'SODOK BOLA SELEB MATCH - REZA OKTAVIAN',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast', 'shortform'],
    categoryLabel: 'Celebrity Match Highlight',
    duration: '00:45',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/ctsVkIFDnvc',
    thumbnailUrl: '/assets/thumbnails/sodok-bola-reza.jpg',
    description: 'Highlight laga sengit Reza Oktavian (Reza Arap) di arena "Sodok Bola Seleb Match" RCTI+, menyuguhkan reaksi spontan, tensi permainan tinggi, dan sound design memikat.',
    software: ['Adobe Premiere Pro', 'Photoshop'],
    role: 'Video Editor',
    highlight: 'Celebrity Match Feature'
  },
  {
    id: 'proj-rcti-sodok-bola',
    title: 'SODOK BOLA SELEB MATCH',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast', 'commercial'],
    categoryLabel: 'Entertainment & Sports Special',
    duration: '01:00',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/u_4Aac04YU4',
    description: 'Program pertandingan hiburan dan olahraga selebriti "Sodok Bola Seleb Match" di RCTI+ dengan ritme potongan laga dinamis, slow-motion highlight, dan scoring atraktif.',
    software: ['Adobe Premiere Pro', 'After Effects'],
    role: 'Video Editor',
    highlight: 'Celebrity Sports Entertainment'
  },
  {
    id: 'proj-rcti-pentagon-kmdf',
    title: 'GREETING PENTAGON - KMDF 2020',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast', 'motion', 'audio'],
    categoryLabel: 'Music Festival Special (KMDF)',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/BzNm55odcKk',
    description: 'Video greeting boy group K-Pop PENTAGON untuk gelaran Korean Music Drive-in Festival 2020 yang disiarkan eksklusif di RCTI+ dengan motion graphics title cards.',
    software: ['Adobe Premiere Pro', 'After Effects'],
    role: 'Video Editor & Motion Designer',
    highlight: 'Global Artist Greeting'
  },
  {
    id: 'proj-rcti-gidle-kmdf',
    title: 'GREETING (G)I-DLE - KMDF 2020',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast', 'motion', 'audio'],
    categoryLabel: 'Music Festival Special (KMDF)',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/uY6Bs604nCE',
    description: 'Video greeting resmi girl group K-Pop ternama (G)I-DLE untuk ajang Korean Music Drive-in Festival (KMDF) 2020 di RCTI+ lengkap dengan motion packaging bilingual.',
    software: ['Adobe Premiere Pro', 'After Effects', 'Photoshop'],
    role: 'Video Editor & Motion Designer',
    highlight: 'Global Artist Greeting'
  },
  {
    id: 'proj-rcti-tvc-2019',
    title: 'TVC RCTI+ 2019',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast', 'commercial'],
    categoryLabel: 'Commercial TVC & Campaign',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/Zt-RVxRj6Jw',
    description: 'Televisi Komersial (TVC) peluncuran aplikasi RCTI+ 2019 yang ditayangkan serentak di media siar televisi terestrial nasional dengan standar broadcast ketat.',
    software: ['Adobe Premiere Pro', 'After Effects'],
    role: 'Video Editor & Post-Production',
    highlight: 'National Launch TVC'
  },
  {
    id: 'proj-rcti-idol-all-juri-cut',
    title: 'Indonesian Idol - All Juri - RCTI+',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast', 'audio'],
    categoryLabel: 'Broadcast Program Filler',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/fGyuMLTr3Y0',
    description: 'Versi filler broadcast Indonesian Idol All Juri untuk platform RCTI+ yang menonjolkan interaksi dinamis dewan juri bintang papan atas nasional.',
    software: ['Adobe Premiere Pro', 'Photoshop'],
    role: 'Video Editor',
    highlight: 'Indonesian Idol Broadcast'
  },
  {
    id: 'proj-rcti-idol-promo-all-juri',
    title: 'Indonesian Idol Promo All Juri - RCTI+',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast', 'motion', 'audio'],
    categoryLabel: 'Flagship Show Promo',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/KZ4RhhoOMs0',
    description: 'Materi promosi broadcast program pencarian bakat terbesar Indonesian Idol menampilkan seluruh dewan juri, dikemas dengan motion typography berbobot dan hype editing.',
    software: ['Adobe Premiere Pro', 'After Effects', 'Photoshop'],
    role: 'Video Editor & Motion Designer',
    highlight: 'Flagship Talent Show Promo'
  },
  {
    id: 'proj-rcti-hut-30-recap',
    title: 'Partnership Recap Ulang Tahun RCTI 30',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast', 'commercial'],
    categoryLabel: 'Corporate & Event Recap',
    duration: '02:00',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/WC4WQeU65pY',
    description: 'Video rekap kemitraan dan selebrasi akbar HUT ke-30 RCTI. Merangkum kolaborasi brand prestisius, panggung megah musisi papan atas, dan pencapaian milestone pertelevisian.',
    software: ['Adobe Premiere Pro', 'After Effects'],
    role: 'Video Editor',
    highlight: 'Milestone Anniversary Recap'
  },
  {
    id: 'proj-rcti-kupdate-treasure',
    title: 'FILLER K UPDATE TREASURE ENGLISH',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast', 'motion'],
    categoryLabel: 'K-Pop Broadcast Feature',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/aoUoGP-YnR0',
    description: 'Filler program "K Update" edisi boy group K-Pop TREASURE versi bahasa Inggris untuk pemirsa internasional RCTI+ dengan animated lower thirds dan kinetic title design.',
    software: ['After Effects', 'Premiere Pro'],
    role: 'Motion Graphic Designer & Editor',
    highlight: 'International Broadcast Feature'
  },
  {
    id: 'proj-rcti-jkt48',
    title: 'FILLER JKT48 - RCT+',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast', 'motion', 'audio'],
    categoryLabel: 'Broadcast Special (RCTI+)',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/T9f0hP83KmE',
    description: 'Filler tayangan eksklusif idol group JKT48 di RCTI+ dengan gaya editing energetic bertempo cepat, graphic overlays modern, dan sinkronisasi audio musik berenergi tinggi.',
    software: ['Adobe Premiere Pro', 'After Effects'],
    role: 'Video Editor',
    highlight: 'Idol Group Broadcast Filler'
  },
  {
    id: 'proj-rcti-idul-fitri-2021',
    title: 'FILLER IDUL FITRI (RCTI+) 2021',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast', 'motion'],
    categoryLabel: 'Seasonal Broadcast Filler',
    duration: '00:45',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/0aglThlGjs4',
    description: 'Filler tematik perayaan Idul Fitri 2021 stasiun digital RCTI+ dengan ornamen motion graphics Islami elegan, nuansa hangat kebersamaan, dan komposisi tipografi khas hari raya.',
    software: ['After Effects', 'Premiere Pro', 'Photoshop'],
    role: 'Video Editor',
    highlight: 'National Festive Broadcast'
  },
  {
    id: 'proj-rcti-at-eighteen',
    title: 'Filler RCTI+ promo AT EIGHTEEN',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast', 'motion', 'audio'],
    categoryLabel: 'Broadcast Promotion',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/ZHVrzhTV1_E',
    description: 'Filler on-air promo serial drama Korea populer "At Eighteen" untuk platform digital RCTI+. Pengemasan kinetic title cards, highlight cuplikan adegan emosional, dan audio sync siaran.',
    software: ['Adobe Premiere Pro', 'After Effects'],
    role: 'Video Editor & Motion Designer',
    highlight: 'K-Drama Broadcast Promo'
  },
  {
    id: 'proj-rcti-backstage-ita',
    title: 'FILLER BACKSTAGE+ ITA 2021 GTV RCTI',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast'],
    categoryLabel: 'Broadcast Promotion',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/29QSeaiyA0g',
    description: 'Filler tayangan khusus Backstage+ Indonesian Television Awards (ITA) 2021 yang disiarkan serentak di GTV dan RCTI+ dengan alur editing dinamis dan visual packaging televisi nasional.',
    software: ['Premiere Pro', 'Photoshop'],
    role: 'Video Editor',
    highlight: 'Awards Special Broadcast Promo'
  },
  {
    id: 'proj-rcti-amanah-wali',
    title: 'FILLER AMANAH WALI',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast', 'motion'],
    categoryLabel: 'Broadcast & Motion Graphics',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/zIRatS975R0',
    description: 'Filler promosi program sinetron unggulan Amanah Wali untuk siaran RCTI+ dengan sentuhan visual dynamic motion graphics, title card animasi, dan tempo editing siaran.',
    software: ['Premiere Pro', 'After Effects'],
    role: 'Video Editor & Motion Graphic Designer',
    highlight: 'Broadcast Program Filler'
  },
  {
    id: 'proj-rcti-5-pilar',
    title: 'FILLER RCTI+ 5 PILAR',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast', 'audio'],
    categoryLabel: 'Broadcast & Audio Sync',
    duration: '01:00',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/208iT2EDC4Q',
    description: 'Produksi filler broadcast 5 Pilar RCTI+ dengan sinkronisasi audio sound effect presisi, transisi ritmis, dan visual compositing berkualitas siar.',
    software: ['Premiere Pro', 'Audition', 'After Effects'],
    role: 'Video Editor & Audio Sync Specialist',
    highlight: '5 Pilar National Broadcast'
  },
  {
    id: 'proj-rcti-news-promo',
    title: 'Filler Aplikasi RCTI+ (Promo Fitur News)',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast', 'motion'],
    categoryLabel: 'Broadcast & Motion Graphic',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/Oe0kiHJNwxs',
    description: 'Filler promosi fitur News di aplikasi RCTI+ dengan kinetic typography, graphic animation, dan video pacing standar broadcast.',
    software: ['After Effects', 'Premiere Pro', 'Photoshop'],
    role: 'Motion Graphic Designer & Video Editor',
    highlight: 'App Feature News Promo'
  },
  {
    id: 'proj-rcti-entag',
    title: 'ENTAG - untuk Catch Up di aplikasi RCTI+',
    client: 'RCTI+',
    category: 'motion',
    categories: ['motion', 'broadcast'],
    categoryLabel: 'Motion Graphics & Broadcast',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/NpAbUMVvYhw',
    description: 'Motion graphic animasi promosi fitur Catch Up ENTAG pada aplikasi mobile RCTI+ dengan komposisi UI/UX grafis interaktif.',
    software: ['After Effects', 'Premiere Pro'],
    role: 'Motion Graphic Designer',
    highlight: 'Feature Promo Animation'
  },
  {
    id: 'proj-rcti-natal-2020',
    title: 'Filler Natal RCTI+ "Desember Seru" 2020',
    client: 'RCTI+',
    category: 'motion',
    categories: ['motion', 'broadcast'],
    categoryLabel: 'Motion Graphics & Broadcast',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/SqDPx9iTZ4A',
    thumbnailUrl: '/assets/thumbnails/filler-natal-2020.jpg',
    description: 'Filler promosi bertema Natal "Desember Seru" untuk siaran RCTI+ dengan desain motion graphics ceria dan festive visual style.',
    software: ['After Effects', 'Illustrator', 'Premiere Pro'],
    role: 'Motion Graphic Designer',
    highlight: 'Seasonal Broadcast Filler'
  },
  {
    id: 'proj-rcti-idol-squad',
    title: '#Teaser Idol Squad - RCTI+',
    client: 'RCTI+',
    category: 'broadcast',
    categories: ['broadcast'],
    categoryLabel: 'Broadcast (RCTI+)',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/py5Gh4sur_I',
    description: 'Teaser video promosi Idol Squad untuk program siaran digital RCTI+ dengan ritme editing dinamis dan visual engagement tinggi.',
    software: ['Premiere Pro', 'After Effects'],
    role: 'Video Editor',
    highlight: 'Broadcast Teaser'
  },
  {
    id: 'proj-matrix-app',
    title: 'Aplikasi E-Matrix (Matrix TV)',
    client: 'Matrix TV',
    category: 'broadcast',
    categories: ['broadcast', 'motion'],
    categoryLabel: 'Broadcast & Motion Graphic',
    duration: '01:00',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/E2qP2F0wyXA',
    description: 'Materi promosi fitur aplikasi E-Matrix untuk penyiaran Matrix TV dengan motion graphics dinamis dan visual presentation.',
    software: ['After Effects', 'Premiere Pro', 'Photoshop'],
    role: 'Video Editor',
    highlight: 'Matrix TV App Promo'
  },
  {
    id: 'proj-jafra',
    title: 'Japan Event Trip Promotional Doc',
    client: 'Jalankan Media x Jafra',
    category: 'commercial',
    categoryLabel: 'Documentary & Event',
    duration: '03:10',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/n0w-dbrjVk0',
    thumbnailUrl: '/assets/thumbnails/japan-event-trip.jpg',
    description: 'Dokumentasi perjalanan dan promosi acara ke Jepang. Penyusunan sekuens visual dinamis, ritme musik bertempo ceria, dan finishing visual untuk promosi brand.',
    software: ['Adobe Premiere Pro', 'Photoshop'],
    role: 'Video Editor',
    highlight: 'International Travel'
  },
  {
    id: 'proj-rcti',
    title: 'Station ID (SF) & Program Promos',
    client: 'RCTI+',
    category: 'broadcast',
    categoryLabel: 'Broadcast Promotion',
    duration: '01:00',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/vCfmwOIC09A',
    description: 'Materi promosi on-air & off-air (fillers, promo program, TVC) untuk stasiun TV nasional. Pembuatan motion graphics Station ID (SF) dan Commercial Running Text (RTK).',
    software: ['Premiere Pro', 'After Effects', 'Photoshop'],
    role: 'Video Editor & Motion Graphic Designer',
    highlight: 'National Television'
  },
  {
    id: 'proj-noice',
    title: 'Noice Product Feature Project',
    client: 'Mejikuviniu x Noice',
    category: 'audio',
    categories: ['audio', 'motion'],
    categoryLabel: 'Radio & Audio App Feature',
    duration: '00:45',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/9U_fyjgm-Mk',
    description: 'Produksi animasi motion graphic untuk fitur aplikasi radio & podcast Noice. Mengelola seluruh pipeline animasi dari transisi antar-adegan, komposisi motion, hingga delivery broadcast-ready.',
    software: ['Adobe After Effects', 'Illustrator'],
    role: 'Motion Graphic Animator',
    highlight: 'App Feature Showcase'
  },
  {
    id: 'proj-sidomuncul',
    title: 'Sidomuncul Reels Campaign',
    client: 'Sidomuncul',
    category: 'shortform',
    categoryLabel: 'Short-Form (Reels / TikTok)',
    duration: '00:30',
    aspectRatio: '9:16',
    videoUrl: 'https://youtube.com/shorts/RRlB66IoxQk?feature=share',
    description: 'Editing promotional reels berkecepatan tinggi menggunakan CapCut & Premiere untuk distribusi media sosial. Pembuatan supers interaktif, efek visual, dan motion berbasis produk.',
    software: ['CapCut', 'Premiere Pro'],
    role: 'Video Editor & Motion Designer',
    highlight: 'High-Retention Reels'
  },
  {
    id: 'proj-allianz-bitesize-03',
    title: 'Promo Allianz Syariah CI Hasanah Bitesize 03',
    client: 'Allianz Syariah',
    category: 'shortform',
    categories: ['shortform', 'commercial'],
    categoryLabel: 'Short-Form Reels',
    duration: '00:30',
    aspectRatio: '9:16',
    videoUrl: 'https://youtube.com/shorts/SP5oQsby9_g?feature=share',
    description: 'Materi campaign vertikal penutup seri bitesize Allianz Syariah CI Hasanah dengan call-to-action visual tegas, audio mixing jernih, dan pacing retensi tinggi.',
    software: ['Adobe Premiere Pro', 'After Effects', 'CapCut'],
    role: 'Video Editor & Motion Designer',
    highlight: 'Bitesize Campaign 03'
  },
  {
    id: 'proj-allianz-bitesize-02',
    title: 'Promo Allianz Syariah CI Hasanah Bitesize 02',
    client: 'Allianz Syariah',
    category: 'shortform',
    categories: ['shortform', 'commercial'],
    categoryLabel: 'Short-Form Reels',
    duration: '00:30',
    aspectRatio: '9:16',
    videoUrl: 'https://youtube.com/shorts/kJ9EIGhaxIs?feature=share',
    description: 'Sekuel bitesize vertical reels untuk campaign digital Allianz Syariah dengan ritme pemotongan cepat, transisi modern, dan fokus pada keunggulan produk finansial syariah.',
    software: ['Adobe Premiere Pro', 'After Effects', 'CapCut'],
    role: 'Video Editor & Motion Designer',
    highlight: 'Bitesize Campaign 02'
  },
  {
    id: 'proj-allianz-bitesize-01',
    title: 'Promo Allianz Syariah CI Hasanah Bitesize 01',
    client: 'Allianz Syariah',
    category: 'shortform',
    categories: ['shortform', 'commercial'],
    categoryLabel: 'Short-Form Reels',
    duration: '00:30',
    aspectRatio: '9:16',
    videoUrl: 'https://youtube.com/shorts/5j45aeklTio?feature=share',
    description: 'Konten bitesize vertikal promosi program perlindungan Allianz Syariah CI Hasanah dengan animated typography, hook dinamis di 3 detik pertama, dan subtitle interaktif.',
    software: ['Adobe Premiere Pro', 'After Effects', 'CapCut'],
    role: 'Video Editor & Motion Designer',
    highlight: 'Bitesize Campaign 01'
  },
  {
    id: 'proj-magni-baby-tips',
    title: 'Usia Ideal Baby Untuk Difoto',
    client: 'Magni Photo',
    category: 'shortform',
    categories: ['shortform', 'commercial'],
    categoryLabel: 'Social Content & Education',
    duration: '01:00',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/btDDitI4908',
    description: 'Konten edukasi informatif dari Magni Photo seputar momen ideal pemotretan bayi, dikemas dengan grafis penjelasan bersih, subtitle dinamis, dan alur bertutur ringan.',
    software: ['Premiere Pro', 'After Effects', 'CapCut'],
    role: 'Video Editor & Motion Designer',
    highlight: 'Brand Educational Content'
  },
  {
    id: 'proj-magni-wedding-samuel-sarah',
    title: 'Romantic Moments Wedding Day of Samuel & Sarah by Magni Photo',
    client: 'Magni Photo',
    category: 'commercial',
    categories: ['commercial'],
    categoryLabel: 'Wedding Cinematic & Event',
    duration: '03:00',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/V_DQwyje3RM',
    description: 'Dokumentasi sinematik pernikahan romantis Samuel & Sarah. Merangkai momen emosional, resepsi megah, dan kehangatan keluarga dalam balutan audio scoring menyentuh.',
    software: ['Adobe Premiere Pro', 'DaVinci Resolve'],
    role: 'Video Editor',
    highlight: 'Cinematic Wedding Film'
  },
  {
    id: 'proj-magni-louisse-scarlett',
    title: 'Di Balik Layar Sesi Foto Bayi Louisse Scarlett Usia 3 Bulan Oleh Magni Photo',
    client: 'Magni Photo x Louisse Scarlett',
    category: 'commercial',
    categories: ['commercial', 'shortform'],
    categoryLabel: 'Commercial & BTS',
    duration: '01:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/sAPg4s6KPec',
    description: 'Video dokumentasi Behind the Scene (BTS) sesi foto bayi influencer Louisse Scarlett untuk studio Magni Photo dengan gaya editing ceria, hangat, dan natural.',
    software: ['Adobe Premiere Pro', 'Photoshop'],
    role: 'Video Editor',
    highlight: 'Celebrity BTS Showcase'
  },
  {
    id: 'proj-short-whyme',
    title: 'Whyme',
    client: 'Narrative Visual Drama',
    category: 'commercial',
    categories: ['commercial'],
    categoryLabel: 'Short Film / Drama',
    duration: '04:15',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/sVvAdfOGPVU',
    description: 'Karya drama visual "Whyme" yang mengeksplorasi konflik emosional melalui tempo editing reflektif, komposisi warna murung, dan dialog pacing realistis.',
    software: ['Adobe Premiere Pro', 'DaVinci Resolve'],
    role: 'Video Editor',
    highlight: 'Dramatic Narrative'
  },
  {
    id: 'proj-short-twentytwo',
    title: 'Twentytwo',
    client: 'Short Film Project',
    category: 'commercial',
    categories: ['commercial'],
    categoryLabel: 'Cinematic / Short Film',
    duration: '03:45',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/D6p_ntCSePc',
    description: 'Proyek visual sinematik "Twentytwo" dengan penekanan pada estetika emosional, transisi visual puitis, dan atmosfer audio mood yang kuat.',
    software: ['Adobe Premiere Pro', 'After Effects'],
    role: 'Video Editor',
    highlight: 'Cinematic Short Film'
  },
  {
    id: 'proj-doc-racikopi',
    title: 'Racikopi ( Dokumenter )',
    client: 'Documentary Film',
    category: 'commercial',
    categories: ['commercial'],
    categoryLabel: 'Documentary Film',
    duration: '04:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/R1N_l4VZpOE',
    description: 'Dokumenter mendalam tentang seni meracik kopi Indonesia. Mengedepankan atmospheric soundscape, ritme visual organik, dan cinematic color grading.',
    software: ['Premiere Pro', 'Audition', 'DaVinci Resolve'],
    role: 'Video Editor & Colorist',
    highlight: 'Documentary Filmmaking'
  },
  {
    id: 'proj-fiksi-lebih-cerdas',
    title: 'Lebih Cerdas fiksi',
    client: 'Narrative Short Film',
    category: 'commercial',
    categories: ['commercial'],
    categoryLabel: 'Short Film / Narrative',
    duration: '05:00',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/I6zcb4vMaMg',
    description: 'Karya film pendek fiksi "Lebih Cerdas" dengan penceritaan naratif sinematik, penataan pacing dramatik, dan tata suara dialog yang mendalam.',
    software: ['Adobe Premiere Pro', 'DaVinci Resolve'],
    role: 'Video Editor',
    highlight: 'Narrative Storytelling'
  },
  {
    id: 'proj-fantasya',
    title: 'Short Movie "Fantasya"',
    client: 'Independent Short Film',
    category: 'commercial',
    categories: ['commercial', 'audio'],
    categoryLabel: 'Short Movie / Narrative',
    duration: '05:00',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/vpU9j7Tqr3I',
    description: 'Penyusunan narasi sinematik film pendek Fantasya dengan pacing dramatis, multi-track audio synching, serta atmospheric visual tone.',
    software: ['Adobe Premiere Pro', 'DaVinci Resolve'],
    role: 'Video Editor',
    highlight: 'Narrative Storytelling'
  },
  {
    id: 'proj-somethinc-launch-3',
    title: 'Somethinc Product Launch Campaign',
    client: 'Aokay x Somethinc',
    category: 'commercial',
    categories: ['commercial', 'motion'],
    categoryLabel: 'Commercial Campaigns',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/9r1joyppEsQ',
    description: 'Motion graphic dinamis dan visual campaign untuk peluncuran produk Somethinc. Menampilkan kinetic text animation, visual compositing, dan brand identity showcase.',
    software: ['After Effects', 'Photoshop', 'Premiere Pro'],
    role: 'Motion Graphic Designer',
    highlight: 'Product Launch Campaign'
  },
  {
    id: 'proj-allianz',
    title: 'Allianz Syariah CI Hasanah Storytelling',
    client: 'Buka Project x Allianz Syariah',
    category: 'commercial',
    categories: ['commercial', 'audio'],
    categoryLabel: 'Commercial / Brand',
    duration: '02:00',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/ZDnJzST8_-M',
    description: 'Editing dan perakitan rekaman multi-kamera menjadi narasi cerita yang berbobot dan humanis. Manajemen audio sync, flow visual, dan cinematic color grading.',
    software: ['Premiere Pro', 'Color Grading'],
    role: 'Video Editor',
    highlight: 'Corporate Storytelling'
  },
  {
    id: 'proj-sosro',
    title: 'Sosro Bagi-Bagi THR Campaign',
    client: 'Aokay x Sosro',
    category: 'motion',
    categoryLabel: 'Motion Graphics',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/okn26ViUMEc',
    description: 'Pembuatan aset visual grafis dan motion graphics untuk campaign musiman Sosro. Manajemen animasi grafis dan supers placement berstandar siar komersial.',
    software: ['After Effects', 'Illustrator'],
    role: 'Motion Graphic Designer',
    highlight: 'National Campaign'
  },
  {
    id: 'proj-somethinc-launch-2',
    title: 'Somethinc Product Launch Campaign',
    client: 'Aokay x Somethinc',
    category: 'commercial',
    categories: ['commercial', 'motion'],
    categoryLabel: 'Commercial & Motion Graphic',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/sXlq13K0FXM',
    description: 'Produksi konten campaign peluncuran produk dengan integrasi animasi motion graphics, animated supers placement, serta ritme visual dinamis berdaya tarik tinggi.',
    software: ['After Effects', 'Premiere Pro', 'Photoshop'],
    role: 'Video Editor',
    highlight: 'Commercial & Motion'
  },
  {
    id: 'proj-somethinc',
    title: 'Somethinc Product Launch Campaign',
    client: 'Aokay x Somethinc',
    category: 'commercial',
    categoryLabel: 'Commercial / Brand',
    duration: '00:30',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/2BPinzDZcdA',
    description: 'Produksi konten motion graphic dinamis untuk peluncuran produk Somethinc. Menangani desain subtitle placement, animated supers, dan layout visual yang memperkuat daya tarik promosi.',
    software: ['Adobe After Effects', 'Photoshop'],
    role: 'Motion Graphic Designer',
    highlight: 'Product Launch'
  },
{
    id: 'proj-showreel',
    title: 'Auliana Miendy Official Showreel',
    client: 'Broadcast & Multi-Platform Highlights',
    category: 'broadcast',
    categoryLabel: 'Official Showreel',
    duration: '02:00',
    aspectRatio: '16:9',
    videoUrl: 'https://www.youtube.com/watch?v=W6IhOb_9q9w',
    description: 'Kompilasi karya pilihan 8+ tahun pengalaman: promosi on-air TV nasional (RCTI+), commercial TVC, kinetic typography, dan campaign media sosial ternama.',
    software: ['Adobe Premiere Pro', 'After Effects', 'CapCut'],
    role: 'Video Editor & Motion Graphic Designer',
    highlight: 'Official 2026 Showreel'
  },
];

// Framer Motion Animation Variants untuk Staggered Fade-in Portfolio Cards
const portfolioContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const portfolioCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.98
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

// Framer Motion Animation Variants untuk Scroll-triggered Reveals (Experience & Services)
const sectionRevealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const skillGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.05
    }
  }
};

// Komponen Kartu Proyek dengan Efek 3D Tilt Halus berbasis Framer Motion
interface TiltProjectCardProps {
  project: ProjectItem;
  isOwnerAuthenticated: boolean;
  onOpenVideo: (project: ProjectItem) => void;
  onOpenEditModal: (e: React.MouseEvent, project: ProjectItem) => void;
}

function TiltProjectCard({
  project,
  isOwnerAuthenticated,
  onOpenVideo,
  onOpenEditModal
}: TiltProjectCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics yang responsif dan sangat halus saat mouse bergerak maupun kembali flat
  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 22 });

  // Sudut rotasi 3D halus & modern (-5.5 deg sampai +5.5 deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5.5, -5.5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5.5, 5.5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={portfolioCardVariants}
      layout
      style={{ perspective: 1100 }}
      className="h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative bg-white/95 backdrop-blur-xs rounded-2xl border border-[#E2E8F0] overflow-hidden hover:border-amber-400/80 hover:shadow-[0_24px_50px_-12px_rgba(60,19,97,0.18)] transition-shadow duration-500 ease-out flex flex-col justify-between h-full will-change-transform"
      >
        {/* Media Container: Thumbnail Diambil LANGSUNG dari Video Asli */}
        <div
          className="relative aspect-video w-full bg-slate-950 overflow-hidden cursor-pointer"
          onClick={() => onOpenVideo(project)}
        >
          <VideoThumbnailImage
            videoUrl={project.videoUrl}
            thumbnailUrl={project.thumbnailUrl}
            alt={project.title}
          />

          {/* Soft edge gradient: menjaga thumbnail tetap cerah dan jelas, teks tetap terbaca */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25 pointer-events-none transition-opacity duration-300" />

          {/* Subtle glass rim highlight pada hover tanpa membuat thumbnail gelap */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/15 group-hover:ring-amber-300/60 transition-all duration-500 pointer-events-none" />

          {/* Interactive details overlay */}
          <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-5 pointer-events-none">
            {/* Badge Lilac / Amber on Hover dengan frosted glass */}
            <div className="flex items-center justify-start w-full">
              <span className="px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-white border border-white/20 group-hover:bg-amber-300 group-hover:text-slate-950 group-hover:border-amber-400 text-xs font-bold tracking-wide shadow-sm transition-all duration-300">
                {project.categoryLabel}
              </span>
            </div>

            {/* Centered Play Button with smooth zoom & glowing amber on hover without blocking thumbnail */}
            <div className="w-13 h-13 rounded-full bg-black/40 group-hover:bg-amber-400 text-white group-hover:text-slate-950 backdrop-blur-md flex items-center justify-center self-center group-hover:scale-115 transition-all duration-500 ease-out shadow-lg group-hover:shadow-[0_0_24px_rgba(251,191,36,0.6)] border border-white/25 group-hover:border-amber-300">
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            </div>

            <div className="flex items-center justify-between text-xs text-white font-medium">
              <span className="font-semibold text-white drop-shadow-md text-xs">{project.client}</span>
              <span className="bg-black/60 group-hover:bg-black/85 text-amber-300 px-2.5 py-0.5 rounded-md backdrop-blur-xs font-mono text-[11px] font-semibold border border-white/15 group-hover:border-amber-400/50 transition-all">
                {project.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Card Information */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#4A2E80] uppercase tracking-wider block mb-1">
              {project.role}
            </span>
            <h3 className="text-base font-bold text-[#3C1361] group-hover:text-[#4A2E80] transition-colors leading-snug">
              {project.title}
            </h3>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
            <span className="truncate max-w-[140px]">{project.software.join(' · ')}</span>
            <div className="flex items-center gap-2">
              {isOwnerAuthenticated && (
                <button
                  onClick={(e) => onOpenEditModal(e, project)}
                  className="p-1.5 rounded-lg bg-[#E8D8F4] text-[#3C1361] hover:bg-[#C8ACD6] transition-colors"
                  title="Ganti URL Video (Mode Pemilik Aktif)"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => onOpenVideo(project)}
                className="text-[#3C1361] hover:text-amber-600 font-bold hover:underline cursor-pointer shrink-0 transition-colors"
              >
                Putar Video &rarr;
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  // Persistensi projects ke localStorage dengan auto-merge proyek baru
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('auliana_portfolio_projects_v12');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const parsedIds = new Set(parsed.map((p: ProjectItem) => p.id));
          const missing = initialProjects.filter(p => !parsedIds.has(p.id));
          return [...missing, ...parsed];
        }
      }
    } catch {
      // ignore
    }
    return initialProjects;
  });

  const showreelProject = projects.find(p => p.id === 'proj-showreel') || projects[0];
  const [activeFilter, setActiveFilter] = useState<'all' | 'broadcast' | 'commercial' | 'shortform' | 'motion' | 'audio'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<ProjectItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Status Autentikasi Pemilik (Hanya Auliana yang dapat membuka mode edit)
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('auliana_owner_session') === 'true';
    } catch {
      return false;
    }
  });
  const [ownerPinModalOpen, setOwnerPinModalOpen] = useState(false);
  const [ownerPinInput, setOwnerPinInput] = useState('');
  const [ownerPinError, setOwnerPinError] = useState('');
  
  // Modal Edit Video URL (Hanya dapat diakses jika isOwnerAuthenticated === true)
  const [editModalProject, setEditModalProject] = useState<ProjectItem | null>(null);
  const [newVideoUrlInput, setNewVideoUrlInput] = useState('');
  
  // Form State
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Social Media & Reels Campaign',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Modal Export Kode HTML Tunggal
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [htmlCode, setHtmlCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Ambil kode HTML dari file standalone
  useEffect(() => {
    fetch('/portfolio-single-file.html')
      .then(res => res.text())
      .then(text => setHtmlCode(text))
      .catch(() => {
        setHtmlCode('<!-- File standalone HTML dapat diunduh langsung melalui tombol Download di bawah -->');
      });
  }, []);

  // Filter proyek berdasarkan Tab Kategori DAN Kata Kunci Search (Judul, Klien, Software Stack)
  const filteredProjects = projects.filter(p => {
    // 1. Kategori
    const matchesCategory = activeFilter === 'all'
      || p.category === activeFilter
      || (p.categories && p.categories.includes(activeFilter));

    if (!matchesCategory) return false;

    // 2. Query Pencarian (Judul, Nama Klien, Software Stack, Role, Highlight)
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();
    const titleMatch = p.title.toLowerCase().includes(query);
    const clientMatch = p.client.toLowerCase().includes(query);
    const softwareMatch = p.software.some(s => s.toLowerCase().includes(query));
    const roleMatch = p.role.toLowerCase().includes(query);
    const highlightMatch = p.highlight ? p.highlight.toLowerCase().includes(query) : false;

    return titleMatch || clientMatch || softwareMatch || roleMatch || highlightMatch;
  });

  // Handler edit video URL (Dilindungi - Hanya Pemilik)
  const handleOpenEditModal = (e: React.MouseEvent, project: ProjectItem) => {
    e.stopPropagation();
    if (!isOwnerAuthenticated) {
      setOwnerPinModalOpen(true);
      return;
    }
    setEditModalProject(project);
    setNewVideoUrlInput(project.videoUrl);
  };

  const handleSaveVideoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwnerAuthenticated) {
      alert('Akses ditolak. Silakan login sebagai pemilik terlebih dahulu.');
      return;
    }
    if (!editModalProject || !newVideoUrlInput.trim()) return;

    const updated = projects.map(p =>
      p.id === editModalProject.id ? { ...p, videoUrl: newVideoUrlInput.trim() } : p
    );
    setProjects(updated);
    try {
      localStorage.setItem('auliana_portfolio_projects_v12', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setEditModalProject(null);
  };

  // Handler Login & Logout Mode Pemilik
  const handleOwnerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const pin = ownerPinInput.trim();
    // PIN default: 2026 atau auliana
    if (pin === '2026' || pin.toLowerCase() === 'auliana') {
      setIsOwnerAuthenticated(true);
      try {
        localStorage.setItem('auliana_owner_session', 'true');
      } catch {
        // ignore
      }
      setOwnerPinModalOpen(false);
      setOwnerPinInput('');
      setOwnerPinError('');
    } else {
      setOwnerPinError('PIN tidak tepat. Gunakan PIN pemilik (Default: 2026).');
    }
  };

  const handleOwnerLogout = () => {
    setIsOwnerAuthenticated(false);
    try {
      localStorage.removeItem('auliana_owner_session');
    } catch {
      // ignore
    }
  };

  const handleResetToDefaultProjects = () => {
    if (window.confirm('Kembalikan semua URL video portofolio ke pengaturan awal?')) {
      try {
        localStorage.removeItem('auliana_portfolio_projects_v12');
        localStorage.removeItem('auliana_portfolio_projects_v11');
      } catch {
        // ignore
      }
      setProjects(initialProjects);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
        setCodeModalOpen(false);
        setEditModalProject(null);
        setOwnerPinModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
      setFormState({
        name: '',
        email: '',
        projectType: 'Social Media & Reels Campaign',
        message: ''
      });
      setTimeout(() => setFormSubmitted(false), 7000);
    }, 1200);
  };

  const copyHtmlCode = () => {
    if (!htmlCode) return;
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadHtmlFile = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-auliana-miendy.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Convert embed URL
  const getEmbedUrl = (url: string) => {
    const id = getYouTubeId(url);
    if (id) {
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2D3748] font-sans selection:bg-[#E8D8F4] selection:text-[#3C1361]">
      
      {/* Top Bar Mode Pemilik (Hanya tampil bila Auliana sedang login sebagai pemilik) */}
      {isOwnerAuthenticated && (
        <aside aria-label="Mode Pemilik" className="bg-[#3C1361] text-white py-2 px-4 text-xs sticky top-0 z-50 border-b border-[#C8ACD6]/30 shadow-md">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold text-[#E8D8F4]">Mode Pemilik (Auliana Miendy) Aktif:</span>
              <span className="text-white/85 text-[11px] hidden sm:inline">
                Ikon pensil pengeditan URL video kini aktif pada setiap kartu portofolio.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleResetToDefaultProjects}
                className="text-[11px] text-[#E8D8F4] hover:text-white underline cursor-pointer"
              >
                Reset ke Default
              </button>
              <button
                onClick={handleOwnerLogout}
                className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Kunci / Keluar</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Top Banner: Single File HTML Quick Action & CV Download */}
      <div className="bg-[#1E1235] text-white py-2 px-4 text-xs font-medium text-center flex flex-wrap items-center justify-center gap-3 border-b border-purple-900/40">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>Official Portfolio of <strong>Auliana Miendy</strong> · Video Editor &amp; Motion Graphic Designer</span>
        </span>
        <div className="flex items-center gap-2">
          <a
            href="/assets/aistudio/Auliana_Miendy_CV_Final_e84e794f.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 hover:bg-amber-300 px-2.5 py-0.5 rounded text-[11px] font-bold transition-colors shadow-xs"
          >
            <Download className="w-3 h-3 text-slate-950" />
            <span>Download CV (PDF)</span>
          </a>
          <button
            onClick={() => setCodeModalOpen(true)}
            className="bg-white/10 text-slate-200 hover:bg-white/20 px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer"
          >
            Salin Kode 1 File HTML
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. HEADER / NAVBAR (Top Bar Contract: 3 Zones)            */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] transition-colors">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Wordmark */}
          <a href="#home" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#3C1361] flex items-center justify-center text-amber-300 font-extrabold text-base transition-colors duration-200 shadow-sm border border-[#52257d]">
              AM
            </div>
            <div className="whitespace-nowrap">
              <span className="text-lg font-bold text-[#3C1361] tracking-tight block leading-tight">
                Auliana Miendy
              </span>
              <span className="text-xs text-[#64748B] font-medium block">
                Video Editor &amp; Motion Graphic Designer
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#2D3748]">
            <a href="#home" className="hover:text-[#4A2E80] transition-colors whitespace-nowrap">Home</a>
            <a href="#work" className="hover:text-[#4A2E80] transition-colors whitespace-nowrap">Portfolio</a>
            <a href="#experience" className="hover:text-[#4A2E80] transition-colors whitespace-nowrap">Experience</a>
            <a href="#services" className="hover:text-[#4A2E80] transition-colors whitespace-nowrap">Core Skills</a>
            <a href="#contact" className="hover:text-[#4A2E80] transition-colors whitespace-nowrap">Contact</a>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/assets/aistudio/Auliana_Miendy_CV_Final_e84e794f.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume CV</span>
            </a>
            <a
              href="#contact"
              className="px-5 py-2 text-xs font-semibold tracking-wide text-white bg-[#4A2E80] rounded-xl hover:bg-[#3C1361] transition-all duration-200 shadow-sm hover:shadow active:scale-95 whitespace-nowrap"
            >
              Let's Collaborate
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2D3748] hover:text-[#4A2E80] rounded-lg border border-[#E2E8F0]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#E2E8F0] bg-white px-6 py-4 space-y-3">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#2D3748] hover:text-[#4A2E80]"
            >
              Home
            </a>
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#2D3748] hover:text-[#4A2E80]"
            >
              Portfolio &amp; Projects
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#2D3748] hover:text-[#4A2E80]"
            >
              Work Experience (RCTI+, Matrix TV)
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#2D3748] hover:text-[#4A2E80]"
            >
              Core Skills &amp; Software
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#2D3748] hover:text-[#4A2E80]"
            >
              Contact
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="/assets/aistudio/Auliana_Miendy_CV_Final_e84e794f.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center py-2 text-xs font-semibold text-[#4A2E80] bg-[#E8D8F4] rounded-lg"
              >
                Unduh PDF CV Lengkap
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCodeModalOpen(true);
                }}
                className="text-center py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
              >
                Salin Kode 1 File HTML
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ======================================================== */}
      {/* 2. HERO SECTION                                          */}
      {/* ======================================================== */}
      <section id="home" className="relative pt-10 pb-16 md:pt-16 md:pb-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Kolom Kiri: Teks & Headline */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Minimalist Live Status with subtle warm yellow pulse */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-medium shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                </span>
                <span>Available for Freelance &amp; Projects</span>
                <span className="text-slate-600">·</span>
                <span className="text-amber-300 font-medium">Jakarta, ID</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E1235] tracking-tight leading-[1.12]">
                Crafting Visual Stories That{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#3C1361]">Engage &amp; Convert</span>
                  <span className="absolute bottom-1.5 left-0 w-full h-3 bg-amber-300/40 -z-0 rounded-sm"></span>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#2D3748]/85 leading-relaxed max-w-xl">
                Creative Video Editor &amp; Motion Graphic Designer yang berpengalaman menghasilkan materi promosi berkualitas siaran untuk stasiun televisi nasional (<strong>RCTI+, Matrix TV</strong>) dan campaign komersial brand (<strong>Sosro, Somethinc, Sidomuncul, Noice, Allianz</strong>).
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href="#work"
                  className="px-7 py-3.5 text-sm font-bold text-white bg-[#3C1361] hover:bg-[#2A0845] rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 active:scale-95"
                >
                  <span>Lihat Proyek Pilihan</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </a>

                <button
                  onClick={() => setActiveVideo(showreelProject)}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 rounded-xl transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-sm active:scale-95"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                    <Play className="w-2.5 h-2.5 ml-0.5 fill-current" />
                  </div>
                  <span>Putar Showreel Resmi</span>
                </button>
              </div>

              {/* Quick Trust Badges with refined yellow dot accents */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                  Video Editor &amp; Motion Graphic Designer
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                  National TV Broadcast Standard
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                  D4 Televisi &amp; Film (ISBI Bandung)
                </span>
              </div>
            </div>

            {/* Kolom Kanan: Showreel Card dengan Thumbnail ASLI dari YouTube Video */}
            <div className="lg:col-span-5">
              <div className="relative bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-amber-300/60">
                <div
                  className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 group cursor-pointer"
                  onClick={() => setActiveVideo(showreelProject)}
                >
                  {/* Thumbnail Asli dari Video YouTube Showreel */}
                  <VideoThumbnailImage
                    videoUrl={showreelProject.videoUrl}
                    alt="Auliana Miendy Official Showreel Video Frame"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-black/15 to-black/30 flex flex-col justify-between p-5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-amber-400 text-slate-950 text-[10px] font-bold tracking-wider uppercase shadow-xs">
                        Official Showreel
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/40 text-amber-300 text-[11px] font-mono font-medium">
                        02:00
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-amber-300 transition-all duration-300">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                      <div className="text-white">
                        <p className="text-sm font-bold leading-tight">Putar Showreel 2026</p>
                        <p className="text-xs text-slate-200">Broadcast Promo &amp; Digital Motion Highlights</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-amber-500" />
                    <span>youtu.be/W6IhOb_9q9w</span>
                  </span>
                  <button
                    onClick={() => setActiveVideo(showreelProject)}
                    className="text-[#3C1361] hover:text-amber-600 font-bold hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Tonton Video &rarr;
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. PORTFOLIO / SHOWREEL GALLERY (Thumbnails from Video)  */}
      {/* ======================================================== */}
      <section id="work" className="py-20 bg-white/60 backdrop-blur-xs border-y border-[#E2E8F0]/80">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="flex flex-col gap-6 mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200/60 text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Featured Creative Works</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#3C1361] tracking-tight">
                  Portofolio &amp; Pengalaman Proyek
                </h2>
                <p className="text-sm text-[#64748B] mt-2 max-w-xl">
                  Eksplorasi ragam karya komersial brand ternama, materi promosi siaran televisi nasional, dan konten video performa tinggi dengan storytelling visual yang kuat dan memikat audiens.
                </p>
              </div>

              {/* Total counter badge */}
              <div className="hidden md:flex items-center gap-2 self-end text-xs font-semibold text-[#64748B]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{filteredProjects.length} dari {projects.length} Proyek Ditampilkan</span>
              </div>
            </div>

            {/* Filter Tabs & Search Bar Container */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-2.5 bg-[#FAFAFA] rounded-2xl border border-[#E2E8F0]">
              {/* Filter Tab Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3.5 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    activeFilter === 'all'
                      ? 'bg-white text-[#3C1361] shadow-sm font-bold'
                      : 'text-[#64748B] hover:text-[#3C1361]'
                  }`}
                >
                  All ({projects.length})
                </button>
                <button
                  onClick={() => setActiveFilter('broadcast')}
                  className={`px-3.5 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    activeFilter === 'broadcast'
                      ? 'bg-white text-[#3C1361] shadow-sm font-bold'
                      : 'text-[#64748B] hover:text-[#3C1361]'
                  }`}
                >
                  Broadcast (RCTI+)
                </button>
                <button
                  onClick={() => setActiveFilter('commercial')}
                  className={`px-3.5 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    activeFilter === 'commercial'
                      ? 'bg-white text-[#3C1361] shadow-sm font-bold'
                      : 'text-[#64748B] hover:text-[#3C1361]'
                  }`}
                >
                  Commercial Campaigns
                </button>
                <button
                  onClick={() => setActiveFilter('shortform')}
                  className={`px-3.5 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    activeFilter === 'shortform'
                      ? 'bg-white text-[#3C1361] shadow-sm font-bold'
                      : 'text-[#64748B] hover:text-[#3C1361]'
                  }`}
                >
                  Short-Form Reels
                </button>
                <button
                  onClick={() => setActiveFilter('motion')}
                  className={`px-3.5 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    activeFilter === 'motion'
                      ? 'bg-white text-[#3C1361] shadow-sm font-bold'
                      : 'text-[#64748B] hover:text-[#3C1361]'
                  }`}
                >
                  Motion Graphics
                </button>
                <button
                  onClick={() => setActiveFilter('audio')}
                  className={`px-3.5 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    activeFilter === 'audio'
                      ? 'bg-white text-[#3C1361] shadow-sm font-bold'
                      : 'text-[#64748B] hover:text-[#3C1361]'
                  }`}
                >
                  Radio &amp; Audio Sync
                </button>
              </div>

              {/* Interactive Search Bar (Judul, Klien, Software Stack) */}
              <div className="relative flex-1 lg:max-w-xs xl:max-w-sm">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari judul, klien, software (After Effects)..."
                  className="w-full pl-9.5 pr-8 py-2 text-xs bg-white rounded-xl border border-[#E2E8F0] focus:border-[#4A2E80] focus:ring-2 focus:ring-[#E8D8F4] outline-none text-[#2D3748] placeholder:text-[#94A3B8] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#94A3B8] hover:text-[#3C1361] rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Hapus pencarian"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Keyword Suggestions & Active Search Indicator */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#64748B] px-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-medium text-[#94A3B8]">Pencarian populer:</span>
                {['After Effects', 'Premiere Pro', 'RCTI+', 'Somethinc', 'DaVinci Resolve', 'CapCut'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(searchQuery.toLowerCase() === tag.toLowerCase() ? '' : tag)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                      searchQuery.toLowerCase() === tag.toLowerCase()
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                        : 'bg-white border border-[#E2E8F0] hover:border-[#4A2E80] hover:text-[#3C1361]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {searchQuery && (
                <div className="flex items-center gap-2">
                  <span className="text-[#3C1361] font-semibold">
                    Hasil untuk "{searchQuery}": {filteredProjects.length} proyek
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-amber-600 hover:text-amber-700 underline font-bold cursor-pointer"
                  >
                    Reset Pencarian
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Empty State jika hasil pencarian tidak ditemukan */}
          {filteredProjects.length === 0 ? (
            <div className="py-16 text-center bg-white/80 backdrop-blur-xs rounded-2xl border border-dashed border-[#CBD5E1] p-8 max-w-lg mx-auto my-8">
              <div className="w-14 h-14 rounded-full bg-[#E8D8F4]/70 text-[#3C1361] flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#3C1361] mb-1">
                Tidak ada proyek yang sesuai
              </h3>
              <p className="text-xs text-[#64748B] mb-5 leading-relaxed">
                Tidak ditemukan hasil untuk "{searchQuery}" pada filter {activeFilter === 'all' ? 'semua kategori' : activeFilter}. Coba kata kunci software, nama brand lain, atau reset filter.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#3C1361] hover:bg-[#4A2E80] rounded-xl transition-all shadow-sm cursor-pointer active:scale-95"
              >
                Reset Semua Filter &amp; Pencarian
              </button>
            </div>
          ) : (
            <motion.div
              key={`${activeFilter}-${searchQuery}`}
              variants={portfolioContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <TiltProjectCard
                  key={project.id}
                  project={project}
                  isOwnerAuthenticated={isOwnerAuthenticated}
                  onOpenVideo={setActiveVideo}
                  onOpenEditModal={handleOpenEditModal}
                />
              ))}
            </motion.div>
          )}

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. WORK EXPERIENCE TIMELINE (Dari CV Asli)                */}
      {/* ======================================================== */}
      <section id="experience" className="py-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={sectionRevealVariants}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-bold text-[#4A2E80] uppercase tracking-widest block mb-2">
              Career Trajectory
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#3C1361] tracking-tight">
              Work Experience &amp; Roles
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              Rekam jejak profesional dari stasiun televisi nasional hingga agensi fotografi &amp; digital media.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainerVariants}
              className="space-y-6"
            >
              {/* Experience 1: RCTI+ */}
              <motion.div
                variants={staggerItemVariants}
                className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#C8ACD6] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/70 text-[11px] font-bold mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      August 2019 – Present (Current)
                    </div>
                    <h3 className="text-xl font-bold text-[#3C1361]">Video Editor &amp; Motion Graphic Designer</h3>
                    <p className="text-sm font-semibold text-[#4A2E80]">RCTI+</p>
                  </div>
                  <span className="text-xs text-[#64748B] bg-slate-100 px-3 py-1 rounded-lg self-start sm:self-center font-medium">
                    Jakarta, Indonesia
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-[#2D3748]/85 leading-relaxed mt-4">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                    <span>Mengedit konten video promosi untuk platform digital termasuk <strong>Instagram, TikTok, YouTube, Facebook, dan X (Twitter)</strong> yang dioptimalkan sesuai audiens dan format masing-masing platform.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                    <span>Memproduksi materi promosi on-air dan off-air siaran nasional, meliputi filler, promo program acara, dan konten komersial.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                    <span>Membuat motion graphics untuk <strong>Station ID (SF), Commercial Running Text (RTK), dan TV Commercials (TVC)</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                    <span>Menyesuaikan format video, tempo, dan visual untuk memaksimalkan retensi serta audience engagement.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                    <span>Berkolaborasi dengan tim kreatif dan tim produksi dalam mengelola beberapa proyek secara simultan di lingkungan produksi media yang serba cepat.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Experience 2: Matrix TV */}
              <motion.div
                variants={staggerItemVariants}
                className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#C8ACD6] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#FAFAFA] text-[#64748B] text-[11px] font-bold mb-1.5 border border-[#E2E8F0]">
                      <Tv className="w-3 h-3 text-[#64748B]" />
                      March 2018 – August 2019
                    </div>
                    <h3 className="text-xl font-bold text-[#3C1361]">Video Editor &amp; Motion Graphic Designer</h3>
                    <p className="text-sm font-semibold text-[#4A2E80]">Matrix TV</p>
                  </div>
                  <span className="text-xs text-[#64748B] bg-slate-100 px-3 py-1 rounded-lg self-start sm:self-center font-medium">
                    Jakarta, Indonesia
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-[#2D3748]/85 leading-relaxed mt-4">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                    <span>Mengedit konten program hiburan <em>'Dingdangdut'</em> dengan alur visual yang menarik dan tempo dinamis.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                    <span>Menangani produksi video editing end-to-end dan motion graphics untuk segmen <strong>Matrix Home Shopping</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                    <span>Membuat konten broadcast yang fokus pada presentasi produk dan keterlibatan penonton, serta memastikan seluruh materi promosi memenuhi standar siaran.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Experience 3: Magni Photography */}
              <motion.div
                variants={staggerItemVariants}
                className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#C8ACD6] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#FAFAFA] text-[#64748B] text-[11px] font-bold mb-1.5 border border-[#E2E8F0]">
                      September 2017 – February 2018
                    </div>
                    <h3 className="text-xl font-bold text-[#3C1361]">Videografer &amp; Creative Designer</h3>
                    <p className="text-sm font-semibold text-[#4A2E80]">Magni Photography</p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-[#2D3748]/85 leading-relaxed mt-4">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                    <span>Merekam footage Behind-The-Scenes (BTS) saat sesi pemotretan dengan pendekatan visual storytelling.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                    <span>Mengedit konten YouTube untuk sesi foto family, newborn, maternity, dan anak-anak.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                    <span>Merancang album foto dan aset promosi digital di Instagram, Facebook, dan YouTube.</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Subsection: PENGALAMAN FREELANCE & PROYEK (Dari CV Halaman 2) */}
            <div className="pt-10 border-t border-[#E2E8F0]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={sectionRevealVariants}
                className="text-center max-w-xl mx-auto mb-8"
              >
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
                  Brand Campaigns &amp; Collaborations
                </span>
                <h3 className="text-2xl font-extrabold text-[#3C1361]">
                  Pengalaman Freelance &amp; Proyek
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Kompilasi proyek kreatif independen untuk brand nasional, agensi terkemuka, dan peluncuran produk digital.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {/* 1. Noice Product Feature Project */}
                <motion.div
                  variants={staggerItemVariants}
                  className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#C8ACD6] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8D8F4] text-[#3C1361] text-[11px] font-bold">
                      Motion Graphic Animator
                    </span>
                    <span className="text-[11px] font-semibold text-[#64748B]">Klien: Mejikuviniu x Noice</span>
                  </div>
                  <h4 className="text-base font-bold text-[#3C1361] mb-2">Noice Product Feature Project</h4>
                  <ul className="space-y-1.5 text-xs text-[#2D3748]/85 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                      <span>Membuat animasi motion graphic untuk konten promosi fitur produk.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                      <span>Mengerjakan proses animasi dari awal hingga akhir, mulai dari perpindahan scene, motion composition, hingga hasil akhir yang siap tayang.</span>
                    </li>
                  </ul>
                </motion.div>

                {/* 2. Sosro bagi-bagi THR Campaign */}
                <motion.div
                  variants={staggerItemVariants}
                  className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#C8ACD6] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8D8F4] text-[#3C1361] text-[11px] font-bold">
                      Motion Graphic Designer
                    </span>
                    <span className="text-[11px] font-semibold text-[#64748B]">Klien: Aokay x Sosro</span>
                  </div>
                  <h4 className="text-base font-bold text-[#3C1361] mb-2">Sosro bagi-bagi THR Campaign</h4>
                  <ul className="space-y-1.5 text-xs text-[#2D3748]/85 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                      <span>Membuat motion graphic dan graphic visual asset untuk materi campaign promosi.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                      <span>Mengelola animasi grafis dan penempatan suppers untuk konten siap tayang.</span>
                    </li>
                  </ul>
                </motion.div>

                {/* 3. Somethinc Product Launch Campaign */}
                <motion.div
                  variants={staggerItemVariants}
                  className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#C8ACD6] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8D8F4] text-[#3C1361] text-[11px] font-bold">
                      Motion Graphic Designer
                    </span>
                    <span className="text-[11px] font-semibold text-[#64748B]">Klien: Aokay x Somethinc</span>
                  </div>
                  <h4 className="text-base font-bold text-[#3C1361] mb-2">Somethinc Product Launch Campaign</h4>
                  <ul className="space-y-1.5 text-xs text-[#2D3748]/85 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                      <span>Membuat motion graphic content untuk campaign peluncuran produk dengan visual yang kuat.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                      <span>Membuat penempatan subtitle, animasi suppers, dan tampilan visual untuk memperkuat daya tarik promosi.</span>
                    </li>
                  </ul>
                </motion.div>

                {/* 4. Sidomuncul Reels Campaign */}
                <motion.div
                  variants={staggerItemVariants}
                  className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#C8ACD6] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8D8F4] text-[#3C1361] text-[11px] font-bold">
                      Video Editor &amp; Motion Graphic Designer
                    </span>
                    <span className="text-[11px] font-semibold text-[#64748B]">Klien: Sidomuncul</span>
                  </div>
                  <h4 className="text-base font-bold text-[#3C1361] mb-2">Sidomuncul Reels Campaign</h4>
                  <ul className="space-y-1.5 text-xs text-[#2D3748]/85 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                      <span>Mengedit Short-Form video promosi menggunakan CapCut untuk distribusi digital dan media sosial.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                      <span>Membuat suppers, visual effect, subtitle, dan motion graphics berbasis produk untuk meningkatkan engagement audiens.</span>
                    </li>
                  </ul>
                </motion.div>

                {/* 5. Japan Event Trip Project */}
                <motion.div
                  variants={staggerItemVariants}
                  className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#C8ACD6] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8D8F4] text-[#3C1361] text-[11px] font-bold">
                      Video Editor
                    </span>
                    <span className="text-[11px] font-semibold text-[#64748B]">Klien: Jalankan Media x Jafra</span>
                  </div>
                  <h4 className="text-base font-bold text-[#3C1361] mb-2">Japan Event Trip Project</h4>
                  <ul className="space-y-1.5 text-xs text-[#2D3748]/85 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                      <span>Mengedit dan menyusun video menjadi konten cerita yang menarik untuk promosi acara.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                      <span>Mengatur urutan video, alur, dan tampilan akhir untuk keperluan promosi acara.</span>
                    </li>
                  </ul>
                </motion.div>

                {/* 6. Allianz Syariah CI Hasanah */}
                <motion.div
                  variants={staggerItemVariants}
                  className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#C8ACD6] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8D8F4] text-[#3C1361] text-[11px] font-bold">
                      Video Editor
                    </span>
                    <span className="text-[11px] font-semibold text-[#64748B]">Klien: Buka Project x Allianz Syariah</span>
                  </div>
                  <h4 className="text-base font-bold text-[#3C1361] mb-2">Allianz Syariah CI Hasanah</h4>
                  <ul className="space-y-1.5 text-xs text-[#2D3748]/85 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                      <span>Mengedit dan menyusun video menjadi konten cerita yang menarik dan profesional.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                      <span>Mengatur urutan video multi-camera, alur, dan pewarnaan (color grading).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A2E80] mt-1.5 shrink-0"></span>
                      <span>Membuat penempatan subtitle dan animasi teks untuk memperkuat visual.</span>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. CORE SKILLS & SOFTWARE (Dari CV Asli)                  */}
      {/* ======================================================== */}
      <section id="services" className="py-20 bg-white/60 backdrop-blur-xs border-y border-[#E2E8F0]/80">
        <div className="max-w-6xl mx-auto px-6">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={sectionRevealVariants}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-bold text-[#4A2E80] uppercase tracking-widest block mb-2">
              Capabilities from CV
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#3C1361] tracking-tight">
              Core Skills &amp; Software Stack
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              Kombinasi keahlian teknis editing, animasi grafis siaran, optimasi konten digital, dan manajemen multi-proyek.
            </p>
          </motion.div>

          {/* 12 Core Skills Grid dari CV */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={skillGridVariants}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16"
          >
            {[
              { name: 'Video Editing', icon: Film, desc: 'Pacing, narrative arc, cutting precision' },
              { name: 'Motion Graphics & Animation', icon: Sparkles, desc: 'Station ID, TVC, kinetic titles' },
              { name: 'Visual Storytelling', icon: Play, desc: 'Emotion, engagement, narrative flow' },
              { name: 'Color Grading', icon: Palette, desc: 'Primary & secondary grading, look consistency' },
              { name: 'Audio Sync & SFX Editing', icon: Volume2, desc: 'Sound design, SFX, audio level' },
              { name: 'Graphic Design', icon: Code, desc: 'Brand assets, visual layouts, posters' },
              { name: 'Social Media Content Editing', icon: Smartphone, desc: 'Reels, TikTok, Shorts, viral hooks' },
              { name: 'Broadcast Promotion', icon: Tv, desc: 'On-Air & Off-Air TV promos & fillers' },
              { name: 'Photography & Videography', icon: FolderCheck, desc: 'Shooting, BTS, visual coverage' },
              { name: 'Creative Campaign Production', icon: Briefcase, desc: 'End-to-end promotional production' },
              { name: 'Content Optimization', icon: CheckCircle2, desc: 'Platform retention & format tuning' },
              { name: 'Multi-Project Management', icon: Sliders, desc: 'Deadline driven, fast-paced media' },
            ].map((skill, idx) => {
              const IconComp = skill.icon;
              return (
                <motion.div
                  key={idx}
                  variants={staggerItemVariants}
                  className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#C8ACD6] transition-all duration-200 group hover:-translate-y-0.5 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E8D8F4] text-[#4A2E80] flex items-center justify-center mb-3 group-hover:bg-[#4A2E80] group-hover:text-white transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#3C1361] leading-snug">{skill.name}</h4>
                  <p className="text-[11px] text-[#64748B] mt-1">{skill.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Software Section Sesuai CV */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionRevealVariants}
            className="bg-[#3C1361] p-8 md:p-10 rounded-3xl border border-[#52257d] shadow-md text-center"
          >
            <h3 className="text-base font-bold text-white mb-6 text-center uppercase tracking-wider text-xs">
              Software Stack dari CV
            </h3>
            <motion.div
              variants={staggerContainerVariants}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {[
                { name: 'CapCut', color: '#00F2FE', tag: 'Fast-Paced Social Reels & TikTok' },
                { name: 'Adobe Premiere Pro', color: '#9999FF', tag: 'Primary NLE Timeline' },
                { name: 'Adobe After Effects', color: '#C8ACD6', tag: 'Motion Graphics & Compositing' },
                { name: 'Adobe Photoshop', color: '#31A8FF', tag: 'Visual Assets & Thumbnails' },
                { name: 'Adobe Illustrator', color: '#FF9A00', tag: 'Vector Assets & Brand Graphics' },
              ].map((sw, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerItemVariants}
                  className="flex flex-col items-center justify-center text-center px-6 py-4 rounded-2xl bg-[#4A2E80] border border-[#5F3B9E] hover:border-[#C8ACD6] hover:bg-[#543091] transition-all duration-200 shadow-sm min-w-[210px]"
                >
                  <div className="flex items-center gap-2 mb-1 justify-center">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: sw.color }}></span>
                    <span className="text-xs font-bold text-white">{sw.name}</span>
                  </div>
                  <span className="text-[11px] text-[#E8D8F4] font-normal leading-tight">{sw.tag}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. EDUCATION & CREDENTIALS                               */}
      {/* ======================================================== */}
      <section className="py-16 bg-white/40 backdrop-blur-xs border-b border-[#E2E8F0]/80">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#4A2E80] uppercase tracking-widest block mb-1">
              Academic Foundation
            </span>
            <h3 className="text-2xl font-bold text-[#3C1361]">Education</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#E8D8F4] text-[#4A2E80] flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#4A2E80] block mb-0.5">Applied Bachelor's Degree (D4)</span>
                <h4 className="text-base font-bold text-[#3C1361]">Institut Seni Budaya Indonesia (ISBI), Bandung</h4>
                <p className="text-xs text-[#2D3748]/80 mt-1 font-semibold">Sarjana Terapan (D4) — Televisi &amp; Film</p>
                <p className="text-[11px] text-[#64748B] mt-2">Pendidikan formal mendalam dalam teori sinematografi, dramaturgi visual, manajemen produksi siaran televisi, dan penyuntingan gambar bergerak.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#E8D8F4] text-[#4A2E80] flex items-center justify-center shrink-0">
                <Tv className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#4A2E80] block mb-0.5">Vocational High School</span>
                <h4 className="text-base font-bold text-[#3C1361]">SMK Negeri 1 Sukabumi</h4>
                <p className="text-xs text-[#2D3748]/80 mt-1 font-semibold">Teknik Produksi dan Penyiaran Program Pertelevisian (TP4)</p>
                <p className="text-[11px] text-[#64748B] mt-2">Dasar-dasar teknik penyiaran televisi, operasional kamera broadcast, studio lighting, dan perakitan master siaran.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. CLIENT BRANDS & COLLABORATIONS                        */}
      {/* ======================================================== */}
      <section className="py-10 bg-[#24133A] border-y border-[#3A1F5E]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-amber-400 uppercase tracking-widest mb-5">
            Dipercaya oleh Stasiun TV, Agensi, &amp; Brand Terkemuka
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 md:gap-x-9 gap-y-2.5 text-sm sm:text-base font-extrabold text-white tracking-wider">
            <span className="hover:text-amber-300 transition-colors">RCTI+</span>
            <span className="text-amber-400/70 select-none">·</span>
            <span className="hover:text-amber-300 transition-colors">MATRIX TV</span>
            <span className="text-amber-400/70 select-none">·</span>
            <span className="hover:text-amber-300 transition-colors">SOSRO</span>
            <span className="text-amber-400/70 select-none">·</span>
            <span className="hover:text-amber-300 transition-colors">SOMETHINC</span>
            <span className="text-amber-400/70 select-none">·</span>
            <span className="hover:text-amber-300 transition-colors">SIDOMUNCUL</span>
            <span className="text-amber-400/70 select-none">·</span>
            <span className="hover:text-amber-300 transition-colors">NOICE</span>
            <span className="text-amber-400/70 select-none">·</span>
            <span className="hover:text-amber-300 transition-colors">ALLIANZ SYARIAH</span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. CONTACT & SOCIALS                                     */}
      {/* ======================================================== */}
      <section id="contact" className="py-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Info Kontak Asli dari CV */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-[#4A2E80] uppercase tracking-widest block">
                Get in Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#3C1361] tracking-tight">
                Mari Diskusikan Proyek Video Anda
              </h2>
              <p className="text-sm text-[#2D3748]/85 leading-relaxed">
                Terbuka untuk freelance projects, remote work, serta kolaborasi produksi broadcast maupun campaign digital skala nasional dan internasional.
              </p>

              {/* Data Kontak Asli dari CV */}
              <div className="space-y-4 pt-2">
                
                <a
                  href="mailto:aulianamiendy.work@gmail.com"
                  className="flex items-center gap-3 text-sm text-[#2D3748] hover:text-[#4A2E80] transition-colors group p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#E2E8F0]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E8D8F4] text-[#4A2E80] flex items-center justify-center group-hover:bg-[#4A2E80] group-hover:text-white transition-colors shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Work Email</p>
                    <p className="font-semibold text-[#3C1361]">aulianamiendy.work@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/6285155456538"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[#2D3748] hover:text-[#4A2E80] transition-colors group p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#E2E8F0]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E8D8F4] text-[#4A2E80] flex items-center justify-center group-hover:bg-[#4A2E80] group-hover:text-white transition-colors shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">WhatsApp / Phone (CV Verified)</p>
                    <p className="font-semibold text-[#3C1361]">+62 851-5545-6538</p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/aulianamiendy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[#2D3748] hover:text-[#4A2E80] transition-colors group p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#E2E8F0]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E8D8F4] text-[#4A2E80] flex items-center justify-center group-hover:bg-[#4A2E80] group-hover:text-white transition-colors shrink-0">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">LinkedIn Profile</p>
                    <p className="font-semibold text-[#3C1361]">linkedin.com/in/aulianamiendy</p>
                  </div>
                </a>

                <a
                  href="https://youtu.be/W6IhOb_9q9w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[#2D3748] hover:text-[#4A2E80] transition-colors group p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#E2E8F0]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E8D8F4] text-[#4A2E80] flex items-center justify-center group-hover:bg-[#4A2E80] group-hover:text-white transition-colors shrink-0">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">YouTube Showreel</p>
                    <p className="font-semibold text-[#3C1361]">youtu.be/W6IhOb_9q9w</p>
                  </div>
                </a>

              </div>
            </div>

            {/* Form Kontak Interaktif */}
            <div className="lg:col-span-7">
              <div className="bg-[#FAFAFA] p-8 rounded-3xl border border-[#E2E8F0] shadow-sm">
                <form onSubmit={handleSubmitForm} className="space-y-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#3C1361] mb-1.5" htmlFor="formName">
                        Nama Lengkap / Perusahaan *
                      </label>
                      <input
                        type="text"
                        id="formName"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Budi Santoso / PT Brand Indonesia"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] text-sm text-[#2D3748] focus:outline-none focus:border-[#4A2E80] focus:ring-1 focus:ring-[#4A2E80] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#3C1361] mb-1.5" htmlFor="formEmail">
                        Alamat Email *
                      </label>
                      <input
                        type="email"
                        id="formEmail"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="budi@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] text-sm text-[#2D3748] focus:outline-none focus:border-[#4A2E80] focus:ring-1 focus:ring-[#4A2E80] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3C1361] mb-1.5" htmlFor="formType">
                      Kebutuhan Proyek
                    </label>
                    <select
                      id="formType"
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] text-sm text-[#2D3748] focus:outline-none focus:border-[#4A2E80] focus:ring-1 focus:ring-[#4A2E80] transition-colors"
                    >
                      <option value="Social Media & Reels Campaign">Social Media &amp; Reels Campaign (Short-form)</option>
                      <option value="Broadcast Promo & Commercial TVC">Broadcast Promo &amp; Commercial TVC</option>
                      <option value="Motion Graphics & Animated Supers">Motion Graphics &amp; Animated Supers</option>
                      <option value="Corporate / Event Storytelling Video">Corporate / Event Storytelling Video</option>
                      <option value="Freelance Contract / Full-Time Role">Freelance Contract / Full-Time Role</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3C1361] mb-1.5" htmlFor="formMessage">
                      Deskripsi Proyek &amp; Target Jadwal *
                    </label>
                    <textarea
                      id="formMessage"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Jelaskan kebutuhan video, referensi visual, jumlah deliverable, serta target deadline rilis..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] text-sm text-[#2D3748] focus:outline-none focus:border-[#4A2E80] focus:ring-1 focus:ring-[#4A2E80] transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#3C1361] hover:bg-[#2A0845] text-white text-sm font-bold tracking-wide transition-all duration-200 shadow-sm hover:shadow active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {formSubmitting ? (
                      <span>Mengirimkan Pesan...</span>
                    ) : (
                      <>
                        <span>Kirim Pesan ke Auliana</span>
                        <ArrowRight className="w-4 h-4 text-amber-400" />
                      </>
                    )}
                  </button>

                  {formSubmitted && (
                    <div className="p-4 rounded-xl bg-[#E8D8F4]/90 border border-[#C8ACD6] text-[#3C1361] text-xs font-semibold text-center flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-[#4A2E80]" />
                      <span>Terima kasih! Pesan Anda telah terkirim. Auliana akan menghubungi via email / WhatsApp dalam 1x24 jam.</span>
                    </div>
                  )}

                </form>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. FOOTER                                               */}
      {/* ======================================================== */}
      <footer className="bg-[#FAFAFA] border-t border-[#E2E8F0] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8ACD6]"></span>
            <span>&copy; {new Date().getFullYear()} <strong>Auliana Miendy</strong>. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => {
                if (isOwnerAuthenticated) {
                  handleOwnerLogout();
                } else {
                  setOwnerPinModalOpen(true);
                  setOwnerPinError('');
                  setOwnerPinInput('');
                }
              }}
              className="text-xs text-[#64748B] hover:text-[#4A2E80] transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
              title={isOwnerAuthenticated ? "Keluar dari Mode Pemilik" : "Akses Khusus Pemilik"}
            >
              {isOwnerAuthenticated ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Mode Pemilik Aktif (Kunci)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Akses Pemilik</span>
                </>
              )}
            </button>
            <a
              href="/assets/aistudio/Auliana_Miendy_CV_Final_e84e794f.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4A2E80] transition-colors font-medium flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV PDF</span>
            </a>
            <button
              onClick={() => setCodeModalOpen(true)}
              className="text-[#4A2E80] font-semibold hover:underline cursor-pointer"
            >
              Salin Kode 1 File HTML
            </button>
            <a href="#home" className="hover:text-[#4A2E80] transition-colors">
              Back to Top &uarr;
            </a>
          </div>

        </div>
      </footer>

      {/* ======================================================== */}
      {/* 11. VIDEO LIGHTBOX MODAL                                 */}
      {/* ======================================================== */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className={`relative w-full ${activeVideo.aspectRatio === '9:16' ? 'max-w-sm sm:max-w-md' : 'max-w-4xl'} bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#3C1361] text-white border-b border-white/10">
              <div>
                <h3 className="text-sm font-bold tracking-tight text-white leading-tight">
                  {activeVideo.title}
                </h3>
                <p className="text-xs text-[#E8D8F4] mt-0.5">
                  Client: {activeVideo.client} · {activeVideo.categoryLabel} · {activeVideo.role}
                </p>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Embed Frame */}
            <div className={`relative ${activeVideo.aspectRatio === '9:16' ? 'aspect-[9/16] max-h-[75vh] mx-auto' : 'aspect-video w-full'} bg-black`}>
              <iframe
                src={getEmbedUrl(activeVideo.videoUrl)}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="px-6 py-3 bg-[#3C1361]/90 text-[#E8D8F4] text-xs flex items-center justify-between">
              <span>Tekan tombol ESC atau klik di luar area untuk menutup</span>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-white hover:underline font-semibold cursor-pointer"
              >
                Tutup Player
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 12. MODAL GANTI / EDIT URL VIDEO                         */}
      {/* ======================================================== */}
      {editModalProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setEditModalProject(null)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#3C1361]">Ganti Link Video YouTube</h3>
              <button
                onClick={() => setEditModalProject(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#64748B] mb-4">
              Thumbnail untuk kartu <strong>{editModalProject.title}</strong> akan otomatis diekstrak langsung dari frame video YouTube yang Anda masukkan.
            </p>

            <form onSubmit={handleSaveVideoUrl} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3C1361] mb-1">
                  URL Video YouTube
                </label>
                <input
                  type="text"
                  required
                  value={newVideoUrlInput}
                  onChange={(e) => setNewVideoUrlInput(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#E2E8F0] text-xs text-[#2D3748] focus:outline-none focus:border-[#4A2E80]"
                />
              </div>

              {/* Preview Thumbnail Otomatis */}
              {getYouTubeId(newVideoUrlInput) && (
                <div className="p-3 bg-[#FAFAFA] rounded-2xl border border-[#E2E8F0]">
                  <span className="text-[11px] font-semibold text-[#4A2E80] block mb-2">
                    Preview Thumbnail Otomatis dari Video:
                  </span>
                  <div className="aspect-video rounded-xl overflow-hidden bg-black">
                    <img
                      src={`https://img.youtube.com/vi/${getYouTubeId(newVideoUrlInput)}/hqdefault.jpg`}
                      alt="Preview frame video"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditModalProject(null)}
                  className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-xs font-medium text-[#64748B] hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#4A2E80] text-white text-xs font-bold hover:bg-[#3C1361]"
                >
                  Terapkan Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 13. EXPORT / SINGLE-FILE HTML MODAL                      */}
      {/* ======================================================== */}
      {codeModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setCodeModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E2E8F0] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 bg-[#FAFAFA] border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8D8F4] text-[#3C1361] text-[11px] font-bold mb-1">
                  100% Single-File HTML Ready
                </div>
                <h3 className="text-lg font-bold text-[#3C1361]">
                  Kode Lengkap Single-Page Portfolio Auliana Miendy
                </h3>
                <p className="text-xs text-[#64748B]">
                  Semua thumbnail video diekstrak secara otomatis dari frame video YouTube masing-masing proyek.
                </p>
              </div>

              <button
                onClick={() => setCodeModalOpen(false)}
                className="p-2 rounded-xl text-[#64748B] hover:text-[#3C1361] hover:bg-[#E8D8F4]/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Code Box */}
            <div className="p-6 flex-1 overflow-hidden flex flex-col bg-[#0F172A]">
              <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                <span>portfolio-single-file.html (Self-Contained File)</span>
                <span className="text-[#C8ACD6]">Thumbnail dari https://img.youtube.com/vi/[ID]/maxresdefault.jpg</span>
              </div>
              
              <div className="relative flex-1 overflow-auto rounded-xl bg-[#090D16] border border-slate-800 p-4 font-mono text-xs text-slate-300 leading-relaxed">
                <pre>{htmlCode || 'Memuat kode HTML...'}</pre>
              </div>
            </div>

            {/* Modal Footer with Actions */}
            <div className="px-6 py-4 bg-[#FAFAFA] border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-[#64748B]">
                Bisa langsung dibuka di browser tanpa Node.js / compiler.
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={copyHtmlCode}
                  className="px-5 py-2.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#C8ACD6] text-xs font-bold text-[#3C1361] flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Kode Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#4A2E80]" />
                      <span>Salin Semua Kode</span>
                    </>
                  )}
                </button>

                <button
                  onClick={downloadHtmlFile}
                  className="px-5 py-2.5 rounded-xl bg-[#4A2E80] hover:bg-[#3C1361] text-xs font-bold text-white flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .html File</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 14. MODAL AUTENTIKASI PEMILIK (OWNER PIN)                */}
      {/* ======================================================== */}
      {ownerPinModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOwnerPinModalOpen(false)}
        >
          <div
            className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#E8D8F4] text-[#4A2E80] flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#3C1361]">Autentikasi Pemilik</h3>
                  <p className="text-[11px] text-[#64748B]">Khusus Auliana Miendy</p>
                </div>
              </div>
              <button
                onClick={() => setOwnerPinModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#64748B] mb-4 leading-relaxed">
              Masukkan PIN pemilik untuk membuka mode pengeditan URL video portofolio. Pengunjung biasa hanya dapat melihat dan memutar video tanpa akses edit.
            </p>

            <form onSubmit={handleOwnerLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3C1361] mb-1.5">
                  PIN Pemilik
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={ownerPinInput}
                  onChange={(e) => {
                    setOwnerPinInput(e.target.value);
                    setOwnerPinError('');
                  }}
                  placeholder="Ketik PIN..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#E2E8F0] text-sm text-[#2D3748] focus:outline-none focus:border-[#4A2E80] font-mono tracking-widest text-center"
                />
                {ownerPinError && (
                  <p className="text-[11px] text-rose-500 font-semibold mt-1.5">{ownerPinError}</p>
                )}
                <p className="text-[10px] text-slate-400 mt-2 text-center">
                  *PIN bawaan: <strong>2026</strong> atau <strong>auliana</strong>
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOwnerPinModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-xs font-medium text-[#64748B] hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#4A2E80] text-white text-xs font-bold hover:bg-[#3C1361] transition-colors cursor-pointer"
                >
                  Buka Akses Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
