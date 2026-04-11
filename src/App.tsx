import { Heart, ArrowRight, ArrowLeft, Plus, Download, Share2, X, RotateCcw, User } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';

// --- Components ---

const PhotoStack = ({ initialImage, themeColor, onUpload }: { initialImage: string, themeColor: string, onUpload?: (url: string) => void }) => {
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImages(prev => [url, ...prev]);
      if (onUpload) onUpload(url);
    }
  };

  const hasImage = images.length > 0;

  return (
    <div className="relative w-16 h-16 sm:w-18 sm:h-18 mr-4 mt-1">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleUpload}
      />
      
      <div className="relative w-full h-full">
        {/* 底层卡片：始终展示初始图片，不随上传更改 */}
        <motion.div 
          className="absolute inset-0 rounded-lg border-[2px] border-white shadow-md overflow-hidden bg-white"
          style={{ rotate: '-8deg', x: -22, y: 2, zIndex: 10 }}
          whileHover={{ scale: 1.05, rotate: '-4deg', zIndex: 30 }}
        >
          <img 
            src={initialImage} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
            crossOrigin="anonymous"
          />
        </motion.div>

        {/* 顶层卡片：展示上传的图片或添加按钮 */}
        <motion.div 
          className={`absolute inset-0 rounded-lg border-[2px] border-white shadow-lg overflow-hidden flex items-center justify-center cursor-pointer bg-white/90 backdrop-blur-sm group`}
          style={{ rotate: '8deg', x: 4, y: 0, zIndex: 20 }}
          whileHover={{ scale: 1.05, rotate: '4deg', zIndex: 30 }}
          onClick={() => fileInputRef.current?.click()}
        >
          {hasImage && (
            <>
              <img 
                src={images[0]} 
                className="absolute inset-0 w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
                crossOrigin="anonymous"
              />
              {/* 悬浮遮罩 */}
              <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-0.5 z-10">
                <Plus size={14} className="text-white" />
                <span className="text-[6px] font-bold text-white uppercase tracking-wider">Add</span>
              </div>
            </>
          )}
          
          {!hasImage && (
            <div className="flex flex-col items-center gap-0.5">
              <Plus size={14} className="text-zinc-400" />
              <span className="text-[6px] font-bold text-zinc-400 uppercase tracking-wider">Add</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

type PageData = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
  textColor: string;
  themeDetail: {
    title: string;
    englishTitle: string;
    description: string;
    photos: string[];
    mainColor: string;
    middleColor: string;
  };
  details: {
    title: string;
    items: { label: string; title: string; desc: string; image: string }[];
    footer: string;
  };
};

const PAGES: PageData[] = [
  {
    id: 'blue',
    title: '深蓝色',
    subtitle: '获得平静',
    image: 'https://plus.unsplash.com/premium_photo-1669131388906-2179e2b8a439?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-900',
    themeDetail: {
      title: '寻找蓝色',
      englishTitle: 'LOOKING FOR BLUE',
      description: '带天空与深海的沉静气质，携着清冽与从容，|冷调的视觉感受能舒缓神经',
      photos: [
        'https://images.unsplash.com/photo-1594002348772-bc0cb57ade8b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1638878468165-a974415fed4f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      ],
      mainColor: 'bg-[#1e3a8a]',
      middleColor: 'bg-[#eff6ff]'
    },
    details: {
      title: '宁静蓝',
      items: [
        { label: '自然馈赠', title: '食物的蓝色', desc: '蓝莓等天然食材，从视觉到味觉为你带来清凉与安宁。', image: 'https://images.unsplash.com/photo-1594002348772-bc0cb57ade8b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { label: '视觉疗愈', title: '风景的蓝色', desc: '凝望大海或晴空，让心灵在广阔的蓝色中得到释放。', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=300&auto=format&fit=crop' },
        { label: '生活点缀', title: '物品的蓝色', desc: '一件蓝色瓷器 or 靠枕，为你的私人空间增添一份静谧。', image: 'https://images.unsplash.com/photo-1638878468165-a974415fed4f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
      ],
      footer: '都找到了！打印照片'
    }
  },
  {
    id: 'yellow',
    title: '鲜黄色',
    subtitle: '更加明朗',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=1000&auto=format&fit=crop',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-900',
    themeDetail: {
      title: '寻找黄色',
      englishTitle: 'LOOKING FOR YELLOW',
      description: '如阳光般明媚，带着轻快暖意与鲜活明亮，|充满希望与活力',
      photos: [
        'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=300&auto=format&fit=crop'
      ],
      mainColor: 'bg-[#D88A0C]',
      middleColor: 'bg-[#fefce8]'
    },
    details: {
      title: '明朗黄',
      items: [
        { label: '视觉捕捉', title: '风景的黄色', desc: '秋日的银杏或夏日的向日葵，是大自然最明亮的馈赠。', image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=300&auto=format&fit=crop' },
        { label: '时尚表达', title: '服饰的黄色', desc: '一件明黄色的单品，能瞬间点亮心情，展现自信魅力。', image: 'https://images.unsplash.com/photo-1643825664857-7e6e4124f289?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { label: '生活趣味', title: '物品的黄色', desc: '书桌上的亮黄摆件，能在忙碌中为你补充积极的能量。', image: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=300&auto=format&fit=crop' }
      ],
      footer: '都找到了！打印照片'
    }
  },
  {
    id: 'green',
    title: '翠绿色',
    subtitle: '找回平衡',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop',
    bgColor: 'bg-green-50',
    textColor: 'text-green-900',
    themeDetail: {
      title: '寻找绿色',
      englishTitle: 'LOOKING FOR GREEN',
      description: '提取于大自然的底色，如林间漫溢的清氧，|象征着生命与平衡',
      photos: [
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=704&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1757513145472-8a0601688816?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1632576883732-f131be0be48a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      ],
      mainColor: 'bg-[#064e3b]',
      middleColor: 'bg-[#f0fdf4]'
    },
    details: {
      title: '治愈绿',
      items: [
        { label: '自然滋养', title: '食物的绿色', desc: '新鲜的蔬果不仅滋养身体，清新的色彩也能抚慰心灵。', image: 'https://plus.unsplash.com/premium_photo-1671395501275-630ae5ea02c4?q=80&w=754&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { label: '空间美学', title: '建筑的绿色', desc: '被植被覆盖的建筑，在城市森林中营造出呼吸的窗口。', image: 'https://images.unsplash.com/photo-1517544181962-9157536e648b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { label: '日常陪伴', title: '物品的绿色', desc: '一盆绿植或一件绿意物件，让家成为身心平衡的避风港。', image: 'https://plus.unsplash.com/premium_photo-1682944652547-1d1e950e15c6?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
      ],
      footer: '都找到了！打印照片'
    }
  },
  {
    id: 'orange',
    title: '亮橙色',
    subtitle: '唤醒活力',
    image: 'https://images.unsplash.com/photo-1730337557127-b29e625276fa?q=80&w=782&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-900',
    themeDetail: {
      title: '寻找橙色',
      englishTitle: 'LOOKING FOR ORANGE',
      description: '温暖而热烈，如落日熔金和煦，鲜橙盈香|像冬日的暖阳或成熟的果实',
      photos: [
        'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=300&auto=format&fit=crop'
      ],
      mainColor: 'bg-[#B34E33]',
      middleColor: 'bg-[#fff7ed]'
    },
    details: {
      title: '活力橙',
      items: [
        { label: '城市脉动', title: '马路的橙色', desc: '夕阳下街道 or 闪烁的信号，在喧嚣中传递着温暖', image: 'https://images.unsplash.com/photo-1608428164833-771587fe3789?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { label: '休闲时光', title: '公园的橙色', desc: '长椅上的落叶或游乐设施，为午后时光增添了一抹活力。', image: 'https://images.unsplash.com/photo-1723101905159-dfe819e5dc4a?q=80&w=2058&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { label: '味蕾觉醒', title: '餐厅的橙色', desc: '明亮的用餐环境能激发食欲，让每一餐都充满愉悦感。', image: 'https://plus.unsplash.com/premium_photo-1676929362309-b126513ccf66?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
      ],
      footer: '都找到了！打印照片'
    }
  },
  {
    id: 'purple',
    title: '魅紫色',
    subtitle: '激发灵感',
    image: 'https://images.unsplash.com/photo-1596988495169-09af7447ef69?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-900',
    themeDetail: {
      title: '寻找紫色',
      englishTitle: 'LOOKING FOR PURPLE',
      description: '是暮云缱绻的浪漫，是薰衣草摇曳的雅致，|蕴含灵感，触发活跃的思维',
      photos: [
        'https://plus.unsplash.com/premium_photo-1673728254015-9a437bdb44aa?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1760113559708-84e7a148ec68?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1587734848965-89499a652af9?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      ],
      mainColor: 'bg-[#4F2188]',
      middleColor: 'bg-[#faf5ff]'
    },
    details: {
      title: '灵感紫',
      items: [
        { label: '灵感瞬间', title: '风景的紫色', desc: '晚霞中的紫调或薰衣草田，带你进入如梦似幻的想象空间。', image: 'https://plus.unsplash.com/premium_photo-1739198858168-7ae90275edd8?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { label: '精致生活', title: '商品的紫色', desc: '紫色的包装或设计，往往透着一种高贵而神秘的艺术气息。', image: 'https://images.unsplash.com/photo-1634033200138-9aafe85c18ab?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { label: '创意偶遇', title: '随机的紫色', desc: '角落里不经意出现的紫色，或许就是开启灵感的秘密钥匙。', image: 'https://images.unsplash.com/photo-1620890087040-fac9a3c60c66?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
      ],
      footer: '都找到了！打印照片'
    }
  },
  {
    id: 'red',
    title: '正红色',
    subtitle: '找回自信',
    image: 'https://images.unsplash.com/photo-1598420006067-77f1c052daea?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bgColor: 'bg-red-50',
    textColor: 'text-red-900',
    themeDetail: {
      title: '寻找红色',
      englishTitle: 'LOOKING FOR RED',
      description: '充满力量与激情，予人热烈、振奋、赤诚的|情绪，是自信力的象征',
      photos: [
        'https://images.unsplash.com/photo-1710418467761-cb8efcf525db?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1671628147501-42120d9d4af4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1689344314069-b60bf06d564c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      ],
      mainColor: 'bg-[#7f1d1d]',
      middleColor: 'bg-[#fef2f2]'
    },
    details: {
      title: '复古红',
      items: [
        { label: '城市印记', title: '街道的红色', desc: '红色的砖墙或复古的邮筒，在街角诉说着时光的生命力。', image: 'https://images.unsplash.com/photo-1718027559467-0f679337be04?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { label: '自然律动', title: '公园的红色', desc: '盛开的花朵或深秋的枫叶，是大自然最热烈的自信表达。', image: 'https://images.unsplash.com/photo-1657395671793-f8d13a1fe7f0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { label: '灵感火花', title: '随机的红色', desc: '视线中突然闯入的红色，能瞬间唤醒感官，找回内在力量。', image: 'https://images.unsplash.com/photo-1563816950549-61805fb9be7a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
      ],
      footer: '都找到了！打印照片'
    }
  }
];

const EMOTION_COLORS: Record<string, string> = {
  blue: '#1e3a8a',
  yellow: '#D88A0C',
  green: '#064e3b',
  orange: '#B34E33',
  purple: '#4F2188',
  red: '#7f1d1d',
};

const THEME_WALL_PHOTOS: Record<string, string[]> = {
  blue: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520962880247-cfaf5b51d367?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516912481808-34061f8c630a?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1476673160781-d0324a24e54e?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=300&auto=format&fit=crop',
  ],
  yellow: [
    'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541689221361-ad95003ea09c?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1566433316243-306baac95973?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=300&auto=format&fit=crop',
  ],
  green: [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515150144380-bca9f1850ed9?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500627869352-337a73d196f7?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511497584788-8767fe771d85?q=80&w=300&auto=format&fit=crop',
  ],
  orange: [
    'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516912481808-34061f8c630a?q=80&w=300&auto=format&fit=crop',
  ],
  purple: [
    'https://images.unsplash.com/photo-1499002238440-d264edd596ec?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1528459105426-b9548367069b?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516912481808-34061f8c630a?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1476673160781-d0324a24e54e?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=300&auto=format&fit=crop',
  ],
  red: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529905270404-b040fd3dca41?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516912481808-34061f8c630a?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1476673160781-d0324a24e54e?q=80&w=300&auto=format&fit=crop',
  ],
};

const getBasePos = (url: string) => {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = ((hash << 5) - hash) + url.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  return {
    top: (absHash % 60) + 10,
    left: ((absHash >> 8) % 60) + 10,
    initialRotate: (absHash % 20) - 10
  };
};

interface PhotoItemProps {
  url: string;
  themeId: string;
  pos: { x: number; y: number; rotate: number };
  onUpdatePosition: (themeId: string, photoUrl: string, x: number, y: number, rotate: number) => void;
  onDeletePhoto: (themeId: string, url: string) => void;
  onRotatingChange: (isRotating: boolean) => void;
  constraintsRef: React.RefObject<HTMLDivElement>;
  isSelected: boolean;
  onSelect: () => void;
  isRotatingGlobal: boolean;
  setIsRotatingGlobal: (v: boolean) => void;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ 
  url, 
  themeId, 
  pos, 
  onUpdatePosition, 
  onDeletePhoto, 
  onRotatingChange, 
  constraintsRef, 
  isSelected, 
  onSelect,
  isRotatingGlobal,
  setIsRotatingGlobal
}) => {
  const x = useMotionValue(pos.x);
  const y = useMotionValue(pos.y);
  const rotate = useMotionValue(pos.rotate);
  const base = getBasePos(url);
  const gestureData = useRef({ startAngle: 0, startRotate: 0, centerX: 0, centerY: 0 });

  useEffect(() => {
    x.set(pos.x);
    y.set(pos.y);
    rotate.set(pos.rotate);
  }, [pos.x, pos.y, pos.rotate, themeId]);

  const handleDragEnd = () => {
    onUpdatePosition(themeId, url, x.get(), y.get(), rotate.get());
  };

  const handleRotateStart = (clientX: number, clientY: number, currentTarget: HTMLElement) => {
    const rect = currentTarget.parentElement?.getBoundingClientRect();
    if (!rect) return;
    
    setIsRotatingGlobal(true);
    onRotatingChange(true);
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startAngle = Math.atan2(clientY - centerY, clientX - centerX);
    const startRotate = rotate.get();
    
    gestureData.current = { startAngle, startRotate, centerX, centerY };

    const onMove = (moveX: number, moveY: number) => {
      const currentAngle = Math.atan2(moveY - gestureData.current.centerY, moveX - gestureData.current.centerX);
      const deltaAngle = (currentAngle - gestureData.current.startAngle) * 180 / Math.PI;
      rotate.set(gestureData.current.startRotate + deltaAngle);
    };

    const onEnd = () => {
      setIsRotatingGlobal(false);
      onRotatingChange(false);
      onUpdatePosition(themeId, url, x.get(), y.get(), rotate.get());
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onMouseUp = onEnd;
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = onEnd;

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
  };

  return (
    <motion.div
      drag={!isRotatingGlobal}
      dragConstraints={constraintsRef}
      dragElastic={0}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }}
      style={{ 
        x, y, rotate,
        top: `${base.top}%`, 
        left: `${base.left}%`,
        zIndex: isSelected ? 100 : 10
      }}
      className={`absolute w-[68px] bg-white p-1 pb-4 shadow-lg border ${isSelected ? 'border-blue-500 ring-1 ring-blue-500' : 'border-zinc-200/50'} cursor-move active:z-[100] origin-center`}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2.5 h-6 bg-[#E3C9A1] rounded-sm shadow-md z-20 pointer-events-none" />
      <div className="aspect-square w-full overflow-hidden bg-zinc-50 relative pointer-events-none">
        <img src={url} className="w-full h-full object-cover" referrerPolicy="no-referrer" crossOrigin="anonymous" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
      </div>

      {isSelected && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeletePhoto(themeId, url);
            }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-black rounded-full flex items-center justify-center text-white shadow-md z-30 hover:scale-110 transition-transform"
          >
            <X size={12} />
          </button>
          
          <div
            onMouseDown={(e) => {
              e.stopPropagation();
              handleRotateStart(e.clientX, e.clientY, e.currentTarget);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleRotateStart(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
            }}
            className="absolute -bottom-2 -right-2 w-5 h-5 bg-white border border-zinc-300 rounded-full flex items-center justify-center text-zinc-600 shadow-md z-30 cursor-alias hover:scale-110 transition-transform"
          >
            <RotateCcw size={12} />
          </div>
        </>
      )}
    </motion.div>
  );
};

const WallBoard = ({ themeId, photos, wallPhotoPositions, onUpdatePosition, onDeletePhoto, onRotatingChange }: { themeId: string, photos: string[], wallPhotoPositions: Record<string, Record<string, { x: number, y: number, rotate: number }>>, onUpdatePosition: (themeId: string, photoUrl: string, x: number, y: number, rotate: number) => void, onDeletePhoto: (themeId: string, url: string) => void, onRotatingChange: (isRotating: boolean) => void }) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  
  return (
    <div 
      ref={constraintsRef}
      onClick={() => setSelectedPhotoUrl(null)}
      className="w-[340px] h-full bg-[#D0A47D] rounded-[32px] border-[7px] border-[#4D3423] relative overflow-hidden"
    >
      <img 
        src="https://gd-hbimg-edge.huaban.com/6c459e3a49b4ad514921878149915bac66828d0c2848e1-7cqDrI_fw658webp?auth_key=1775548800-b0be1574b71949918b124ed4cd4594be-0-59d3e76cde2d61e398281ec339e2fe8f" 
        className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none"
        referrerPolicy="no-referrer"
      />
      
      <div className="relative w-full h-full p-4">
        {photos.map((url) => (
          <PhotoItem 
            key={url}
            url={url}
            themeId={themeId}
            pos={wallPhotoPositions[themeId]?.[url] || { x: 0, y: 0, rotate: getBasePos(url).initialRotate }}
            onUpdatePosition={onUpdatePosition}
            onDeletePhoto={onDeletePhoto}
            onRotatingChange={onRotatingChange}
            constraintsRef={constraintsRef}
            isSelected={selectedPhotoUrl === url}
            onSelect={() => setSelectedPhotoUrl(url)}
            isRotatingGlobal={isRotating}
            setIsRotatingGlobal={setIsRotating}
          />
        ))}
      </div>
    </div>
  );
};

const PhotoWallPage = ({ uploadedPhotos, extraWallPhotos, wallPhotoPositions, initialThemeId, onBack, onAddPhoto, onUpdatePosition, onDeletePhoto }: { uploadedPhotos: Record<string, string[]>, extraWallPhotos: Record<string, string[]>, wallPhotoPositions: Record<string, Record<string, { x: number, y: number, rotate: number }>>, initialThemeId: string, onBack: () => void, onAddPhoto: (themeId: string, url: string) => void, onUpdatePosition: (themeId: string, photoUrl: string, x: number, y: number, rotate: number) => void, onDeletePhoto: (themeId: string, url: string) => void }) => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(PAGES.findIndex(p => p.id === initialThemeId));
  const [direction, setDirection] = useState(0);
  const [isAnyPhotoRotating, setIsAnyPhotoRotating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 50) {
      if (info.offset.x > 0) {
        setDirection(-1);
        setCurrentThemeIndex(prev => (prev === 0 ? PAGES.length - 1 : prev - 1));
      } else {
        setDirection(1);
        setCurrentThemeIndex(prev => (prev === PAGES.length - 1 ? 0 : prev + 1));
      }
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onAddPhoto(currentTheme.id, url);
    }
  };

  const currentTheme = PAGES[currentThemeIndex];
  // Merge level 3 photos and level 5 extra photos
  const themePhotos = [
    ...(uploadedPhotos[currentTheme.id] || []),
    ...(extraWallPhotos[currentTheme.id] || [])
  ].filter(Boolean);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : direction < 0 ? '-100%' : 0,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : direction > 0 ? '-100%' : 0,
      opacity: 0
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full max-w-[400px] aspect-[9/19] rounded-[40px] shadow-2xl bg-[#E5E1D8] flex flex-col items-center p-6 overflow-hidden"
    >
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
           style={{ 
             backgroundImage: `radial-gradient(#000 1px, transparent 0)`,
             backgroundSize: '24px 24px'
           }} 
      />

      {/* Header */}
      <div className="absolute top-8 left-0 w-full px-8 flex justify-between items-center z-50">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full border border-zinc-400 flex items-center justify-center text-zinc-600 hover:bg-white/50 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>

        <button 
          onClick={() => fileInputRef.current?.click()}
          className="w-10 h-10 rounded-full border border-zinc-400 flex items-center justify-center text-zinc-600 hover:bg-white/50 transition-colors"
        >
          <Plus size={20} />
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleUpload}
        />
      </div>

      {/* Corkboard Container */}
      <div className="flex-1 w-full flex flex-col items-center justify-center pt-[62px]">
        <div className="relative w-full aspect-[1/1.8] max-w-full">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={currentTheme.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", ease: "easeInOut", duration: 0.6 },
                opacity: { duration: 0.4 }
              }}
              drag={isAnyPhotoRotating ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.05}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              className="w-full h-full flex justify-center absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <WallBoard 
                themeId={currentTheme.id}
                photos={themePhotos}
                wallPhotoPositions={wallPhotoPositions}
                onUpdatePosition={onUpdatePosition}
                onDeletePhoto={onDeletePhoto}
                onRotatingChange={setIsAnyPhotoRotating}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Theme Name and Switcher */}
        <div className="mt-[24px] flex flex-col items-center">
          <div className="font-pingfang text-[14px] tracking-normal text-[#4b4b52] uppercase mb-3">
            {currentTheme.id}
          </div>
          <div className="flex gap-2.5">
            {PAGES.map((page, i) => (
              <div 
                key={page.id} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentThemeIndex ? 'bg-zinc-800 w-5' : 'bg-zinc-300'}`} 
              />
            ))}
          </div>
          <p className="mt-4 text-black/55 text-[10px] font-pingfang tracking-[0.2em] uppercase">滑动切换想看的色彩主题</p>
        </div>
      </div>
    </motion.div>
  );
};

const PrintPage = ({ photos, onBack, onGoHome, onGoWall, themeColor, themeName }: { photos: string[], onBack: () => void, onGoHome: () => void, onGoWall: () => void, themeColor: string, themeName: string }) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printedPhotos, setPrintedPhotos] = useState<number[]>([]);
  const [showFlash, setShowFlash] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (isPrinting) return;
    setIsPrinting(true);
    setShowFlash(true);
    setPrintedPhotos([]); // Clear previous prints to avoid duplicate keys
    setTimeout(() => setShowFlash(false), 150);

    // Print photos one by one
    photos.forEach((_, index) => {
      setTimeout(() => {
        setPrintedPhotos(prev => [...prev, index]);
      }, (index + 1) * 800);
    });
  };

  const handleSave = async () => {
    if (!printAreaRef.current) return;
    try {
      setIsPrinting(true); // Show a loading state if needed, or just prevent double clicks
      
      // Small delay to ensure all animations are settled
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const dataUrl = await toPng(printAreaRef.current, {
        cacheBust: true,
        backgroundColor: '#E5E1D8',
        pixelRatio: 2,
      });
      
      if (!dataUrl) throw new Error('Failed to generate image');
      
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = dataUrl;
      link.download = `color-memories-${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        setShowShareSheet(true);
        setIsPrinting(false);
      }, 200);
    } catch (err) {
      console.error('Failed to save image', err);
      setIsPrinting(false);
      // Fallback to showing sheet even if download fails in some environments
      setShowShareSheet(true);
    }
  };

  useEffect(() => {
    // Auto trigger print when entering
    const timer = setTimeout(handlePrint, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full max-w-[400px] aspect-[9/19] rounded-[40px] shadow-2xl bg-[#E5E1D8] flex flex-col items-center justify-end pb-24 p-6 overflow-hidden"
    >
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
           style={{ 
             backgroundImage: `radial-gradient(#000 1px, transparent 0)`,
             backgroundSize: '24px 24px'
           }} 
      />

      {/* Flash Effect */}
      <AnimatePresence>
        {showFlash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-[100] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Back Button */}
      <div className="absolute top-8 left-0 w-full px-8 flex justify-between items-center z-50">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full border border-zinc-400 flex items-center justify-center text-zinc-600 hover:bg-white/50 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>

        <button 
          onClick={onGoWall}
          className="px-4 h-10 rounded-full border border-zinc-400 text-zinc-600 text-xs font-pingfang hover:bg-white/50 transition-colors flex items-center justify-center"
        >
          照片墙
        </button>
      </div>

      {/* Camera Body (Skeuomorphic Instax Style) - Moved down */}
      <div className="relative w-72 h-[340px] bg-[#D1CDC2] rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-b-[1px] border-white/20 flex flex-col overflow-hidden z-20 transform translate-y-[-8px]">
        {/* Top Metallic Bar */}
        <div className="h-16 w-full bg-gradient-to-b from-[#E5E1D8] to-[#D1CDC2] flex items-center justify-center px-6 relative border-b border-black/5">
          {/* Flash Unit */}
          <div className="absolute left-6 top-4 w-12 h-8 bg-[#2A2A2A] rounded-sm border border-zinc-500/30 overflow-hidden flex flex-wrap p-0.5 gap-0.5">
            {[...Array(8)].map((_, i) => (
              <div key={`flash-dot-${i}`} className="w-[10px] h-[6px] bg-zinc-700/50 rounded-[1px]" />
            ))}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-yellow-500">⚡</div>
          </div>
          
          <span className="font-sans font-bold text-[10px] tracking-[0.3em] text-zinc-600/80 ml-4">FUJIFILM</span>
          
          {/* Top Right Dial */}
          <div className="absolute right-6 w-8 h-8 rounded-full bg-gradient-to-br from-[#E5E1D8] to-[#B8B4A9] shadow-sm border border-zinc-400/30 flex items-center justify-center">
            <div className="w-4 h-4 flex flex-col justify-between py-0.5">
              <div className="w-full h-[1.5px] bg-zinc-600 rounded-full" />
              <div className="w-full h-[1.5px] bg-zinc-600 rounded-full" />
              <div className="w-full h-[1.5px] bg-zinc-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* Middle Leather Section */}
        <div className="flex-1 w-full bg-[#5D4037] relative flex items-center justify-center overflow-hidden">
          {/* Leather Texture Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />
          
          {/* Left Dial */}
          <div className="absolute left-6 w-12 h-12 rounded-full bg-[#4E342E] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_2px_4px_rgba(255,255,255,0.1)] border border-[#3E2723] flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#5D4037] to-[#3E2723] shadow-md flex items-center justify-center">
              <div className="w-1.5 h-4 bg-[#2D1B18] rounded-full" />
            </div>
          </div>

          {/* Main Lens */}
          <div className="relative w-44 h-44 rounded-full bg-gradient-to-b from-[#E5E1D8] to-[#B8B4A9] p-1.5 shadow-2xl border border-white/20">
            <div className="w-full h-full rounded-full bg-[#D1CDC2] p-2 shadow-inner border border-black/5">
              <div className="w-full h-full rounded-full bg-zinc-900 border-[10px] border-zinc-800 flex items-center justify-center overflow-hidden relative shadow-2xl">
                {/* Lens Glass Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
                  {/* Reflections */}
                  <div className="absolute top-6 left-6 w-12 h-12 bg-white/5 rounded-full blur-md" />
                  <div className="absolute bottom-10 right-10 w-6 h-6 bg-blue-500/10 rounded-full blur-sm" />
                </div>
                {/* Inner Lens Preview (Shows first photo) */}
                <div className="w-24 h-24 rounded-full overflow-hidden opacity-40 grayscale contrast-125">
                  <img 
                    src={photos[0] || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300&auto=format&fit=crop"} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Instax Text */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right">
            <span className="font-serif italic text-white/40 text-[10px] tracking-widest">instax</span>
          </div>

          {/* Shutter Button */}
          <motion.button 
            whileTap={{ scale: 0.95, y: 1 }}
            onClick={handlePrint}
            className="absolute right-4 bottom-12 w-14 h-14 rounded-full bg-gradient-to-b from-[#E5E1D8] to-[#B8B4A9] shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.5)] border border-zinc-400/30 flex items-center justify-center group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-t from-[#D1CDC2] to-[#F2EDE4] shadow-inner border border-black/5" />
          </motion.button>
        </div>

        {/* Bottom Metallic Bar */}
        <div className="h-16 w-full bg-gradient-to-t from-[#E5E1D8] to-[#D1CDC2] border-t border-white/20 flex items-center justify-around px-8">
          <div className="w-5 h-5 opacity-40"><ArrowLeft size={20} /></div>
          <div className="w-16 h-2 bg-black/20 rounded-full shadow-inner" />
          <div className="w-5 h-5 opacity-40 rotate-180"><ArrowLeft size={20} /></div>
        </div>

        {/* Print Slot */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-1 bg-black/40 rounded-full z-0" />
      </div>

      {/* Printed Photos Container */}
      <div className="absolute inset-0 pointer-events-none z-10" ref={printAreaRef}>
        <AnimatePresence>
          {printedPhotos.map((photoIndex, i) => (
            <motion.div
              key={`${photoIndex}-${i}`}
              initial={{ y: 200, x: -50, opacity: 0, rotate: 0, scale: 0.5 }}
              animate={{ 
                y: i === 0 ? -160 : i === 1 ? -120 : -180, 
                x: i === 0 ? -80 : i === 1 ? 70 : 10,
                opacity: 1, 
                rotate: i === 0 ? -12 : i === 1 ? 15 : 5,
                scale: 1
              }}
              onClick={() => setSelectedPhotoIndex(photoIndex)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
            >
              {/* Polaroid Frame */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white p-3 pb-10 shadow-xl rounded-sm border border-zinc-200 transform-gpu"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 overflow-hidden bg-zinc-100 relative">
                  <img 
                    src={photos[photoIndex]} 
                    className="w-full h-full object-cover"
                    style={{ filter: 'sepia(0.3) contrast(1.2) brightness(0.95)' }}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                  {/* Removed external texture to prevent canvas tainting */}
                </div>
                <div className="mt-4 flex flex-col items-center">
                  <div className="w-16 h-1 bg-zinc-100 rounded-full mb-2" />
                  <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Photo Detail Overlay */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[200] flex flex-col items-center justify-center p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.8, y: 20, rotate: 5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 pb-16 shadow-2xl rounded-sm border border-white/20 w-full max-w-[320px] cursor-default"
            >
              <div className="aspect-square w-full overflow-hidden bg-zinc-100 relative">
                <img 
                  src={photos[selectedPhotoIndex]} 
                  className="w-full h-full object-cover"
                  style={{ filter: 'sepia(0.2) contrast(1.1) brightness(0.98)' }}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
                {/* Removed external texture to prevent canvas tainting */}
              </div>
              <div className="mt-8 flex flex-col items-center">
                <div className="w-24 h-1.5 bg-zinc-100 rounded-full mb-3" />
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-[0.3em]">
                  MEMORIES · {new Date().toLocaleDateString()}
                </div>
              </div>
            </motion.div>
            <p className="mt-8 text-white/60 text-xs font-pingfang tracking-widest">点击任意区域返回</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <AnimatePresence>
        {printedPhotos.length === photos.length && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-10 flex gap-4 z-50"
          >
            <button 
              onClick={handleSave}
              className="px-8 py-2.5 bg-white rounded-full text-zinc-800 text-sm font-medium shadow-lg hover:bg-zinc-50 transition-all active:scale-95 flex items-center gap-2"
            >
              保存照片
            </button>
            <button 
              onClick={() => setShowShareSheet(true)}
              className="px-8 py-2.5 bg-zinc-800 rounded-full text-white text-sm font-medium shadow-lg hover:bg-zinc-900 transition-all active:scale-95 flex items-center gap-2"
            >
              分享美好
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Half-Sheet Overlay */}
      <AnimatePresence>
        {showShareSheet && (
          <div className="absolute inset-0 z-[300]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareSheet(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: "40%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-0 bg-white rounded-t-[32px] shadow-2xl flex flex-col p-8 pt-4"
            >
              {/* Handle - Moved up 20px (pt-8 -> pt-4 is 16px, plus relative -top-1 is ~20px) */}
              <div className="w-12 h-1.5 bg-zinc-200 rounded-full mx-auto mb-6 shrink-0 relative -top-1" />
              
              <div className="flex-1 flex flex-col items-center">
                {/* Text Group - Moved down 20px from previous -32px position */}
                <div className="flex flex-col items-center relative -top-3">
                  <h3 className="font-serif text-2xl text-zinc-900 mb-2">{themeName}已记录</h3>
                  <p className="text-zinc-500 text-xs font-serif tracking-wider">邀请好友一起，拼成色彩九宫格吧~</p>
                </div>
                
                {/* 3x3 Color Grid - Moved down slightly */}
                <div className="grid grid-cols-3 gap-2 w-full max-w-[240px] aspect-square mb-6 relative top-[5px]">
                  {[...Array(9)].map((_, i) => {
                    const photo = photos[i];
                    return (
                      <div 
                        key={i} 
                        className={`rounded-xl overflow-hidden border border-zinc-100 aspect-square ${!photo ? 'bg-zinc-50 flex items-center justify-center' : ''}`}
                      >
                        {photo ? (
                          <img src={photo} className="w-full h-full object-cover" referrerPolicy="no-referrer" crossOrigin="anonymous" />
                        ) : (
                          <Plus size={16} className="text-zinc-300" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Share Button - Moved down 20px from previous -16px position */}
                <button 
                  onClick={() => setShowShareSheet(false)}
                  className="w-full py-3.5 bg-zinc-900 rounded-full text-white text-sm font-medium shadow-xl active:scale-95 transition-transform relative top-1 mb-3"
                >
                  分享美好
                </button>

                {/* Go Home Button */}
                <button 
                  onClick={onGoHome}
                  className="w-full py-3.5 bg-white border border-zinc-200 rounded-full text-zinc-800 text-sm font-medium shadow-sm active:scale-95 transition-transform relative top-1"
                >
                  寻找其他色彩
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ThemeDetailPage = ({ data, onExplore, onBack }: { data: PageData, onExplore: () => void, onBack: () => void }) => {
  return (
    <motion.div
      key="theme-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`relative w-full max-w-[400px] aspect-[9/19] ${data.themeDetail.mainColor} rounded-[40px] overflow-hidden shadow-2xl`}
      id="theme-detail-page"
    >
      {/* Top Section: Title (stays at the very top background) */}
      <div className="p-8 pt-6 text-white relative z-0">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-serif text-[60px] leading-tight mb-0 ml-[-6px]"
        >
          {data.themeDetail.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-pingfang text-[22px] tracking-[0.02em] opacity-60 font-extralight -mt-1"
        >
          {data.themeDetail.englishTitle}
        </motion.p>
      </div>

      {/* Middle Section: Illustration Card (75% height from bottom) */}
      <motion.div 
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.1, 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className={`absolute bottom-0 left-0 w-full h-[calc(78%+44px)] ${data.themeDetail.middleColor} rounded-t-[40px] z-10 flex flex-col items-center overflow-hidden`}
      >
        {/* Circle decoration */}
        <div className="absolute top-8 right-8 w-5 h-5 rounded-full border border-zinc-300" />

        {/* Text moved to top */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 mb-2 text-[14px] font-pingfang font-normal tracking-[0.14em] text-[#8e8e93] text-center w-full px-4 relative z-20"
        >
          记录色彩影像 · 感受生活情绪
        </motion.p>
        
        {/* Folder Illustration Container - Positioned to be visible above the white card */}
        <div className="w-full flex-1 flex flex-col items-center justify-start pt-10">
          <div className="relative w-[220px] h-[160px] scale-[1.35] translate-y-[15%]">
            {/* Back Flap (Bottom Background Layer) */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-[180px] h-[176px] bg-zinc-200/80 rounded-2xl border border-zinc-300/50 shadow-sm"
            />

            {/* Back Photos */}
            {data.themeDetail.photos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{ 
                  opacity: 1, 
                  y: i === 1 ? -22 : -4, 
                  rotate: i === 0 ? -10 : i === 1 ? 0 : 10,
                  x: i === 0 ? -52 : i === 1 ? 0 : 52
                }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.9 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-24 aspect-[3/4] bg-white rounded-lg shadow-lg overflow-hidden border-[3px] border-white"
              >
                <img src={photo} className="w-full h-full object-cover" referrerPolicy="no-referrer" crossOrigin="anonymous" />
              </motion.div>
            ))}

            {/* Front Folder */}
            <motion.div 
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0 }}
              className="absolute -bottom-[30px] left-1/2 -translate-x-1/2 w-[180px] h-[100px] bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl flex items-center justify-center"
            >
              <div className="absolute bottom-6 right-3 w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center text-white shadow-lg">
                <ArrowRight size={16} className="-rotate-45" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Section: Info Card (43% height from bottom) */}
      <motion.div 
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.2, 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="absolute bottom-0 left-0 w-full h-[43%] bg-white rounded-t-[40px] z-20 p-8 flex flex-col"
      >
        <div className="flex items-center gap-2 mt-1 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          <span className="text-[#52525b] text-[19px] font-pingfang font-normal">{data.title.slice(1)}</span>
          <div className="ml-auto w-5 h-5 rounded-full border border-zinc-200" />
        </div>
        
        <div className="flex-1 flex flex-col justify-center -mt-[30px]">
          <div className="h-[1px] w-full" style={{ backgroundImage: 'linear-gradient(to right, #d4d4d8 50%, transparent 50%)', backgroundSize: '12px 1px', backgroundRepeat: 'repeat-x' }} />
          <div className="py-4">
            <p className="text-[#8e8e93] text-[15px] leading-relaxed font-pingfang tracking-[0.08em]">
              {data.themeDetail.description.split('|')[0]}
            </p>
          </div>
          <div className="h-[1px] w-full" style={{ backgroundImage: 'linear-gradient(to right, #d4d4d8 50%, transparent 50%)', backgroundSize: '12px 1px', backgroundRepeat: 'repeat-x' }} />
          <div className="py-4">
            <p className="text-[#8e8e93] text-[15px] leading-relaxed font-pingfang tracking-[0.08em]">
              {data.themeDetail.description.split('|')[1]}
            </p>
          </div>
          <div className="h-[1px] w-full" style={{ backgroundImage: 'linear-gradient(to right, #d4d4d8 50%, transparent 50%)', backgroundSize: '12px 1px', backgroundRepeat: 'repeat-x' }} />
        </div>

        <div className="flex flex-col items-center gap-4 mt-1">
          <button 
            onClick={onExplore}
            className="w-[220px] py-3 bg-[#353535] text-white rounded-full font-pingfang font-light text-base tracking-widest shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 1024 1024" className="w-3.5 h-3.5 fill-white">
              <path d="M908.3 473.5s-149.2 31.8-190.5 42.9c-40.9 11.1-91.6-69.3-105.2-72.2-8.7 25.2-36.8 99.2-53.6 149.4 26-0.8 160.9 40.1 165.8 63.9 5.6 24.1 68.6 285.1 68.6 285.1s26.7 56.1-49.1 76.6c-75.9 20.5-79.3-41.9-79.3-41.9S612 777.1 607.3 765c-4.4-12.1-103.2-32.4-125.8-26.3-22.8 6.2-71.6 177.1-119.8 188.7-61.9 15-243.2-95.1-243.2-95.1s-71.6-17.7-57-84.9c14.9-66.7 84.4-48.5 84.4-48.5s128.4 70.6 143.2 62.3c15-8.4 23.5-57.1 45.4-104.3 0.9-17.8 51.3-159.3 51.3-159.3s27.9-94.2 16.8-100.1c-15.3-8.1-31.3 9.2-39.7 23.6-8.4 14.3-41.7 73.2-97.4 149.9-49.5 68.3-137.8 4.9-101.1-58.9 30.5-53.1 111.7-204.9 170.1-233.5 58.8-28.8 160.2-44.8 246.5-24.6 86.7 19.8 147.5 118 164.5 131 16.6 12.5 133.4-25.3 133.4-25.3s66.5-23.1 83 37.6c16.6 61.1-53.6 76.2-53.6 76.2zM635.1 223.3c-61.2 16.6-123.5-18.9-139.9-79.5-16.3-60.3 19.4-122.7 80.6-139.3C636.9-12 699.4 23.8 715.7 84.1c16.5 60.6-19.6 122.6-80.6 139.2z"></path>
            </svg>
            马上出发记录！
          </button>
          
          <button 
            onClick={onBack}
            className="flex items-center gap-1 text-zinc-400 text-xs font-pingfang tracking-[0.08em] hover:text-zinc-600 transition-colors"
          >
            我想看看别的色彩 <span className="text-[10px]">↩</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [viewState, setViewState] = useState<'manifest' | 'theme' | 'description' | 'print' | 'wall'>('manifest');
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [uploadedPhotos, setUploadedPhotos] = useState<Record<string, string[]>>({});
  const [extraWallPhotos, setExtraWallPhotos] = useState<Record<string, string[]>>({});
  const [wallPhotoPositions, setWallPhotoPositions] = useState<Record<string, Record<string, { x: number, y: number, rotate: number }>>>({});
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login state
  const [toast, setToast] = useState<string | null>(null);
  const [navigationSource, setNavigationSource] = useState<'manifest' | 'print'>('print');

  const handlePhotoUpload = (themeId: string, index: number, url: string) => {
    setUploadedPhotos(prev => {
      const currentThemePhotos = [...(prev[themeId] || [])];
      currentThemePhotos[index] = url;
      return { ...prev, [themeId]: currentThemePhotos };
    });
  };
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 40) {
      if (info.offset.x > 0) {
        setActiveIndex((prev) => (prev === 0 ? PAGES.length - 1 : prev - 1));
      } else {
        setActiveIndex((prev) => (prev === PAGES.length - 1 ? 0 : prev + 1));
      }
    }
  };

  const handleRandomMood = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * PAGES.length);
    } while (nextIndex === activeIndex && PAGES.length > 1);
    setActiveIndex(nextIndex);
  };

  const handleAddWallPhoto = (themeId: string, url: string) => {
    setExtraWallPhotos(prev => {
      const currentThemePhotos = [...(prev[themeId] || [])];
      currentThemePhotos.push(url);
      return { ...prev, [themeId]: currentThemePhotos };
    });
  };

  const handleDeleteWallPhoto = (themeId: string, url: string) => {
    setExtraWallPhotos(prev => {
      const currentThemePhotos = (prev[themeId] || []).filter(p => p !== url);
      return { ...prev, [themeId]: currentThemePhotos };
    });
    setUploadedPhotos(prev => {
      const currentThemePhotos = (prev[themeId] || []).filter(p => p !== url);
      return { ...prev, [themeId]: currentThemePhotos };
    });
  };

  const handleUpdatePhotoPosition = (themeId: string, photoUrl: string, x: number, y: number, rotate: number) => {
    setWallPhotoPositions(prev => ({
      ...prev,
      [themeId]: {
        ...(prev[themeId] || {}),
        [photoUrl]: { x, y, rotate }
      }
    }));
  };

  const activeData = PAGES.find(p => p.id === (selectedPageId || PAGES[activeIndex].id)) || PAGES[0];
  const currentUploadedCount = (selectedPageId && uploadedPhotos[selectedPageId]?.filter(Boolean).length) || 0;
  const isPrintEnabled = currentUploadedCount === 3;
  const activeColor = EMOTION_COLORS[PAGES[activeIndex].id] || '#B34E33';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 overflow-hidden">
      <AnimatePresence mode="wait">
        {viewState === 'manifest' ? (
          <motion.div
            key="manifest"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1, 
              backgroundColor: activeColor
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1],
              backgroundColor: { duration: 1, ease: "easeInOut" }
            }}
            className="relative w-full max-w-[400px] aspect-[9/19] rounded-[40px] overflow-hidden shadow-2xl flex flex-col p-8"
            id="manifest-page"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6" id="header">
              <div className="flex items-center gap-2" id="logo-section">
                <div className="w-2 h-2 bg-white rounded-full" id="logo-dot" />
                <span className="font-sans font-medium text-sm tracking-wide" id="logo-text">GOOD DAY</span>
              </div>
              <div className="flex items-center gap-3 relative">
                <button 
                  onClick={handleRandomMood}
                  className="px-4 py-2 rounded-full border border-white/30 flex items-center justify-center font-serif text-xs tracking-wide hover:bg-white/10 transition-colors"
                >
                  随机心情
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center bg-white/5 hover:bg-white/15 transition-all overflow-hidden"
                    aria-label="User Profile"
                  >
                    {isLoggedIn ? (
                      <img 
                        src="https://picsum.photos/seed/user/100/100" 
                        alt="User" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <User size={18} className="text-white/80" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <>
                        {/* Backdrop to close menu */}
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="fixed inset-0 z-[60]"
                        />
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute right-0 mt-2 w-[120px] rounded-2xl overflow-hidden z-[70] shadow-2xl border border-white/10"
                          style={{ 
                            backgroundColor: 'rgba(0, 0, 0, 0.65)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)'
                          }}
                        >
                          <div className="pt-3 px-3 pb-4 flex flex-col gap-3">
                            {/* Account Info */}
                            <div 
                              className="flex items-center gap-2 cursor-pointer group overflow-hidden"
                              onClick={() => !isLoggedIn && setIsLoggedIn(true)}
                            >
                              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
                                {isLoggedIn ? (
                                  <img 
                                    src="https://picsum.photos/seed/user/100/100" 
                                    alt="User" 
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-white" />
                                )}
                              </div>
                              <div className="flex flex-col overflow-hidden min-w-0">
                                <span className="text-white text-[12px] font-pingfang truncate">
                                  {isLoggedIn ? "用户ID: 88888" : "点击登录"}
                                </span>
                              </div>
                            </div>

                            <div className="h-[1px] w-full bg-white/10" />

                            {/* Menu Items */}
                            <div className="flex flex-col gap-3">
                              <button 
                                onClick={() => {
                                  if (isLoggedIn) {
                                    setNavigationSource('manifest');
                                    setViewState('wall');
                                    setIsUserMenuOpen(false);
                                  } else {
                                    setToast("功能请登录后再试哦~");
                                    setTimeout(() => setToast(null), 2000);
                                  }
                                }}
                                className="text-white text-xs font-pingfang text-left hover:opacity-70 transition-opacity"
                              >
                                我的照片墙
                              </button>
                              <button 
                                onClick={() => {
                                  if (!isLoggedIn) {
                                    setToast("功能请登录后再试哦~");
                                    setTimeout(() => setToast(null), 2000);
                                  }
                                }}
                                className="text-white text-xs font-pingfang text-left hover:opacity-70 transition-opacity"
                              >
                                我的任务
                              </button>
                              {isLoggedIn && (
                                <button 
                                  onClick={() => {
                                    setIsLoggedIn(false);
                                    setIsUserMenuOpen(false);
                                  }}
                                  className="text-white text-xs font-pingfang text-left hover:opacity-70 transition-opacity"
                                >
                                  登出账号
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="mb-16" id="title-section">
              <h1 className="font-serif text-base tracking-[0.2em] opacity-60 mb-4" id="main-title">
                Emotion selection & healing
              </h1>
              <div className="font-serif text-[42px] leading-[1.3] tracking-tight">
                选择你今天想<br />
                感受的心情 %
              </div>
            </div>

            {/* Stacked Image Carousel */}
            <div className="relative flex-1 flex flex-col items-center justify-center" id="carousel-section">
              <div className="absolute top-[-38px] left-0 w-full h-[1px] bg-white/20" id="divider" />
              
              <div className="relative w-full h-[320px] flex items-center justify-center perspective-1000 -mt-6" id="stack-container">
                <AnimatePresence initial={false}>
                  {PAGES.map((page, i) => {
                    const isCenter = i === activeIndex;
                    const offset = (i - activeIndex + PAGES.length) % PAGES.length;
                    
                    // Only show 5 items in the stack
                    if (offset > 4) return null;

                    return (
                      <motion.div
                        key={page.id}
                        style={isCenter ? { x, rotate, opacity, y: 0 } : {}}
                        drag={isCenter ? "x" : false}
                        dragDirectionLock
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={{ left: 0.8, right: 0.8, top: 0, bottom: 0 }}
                        onDragEnd={handleDragEnd}
                        initial={{ scale: 0.8, y: 60, opacity: 0 }}
                        animate={{ 
                          scale: 1 - offset * 0.05,
                          y: offset * 18,
                          x: isCenter ? 0 : offset * (i % 2 === 0 ? 12 : -12),
                          rotate: isCenter ? 0 : offset * (i % 2 === 0 ? 4 : -4),
                          zIndex: PAGES.length - offset,
                          opacity: 1 - offset * 0.18,
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 28,
                          mass: 1
                        }}
                        className={`absolute w-[240px] aspect-[4/5] rounded-[32px] overflow-hidden border-2 border-white cursor-grab active:cursor-grabbing shadow-2xl bg-zinc-800 group`}
                      >
                        <img 
                          src={page.image} 
                          alt={page.title}
                          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 contrast-110 pointer-events-none"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                        
                        {/* Explore Color Button */}
                        {isCenter && (
                          <div className="absolute inset-0 flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out pointer-events-none">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPageId(page.id);
                                setViewState('theme');
                              }}
                              className="w-full py-2.5 bg-transparent border border-white/40 text-white text-sm font-serif font-normal rounded-full transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-out pointer-events-auto hover:bg-white hover:text-zinc-950"
                            >
                              去探索
                            </button>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Carousel Indicators */}
              <div className="flex gap-2 mt-14" id="indicators">
                {PAGES.map((page, i) => (
                  <div 
                    key={page.id} 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-white w-4' : 'bg-white/30'}`} 
                  />
                ))}
              </div>
            </div>

            {/* Registry Info */}
            <div className="mt-8 mb-4 flex flex-col items-start" id="registry-section">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="font-serif text-5xl mb-2"
                  id="registry-number"
                >
                  {PAGES[activeIndex].subtitle}
                </motion.div>
              </AnimatePresence>
              <div className="font-mono text-[10px] tracking-[0.4em] text-white/40 uppercase pl-1">
                Healing Emotion
              </div>
            </div>
          </motion.div>
        ) : viewState === 'theme' ? (
          <ThemeDetailPage 
            data={activeData} 
            onExplore={() => setViewState('description')}
            onBack={() => {
              setViewState('manifest');
              setSelectedPageId(null);
            }}
          />
        ) : viewState === 'description' ? (
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full max-w-[400px] aspect-[9/19] ${activeData.bgColor} rounded-[40px] overflow-hidden shadow-2xl flex flex-col p-8 ${activeData.textColor}`}
            id="detail-page"
          >
            {/* Perforated Edge Effect */}
            <div className="absolute right-0 top-0 h-full flex flex-col justify-around py-8 pointer-events-none">
              {[...Array(24)].map((_, i) => (
                <div key={i} className={`w-2 h-2 ${activeData.textColor === 'text-white' ? 'bg-white/20' : 'bg-zinc-950/20'} rounded-full -mr-1`} />
              ))}
            </div>

            {/* Header */}
            <div className="flex items-center mb-6">
              <button 
                onClick={() => setViewState('theme')}
                className={`w-10 h-10 rounded-full border ${activeData.textColor === 'text-white' ? 'border-white/30' : 'border-zinc-950/20'} flex items-center justify-center transition-colors hover:bg-black/5`}
              >
                <ArrowLeft size={18} />
              </button>
            </div>

            {/* Title */}
            <div className="mb-4">
              <h1 className="font-serif text-[84px] leading-none tracking-tight">{activeData.details.title}</h1>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-8">
              {[
                '完成色彩任务',
                '记录并上传'
              ].map((text) => (
                <div 
                  key={text}
                  className={`flex-1 py-2 px-1 rounded-full border ${activeData.textColor === 'text-white' ? 'border-white/20' : 'border-zinc-900/20'} text-center font-pingfang text-[10px] tracking-widest`}
                >
                  {text}
                </div>
              ))}
            </div>

            {/* Content Sections */}
            <div className="space-y-10 flex-1">
              {activeData.details.items.map((item, i) => (
                <div key={item.title + i} className="relative pt-4">
                  <div className={`absolute top-0 left-0 w-full h-[1px] ${activeData.textColor === 'text-white' ? 'bg-white/10' : 'bg-zinc-900/10'}`} />
                  
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="mb-2">
                        <h2 className="font-serif text-3xl">{item.title}</h2>
                      </div>
                      <p className={`text-sm font-pingfang ${activeData.textColor === 'text-white' ? 'text-white/60' : 'text-zinc-600'} leading-relaxed max-w-[190px]`}>
                        {item.desc}
                      </p>
                    </div>

                    {/* 照片堆叠组件 */}
                    <PhotoStack 
                      initialImage={item.image} 
                      themeColor={activeData.textColor} 
                      onUpload={(url) => handlePhotoUpload(activeData.id, i, url)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Button */}
            <div className="mt-4 mb-10 flex justify-center">
              <button 
                disabled={!isPrintEnabled}
                onClick={() => {
                  setViewState('print');
                }}
                style={{ 
                  borderColor: EMOTION_COLORS[activeData.id], 
                  color: EMOTION_COLORS[activeData.id],
                  opacity: isPrintEnabled ? 1 : 0.3,
                  cursor: isPrintEnabled ? 'pointer' : 'not-allowed'
                }}
                className="px-10 py-3 border rounded-full flex items-center justify-center gap-2 font-sans font-medium text-sm transition-all hover:opacity-80 active:scale-95"
              >
                {activeData.details.footer} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ) : viewState === 'print' ? (
          <PrintPage 
            photos={uploadedPhotos[activeData.id] || []} 
            themeColor={EMOTION_COLORS[activeData.id]}
            themeName={activeData.details.title}
            onBack={() => setViewState('description')}
            onGoHome={() => setViewState('manifest')}
            onGoWall={() => {
              setNavigationSource('print');
              setViewState('wall');
            }}
          />
        ) : viewState === 'wall' ? (
          <PhotoWallPage 
            uploadedPhotos={uploadedPhotos}
            extraWallPhotos={extraWallPhotos}
            wallPhotoPositions={wallPhotoPositions}
            initialThemeId={activeData.id}
            onBack={() => {
              if (navigationSource === 'manifest') {
                setViewState('manifest');
              } else {
                setViewState('print');
              }
            }}
            onAddPhoto={handleAddWallPhoto}
            onUpdatePosition={handleUpdatePhotoPosition}
            onDeletePhoto={handleDeleteWallPhoto}
          />
        ) : null}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed top-1/2 left-1/2 z-[100] px-6 py-3 bg-black/80 backdrop-blur-md text-white text-sm font-pingfang rounded-full shadow-2xl pointer-events-none whitespace-nowrap"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
