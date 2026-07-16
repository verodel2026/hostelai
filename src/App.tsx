import React, { useState, useRef, useEffect } from 'react';
import { 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  Menu, 
  X, 
  MapPin, 
  MessageSquare, 
  Zap, 
  Utensils, 
  Target, 
  Sparkles,
  Clock,
  Search,
  ClipboardCheck,
  BarChart3,
  Smartphone,
  Star,
  Calendar,
  Check,
  Lock,
  ChevronDown,
  GraduationCap,
  Headset
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECT_DATA } from './constants';

const DEMO_RESENAS = [
  {
    chip: 'La de la espera',
    autor: 'M. R.', avatarBg: '#5C646D',
    meta: 'hace 3 días',
    texto: '40 minutos esperando con el local medio vacío. La comida bien, pero no volvemos.',
    respuesta: 'Gracias por contárnoslo, y tenéis razón: ese día la espera fue más larga de lo aceptable y faltó avisaros a tiempo. Lo hemos revisado para que no se repita. Nos alegra que la cocina mereciera la pena — nos encantaría teneros de vuelta y que la experiencia sea la que buscamos dar.',
    porQue: 'Da la razón en lo concreto, sin excusas — y sin prometer nada que el local no pueda cumplir.'
  },
  {
    chip: 'La sospechosa',
    autor: '¿?', avatarBg: '#c0392b',
    meta: 'cuenta creada ayer · 1 reseña en total',
    texto: 'Pésimo todo. El peor sitio de la zona. No recomiendo nada.',
    respuesta: 'Nos gustaría entender qué pasó, pero esta reseña no nos da nada con lo que trabajar: ni cuándo, ni qué, ni con quién. Si de verdad nos visitaste, cuéntanos el día y lo ocurrido — escuchamos siempre y, cuando fallamos, lo reconocemos.',
    porQue: 'Deja a la vista lo que cualquier lector ya nota — una reseña sin fecha ni detalle desde una cuenta recién creada — sin llamar mentiroso a nadie. La reclamación a Google, aparte y en silencio.'
  },
  {
    chip: 'La del enfado',
    autor: 'J. L.', avatarBg: '#1E2A4A',
    meta: 'hace 1 semana',
    texto: 'El camarero nos trató fatal, un borde. Se acabó, con la cantidad de sitios que hay.',
    respuesta: 'Lamentamos que salierais con esa sensación: no es el trato que buscamos dar a nadie. Tomamos nota de lo que contáis para revisarlo con el equipo. Si decidís volver, esperamos estar a la altura de lo que merece cualquier cliente.',
    porQue: 'Temple: ni discute ni tira al equipo bajo el autobús — y no compromete al dueño a nada que no haya decidido él.'
  }
];

