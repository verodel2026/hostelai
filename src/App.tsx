import React, { useState, useRef } from 'react';
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
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECT_DATA } from './constants';

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
  <div className={`bg-white p-10 card-hover ${className}`}>
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
        className="absolute inset-0 bg-brand-primary/80 backdrop-blur-sm"
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
        className="absolute inset-0 bg-brand-primary/80 backdrop-blur-sm"
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
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                          {post.id === 'responder-resenas-google-hosteleria' ? (
                            <button 
                              onClick={() => handleCtaClick('servicios')}
                              className="flex items-center justify-center gap-6 bg-white text-brand-primary border border-brand-accent px-10 py-5 rounded-[50px] font-bold transition-all duration-500 hover:bg-brand-soft/10 hover:shadow-xl active:scale-[0.98] uppercase tracking-[0.25em] text-[12px] group flex-1"
                            >
                              <Star className="w-5 h-5 fill-[#F5C518] text-[#F5C518]" />
                              Gestiona tus reseñas
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleCtaClick('contacto')}
                              className="btn-primary flex-1 py-4 text-base"
                            >
                              Solicitar auditoría inicial
                            </button>
                          )}
                          <button 
                            onClick={() => handleCtaClick('contacto')}
                            className="btn-accent flex-1 py-4 text-base"
                          >
                            Reservar sesión 1:1
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
            <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center text-[10px] text-white font-bold">
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
  const [currentProblemSlide, setCurrentProblemSlide] = useState(0);
  const problemCarouselRef = useRef<HTMLDivElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    _replyto: '',
    confirmEmail: '',
    message: '',
    privacyAccepted: false
  });

  const handleProblemScroll = () => {
    if (problemCarouselRef.current) {
      const container = problemCarouselRef.current;
      const scrollPosition = container.scrollLeft;
      const cardWidth = container.querySelector('.perspective-1000')?.clientWidth || 0;
      const gap = 24; // gap-6
      const newIndex = Math.round(scrollPosition / (cardWidth + gap));
      if (newIndex !== currentProblemSlide) {
        setCurrentProblemSlide(newIndex);
      }
    }
  };

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
            <div className="w-8 h-8 bg-brand-primary flex items-center justify-center">
              <Utensils className="text-white w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-xl tracking-tighter text-brand-primary">
              HOSTEL<span className="text-brand-accent italic">AI</span>
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {['inicio', 'problemas', 'sobre-mi', 'servicios', 'blog'].map((item, idx) => (
              <motion.button
                key={item}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => scrollToSection(item)}
                className="text-[10px] font-semibold text-brand-secondary hover:text-brand-primary transition-all uppercase tracking-[0.25em] relative group shrink-0"
              >
                {item === 'sobre-mi' ? 'Sobre Mí' : item === 'blog' ? 'Blog' : item.replace('-', ' ')}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-brand-accent transition-all duration-500 group-hover:w-full" />
              </motion.button>
            ))}
            <button 
              onClick={() => scrollToSection('contacto')}
              className="btn-primary !py-3 !px-6 !text-[10px] ml-2 shrink-0"
            >
              Contacta
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
              {['inicio', 'problemas', 'sobre-mi', 'servicios', 'blog'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-xl font-serif text-brand-primary hover:text-brand-accent transition-colors"
                >
                  {item === 'sobre-mi' ? 'Sobre Mí' : item === 'blog' ? 'Blog' : item.replace('-', ' ')}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contacto')}
                className="btn-primary mt-4 py-3"
              >
                Contacta
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header id="inicio" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-brand-bg">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=2070" 
            alt="Hospitality Venue" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/0 via-brand-bg/40 to-brand-bg" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 w-full">
          <div className="max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-brand-accent font-semibold tracking-[0.5em] uppercase text-[10px] mb-12">
                Hostelería Real & Criterio Operativo
              </p>
              
              <h1 className="text-[clamp(2.5rem,8vw,10rem)] font-serif font-light text-brand-primary mb-16 leading-[0.9] tracking-tight italic">
                {PROJECT_DATA.heroTitle}
              </h1>
              
              <div className="flex flex-col lg:flex-row gap-20 items-start">
                <div className="max-w-xl">
                  <p className="text-lg md:text-xl text-brand-secondary leading-relaxed font-light mb-12">
                    {PROJECT_DATA.subtitle}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6">
                    <button 
                      onClick={() => scrollToSection('servicios')}
                      className="flex items-center justify-center gap-6 bg-white text-brand-primary border border-brand-accent px-10 py-5 rounded-[50px] font-bold transition-all duration-500 hover:bg-brand-soft/10 hover:shadow-xl active:scale-[0.98] uppercase tracking-[0.25em] text-[12px] group"
                    >
                      <Star className="w-5 h-5 fill-[#F5C518] text-[#F5C518]" />
                      Gestiona tus reseñas
                    </button>
                  </div>
                </div>

                <div className="hidden lg:block flex-1 pt-4">
                  <div className="h-px w-full bg-brand-border/60 mb-8" />
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-2">Especialización</p>
                      <p className="text-sm text-brand-primary font-medium">Hostelería Real</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-2">Enfoque</p>
                      <p className="text-sm text-brand-primary font-medium">Criterio Operativo</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-6"
        >
          <div className="w-px h-24 bg-gradient-to-b from-brand-border to-transparent" />
        </motion.div>
      </header>

      {/* Problemas Section */}
      <section id="problemas" className="relative py-16 md:py-24 overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000" 
            alt="Professional Kitchen" 
            className="w-full h-full object-cover blur-[3px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#001f3f]/70" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 w-full">
          <SectionTitle 
            title="Puntos de Fuga" 
            subtitle="El diagnóstico"
            light={true}
          />
          
          <div 
            ref={problemCarouselRef}
            onScroll={handleProblemScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 no-scrollbar"
          >
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
                  className="perspective-1000 h-[240px] md:h-[280px] cursor-pointer snap-center shrink-0 w-[75vw] sm:w-full"
                  onClick={(e) => {
                    const card = e.currentTarget.querySelector('.preserve-3d');
                    if (card) card.classList.toggle('rotate-y-180');
                  }}
                >
                  <div className="relative w-full h-full transition-transform duration-700 preserve-3d">
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-white p-6 md:p-8 flex flex-col items-center justify-center text-center rounded-sm shadow-xl">
                      <span className="absolute top-4 right-4 md:top-6 md:right-6 text-[10px] font-bold text-brand-accent uppercase tracking-widest">
                        Voltea →
                      </span>
                      <div className="text-brand-primary mb-4 md:mb-6 scale-90 md:scale-100">
                        {icons[idx]}
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif italic text-brand-primary leading-tight">
                        {problem.title}
                      </h3>
                    </div>
                    
                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden bg-white text-brand-primary p-4 md:p-5 rotate-y-180 flex flex-col items-center justify-center text-center rounded-sm border border-brand-accent/30 shadow-sm">
                      <div className="w-full">
                        <h4 className="text-brand-accent font-serif italic text-base md:text-lg mb-1">
                          ¡Falla tu Mise en Place!
                        </h4>
                        <p className="text-[12px] md:text-[13px] font-sans italic text-brand-primary leading-[1.4] mb-2 md:mb-3">
                          {problem.copy}
                        </p>
                      </div>
                      
                      <div className="w-10 md:w-12 h-px bg-brand-accent/30 mb-2 md:mb-3" />
                      
                      <p className="text-[10px] md:text-[11px] font-sans font-bold text-brand-primary uppercase tracking-[0.2em] leading-tight">
                        {problem.solution}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Dots (Mobile Only) */}
          <div className="flex justify-center gap-2 mt-8 sm:hidden">
            {PROJECT_DATA.problems.map((_, idx) => (
              <div 
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentProblemSlide === idx ? 'bg-brand-accent w-4' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Mí Section */}
      <section id="sobre-mi" className="relative py-24 md:py-32 overflow-hidden border-b border-brand-border/20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000" 
            alt="Cafe Interior" 
            className="w-full h-full object-cover blur-[2px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#fdfbf7]/60" />
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
                Trabajo con hosteleros como tú para pasar del caos operativo al orden rentable, con procesos claros y sin herramientas raras. Práctica real de quien conoce el sector.
              </p>

              <button 
                onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                className="mb-16 px-8 py-3 border border-brand-accent text-brand-primary text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-accent hover:text-white transition-all duration-500 rounded-[50px]"
              >
                {isAboutExpanded ? 'LEER MENOS' : 'Conóceme más'}
              </button>

              <AnimatePresence>
                {isAboutExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-8 text-brand-primary text-lg leading-relaxed italic font-normal text-left mb-16">
                      {PROJECT_DATA.about.content.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>

                    <div className="pt-16 border-t border-brand-border/40 mb-16">
                      <p className="text-center text-brand-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-10">
                        Criterio Formativo
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { 
                            name: 'Ironhack', 
                            url: 'https://ironhack.com', 
                            style: 'bg-[#1D3461] text-white border-transparent' 
                          },
                          { 
                            name: 'ISDI', 
                            url: 'https://isdi.es', 
                            style: 'bg-black text-white border-transparent' 
                          },
                          { 
                            name: 'Kuestiona', 
                            url: 'https://kuestiona.com', 
                            style: 'bg-black text-white border-[#F5C518]' 
                          }
                        ].map((school) => (
                          <a
                            key={school.name}
                            href={school.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative p-6 md:p-10 ${school.style} border-2 rounded-[50px] transition-all duration-500 text-center hover:shadow-2xl hover:-translate-y-2 flex items-center justify-center min-h-[80px] md:min-h-[140px]`}
                          >
                            <span className="font-serif font-bold text-xl md:text-3xl tracking-tight">
                              {school.name}
                            </span>
                            {school.name === 'Kuestiona' && (
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#F5C518] rounded-full mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                            )}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center pb-12">
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
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Servicios y Tarifas Section */}
      <section id="servicios" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000" 
            alt="Planning" 
            className="w-full h-full object-cover blur-[5px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#1a252f]/65" />
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
                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-2">
                        {rate.pricePrefix && (
                          <span className="text-[10px] md:text-xs font-bold text-brand-accent uppercase tracking-widest">
                            {rate.pricePrefix}
                          </span>
                        )}
                        <span className="text-xl md:text-3xl font-bold text-white tracking-tighter">
                          {rate.price}
                        </span>
                        {rate.priceSuffix && (
                          <span className="text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-widest">
                            {rate.priceSuffix}
                          </span>
                        )}
                      </div>
                    </div>
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
                            onClick={() => scrollToSection('contacto')}
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

            {/* Locked Services Block (Acceso a Clientes) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 p-8 md:p-12 bg-[#fdfbf7] border border-brand-accent/20 rounded-sm text-center relative group"
            >
              <div className="max-w-2xl mx-auto">
                <div className="relative inline-block w-full">
                  <div 
                    className="w-full py-4 px-6 bg-white border border-brand-accent/30 text-[#b65d3b] rounded-sm flex items-center justify-center gap-4 transition-all"
                  >
                    <Lock className="w-4 h-4 opacity-70 stroke-[1.5px]" />
                    <span className="text-sm md:text-base font-bold tracking-tight">
                      Área exclusiva para clientes. Si ya hemos trabajado juntos, recibirás tu acceso por email.
                    </span>
                  </div>
                </div>
                
                <p className="mt-12 py-8 border-y border-[#b65d3b]/30 text-[15px] md:text-[16px] text-[#1a252f] leading-[1.8] font-normal italic max-w-2xl mx-auto text-center">
                  Para garantizar que cada euro que inviertas sea rentable, este área es para negocios que ya he auditado personalmente.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="relative py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.imgur.com/9CVEOSH.jpeg" 
            alt="Restaurante al atardecer" 
            className="w-full h-full object-cover blur-[1px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/40" />
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
      </section>

      {/* Contact Section */}
      <section id="contacto" className="relative pt-24 md:pt-40 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000" 
            alt="Table Setting" 
            className="w-full h-full object-cover blur-[2px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#b65d3b]/60" />
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
      </section>

      {/* Footer */}
      <footer className="bg-brand-primary text-brand-bg pt-12 pb-8 border-t border-white/5">
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
    </div>
  );
}