const DemoResenas = () => {
  const [sel, setSel] = useState(0);
  const [txt, setTxt] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setTxt('');
    setDone(false);
    const full = DEMO_RESENAS[sel].respuesta;
    let k = 0;
    const t = setInterval(() => {
      k += 2;
      setTxt(full.slice(0, k));
      if (k >= full.length) { clearInterval(t); setDone(true); }
    }, 24);
    return () => clearInterval(t);
  }, [sel]);

  const r = DEMO_RESENAS[sel];

  return (
    <section id="demo" className="relative py-24 md:py-32 overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-[10px] md:text-xs font-bold text-brand-accent uppercase tracking-[0.3em] mb-4 font-sans">En vivo</p>
          <h2 className="font-serif text-3xl md:text-5xl text-brand-primary tracking-tight mb-4">Pulsa una reseña y mira cómo la respondo</h2>
          <p className="text-brand-secondary max-w-xl mx-auto">Tres clásicos que quitan el sueño a cualquier hostelero. Elige uno.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {DEMO_RESENAS.map((d, i) => (
            <button
              key={d.chip}
              onClick={() => setSel(i)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 font-sans border ${i === sel ? 'bg-brand-accent text-white border-brand-accent shadow-lg shadow-brand-accent/30' : 'bg-transparent text-brand-secondary border-brand-border hover:border-brand-accent hover:text-brand-accent'}`}
            >
              {d.chip}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Reseña */}
          <AnimatePresence mode="wait">
            <motion.div
              key={sel}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="bg-white/[0.06] border border-white/15 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold font-sans" style={{ backgroundColor: r.avatarBg }}>{r.autor.charAt(0)}</div>
                <div>
                  <p className="text-sm font-bold text-brand-primary font-sans">{r.autor}</p>
                  <p className="text-xs text-brand-secondary font-sans">{r.meta}</p>
                </div>
              </div>
              <div className="text-brand-accent tracking-widest mb-2" aria-label="1 estrella de 5">★<span className="text-brand-border">★★★★</span></div>
              <p className="text-brand-primary/90">{r.texto}</p>
            </motion.div>
          </AnimatePresence>

          {/* Respuesta escribiéndose */}
          <div className="bg-[#0b1626] border border-brand-accent/30 rounded-2xl p-6 min-h-[230px] flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center text-white font-bold font-sans">V</div>
              <div>
                <p className="text-sm font-bold text-white font-sans">Respuesta de Verónica</p>
                <p className="text-xs text-white/50 font-sans">{done ? 'publicada' : 'escribiendo…'}</p>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed">
              {txt}
              {!done && <span className="inline-block w-[2px] h-[1.05em] bg-brand-accent align-middle ml-[2px] animate-pulse" />}
            </p>
            {done && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-auto pt-4 text-xs text-white/60 border-t border-white/10 font-sans"
              >
                <span className="text-brand-accent font-bold uppercase tracking-[0.15em]">Por qué funciona · </span>{r.porQue}
              </motion.p>
            )}
          </div>
        </div>

        <p className="text-center text-brand-secondary text-sm mt-10">
          Esto, cada semana y con tus reseñas de verdad, es lo que hago por{' '}
          <a href="#precios" className="text-brand-accent font-bold hover:underline">120 €/mes</a>.
        </p>
      </div>
    </section>
  );
};

const SectionTitle = ({ title, subtitle, centered = true, light = false }: { title: string, subtitle?: string, centered?: boolean, light?: boolean }) => (
  <div className={`mb-16 md:mb-24 ${centered ? 'text-center' : 'text-left'}`}>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`${light ? 'text-brand-accent' : 'text-brand-accent'} font-bold tracking-[0.5em] uppercase text-[10px] mb-4`}
      >
        {subtitle}
      </motion.p>
    )}
    <h2 className={`text-3xl md:text-5xl font-serif font-medium mb-6 tracking-tighter italic ${light ? 'text-white' : 'text-brand-primary'}`}>{title}</h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      className={`h-px bg-brand-accent ${centered ? 'mx-auto' : ''}`} 
    />
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/[0.06] border border-white/10 p-10 card-hover ${className}`}>
    {children}
  </div>
);

const LegalModal = ({ isOpen, onClose, content }: { isOpen: boolean, onClose: () => void, content: any }) => {
  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0F1F33]/85 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative bg-brand-bg w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col border border-brand-border/40 shadow-2xl"
      >
        <div className="p-6 md:p-8 border-b border-brand-border/20 flex justify-between items-center bg-white">
          <h2 
            className={`text-2xl md:text-3xl font-serif font-bold text-brand-primary ${content.title.includes('COOKIES') ? 'notranslate' : ''}`}
            translate={content.title.includes('COOKIES') ? 'no' : undefined}
          >
            {content.title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-brand-soft/10 rounded-full transition-colors text-brand-primary"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-8 md:p-16 overflow-y-auto custom-scrollbar bg-brand-bg">
          <div className="space-y-12">
            {content.sections.map((section: any, idx: number) => (
              <div key={idx} className="space-y-6">
                <h3 
                  className={`text-lg font-serif font-bold text-brand-primary border-l-4 border-brand-accent pl-4 ${section.title.toLowerCase().includes('cookies') ? 'notranslate' : ''}`}
                  translate={section.title.toLowerCase().includes('cookies') ? 'no' : undefined}
                >
                  {section.title}
                </h3>
                <div 
                  className={`text-brand-secondary leading-relaxed font-light whitespace-pre-wrap text-sm md:text-base ${section.content.toLowerCase().includes('cookies') ? 'notranslate' : ''}`}
                  translate={section.content.toLowerCase().includes('cookies') ? 'no' : undefined}
                >
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 border-t border-brand-border/10 bg-white/50 text-center">
          <button 
            onClick={onClose}
            className="text-brand-secondary hover:text-brand-accent font-bold uppercase tracking-widest text-xs transition-colors py-2 px-4"
          >
            Cerrar ventana
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const BlogPostModal = ({ isOpen, onClose, post }: { isOpen: boolean, onClose: () => void, post: any }) => {
  if (!isOpen || !post) return null;

  const handleCtaClick = (targetId: string = 'contacto') => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0F1F33]/85 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative bg-brand-bg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-brand-border/40 shadow-2xl"
      >
        <div className="p-6 md:p-8 border-b border-brand-border/20 flex justify-between items-center bg-white">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-primary leading-tight pr-8">
            {post.title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-brand-soft/10 rounded-full transition-colors text-brand-primary shrink-0"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto custom-scrollbar bg-brand-bg">
          <div className="w-full h-64 md:h-[450px] relative">
            <img 
              src={post.image} 
              alt={post.imageAlt || post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 to-transparent" />
          </div>
          <div className="p-8 md:p-16 md:pt-12 space-y-12 max-w-3xl mx-auto">
            <div className="flex items-center gap-4 text-brand-accent text-sm font-bold uppercase tracking-widest">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            
            <div className="space-y-12">
              {post.sections.map((section: any, idx: number) => (
                <div key={idx} className="space-y-6">
                  {section.title && section.type !== 'mockup' && (
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-primary border-l-4 border-brand-accent pl-6">
                      {section.title}
                    </h3>
                  )}
                  
                  {section.type === 'mockup' ? (
                    <div className="space-y-6 py-8">
                      <h4 className="text-xl font-serif font-bold text-brand-primary text-center">
                        {section.title}
                      </h4>
                      <WhatsAppMockup section={section} />
                      {section.footer && (
                        <p className="text-center text-brand-secondary text-sm italic">
                          {section.footer}
                        </p>
                      )}
                    </div>
                  ) : section.type === 'review-mockup' ? (
                    <div className="space-y-6 py-8">
                      <h4 className="text-xl font-serif font-bold text-brand-primary text-center">
                        {section.title}
                      </h4>
                      <GoogleReviewMockup review={section.review} />
                      {section.footer && (
                        <p className="text-center text-brand-secondary text-sm italic">
                          {section.footer}
                        </p>
                      )}
                    </div>
                  ) : section.type === 'comparison-mockup' ? (
                    <div className="space-y-6 py-8">
                      <h4 className="text-xl font-serif font-bold text-brand-primary text-center">
                        {section.title}
                      </h4>
                      <ComparisonMockup data={section.comparison} />
                      {section.footer && (
                        <p className="text-center text-brand-secondary text-sm italic">
                          {section.footer}
                        </p>
                      )}
                    </div>
                  ) : section.type === 'list-mockup' ? (
                    <div className="space-y-6 py-8">
                      <h4 className="text-xl font-serif font-bold text-brand-primary text-center">
                        {section.title}
                      </h4>
                      <ListMockup items={section.items} />
                      {section.footer && (
                        <p className="text-center text-brand-secondary text-sm italic">
                          {section.footer}
                        </p>
                      )}
                    </div>
                  ) : section.type === 'checklist-mockup' ? (
                    <div className="space-y-6 py-8">
                      <h4 className="text-xl font-serif font-bold text-brand-primary text-center">
                        {section.title}
                      </h4>
                      <ChecklistMockup items={section.items} />
                      {section.footer && (
                        <p className="text-center text-brand-secondary text-sm italic">
                          {section.footer}
                        </p>
                      )}
                    </div>
                  ) : section.type === 'conversation-mockup' ? (
                    <div className="space-y-6 py-8">
                      <h4 className="text-xl font-serif font-bold text-brand-primary text-center">
                        {section.title}
                      </h4>
                      <ConversationMockup messages={section.conversation} />
                      {section.footer && (
                        <p className="text-center text-brand-secondary text-sm italic">
                          {section.footer}
                        </p>
                      )}
                    </div>
                  ) : section.type === 'image-block' ? (
                    <div className="space-y-6 py-8">
                      <h4 className="text-xl font-serif font-bold text-brand-primary text-center">
                        {section.title}
                      </h4>
                      <div className="max-w-2xl mx-auto overflow-hidden rounded-xl border border-brand-border/20 shadow-lg">
                        <img 
                          src={section.image} 
                          alt={section.title} 
                          className="w-full h-auto object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      {section.caption && (
                        <p className="text-center text-brand-secondary text-sm italic">
                          {section.caption}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className={`text-brand-secondary leading-relaxed font-light text-lg md:text-xl whitespace-pre-wrap ${section.type === 'intro' ? 'italic font-medium text-brand-primary border-b border-brand-border/20 pb-8' : ''} ${section.type === 'cta' ? 'bg-brand-soft/30 p-8 border border-brand-accent/20' : ''}`}>
                      {section.content}
                      
                      {section.type === 'cta' && (
                        <div className="mt-10 flex justify-center">
                          <button 
                            onClick={() => window.open('https://calendly.com/hostelaicalendly/30min', '_blank')}
                            className="flex items-center justify-center gap-6 bg-brand-vibrant text-white px-10 py-5 rounded-[50px] font-bold transition-all duration-500 hover:bg-brand-vibrant/90 shadow-[0_10px_30px_rgba(255,87,34,0.25)] hover:shadow-[0_20px_50px_rgba(255,87,34,0.45)] active:scale-[0.98] uppercase tracking-[0.25em] text-[12px] group w-full sm:w-auto"
                          >
                            <Calendar className="w-5 h-5 text-white" />
                            QUIERO MIS 15 MINUTOS GRATIS
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-brand-border/10 bg-white/50 text-center">
          <button 
            onClick={onClose}
            className="text-brand-secondary hover:text-brand-accent font-bold uppercase tracking-widest text-xs transition-colors py-2 px-4"
          >
            Cerrar lectura
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ConversationMockup = ({ messages }: { messages: any[] }) => {
  return (
    <div className="max-w-xl mx-auto bg-[#E5DDD5] border border-brand-border/20 shadow-lg rounded-2xl overflow-hidden aspect-[4/3] flex flex-col">
      <div className="bg-[#075E54] p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
          <Users className="w-6 h-6" />
        </div>
        <div className="text-white">
          <p className="font-bold text-sm">Cliente Satisfecho</p>
          <p className="text-[10px] opacity-80">en línea</p>
        </div>
      </div>
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`max-w-[80%] p-3 rounded-lg text-sm shadow-sm ${
              msg.role === 'cliente' 
                ? 'bg-white self-start rounded-tl-none' 
                : 'bg-[#DCF8C6] self-end ml-auto rounded-tr-none'
            }`}
          >
            {msg.text}
            <div className="text-[10px] text-gray-400 text-right mt-1">
              14:2{i}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ListMockup = ({ items }: { items: string[] }) => {
  return (
    <div className="max-w-xl mx-auto bg-white border border-brand-border/20 shadow-lg rounded-xl overflow-hidden">
      <div className="p-8 space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-brand-soft/20 rounded-lg border border-brand-border/10">
            <div className="w-2 h-2 bg-brand-accent rounded-full" />
            <span className="text-brand-primary font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChecklistMockup = ({ items }: { items: string[] }) => {
  return (
    <div className="max-w-xl mx-auto bg-white border border-brand-border/20 shadow-lg rounded-xl overflow-hidden">
      <div className="p-8 space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-4 hover:bg-brand-soft/10 transition-colors rounded-lg group">
            <div className="mt-1 w-5 h-5 rounded border-2 border-brand-accent/30 flex items-center justify-center group-hover:border-brand-accent transition-colors">
              <Check className="w-3 h-3 text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-brand-secondary group-hover:text-brand-primary transition-colors">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const GoogleReviewMockup = ({ review }: { review: any }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white border border-brand-border/20 shadow-lg rounded-xl overflow-hidden">
      <div className="p-6 space-y-6">
        {/* User Review */}
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-brand-soft rounded-full flex items-center justify-center text-brand-primary font-bold text-xl">
            {review.author[0]}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-brand-primary">{review.author}</span>
              <span className="text-xs text-brand-secondary/60">hace un momento</span>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <p className="text-brand-secondary text-sm italic">{review.text}</p>
          </div>
        </div>

        {/* Business Response */}
        <div className="ml-12 p-5 bg-brand-soft/20 border-l-4 border-brand-accent rounded-r-lg space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#1B3A5C] rounded-full flex items-center justify-center text-[10px] text-white font-bold">
              H
            </div>
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">Respuesta del propietario</span>
          </div>
          <p className="text-brand-primary text-sm leading-relaxed">{review.response}</p>
        </div>
      </div>
    </div>
  );
};

const ComparisonMockup = ({ data }: { data: any }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white p-6 border border-brand-border/20 rounded-xl shadow-sm">
        <div className="flex gap-4 mb-4">
          <div className="w-10 h-10 bg-brand-soft rounded-full flex items-center justify-center text-brand-primary font-bold">C</div>
          <div className="flex-1">
            <div className="flex gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-brand-secondary text-sm italic">{data.review}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-[10px]">
            <X className="w-3 h-3" />
            <span>{data.bad.label}</span>
          </div>
          <div className="bg-red-50/50 p-5 border border-red-100 rounded-xl text-brand-secondary text-sm italic">
            {data.bad.response}
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-brand-accent font-bold uppercase tracking-widest text-[10px]">
            <Check className="w-3 h-3" />
            <span>{data.better.label}</span>
          </div>
          <div className="bg-brand-soft/30 p-5 border border-brand-accent/20 rounded-xl text-brand-primary text-sm font-medium">
            {data.better.response}
          </div>
        </div>
      </div>
    </div>
  );
};

const WhatsAppMockup = ({ section }: { section: any }) => {
  return (
    <div className="max-w-[320px] mx-auto bg-[#E5DDD5] rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden relative aspect-[9/19]">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20" />
      
      {/* Header */}
      <div className="bg-[#075E54] text-white p-4 pt-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center text-gray-600 font-bold">
          H
        </div>
        <div>
          <div className="text-sm font-bold">HostelAI Demo</div>
          <div className="text-[10px] opacity-80">en línea</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 h-full overflow-y-auto custom-scrollbar pb-20">
        {section.mockupType === 'chat' ? (
          <div className="space-y-3">
            {section.messages.map((msg: any, i: number) => (
              <div 
                key={i} 
                className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm relative ${
                  msg.sender === 'client' 
                    ? 'bg-white self-start rounded-tl-none' 
                    : 'bg-[#DCF8C6] ml-auto rounded-tr-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div className="text-[9px] text-gray-500 text-right mt-1">
                  {14 + i}:{30 + i}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 bg-white/50 rounded-xl p-2">
            <div className="text-[10px] font-bold text-gray-500 uppercase px-2 mb-2">Etiquetas</div>
            {section.items.map((item: any, i: number) => (
              <div key={i} className="bg-white p-3 rounded-lg flex items-center justify-between shadow-sm border-l-4" style={{ borderLeftColor: item.color }}>
                <span className="text-sm font-medium text-gray-800">{item.label}</span>
                <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-[#F0F0F0] flex items-center gap-2">
        <div className="flex-grow bg-white rounded-full h-10 px-4 flex items-center text-gray-400 text-xs">
          Escribe un mensaje...
        </div>
        <div className="w-10 h-10 bg-[#128C7E] rounded-full flex items-center justify-center text-white">
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLegal, setActiveLegal] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<any | null>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(0);
  const [activeProblemIndex, setActiveProblemIndex] = useState<number | null>(null);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    _replyto: '',
    confirmEmail: '',
    message: '',
    privacyAccepted: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData._replyto || !formData.confirmEmail || !formData.message) {
      setFormStatus('error');
      return;
    }

    if (formData._replyto !== formData.confirmEmail) {
      alert('Los correos electrónicos no coinciden.');
      return;
    }

    if (!formData.privacyAccepted) {
      alert('Debes aceptar la política de privacidad.');
      return;
    }

    setFormStatus('loading');

    try {
      // Formspree endpoint
      const response = await fetch(`https://formspree.io/f/${PROJECT_DATA.formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          _replyto: formData._replyto,
          message: formData.message,
          _subject: `Nueva consulta de ${formData.name} - HostelAI`
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', _replyto: '', confirmEmail: '', message: '', privacyAccepted: false });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const getLegalContent = () => {
    if (!activeLegal) return null;
    if (activeLegal === 'Privacidad') return PROJECT_DATA.legal.privacidad;
    if (activeLegal === 'Cookies') return PROJECT_DATA.legal.cookies;
    if (activeLegal === 'Legal') return PROJECT_DATA.legal.avisoLegal;
    return null;
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-brand-text selection:bg-brand-accent/20">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-brand-bg/80 backdrop-blur-xl border-b border-brand-border/30">
        <div className="max-w-[1400px] mx-auto px-8 h-20 md:h-24 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 bg-[#1B3A5C] ring-1 ring-[#EFEAE0]/40 shadow-[0_0_16px_rgba(232,123,69,0.35)] flex items-center justify-center">
              <Utensils className="text-[#EFEAE0] w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-xl tracking-tighter text-brand-primary">
              HOSTEL<span className="text-brand-accent italic">AI</span>
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {['metodo', 'problemas', 'sobre-mi', 'servicios', 'precios', 'blog'].map((item, idx) => (
              <motion.button
                key={item}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => scrollToSection(item)}
                className="text-[10px] font-semibold text-brand-secondary hover:text-brand-primary transition-all uppercase tracking-[0.25em] relative group shrink-0"
              >
                {item === 'metodo' ? 'Mi método' : item === 'sobre-mi' ? 'Sobre Mí' : item === 'blog' ? 'Blog' : item.replace('-', ' ')}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-brand-accent transition-all duration-500 group-hover:w-full" />
              </motion.button>
            ))}
            <button 
              onClick={() => window.open('https://calendly.com/hostelaicalendly/30min', '_blank')}
              className="btn-primary !py-3 !px-6 !text-[10px] ml-2 shrink-0"
            >
              Reserva el café
            </button>
          </div>

          <button className="md:hidden text-brand-primary p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-0 z-40 bg-brand-bg pt-24 pb-10 px-6 md:hidden border-b border-brand-border/30 shadow-xl"
          >
            <div className="flex flex-col gap-5 text-center">
              {['metodo', 'problemas', 'sobre-mi', 'servicios', 'precios', 'blog'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-xl font-serif text-brand-primary hover:text-brand-accent transition-colors"
                >
                  {item === 'metodo' ? 'Mi método' : item === 'sobre-mi' ? 'Sobre Mí' : item === 'blog' ? 'Blog' : item.replace('-', ' ')}
                </button>
              ))}
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  window.open('https://calendly.com/hostelaicalendly/30min', '_blank');
                }}
                className="btn-primary mt-4 py-3"
              >
                Reserva el café
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header id="inicio" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#0F1F33]">
        <div className="luces-hero">
          <div className="luz-h v1" style={{ left: '16%' }}><div className="cable" style={{ height: 64 }} /><div className="foco" style={{ width: 20, height: 20 }} /></div>
          <div className="luz-h v2" style={{ left: '36%' }}><div className="cable" style={{ height: 110 }} /><div className="foco" style={{ width: 15, height: 24 }} /></div>
          <div className="luz-h v3" style={{ left: '62%' }}><div className="cable" style={{ height: 50 }} /><div className="foco" style={{ width: 28, height: 22 }} /></div>
          <div className="luz-h v4" style={{ left: '82%' }}><div className="cable" style={{ height: 90 }} /><div className="foco" style={{ width: 15, height: 15 }} /></div>
        </div>
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=2070" 
            alt="Hospitality Venue" 
            className="w-full h-full object-cover grayscale brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 via-transparent to-brand-primary" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 w-full">
          <div className="max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-1 bg-brand-vibrant mb-12"
              />

              <h1 className="text-[clamp(2.5rem,6vw,8rem)] font-serif font-light text-white mb-12 leading-[1.1] tracking-tight italic">
                <span className="text-brand-vibrant not-italic font-medium">Google</span> {PROJECT_DATA.heroTitle.split('Google')[1]}
              </h1>

              <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light mb-16 max-w-2xl mt-16">
                {PROJECT_DATA.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => window.open('https://calendly.com/hostelaicalendly/30min', '_blank')}
                  className="flex items-center justify-center gap-6 bg-brand-vibrant text-white px-10 py-5 rounded-[50px] font-bold transition-all duration-500 hover:bg-brand-vibrant/90 shadow-[0_10px_30px_rgba(255,87,34,0.25)] hover:shadow-[0_20px_50px_rgba(255,87,34,0.45)] active:scale-[0.98] uppercase tracking-[0.25em] text-[12px] group"
                >
                  <Calendar className="w-5 h-5 text-white" />
                  Reserva el café — 15 min
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Section Transition: Hero -> Mi Método */}
        <div className="absolute -bottom-1 left-0 w-full h-[150px] z-10 pointer-events-none bg-gradient-to-b from-transparent to-[#0F1F33]" />
      </header>

      {/* Mi Método Section */}
      <section id="metodo" className="relative py-24 md:py-40 bg-transparent overflow-hidden">
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 w-full">
          <div className="text-center mb-24">
            <p className="text-brand-accent font-semibold tracking-[0.4em] uppercase text-[10px] mb-4">MI MÉTODO</p>
            <div className="w-10 h-[2px] bg-brand-accent mx-auto mb-6" />
            <h2 className="text-5xl md:text-7xl font-serif font-light text-brand-primary mb-6 leading-[1.1] tracking-tight italic">
              Tres pasos. Sin humo.
            </h2>
            <p className="text-brand-secondary text-lg md:text-xl font-sans max-w-2xl mx-auto">
              Así trabajo con cada hostelero que me contrata. Nada de teoría. Nada de promesas vacías.
            </p>
          </div>

          <div className="space-y-32 md:space-y-48">
            {[
              {
                id: '01',
                tag: 'PASO 01 · ESCUCHAR',
                title: 'Escucho',
                desc: '15 minutos contigo para entender qué te quita el sueño. Sin vender, sin teoría. Solo preguntas y tu realidad.',
                img: 'https://raw.githubusercontent.com/verodel2026/hostelai/main/public/images/metodo/paso1-escucho.webp'
              },
              {
                id: '02',
                tag: 'PASO 02 · DIAGNOSTICAR',
                title: 'Diagnostico',
                desc: 'Reviso tu Google Business, tus reseñas, tu comunicación. Te digo dónde pierdes dinero ahora mismo — con datos, no opiniones.',
                img: 'https://raw.githubusercontent.com/verodel2026/hostelai/main/public/images/metodo/paso2-diagnostico.webp'
              },
              {
                id: '03',
                tag: 'PASO 03 · ACTUAR',
                title: 'Actúo',
                desc: 'Implemento las soluciones que tu negocio necesita. Tú sigues atendiendo tu local, yo me encargo de lo digital.',
                img: 'https://raw.githubusercontent.com/verodel2026/hostelai/main/public/images/metodo/paso3-actuo.webp'
              }
            ].map((step, idx) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
              >
                <div className="flex-1 w-full relative">
                  <span className="absolute -top-16 -left-8 text-[160px] md:text-[240px] font-serif font-bold text-brand-accent/15 leading-none pointer-events-none select-none">
                    {step.id}
                  </span>
                  <div className="relative z-10 pt-8">
                    <p className="text-brand-accent font-semibold tracking-[0.4em] uppercase text-[10px] mb-6">{step.tag}</p>
                    <h3 className="text-4xl md:text-6xl font-serif font-light text-brand-primary mb-8 leading-tight italic">
                      {step.title}
                    </h3>
                    <p className="text-brand-secondary text-lg md:text-xl leading-relaxed font-sans max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-brand-accent/5 rounded-[24px] blur-2xl group-hover:bg-brand-accent/10 transition-colors duration-700" />
                    <img 
                      src={step.img} 
                      alt={step.title}
                      className="relative w-full aspect-video object-contain rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bloque transparencia IA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-32 md:mt-48 max-w-3xl mx-auto"
          >
            <div className="relative border border-brand-border/60 rounded-[16px] px-8 md:px-14 py-12 md:py-16 bg-brand-soft/20">
              <div className="absolute -top-5 left-8 md:left-14 flex items-center gap-2 bg-brand-bg px-4 py-1.5">
                <Sparkles className="w-4 h-4 text-brand-accent" strokeWidth={1.5} />
                <span className="text-brand-accent font-semibold tracking-[0.4em] uppercase text-[10px]">Sin trucos</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-serif font-light text-brand-primary mb-8 leading-tight italic">
                Esta web la ha construido una IA.<br />Yo le he dicho cómo.
              </h3>
              <div className="space-y-5 text-brand-secondary text-lg md:text-xl leading-relaxed font-sans">
                <p>
                  No te lo escondo, al revés: es parte de lo que te ofrezco. Uso inteligencia artificial cada día para trabajar más rápido y a menor coste. Esta página es la prueba de que sé hacerlo.
                </p>
                <p>
                  Pero la herramienta no tiene criterio. Yo sí. Detrás de cada reseña que respondo hay 20 años de barra: sé lo que molesta a un cliente, lo que hay que callar y lo que conviene decir. Eso no lo pone una máquina.
                </p>
                <p className="text-brand-primary font-medium">
                  La IA me hace rápida. La hostelería me hace útil. Tú te llevas las dos cosas.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mt-40 md:mt-64 bg-brand-soft/30 -mx-8 md:-mx-12 px-8 md:px-12 py-24 rounded-sm border-y border-brand-border/40">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-light text-brand-primary mb-4 leading-tight italic">
                Formación y experiencia real
              </h2>
              <div className="w-10 h-[2px] bg-brand-accent mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {[
                { icon: <GraduationCap className="w-10 h-10" />, text: 'Automatización con IA — Ironhack' },
                { icon: <GraduationCap className="w-10 h-10" />, text: 'Marketing Digital — ISDI' },
              { icon: <Headset className="w-10 h-10" />, text: 'Gestión de clientes y resolución de problemas en entornos de alta presión' },
                { icon: <Utensils className="w-10 h-10" />, text: 'Experiencia propia en hostelería y catering' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-6 group">
                  <div className="text-brand-accent transition-transform duration-500 group-hover:scale-110">
                    {React.cloneElement(item.icon as React.ReactElement, { strokeWidth: 1.5 })}
                  </div>
                  <p className="text-brand-primary font-sans font-medium text-sm md:text-base leading-relaxed px-4">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Transition: Mi Método -> Sobre Mi */}
        <div className="absolute -bottom-1 left-0 w-full h-[150px] z-10 pointer-events-none bg-gradient-to-b from-transparent to-[#0F1F33]" />
      </section>

      {/* Sobre Mí Section */}
      <section id="sobre-mi" className="relative py-24 md:py-32 overflow-hidden bg-transparent">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000" 
            alt="Cafe Interior" 
            className="w-full h-full object-cover blur-[2px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#0F1F33]/60" />
          {/* Top Transition Mask */}
          <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-t from-transparent to-[#0F1F33]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-8 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="text-brand-accent font-semibold tracking-[0.4em] uppercase text-[10px] mb-12">Sobre Mí</p>
            
            <h2 className="text-5xl md:text-7xl font-serif font-light text-brand-primary mb-12 leading-[1.1] tracking-tight italic">
              ¡Oído cocina!
            </h2>

            <div className="max-w-2xl mx-auto">
              <p className="text-brand-primary text-xl md:text-2xl leading-relaxed font-normal mb-12">
                Soy Verónica Delgado y conozco la hostelería desde la trinchera. Trabajo con hosteleros como tú para pasar del caos operativo al orden rentable, con procesos claros y sin herramientas raras. Práctica real de quien conoce el sector.
              </p>

              <button 
                onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                className="mb-16 px-8 py-3 border border-brand-accent text-brand-primary text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-accent hover:text-white transition-all duration-500 rounded-[50px]"
              >
                {isAboutExpanded ? 'LEER MENOS' : 'Conóceme más'}
              </button>

              {/* El contenido está SIEMPRE en el HTML (los buscadores y las IA lo leen);
                  solo se pliega/despliega visualmente. */}
              <motion.div
                    initial={false}
                    animate={isAboutExpanded ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                    style={!isAboutExpanded ? { height: 0, opacity: 0 } : undefined}
                  >
                    <div className="space-y-8 text-brand-primary text-lg leading-relaxed italic font-normal text-left">
                      {PROJECT_DATA.about.content.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>

                    <div className="flex justify-center py-16">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                      >
                        <div className="absolute -inset-4 border border-brand-accent/20 rounded-full" />
                        <img 
                          src="https://i.imgur.com/onraVAj.png" 
                          alt="Verónica Delgado" 
                          className="w-[300px] h-[300px] object-cover transition-all duration-700 rounded-full border-2 border-brand-accent shadow-2xl"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Section Transition: Sobre Mi -> Servicios */}
        <div className="absolute -bottom-1 left-0 w-full h-[150px] z-10 pointer-events-none bg-gradient-to-b from-transparent to-[#001f3f]" />
      </section>


      {/* Servicios y Tarifas Section */}
      <section id="servicios" className="relative py-24 md:py-32 overflow-hidden bg-[#1E2A4A]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000" 
            alt="Planning" 
            className="w-full h-full object-cover blur-[5px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#1E2A4A]/65" />
          {/* Top Transition Mask */}
          <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-t from-transparent to-[#1E2A4A]" />
        </div>

        <div className="max-w-[1200px] mx-auto px-8 md:px-12 relative z-10">
          <SectionTitle 
            title="Servicios Estratégicos" 
            subtitle="Soluciones directas" 
            light={true}
          />
          
          <div className="space-y-4">
            {PROJECT_DATA.rates
              .filter(rate => rate.name === "Sesión 1:1" || rate.name === "Auditoría inicial" || rate.name === "Gestión de reseñas")
              .map((rate, idx) => (
              <motion.div
                key={rate.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="border-b border-white/10"
              >
                <button
                  onClick={() => setActiveServiceIndex(activeServiceIndex === idx ? null : idx)}
                  className="w-full py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between text-left group transition-all gap-4 md:gap-0"
                >
                  <div className="flex items-baseline gap-6 md:gap-8">
                    <span className="text-brand-accent font-serif italic text-lg md:text-xl opacity-40">0{idx + 1}</span>
                    <h3 className="text-2xl md:text-4xl font-serif font-light text-white italic tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                      {rate.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-end gap-6 md:gap-8 w-full md:w-auto">
                    <span
                      onClick={(e) => { e.stopPropagation(); scrollToSection('precios'); }}
                      className="text-[10px] md:text-xs font-bold text-brand-accent uppercase tracking-[0.25em] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Ver precio ↓
                    </span>
                    <div className={`w-10 h-10 md:w-12 md:h-12 border border-white/10 flex items-center justify-center transition-all duration-500 ${activeServiceIndex === idx ? 'bg-brand-accent text-white rotate-45' : 'group-hover:border-brand-accent'}`}>
                      <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${activeServiceIndex === idx ? 'text-white' : 'text-white group-hover:text-white'}`} />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {activeServiceIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-12 md:pb-16 grid lg:grid-cols-12 gap-10 md:gap-20">
                        <div className="lg:col-span-5">
                          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light italic mb-8">
                            {rate.desc}
                          </p>
                          <div className="p-6 bg-white/5 border-l-4 border-brand-accent">
                            <p className="text-[9px] font-bold text-white mb-3 uppercase tracking-[0.4em]">Ideal para ti si:</p>
                            <p className="text-white/70 text-sm leading-relaxed font-light italic">{rate.idealFor}</p>
                          </div>
                          <button 
                            onClick={() => window.open('https://calendly.com/hostelaicalendly/30min', '_blank')}
                            className="mt-8 btn-primary w-full md:w-auto"
                          >
                            {rate.cta}
                          </button>
                        </div>

                        <div className="lg:col-span-7">
                          <p className="text-[9px] font-bold text-brand-accent uppercase tracking-[0.4em] mb-8">Qué incluye:</p>
                          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                            {rate.includes.map((item, i) => (
                              <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-3 text-white/70 text-sm md:text-base font-light"
                              >
                                <div className="mt-1 w-3.5 h-3.5 rounded-full border border-brand-accent/30 flex items-center justify-center shrink-0">
                                  <Check className="w-2 h-2 text-brand-accent" />
                                </div>
                                <span className="leading-relaxed">{item}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section Transition: Servicios -> Puntos de Fuga */}
        <div className="absolute -bottom-1 left-0 w-full h-[150px] z-10 pointer-events-none bg-gradient-to-b from-transparent to-[#1E2A4A]" />
      </section>

      {/* Puntos de Fuga (Compacto y Oscuro) */}
      <section id="problemas" className="relative py-12 md:py-20 overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000" 
            alt="Professional Kitchen" 
            className="w-full h-full object-cover blur-[3px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#1E2A4A]/85" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 w-full">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white mb-4 leading-tight italic">
              Puntos de Fuga
            </h2>
          </div>
          
          <div className="hidden md:grid md:grid-cols-4 gap-6">
            {PROJECT_DATA.problems.map((problem, idx) => {
              const icons = [
                <Clock className="w-8 h-8" />,
                <MessageSquare className="w-8 h-8" />,
                <Star className="w-8 h-8" />,
                <ClipboardCheck className="w-8 h-8" />,
                <Zap className="w-8 h-8" />,
                <BarChart3 className="w-8 h-8" />,
                <Smartphone className="w-8 h-8" />,
                <Target className="w-8 h-8" />
              ];

              return (
                <div 
                  key={idx}
                  className="bg-white p-6 rounded-sm shadow-xl flex flex-col items-center text-center group hover:translate-y-[-4px] transition-all duration-500 border border-brand-accent/5 hover:border-brand-accent/20"
                >
                  <div className="text-brand-accent mb-4 scale-75 bg-brand-soft/30 p-4 rounded-full group-hover:scale-90 transition-transform duration-500">
                    {icons[idx]}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-serif italic text-brand-primary leading-tight mb-2 flex items-center">
                    {problem.title}
                  </h3>

                  <div className="w-8 h-px bg-brand-accent/30 mb-4" />
                  
                  <p className="text-[13px] font-sans italic text-brand-primary/80 leading-relaxed mb-4">
                    {problem.copy}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-brand-border/40 w-full">
                    <p className="text-[9px] md:text-[10px] font-sans font-extrabold text-brand-accent uppercase tracking-[0.2em] leading-tight">
                      {problem.solution}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Accordion */}
          <div className="md:hidden space-y-3">
            {PROJECT_DATA.problems.map((problem, idx) => {
              const icons = [
                <Clock className="w-5 h-5" />,
                <MessageSquare className="w-5 h-5" />,
                <Star className="w-5 h-5" />,
                <ClipboardCheck className="w-5 h-5" />,
                <Zap className="w-5 h-5" />,
                <BarChart3 className="w-5 h-5" />,
                <Smartphone className="w-5 h-5" />,
                <Target className="w-5 h-5" />
              ];
              const isOpen = activeProblemIndex === idx;

              return (
                <div 
                  key={idx}
                  className="bg-white rounded-sm shadow-md overflow-hidden border border-brand-accent/5"
                >
                  <button
                    onClick={() => setActiveProblemIndex(isOpen ? null : idx)}
                    className="w-full p-4 flex items-center justify-between text-left transition-colors hover:bg-brand-soft/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-brand-accent">
                        {icons[idx]}
                      </div>
                      <h3 className="text-base font-serif italic text-brand-primary leading-tight">
                        {problem.title}
                      </h3>
                    </div>
                    <ChevronDown 
                      className={`w-4 h-4 text-brand-accent transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 pb-5 pt-1 space-y-4">
                          <div className="w-10 h-px bg-brand-accent/30" />
                          <p className="text-[13px] font-sans italic text-brand-primary/80 leading-relaxed">
                            {problem.copy}
                          </p>
                          <div className="pt-3 border-t border-brand-border/40">
                            <p className="text-[9px] font-sans font-extrabold text-brand-accent uppercase tracking-[0.2em] leading-tight text-center">
                              {problem.solution}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Transition: Puntos de Fuga -> Blog */}
        <div className="absolute -bottom-1 left-0 w-full h-[150px] z-10 pointer-events-none bg-gradient-to-b from-transparent to-[#F3EDE2]" />
      </section>

      {/* Precios Section */}
      <DemoResenas />

      <section id="precios" className="relative py-24 md:py-32 overflow-hidden papel-grano">
        <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-12">
          <SectionTitle
            subtitle="Precios"
            title="Esto es lo que hago, esto es lo que cuesta"
          />

          {/* La pizarra de precios */}
          <div className="pizarra-marco mb-20">
            <div className="pizarra">
              <p className="piz-titulo">La pizarra de HostelAI</p>
              <p className="piz-sub">precios de hoy — y de todos los días</p>
              <div className="piz-grid">
                <div className="piz-item">
                  <p className="piz-nombre">Auditoría de tu ficha</p>
                  <p className="piz-precio">149 €<small> una vez</small></p>
                  <p className="piz-desc">Abro tu ficha de Google contigo y te digo qué está pasando de verdad, con plan de acción en cristiano.</p>
                </div>
                <div className="piz-item">
                  <p className="piz-nombre">Reseñas y ficha, mes a mes</p>
                  <p className="piz-precio">120 €<small>/mes</small></p>
                  <p className="piz-desc">Yo llevo lo que Google dice de ti. Tú llevas el local. Te vas cuando quieras.</p>
                </div>
                <div className="piz-item">
                  <p className="piz-nombre">Una hora para un problema</p>
                  <p className="piz-precio">59 €<small> suelta</small></p>
                  <p className="piz-desc">«¿Cómo respondo a ESTA reseña?» · «¿Cómo recupero mi ficha?» · Sales con el camino claro.</p>
                </div>
              </div>
              <p className="piz-nota">✓ si vamos al mensual, la auditoría se descuenta del primer mes — sin permanencia, factura con IVA</p>
            </div>
          </div>

          {/* Semana a semana */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-serif text-brand-primary italic mb-4 text-center">Tu primer mes conmigo, semana a semana</h3>
            <p className="text-brand-secondary text-center max-w-2xl mx-auto mb-12">
              No te cuento promesas: te cuento cómo fue el primer mes con mi primer cliente,
              un restaurante de esta zona, en junio de 2026. Contigo sería parecido, porque el método es este:
            </p>
            <div className="ticket-zona">
              <div className="ticket">
                <div className="t-cab">
                  <b>HOSTELAI</b>
                  <span>COMANDA · TU PRIMER MES</span>
                  <span>Mesa: tu local · Camarera: Vero</span>
                </div>
                <div className="t-linea"><b>SEMANA 1</b><span>Poner orden</span></div>
                <div className="t-linea"><b>SEMANA 2</b><span>Que la ficha respire</span></div>
                <div className="t-linea"><b>SEMANA 3</b><span>Lo que surja, gestionado</span></div>
                <div className="t-linea"><b>SEMANA 4</b><span>Sembrar reseñas nuevas</span></div>
                <div className="t-linea"><b>VIERNES</b><span>Resumen por WhatsApp</span></div>
                <div className="t-total"><span>TOTAL</span><span>120 €/mes</span></div>
                <div className="t-pie">Sin permanencia · IVA aparte<br/>GRACIAS POR SU VISITA</div>
                <div className="t-sello">Caso real</div>
              </div>
            </div>
            <div className="space-y-10 max-w-3xl mx-auto">
              {[
                { sem: 'Semana 1', titulo: 'Poner orden', texto: 'Me encontré cuatro meses de reseñas sin responder y las puse al día todas. También apareció lo que nadie había mirado: Google enseñaba una carta vieja con platos que ya no existían, y la ficha ni siquiera era del dueño — la retenía una agencia con la que ya no trabajaba. Primera semana: reseñas al día, carta correcta y el papeleo para recuperar la propiedad en marcha.' },
                { sem: 'Semana 2', titulo: 'Que la ficha respire', texto: 'Descripción del local bien escrita, fotos, horarios verificados. Una ficha completa y viva sube en el buscador; una abandonada se hunde sola.' },
                { sem: 'Semana 3', titulo: 'El susto', texto: 'Entró una tanda de reseñas de una estrella que no cuadraba. El dueño lo supo por mí antes que por nadie, las denunciamos a Google una por una y decidimos juntos qué se contestaba y qué no — porque hay reseñas que no conviene responder en caliente, y saber cuáles es medio oficio. La nota del local aguantó.' },
                { sem: 'Semana 4', titulo: 'Sembrar', texto: 'Códigos QR en mesas y barra para que el cliente contento deje su reseña en el momento. Antes de imprimir nada, el texto revisado contra las normas de Google — que hasta para pedir reseñas hay reglas.' },
              ].map((s, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-6 md:gap-10"
                >
                  <div className="shrink-0 w-16 md:w-20 text-right">
                    <p className="text-brand-accent font-bold text-[10px] uppercase tracking-[0.2em]">{s.sem}</p>
                  </div>
                  <div className="border-l border-brand-accent/40 pl-6 md:pl-10 pb-2">
                    <h4 className="font-serif text-xl text-brand-primary italic mb-2">{s.titulo}</h4>
                    <p className="text-brand-secondary leading-relaxed">{s.texto}</p>
                  </div>
                </motion.div>
              ))}
              <div className="flex gap-6 md:gap-10">
                <div className="shrink-0 w-16 md:w-20 text-right">
                  <p className="text-brand-accent font-bold text-[10px] uppercase tracking-[0.2em]">Siempre</p>
                </div>
                <div className="border-l border-brand-accent/40 pl-6 md:pl-10">
                  <p className="text-brand-secondary leading-relaxed">
                    <span className="text-brand-primary font-semibold">Y todas las semanas:</span> un resumen por WhatsApp.
                    Qué entró, qué respondí, cómo va tu nota. Corto, en cristiano, sin hacerte perder tiempo.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-brand-primary text-center max-w-2xl mx-auto mt-12 leading-relaxed">
              Resultado del mes, con los datos de la propia ficha: la eficacia del perfil pasó
              del <span className="font-semibold">72% al 77%</span>, entraron once reseñas nuevas y la nota se mantuvo
              pese al ataque. Esa ficha la habían mirado <span className="font-semibold">29.000 personas</span> en
              seis meses — eso es lo que hay en juego en un local normal de esta zona.
            </p>
          </div>

          {/* Preguntas de barra */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-serif text-brand-primary italic mb-4 text-center">Preguntas de barra</h3>
            <p className="text-brand-secondary text-center mb-12">Las pongo como me las dicen, no como quedan bonitas.</p>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
              {[
                { q: '«¿Y esto no me lo hace una aplicación por cuatro duros?»', a: 'Responder por responder, sí. Pero una aplicación no sabe que ese cliente que se queja del precio pidió el whisky más caro de la estantería, ni que a esa reseña no se le contesta señalando a nadie del equipo, ni que si hay un lío serio de por medio lo prudente es callar unos días. Yo eso lo sé porque llevo veinte años del otro lado de la barra. Uso herramientas de IA para ir rápido — y lo declaro por contrato — pero el criterio no se subcontrata.' },
                { q: '«¿Y no puede hacerlo mi sobrino, que sabe de ordenadores?»', a: 'Poder, puede. Como puede tu cuñado cambiarte la instalación eléctrica. La pregunta es quién responde cuando entra una reseña que te puede costar clientes de verdad, un martes a las once de la noche. Si tu sobrino tiene oficio de hostelería y constancia, adelante: te sale gratis. Mi cliente es el que ya probó eso y la ficha volvió a quedarse sola.' },
                { q: '«¿Qué me vas a pedir?»', a: 'Acceso de gestora a tu ficha de Google, que me das tú desde tu móvil conmigo delante. La propiedad es tuya siempre, y me retiras cuando te dé la gana, sin avisar ni dar explicaciones. No toco tu banco, tu TPV ni tus redes.' },
                { q: '«¿Me atas con un contrato?»', a: 'No. Mes a mes, factura con IVA. Si un mes no te compensa, lo dejas. Yo me juego la renovación cada mes con el resumen que te mando cada semana — ahí ves si valgo lo que cobro.' },
                { q: '«¿Y las reseñas de cinco estrellas, me las consigues?»', a: 'Compradas no, que te juegas la ficha: Google suspende perfiles por eso. Lo que monto es el camino corto para el cliente contento — el QR en la mesa — y el resto lo hace tu cocina y tu sala, que para eso son lo que son.' },
                { q: '«Mi ficha la lleva una empresa de fuera / la hizo un socio que ya no está»', a: 'Me lo he encontrado ya, y es más serio de lo que parece: sin la propiedad, tu escaparate en Google no es tuyo. Sé el camino para reclamarla. Es lo primero que miro en la auditoría.' },
                { q: '«¿Cuándo se nota?»', a: 'El orden, la primera semana: todo respondido, carta correcta, ficha completa. Subir en el mapa y que suene más el teléfono son dos o tres meses. Del que te prometa el milagro con fecha, desconfía.' },
                { q: '«¿Y una página web, me la haces?»', a: 'Aparte y con su presupuesto, si de verdad la necesitas. Lo digo así de claro porque una vez la regalé dentro del mensual y aprendí la lección: lo que no se cobra, no se valora — y lo acaba pagando el trabajo que sí importa, que son tus reseñas.' },
              ].map((f, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 2) * 0.08 }}
                
                  className="posavasos-sq"
                >
                  <h4 className="font-serif text-lg text-brand-primary italic mb-3">{f.q}</h4>
                  <p className="text-brand-secondary text-sm leading-relaxed">{f.a}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA: Un café y tu ficha */}
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-serif text-brand-primary italic mb-6">Un café y tu ficha</h3>
            <p className="text-brand-secondary leading-relaxed mb-8">
              Quince minutos, en tu local: abrimos tu perfil de Google juntos y te enseño lo que
              tus clientes ven y tú no. Sin compromiso y sin PowerPoint. Si después no quieres
              nada más, el café me lo llevo yo de aprendizaje.
            </p>
            <button
              onClick={() => window.open('https://calendly.com/hostelaicalendly/30min', '_blank')}
              className="px-10 py-4 bg-brand-accent text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-brand-primary transition-all duration-500 rounded-[50px]"
            >
              Reserva el café
            </button>
          </div>
        </div>

        {/* Section Transition: Precios -> Blog */}
        <div className="absolute -bottom-1 left-0 w-full h-[150px] z-10 pointer-events-none bg-gradient-to-b from-transparent to-[#16294a]" />
      </section>

      {/* Blog Section */}
      <section id="blog" className="relative py-24 md:py-40 overflow-hidden bg-[#16294a]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.imgur.com/9CVEOSH.jpeg" 
            alt="Restaurante al atardecer" 
            className="w-full h-full object-cover blur-[1px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#16294a]/80" />
          {/* Top Transition Mask */}
          <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-t from-transparent to-[#16294a]" />
        </div>
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 relative z-10">
          <SectionTitle 
            title="Lecturas para el hostelero" 
            subtitle="BLOG" 
            light={false}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PROJECT_DATA.blog.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer flex flex-col h-full bg-white border border-brand-border/40 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-brand-primary/5"
                onClick={() => setActivePost(post)}
              >
                <div className="relative aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <img 
                    src={post.image} 
                    alt={post.imageAlt || post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors duration-700" />
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-brand-accent text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-light text-brand-primary mb-6 leading-tight italic tracking-tight group-hover:text-brand-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-brand-secondary text-base leading-relaxed font-light mb-10 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-8 border-t border-brand-border/40 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary group-hover:text-brand-accent transition-colors">Leer artículo</span>
                    <ArrowRight className="w-4 h-4 text-brand-accent group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section Transition: Blog -> Contacto */}
        <div className="absolute -bottom-1 left-0 w-full h-[150px] z-10 pointer-events-none bg-gradient-to-b from-transparent to-[#b65d3b]" />
      </section>

      {/* Contact Section */}
      <section id="contacto" className="relative pt-24 md:pt-40 pb-12 overflow-hidden bg-[#b65d3b]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000" 
            alt="Table Setting" 
            className="w-full h-full object-cover blur-[2px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#b65d3b]/60" />
          {/* Top Transition Mask */}
          <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-t from-transparent to-[#b65d3b]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div>
              <p className="text-white font-semibold tracking-[0.4em] uppercase text-[10px] mb-8">Contacto</p>
              <h2 className="text-5xl md:text-8xl font-serif font-light text-white mb-12 leading-[1] italic tracking-tight">
                ¿Hablamos?
              </h2>
              <p className="text-xl text-white/90 leading-relaxed font-light mb-16 max-w-md">
                Si buscas criterio operativo real y soluciones directas para tu negocio, cuéntame qué necesitas.
              </p>
              
              <div className="space-y-12">
                <div className="flex items-center gap-8 group cursor-pointer" onClick={() => window.location.href = `mailto:${PROJECT_DATA.email}`}>
                  <div className="w-12 h-12 border border-white/40 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                    <MessageSquare className="w-5 h-5 text-white group-hover:text-[#b65d3b]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">Email</p>
                    <p className="text-lg font-serif italic text-white group-hover:text-white/80 transition-colors">{PROJECT_DATA.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 group cursor-pointer" onClick={() => window.location.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PROJECT_DATA.location)}`}>
                  <div className="w-12 h-12 border border-white/40 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                    <MapPin className="w-5 h-5 text-white group-hover:text-[#b65d3b]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">Ubicación</p>
                    <p className="text-lg font-serif italic text-white group-hover:text-white/80 transition-colors">{PROJECT_DATA.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-12 md:p-16 border border-white/20">
              <form 
                action={`https://formspree.io/f/${PROJECT_DATA.formspreeId}`}
                method="POST"
                onSubmit={handleSubmit} 
                className="space-y-10"
              >
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white">Nombre completo</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre..."
                    className="w-full bg-transparent border-b border-white/40 py-4 focus:border-white outline-none transition-colors font-light text-lg text-white placeholder:text-white/40"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white">Email de contacto</label>
                    <input 
                      type="email" 
                      name="_replyto"
                      value={formData._replyto}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      className="w-full bg-transparent border-b border-white/40 py-4 focus:border-white outline-none transition-colors font-light text-lg text-white placeholder:text-white/40"
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white">Repite tu email</label>
                    <input 
                      type="email" 
                      name="confirmEmail"
                      value={formData.confirmEmail}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      className="w-full bg-transparent border-b border-white/40 py-4 focus:border-white outline-none transition-colors font-light text-lg text-white placeholder:text-white/40"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white">¿En qué puedo ayudarte?</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4} 
                    placeholder="Cuéntame brevemente tu situación..."
                    className="w-full bg-transparent border-b border-white/40 py-4 focus:border-white outline-none transition-colors font-light text-lg resize-none text-white placeholder:text-white/40"
                    required
                  ></textarea>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative flex items-center h-5">
                    <input
                      id="privacyAccepted"
                      name="privacyAccepted"
                      type="checkbox"
                      checked={formData.privacyAccepted}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-white/40 bg-transparent text-brand-accent focus:ring-brand-accent transition-colors cursor-pointer"
                      required
                    />
                  </div>
                  <div className="text-xs text-white/70 leading-relaxed">
                    <label htmlFor="privacyAccepted" className="cursor-pointer">
                      He leído y acepto la <button type="button" onClick={() => setActiveLegal('Privacidad')} className="text-white hover:text-brand-accent underline transition-colors">Política de Privacidad</button> y el tratamiento de mis datos según el RGPD.
                    </label>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={formStatus === 'loading'}
                  className="w-full btn-primary !py-6 flex items-center justify-center gap-4 !bg-brand-accent !text-white border-none"
                >
                  {formStatus === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : formStatus === 'success' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Mensaje enviado con éxito
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {formStatus === 'error' && (
                  <p className="text-white text-xs text-center font-medium">Ocurrió un error. Por favor, inténtalo de nuevo.</p>
                )}
              </form>
            </div>
          </div>
        </div>
        {/* Section Transition: Contacto -> Footer */}
        <div className="absolute -bottom-1 left-0 w-full h-[150px] z-10 pointer-events-none bg-gradient-to-b from-transparent to-[#1E2A4A]" />
      </section>

      {/* Footer */}
      <footer className="bg-[#1E2A4A] text-brand-bg pt-12 pb-8 relative z-20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 text-center">
          {/* Bloque de Frases */}
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-base font-serif italic text-brand-bg/90 mb-3 leading-relaxed">
              "Si notas que tu negocio funciona demasiado por improvisación o por costumbre, seguramente ya estás perdiendo oportunidades sin darte cuenta."
            </p>
            <p className="text-sm font-sans text-white leading-relaxed">
              Una buena operativa no solo reduce el caos, también mejora la rentabilidad y la experiencia de tus clientes.
            </p>
          </div>

          {/* Zonas donde trabajo */}
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.25em] text-brand-bg/40 mb-3 font-medium">Dónde trabajo</p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              <span className="text-xs text-brand-bg/60">A Coruña</span>
              {[['Oleiros','gestion-resenas-oleiros'],['Sada','gestion-resenas-sada'],['Betanzos','gestion-resenas-betanzos'],['Arteixo','gestion-resenas-arteixo'],['Culleredo','gestion-resenas-culleredo'],['Cambre','gestion-resenas-cambre'],['Carballo','gestion-resenas-carballo']].map(([n, s]) => (
                <a key={s} href={'/' + s + '/'} className="text-xs text-brand-bg/60 hover:text-brand-accent transition-colors">{n}</a>
              ))}
            </div>
          </div>

          {/* Guías */}
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.25em] text-brand-bg/40 mb-3 font-medium">Guías de reseñas</p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {[['Responder reseñas negativas','como-responder-resenas-negativas'],['Aparecer en Google Maps','como-aparecer-en-google-maps'],['Subir la nota en Google','como-subir-nota-google'],['¿Merece la pena responder?','merece-la-pena-responder-resenas'],['Reseñas falsas: qué hacer','resena-falsa-google'],['Recuperar tu ficha de una agencia','agencia-controla-tu-ficha-google']].map(([n, s]) => (
                <a key={s} href={'/' + s + '/'} className="text-xs text-brand-bg/60 hover:text-brand-accent transition-colors">{n}</a>
              ))}
            </div>
          </div>

          {/* Botones Legales */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-10">
            {['Privacidad', 'Cookies', 'Legal'].map((item) => (
              <button 
                key={item}
                onClick={() => setActiveLegal(item)}
                className={`text-[10px] uppercase tracking-[0.2em] text-brand-bg/40 hover:text-brand-accent transition-colors font-medium ${item === 'Cookies' ? 'notranslate' : ''}`}
                translate={item === 'Cookies' ? 'no' : undefined}
              >
                {item === 'Legal' ? 'Aviso Legal' : item}
              </button>
            ))}
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-brand-accent flex items-center justify-center">
                <Utensils className="text-white w-3 h-3" />
              </div>
              <span className="font-serif font-bold text-lg tracking-tighter">
                HOSTEL<span className="text-brand-accent italic">AI</span>
              </span>
            </div>
            
            <p className="text-brand-bg/30 text-[10px] uppercase tracking-[0.2em] font-medium">
              © {new Date().getFullYear()} HostelAI. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {activeLegal && (
          <LegalModal 
            isOpen={!!activeLegal} 
            onClose={() => setActiveLegal(null)} 
            content={getLegalContent()} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activePost && (
          <BlogPostModal 
            isOpen={!!activePost} 
            onClose={() => setActivePost(null)} 
            post={activePost} 
          />
        )}
 </AnimatePresence>
      <a
        href={"https://wa.me/34646244535"}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
