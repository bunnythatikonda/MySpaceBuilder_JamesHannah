'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  Wrench, PaintBucket, Sparkles, Hammer, Car, ShieldCheck, FileCheck, Gem, Truck, Squircle,
  Star, Phone, Mail, MapPin, Clock, ChevronRight, Award, Users, CheckCircle2, ArrowRight,
  Calendar as CalIcon, Upload, Send, MessageCircle, Menu, X, Facebook, Instagram, Youtube,
  ChevronLeft, Zap, Trophy, BadgeCheck, Camera, MoveHorizontal, Quote, AlertCircle,
} from 'lucide-react'

// ----- IMAGE ASSETS -----
const IMG = {
  hero: 'https://images.unsplash.com/photo-1512080482556-ea648017576c?auto=format&fit=crop&w=2000&q=80',
  services: [
    'https://images.unsplash.com/photo-1673187139211-1e7ec3dd60ec?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1632823639409-ce060d5a54cc?auto=format&fit=crop&w=900&q=80',
    'https://images.pexels.com/photos/6870314/pexels-photo-6870314.jpeg?auto=compress&w=900',
    'https://images.unsplash.com/photo-1635691035955-2763da0d6f19?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1674632917668-6237bad1347d?auto=format&fit=crop&w=900&q=80',
    'https://images.pexels.com/photos/14231684/pexels-photo-14231684.jpeg?auto=compress&w=900',
    'https://images.pexels.com/photos/14231701/pexels-photo-14231701.jpeg?auto=compress&w=900',
    'https://images.unsplash.com/photo-1727893304219-063d142ce6f3?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1580679568899-be51739ba2df?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1605437241278-c1806d14a4d9?auto=format&fit=crop&w=900&q=80',
  ],
  gallery: [
    'https://image.pollinations.ai/prompt/A%20wrecked%20black%20BMW%20luxury%20sedan%20after%20front-end%20collision%2C%20smashed%20front%20bumper%2C%20crumpled%20hood%2C%20broken%20headlight%20and%20grille%2C%20debris%20on%20ground%2C%20parked%20on%20city%20street%2C%20three-quarter%20front%20view%2C%20photorealistic%2C%20cinematic%20lighting%2C%20detailed%20damage?width=1600&height=900&seed=42&nologo=true',
    'https://image.pollinations.ai/prompt/A%20black%20BMW%20luxury%20sedan%20fully%20repaired%20and%20pristine%2C%20glossy%20paint%20finish%2C%20parked%20in%20clean%20modern%20auto%20body%20shop%20with%20professional%20lighting%2C%20three-quarter%20front%20view%2C%20photorealistic%2C%20cinematic%2C%20showroom%20quality?width=1600&height=900&seed=42&nologo=true',
    'https://images.pexels.com/photos/32897253/pexels-photo-32897253.jpeg?auto=compress&w=1200',
    'https://images.pexels.com/photos/30893737/pexels-photo-30893737.jpeg?auto=compress&w=1200',
  ],
  facility: 'https://images.unsplash.com/photo-1727893119356-1702fe921cf9?auto=format&fit=crop&w=1400&q=80',
  techs: [
    'https://images.pexels.com/photos/4489758/pexels-photo-4489758.jpeg?auto=compress&w=600',
    'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=600&q=80',
  ],
}

// ----- DATA -----
const SERVICES = [
  { icon: Car, title: 'Collision Repair', desc: 'Full-service collision damage repair restoring your vehicle to pre-accident condition.', img: IMG.services[0] },
  { icon: PaintBucket, title: 'Paint Matching', desc: 'Computerized color matching for a flawless OEM-quality factory finish.', img: IMG.services[1] },
  { icon: Hammer, title: 'Dent Removal', desc: 'Paintless dent repair (PDR) for door dings, hail damage and minor dents.', img: IMG.services[2] },
  { icon: Wrench, title: 'Frame Straightening', desc: 'Laser-measured frame and unibody straightening on certified racks.', img: IMG.services[3] },
  { icon: Squircle, title: 'Bumper Repair', desc: 'Cracked, scuffed or torn bumpers repaired or replaced quickly.', img: IMG.services[4] },
  { icon: Sparkles, title: 'Scratch Removal', desc: 'Multi-stage paint correction & polishing to eliminate scratches and swirls.', img: IMG.services[5] },
  { icon: FileCheck, title: 'Insurance Claims', desc: 'We handle the entire claims process with all major insurance providers.', img: IMG.services[6] },
  { icon: Gem, title: 'Ceramic Coating', desc: 'Long-lasting ceramic protection for hydrophobic, scratch-resistant shine.', img: IMG.services[7] },
  { icon: Truck, title: 'Fleet Services', desc: 'Priority scheduling, volume pricing & dedicated service for fleet operators.', img: IMG.services[8] },
  { icon: ShieldCheck, title: 'Glass Replacement', desc: 'Windshield & auto glass replacement with OEM-grade materials.', img: IMG.services[9] },
]

const STATS = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 10000, suffix: '+', label: 'Repairs Completed' },
  { value: 100, suffix: '%', label: 'Insurance Approved' },
  { value: 5, suffix: '★', label: 'Lifetime Paint Warranty' },
]

const WHY = [
  { icon: ShieldCheck, title: 'Insurance Assistance', desc: 'Direct billing with every major carrier. Zero paperwork stress.' },
  { icon: Award, title: 'Certified Technicians', desc: 'I-CAR Gold Class & ASE Master certified body specialists.' },
  { icon: BadgeCheck, title: 'OEM Quality Repairs', desc: 'Only manufacturer-approved parts and repair procedures.' },
  { icon: Zap, title: 'Fast Turnaround', desc: 'Most repairs completed in 3-7 days with real-time text updates.' },
  { icon: Trophy, title: 'Lifetime Warranty', desc: 'Every paint and body repair backed by a written lifetime warranty.' },
  { icon: Sparkles, title: 'State-of-the-Art', desc: 'Downdraft paint booths, computerized frame racks, laser measuring.' },
]

const REVIEWS = [
  { name: 'Sarah Mitchell', role: 'Verified Customer', avatar: 'https://i.pravatar.cc/120?img=47', rating: 5,
    text: 'After a bad rear-end collision on Kellogg, James Hannah\'s team made my Lexus look brand new. They handled my entire State Farm claim and even arranged a rental. Six weeks later — paint match is perfect, no orange peel, nothing.' },
  { name: 'Marcus Reynolds', role: 'Fleet Manager', avatar: 'https://i.pravatar.cc/120?img=33', rating: 5,
    text: 'We run 24 service vans across Wichita. James Hannah keeps every one of them on the road. Their fleet pricing is fair, communication is constant, and the work is consistent. Best shop in Sedgwick County, hands down.' },
  { name: 'Jennifer Lopez', role: 'Verified Customer', avatar: 'https://i.pravatar.cc/120?img=44', rating: 5,
    text: 'Hail-damaged my new Tesla Model Y. I was sick about it. The paintless dent repair team got it back to factory condition in 4 days. Insurance covered everything. I cannot recommend these guys enough.' },
  { name: 'David Chen', role: 'Verified Customer', avatar: 'https://i.pravatar.cc/120?img=12', rating: 5,
    text: 'They restored my 1968 Camaro from a frame-off respray. Three months of work, museum-quality finish. James personally walked me through every stage. This is craftsmanship you can\'t find anymore.' },
  { name: 'Amanda Foster', role: 'Verified Customer', avatar: 'https://i.pravatar.cc/120?img=20', rating: 5,
    text: 'Hit a deer on K-96. Frame damage, airbags deployed, looked totaled. James Hannah negotiated with my insurance, repaired structural damage, and saved the car. Drives perfectly straight. True professionals.' },
]

const FAQS = [
  { q: 'Do you work with my insurance company?', a: 'Yes. We are a direct repair facility for all major insurers including State Farm, Geico, Progressive, Allstate, USAA, Farmers, Liberty Mutual and more. We handle the entire claim from estimate to final payment.' },
  { q: 'How long will my repair take?', a: 'Most collision repairs are completed in 3-7 business days. Larger structural repairs may take 2-3 weeks. We provide real-time text updates and an accurate completion date after teardown.' },
  { q: 'Do you provide a warranty?', a: 'Absolutely. Every paint and body repair we perform is backed by a written limited lifetime warranty for as long as you own the vehicle.' },
  { q: 'Will my repair affect my car\'s value?', a: 'When repaired properly with OEM parts and certified procedures — which is what we do — your vehicle retains its full market value. Cheap shortcuts hurt resale; OEM repairs do not.' },
  { q: 'Do you offer free estimates?', a: 'Yes — free, no-obligation written estimates in-shop or via our online photo estimate tool. Most estimates are returned within 1 business hour.' },
  { q: 'Can I bring my luxury or exotic vehicle?', a: 'Yes. We are certified to repair Tesla, BMW, Audi, Mercedes-Benz, Porsche, Lexus and most other luxury brands using factory-approved procedures, parts and paint.' },
  { q: 'Do you provide rental cars or towing?', a: 'We coordinate rental cars with Enterprise directly through your insurance, and we offer 24/7 emergency towing throughout the Wichita metro.' },
]

const INSURANCE = ['State Farm', 'Geico', 'Progressive', 'Allstate', 'USAA', 'Farmers', 'Liberty Mutual', 'Nationwide', 'Travelers', 'American Family']

const TIME_SLOTS = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

// ----- COMPONENTS -----
function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = Date.now()
        const step = () => {
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(end * eased))
          if (progress < 1) requestAnimationFrame(step)
          else setCount(end)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  const formatted = count >= 1000 ? count.toLocaleString() : count
  return <span ref={ref}>{formatted}{suffix}</span>
}

function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#about', label: 'About' },
    { href: '#insurance', label: 'Insurance' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-2xl py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform">
            <Wrench className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl tracking-wide text-white">JAMES HANNAH</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-red-400 font-semibold">Auto Body &amp; Collision</div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white relative group">
              {l.label}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-3/4 group-hover:left-[12.5%] transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+13165550142" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
            <Phone className="w-4 h-4 text-red-500" /> (316) 555-0142
          </a>
          <Button onClick={onBook} className="btn-fire text-white font-semibold border-0">
            Book Appointment <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-white">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass mt-3 mx-4 rounded-xl p-4 space-y-2 animate-fade-in">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-gray-200 hover:bg-white/5 rounded-lg">{l.label}</a>
          ))}
          <Button onClick={() => { onBook(); setOpen(false) }} className="btn-fire w-full text-white font-semibold mt-2">Book Appointment</Button>
        </div>
      )}
    </nav>
  )
}

function Hero({ onBook, onEstimate }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-ken-burns">
          <img src={IMG.hero} alt="Auto body shop" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-radial-fade opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-blink" />
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-200">Wichita&#39;s #1 Rated Collision Center</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-white leading-[0.95] mb-6 animate-fade-in-up delay-100">
            COLLISION REPAIR
            <br />
            <span className="text-gradient-fire">DONE RIGHT.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-3 animate-fade-in-up delay-200">
            Certified repairs. Insurance support. Flawless finishes.
          </p>
          <p className="text-base text-gray-400 max-w-2xl mb-10 animate-fade-in-up delay-300">
            Precision repairs and trusted craftsmanship from Wichita&#39;s most decorated collision specialists since 2009.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up delay-400">
            <Button onClick={onBook} size="lg" className="btn-fire text-white font-bold h-14 px-8 text-base border-0 animate-pulse-glow">
              <CalIcon className="w-5 h-5 mr-2" /> Book Appointment
            </Button>
            <Button onClick={onEstimate} size="lg" variant="outline" className="h-14 px-8 text-base font-semibold bg-white/5 border-white/20 text-white hover:bg-white hover:text-black backdrop-blur-md">
              Get Free Estimate <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 animate-fade-in-up delay-500">
            {STATS.map((s, i) => (
              <div key={i} className="glass rounded-xl p-4 sm:p-5 border border-white/10 hover:border-red-500/40 transition-all">
                <div className="font-display text-3xl sm:text-4xl text-gradient-fire mb-1">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float hidden md:flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-red-500 to-transparent" />
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="relative py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-red-500">What We Do</span>
          <h2 className="font-display text-5xl sm:text-6xl mt-3 mb-4 text-white">PREMIUM REPAIR SERVICES</h2>
          <div className="divider-fire mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-400">From minor dings to full collision rebuilds — every repair backed by our lifetime warranty and certified by industry-leading standards.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="card-hover group relative overflow-hidden rounded-2xl bg-[#141416] border border-white/5">
                <div className="relative h-44 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-[#141416]/40 to-transparent" />
                  <div className="absolute top-3 left-3 w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-xl">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.2} />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-red-400 transition-colors">{s.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">{s.desc}</p>
                  <button className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-orange-400 inline-flex items-center gap-1 group/btn">
                    Learn More <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const containerRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const move = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setPos(x)
  }

  useEffect(() => {
    const onMove = (e) => { if (dragging) move(e.touches ? e.touches[0].clientX : e.clientX) }
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
    }
  }, [dragging])

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0f] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-red-500">The Transformation</span>
          <h2 className="font-display text-5xl sm:text-6xl mt-3 mb-4 text-white">BEFORE &amp; AFTER</h2>
          <div className="divider-fire mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-400">Drag the slider to see the difference our craftsmanship makes.</p>
        </div>

        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl border border-white/10"
          onMouseDown={(e) => { setDragging(true); move(e.clientX) }}
          onTouchStart={(e) => { setDragging(true); move(e.touches[0].clientX) }}
        >
          {/* After (full) */}
          <img src={IMG.gallery[1]} alt="After repair" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md shadow-lg">After</div>

          {/* Before (clipped) */}
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img src={IMG.gallery[0]} alt="Before repair" className="w-full h-full object-cover" draggable={false} />
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md shadow-lg">Before</div>
          </div>

          {/* Slider handle */}
          <div className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] pointer-events-none" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }} />
          <div className="absolute top-1/2 w-14 h-14 -mt-7 rounded-full bg-white shadow-2xl flex items-center justify-center pointer-events-none" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
            <MoveHorizontal className="w-6 h-6 text-black" />
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">← Drag to compare →</p>
      </div>
    </section>
  )
}

function WhyChoose() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] bg-carbon">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-red-500">Why James Hannah</span>
            <h2 className="font-display text-5xl sm:text-6xl mt-3 mb-4 text-white leading-tight">REPAIRS YOU CAN <span className="text-gradient-fire">TRUST.</span></h2>
            <div className="divider-fire mb-6" />
            <p className="text-gray-400 mb-8 text-lg">For over 15 years, Wichita has trusted us with their luxury vehicles, fleet repairs, and post-accident peace of mind. Here&#39;s what sets us apart.</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {WHY.map((w, i) => {
                const Icon = w.icon
                return (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{w.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{w.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-red-500/20 to-orange-500/20 rounded-3xl blur-3xl" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img src={IMG.facility} alt="Facility" className="w-full h-[600px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="glass rounded-xl p-5 border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-display text-2xl">JH</div>
                    <div>
                      <div className="font-bold text-white">James Hannah</div>
                      <div className="text-xs text-gray-400">Founder &amp; Lead Technician</div>
                    </div>
                    <BadgeCheck className="w-6 h-6 text-red-500 ml-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const [idx, setIdx] = useState(0)
  const next = () => setIdx((i) => (i + 1) % REVIEWS.length)
  const prev = () => setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)
  useEffect(() => {
    const t = setInterval(next, 7000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="reviews" className="relative py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-red-500">Customer Stories</span>
          <h2 className="font-display text-5xl sm:text-6xl mt-3 mb-4 text-white">WHAT OUR CUSTOMERS SAY</h2>
          <div className="divider-fire mx-auto mb-6" />
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}</div>
            <span className="font-semibold">4.9 / 5.0</span>
            <span className="text-gray-500">— 847 verified reviews</span>
          </div>
        </div>

        <div className="relative">
          <div className="glass rounded-3xl p-8 sm:p-12 border-white/10">
            <Quote className="absolute top-6 left-6 w-16 h-16 text-red-500/20" />
            <div className="relative min-h-[200px]">
              {REVIEWS.map((r, i) => (
                <div key={i} className={`absolute inset-0 transition-all duration-700 ${i === idx ? 'opacity-100 translate-x-0' : i < idx ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'}`}>
                  <div className="flex mb-4">{[...Array(r.rating)].map((_, k) => <Star key={k} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-6 italic">&quot;{r.text}&quot;</p>
                  <div className="flex items-center gap-4">
                    <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-full object-cover border-2 border-red-500/50" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{r.name}</span>
                        <BadgeCheck className="w-4 h-4 text-red-500" />
                      </div>
                      <div className="text-sm text-gray-400">{r.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button onClick={prev} className="w-12 h-12 rounded-full glass border border-white/10 hover:border-red-500 flex items-center justify-center transition-all">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-10 bg-gradient-to-r from-red-500 to-orange-500' : 'w-2 bg-white/20'}`} />
              ))}
            </div>
            <button onClick={next} className="w-12 h-12 rounded-full glass border border-white/10 hover:border-red-500 flex items-center justify-center transition-all">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function EstimateAndBooking() {
  return (
    <section id="estimate" className="relative py-24 bg-gradient-to-b from-[#0a0a0a] via-[#0e0e10] to-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-red-500">Get Started Today</span>
          <h2 className="font-display text-5xl sm:text-6xl mt-3 mb-4 text-white">SCHEDULE YOUR SERVICE</h2>
          <div className="divider-fire mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-400">Free estimate in 1 business hour, or book a confirmed appointment in seconds.</p>
        </div>

        <Tabs defaultValue="estimate" className="w-full">
          <TabsList className="grid grid-cols-2 max-w-md mx-auto mb-8 bg-[#141416] border border-white/10 h-14 p-1.5">
            <TabsTrigger value="estimate" className="data-[state=active]:btn-fire data-[state=active]:text-white text-gray-400 font-semibold h-full">
              <Camera className="w-4 h-4 mr-2" /> Free Estimate
            </TabsTrigger>
            <TabsTrigger value="booking" className="data-[state=active]:btn-fire data-[state=active]:text-white text-gray-400 font-semibold h-full">
              <CalIcon className="w-4 h-4 mr-2" /> Book Appointment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="estimate"><EstimateForm /></TabsContent>
          <TabsContent value="booking"><BookingForm /></TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

function EstimateForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', vehicle: '', description: '', preferredDate: '' })
  const [photos, setPhotos] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 4)
    Promise.all(files.map(f => new Promise(res => {
      const reader = new FileReader()
      reader.onload = ev => {
        // Compress: draw to canvas at smaller dimensions
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const max = 600
          const scale = Math.min(1, max / Math.max(img.width, img.height))
          canvas.width = img.width * scale
          canvas.height = img.height * scale
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          res(canvas.toDataURL('image/jpeg', 0.6))
        }
        img.src = ev.target.result
      }
      reader.readAsDataURL(f)
    }))).then(setPhotos)
  }

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/estimates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, photos }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      toast.success('Estimate received!', { description: data.message })
      setForm({ name: '', phone: '', email: '', vehicle: '', description: '', preferredDate: '' })
      setPhotos([])
    } catch (err) {
      toast.error('Submission failed', { description: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="glass border-white/10 p-6 sm:p-10 rounded-2xl">
      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label className="text-gray-300">Full Name *</Label>
          <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Smith" className="bg-[#1a1a1c] border-white/10 h-12 text-white" />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Phone *</Label>
          <Input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="(316) 555-0123" className="bg-[#1a1a1c] border-white/10 h-12 text-white" />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Email *</Label>
          <Input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@email.com" className="bg-[#1a1a1c] border-white/10 h-12 text-white" />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Vehicle Make / Model / Year *</Label>
          <Input required value={form.vehicle} onChange={e => setForm({ ...form, vehicle: e.target.value })} placeholder="2021 Tesla Model 3" className="bg-[#1a1a1c] border-white/10 h-12 text-white" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-gray-300">Damage Description *</Label>
          <Textarea required rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Rear bumper damage from parking lot incident, paint scuffed and cracked..." className="bg-[#1a1a1c] border-white/10 text-white resize-none" />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Preferred Appointment Date</Label>
          <Input type="date" value={form.preferredDate} onChange={e => setForm({ ...form, preferredDate: e.target.value })} className="bg-[#1a1a1c] border-white/10 h-12 text-white" />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Upload Damage Photos (up to 4)</Label>
          <label className="cursor-pointer flex items-center gap-2 bg-[#1a1a1c] border border-white/10 hover:border-red-500/50 rounded-md h-12 px-4 transition">
            <Upload className="w-4 h-4 text-red-500" />
            <span className="text-sm text-gray-400">{photos.length > 0 ? `${photos.length} photo(s) attached` : 'Choose photos...'}</span>
            <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
          </label>
        </div>
        {photos.length > 0 && (
          <div className="sm:col-span-2 flex gap-3 flex-wrap">
            {photos.map((p, i) => (
              <img key={i} src={p} alt="" className="w-24 h-24 object-cover rounded-md border border-white/10" />
            ))}
          </div>
        )}
        <div className="sm:col-span-2">
          <Button disabled={submitting} type="submit" size="lg" className="btn-fire w-full h-14 text-base font-bold text-white border-0">
            {submitting ? 'Submitting...' : (<>Send My Free Estimate <Send className="w-4 h-4 ml-2" /></>)}
          </Button>
          <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> Response within 1 business hour. Zero obligation.
          </p>
        </div>
      </form>
    </Card>
  )
}

function BookingForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', date: '', time: '', vehicle: '', notes: '' })
  const [taken, setTaken] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [confirmation, setConfirmation] = useState(null)

  useEffect(() => {
    if (!form.date) return
    fetch(`/api/available-slots?date=${form.date}`)
      .then(r => r.json())
      .then(d => setTaken(d.taken || []))
  }, [form.date])

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setConfirmation(data)
      toast.success('Appointment confirmed!', { description: `Confirmation: ${data.confirmationCode}` })
      setForm({ name: '', phone: '', email: '', service: '', date: '', time: '', vehicle: '', notes: '' })
    } catch (err) {
      toast.error('Booking failed', { description: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmation) {
    return (
      <Card className="glass border-white/10 p-10 rounded-2xl text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mx-auto flex items-center justify-center mb-6 shadow-2xl shadow-green-500/30">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h3 className="font-display text-4xl text-white mb-3">APPOINTMENT CONFIRMED</h3>
        <p className="text-gray-400 mb-6">A confirmation has been sent to your email. We&apos;ll text you a reminder 24 hours before.</p>
        <div className="inline-block glass border border-red-500/30 rounded-xl px-8 py-4 mb-8">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Confirmation Code</div>
          <div className="font-display text-3xl text-gradient-fire">{confirmation.confirmationCode}</div>
        </div>
        <div>
          <Button onClick={() => setConfirmation(null)} variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black">Book Another</Button>
        </div>
      </Card>
    )
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <Card className="glass border-white/10 p-6 sm:p-10 rounded-2xl">
      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label className="text-gray-300">Full Name *</Label>
          <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Smith" className="bg-[#1a1a1c] border-white/10 h-12 text-white" />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Phone *</Label>
          <Input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="(316) 555-0123" className="bg-[#1a1a1c] border-white/10 h-12 text-white" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-gray-300">Email *</Label>
          <Input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@email.com" className="bg-[#1a1a1c] border-white/10 h-12 text-white" />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Service Type *</Label>
          <Select required value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
            <SelectTrigger className="bg-[#1a1a1c] border-white/10 h-12 text-white"><SelectValue placeholder="Select service" /></SelectTrigger>
            <SelectContent className="bg-[#1a1a1c] border-white/10 text-white">
              {SERVICES.map(s => <SelectItem key={s.title} value={s.title}>{s.title}</SelectItem>)}
              <SelectItem value="General Inspection">General Inspection</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Vehicle *</Label>
          <Input required value={form.vehicle} onChange={e => setForm({ ...form, vehicle: e.target.value })} placeholder="2021 Tesla Model 3" className="bg-[#1a1a1c] border-white/10 h-12 text-white" />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Preferred Date *</Label>
          <Input required type="date" min={today} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="bg-[#1a1a1c] border-white/10 h-12 text-white" />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Preferred Time *</Label>
          <Select required value={form.time} onValueChange={(v) => setForm({ ...form, time: v })} disabled={!form.date}>
            <SelectTrigger className="bg-[#1a1a1c] border-white/10 h-12 text-white"><SelectValue placeholder={form.date ? 'Select time' : 'Pick a date first'} /></SelectTrigger>
            <SelectContent className="bg-[#1a1a1c] border-white/10 text-white">
              {TIME_SLOTS.map(t => (
                <SelectItem key={t} value={t} disabled={taken.includes(t)}>
                  {t} {taken.includes(t) ? '(Booked)' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-gray-300">Additional Notes</Label>
          <Textarea rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Anything we should know..." className="bg-[#1a1a1c] border-white/10 text-white resize-none" />
        </div>
        <div className="sm:col-span-2">
          <Button disabled={submitting} type="submit" size="lg" className="btn-fire w-full h-14 text-base font-bold text-white border-0">
            {submitting ? 'Booking...' : (<>Confirm Appointment <CheckCircle2 className="w-4 h-4 ml-2" /></>)}
          </Button>
        </div>
      </form>
    </Card>
  )
}

function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const allImages = [...IMG.gallery, ...IMG.services.slice(0, 6)]

  return (
    <section id="gallery" className="relative py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-red-500">Our Work</span>
          <h2 className="font-display text-5xl sm:text-6xl mt-3 mb-4 text-white">REPAIR GALLERY</h2>
          <div className="divider-fire mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-400">A selection of recent collision repairs, restorations and paint work from our Wichita facility.</p>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {allImages.map((src, i) => (
            <div key={i} className="break-inside-avoid group relative overflow-hidden rounded-xl border border-white/5 cursor-pointer" onClick={() => setLightbox(src)}>
              <img src={src} alt="" className="w-full h-auto transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-sm font-semibold">View Larger →</span>
              </div>
            </div>
          ))}
        </div>

        {lightbox && (
          <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightbox(null)}>
            <button className="absolute top-6 right-6 text-white hover:text-red-500" onClick={() => setLightbox(null)}><X className="w-8 h-8" /></button>
            <img src={lightbox} alt="" className="max-w-full max-h-full rounded-xl" />
          </div>
        )}
      </div>
    </section>
  )
}

function Insurance() {
  return (
    <section id="insurance" className="relative py-24 bg-gradient-to-b from-[#0a0a0a] via-[#0e0e10] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-red-500">Insurance Claims</span>
          <h2 className="font-display text-5xl sm:text-6xl mt-3 mb-4 text-white">WE WORK WITH ALL <span className="text-gradient-fire">MAJOR INSURERS</span></h2>
          <div className="divider-fire mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-gray-400">We handle the paperwork, the negotiations, and the rental coordination. You just bring us the keys.</p>
        </div>

        {/* Process */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { n: '01', title: 'File Your Claim', desc: 'Call your insurance and mention James Hannah Auto Body.' },
            { n: '02', title: 'Bring Us The Car', desc: 'Drop off or schedule a free tow. We take it from there.' },
            { n: '03', title: 'We Handle Everything', desc: 'Estimate, supplements, negotiations, rental — all of it.' },
            { n: '04', title: 'Drive Away New', desc: 'Lifetime warranty. Spotless finish. Total peace of mind.' },
          ].map((s, i) => (
            <div key={i} className="relative glass rounded-2xl p-6 border-white/10 hover:border-red-500/40 transition-all">
              <div className="font-display text-6xl text-gradient-fire opacity-30 mb-2">{s.n}</div>
              <h3 className="font-bold text-white text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {INSURANCE.map((name, i) => (
            <div key={i} className="glass rounded-lg px-6 py-4 border-white/10 hover:border-red-500/40 hover:scale-105 transition-all">
              <span className="font-semibold text-gray-300 text-sm">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="relative py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="grid grid-cols-2 gap-4">
            <img src={IMG.techs[0]} alt="" className="rounded-xl border border-white/10 w-full h-80 object-cover" />
            <img src={IMG.techs[1]} alt="" className="rounded-xl border border-white/10 w-full h-80 object-cover mt-8" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-red-500">Our Story</span>
            <h2 className="font-display text-5xl sm:text-6xl mt-3 mb-4 text-white">15 YEARS OF <span className="text-gradient-fire">PRECISION.</span></h2>
            <div className="divider-fire mb-6" />
            <p className="text-gray-300 mb-4 leading-relaxed">James Hannah opened the doors of his Wichita shop in 2009 with a single Snap-On toolbox, a downdraft paint booth, and one stubborn promise: <span className="text-white font-semibold">no shortcuts, no cheap parts, no compromises.</span></p>
            <p className="text-gray-400 mb-6 leading-relaxed">Today, we&apos;re a 14,000 sq ft I-CAR Gold Class certified facility — the highest training tier in the collision industry. We&apos;ve repaired everything from family minivans to six-figure exotics, restored frame-damaged trucks to factory spec, and handled tens of thousands of insurance claims without a single complaint to the Better Business Bureau.</p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: 'I-CAR Gold Class', icon: Award },
                { label: 'ASE Master Certified', icon: BadgeCheck },
                { label: 'Tesla Approved', icon: Zap },
                { label: 'BBB A+ Rated', icon: ShieldCheck },
              ].map((c, i) => {
                const Icon = c.icon
                return (
                  <div key={i} className="flex items-center gap-3 glass rounded-lg p-3 border-white/10">
                    <Icon className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-semibold text-white">{c.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <h3 className="font-display text-3xl text-white text-center mb-12">OUR JOURNEY</h3>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-orange-500 to-transparent" />
            {[
              { year: '2009', title: 'Founded', desc: 'James Hannah opens a 2-bay shop on Seneca Street.' },
              { year: '2014', title: 'I-CAR Certified', desc: 'Achieved Gold Class — top 10% of collision shops nationally.' },
              { year: '2018', title: 'Facility Expansion', desc: 'Moved to 14,000 sq ft state-of-the-art collision center.' },
              { year: '2021', title: 'Tesla Approved', desc: 'Became an approved EV collision repair facility.' },
              { year: '2024', title: '10,000th Repair', desc: 'Celebrated 10,000+ vehicles returned to the road.' },
            ].map((t, i) => (
              <div key={i} className={`relative flex items-center gap-6 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="hidden md:block flex-1" />
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-red-500 to-orange-500 ring-4 ring-[#0a0a0a]" />
                <div className="flex-1 ml-12 md:ml-0">
                  <div className="glass rounded-xl p-5 border-white/10">
                    <div className="font-display text-3xl text-gradient-fire mb-1">{t.year}</div>
                    <div className="font-bold text-white mb-1">{t.title}</div>
                    <div className="text-sm text-gray-400">{t.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section id="faq" className="relative py-24 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0f] to-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-red-500">FAQ</span>
          <h2 className="font-display text-5xl sm:text-6xl mt-3 mb-4 text-white">FREQUENTLY ASKED</h2>
          <div className="divider-fire mx-auto" />
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="glass border border-white/10 rounded-xl px-6 data-[state=open]:border-red-500/40">
              <AccordionTrigger className="text-left text-white font-semibold hover:no-underline py-5">{f.q}</AccordionTrigger>
              <AccordionContent className="text-gray-400 leading-relaxed pb-5">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success(data.message)
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      toast.error('Failed to send', { description: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-red-500">Get In Touch</span>
          <h2 className="font-display text-5xl sm:text-6xl mt-3 mb-4 text-white">VISIT OUR SHOP</h2>
          <div className="divider-fire mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-8 border-white/10">
            <h3 className="font-display text-3xl text-white mb-6">CONTACT INFO</h3>
            <div className="space-y-5">
              {[
                { icon: MapPin, label: 'Visit Us', value: '2418 S Seneca St\nWichita, KS 67213' },
                { icon: Phone, label: 'Call Us', value: '(316) 555-0142\n24/7 Emergency Towing' },
                { icon: Mail, label: 'Email', value: 'service@jameshannahauto.com' },
                { icon: Clock, label: 'Hours', value: 'Mon-Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 2:00 PM\nSun: Closed' },
              ].map((c, i) => {
                const Icon = c.icon
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">{c.label}</div>
                      <div className="text-white whitespace-pre-line">{c.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <form onSubmit={submit} className="mt-8 pt-8 border-t border-white/10 space-y-3">
              <h4 className="font-bold text-white mb-3">Send Us a Message</h4>
              <div className="grid grid-cols-2 gap-3">
                <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="bg-[#1a1a1c] border-white/10 h-11 text-white" />
                <Input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="bg-[#1a1a1c] border-white/10 h-11 text-white" />
              </div>
              <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone (optional)" className="bg-[#1a1a1c] border-white/10 h-11 text-white" />
              <Textarea required rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" className="bg-[#1a1a1c] border-white/10 text-white resize-none" />
              <Button disabled={submitting} type="submit" className="btn-fire w-full h-12 text-white font-semibold border-0">
                {submitting ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[600px]">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=Wichita+Kansas+auto+body&output=embed"
              className="w-full h-full absolute inset-0 grayscale-[40%] contrast-110"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-6 left-6 right-6 glass rounded-xl p-5 border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-red-500 font-semibold mb-1">Need Emergency Towing?</div>
                  <div className="text-white font-bold">24/7 Available</div>
                </div>
                <a href="tel:+13165550142" className="btn-fire text-white font-bold px-5 py-3 rounded-lg flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center"><Wrench className="w-6 h-6 text-white" /></div>
              <div>
                <div className="font-display text-xl text-white">JAMES HANNAH</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-red-400 font-semibold">Auto Body &amp; Collision</div>
              </div>
            </div>
            <p className="text-gray-400 max-w-md mb-6">Wichita&apos;s most trusted collision repair center since 2009. Precision repairs. Trusted craftsmanship. Lifetime warranty.</p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg glass border-white/10 flex items-center justify-center hover:border-red-500 transition"><Icon className="w-4 h-4 text-gray-400 hover:text-red-500" /></a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#services" className="hover:text-red-500">Services</a></li>
              <li><a href="#gallery" className="hover:text-red-500">Gallery</a></li>
              <li><a href="#about" className="hover:text-red-500">About</a></li>
              <li><a href="#insurance" className="hover:text-red-500">Insurance</a></li>
              <li><a href="#contact" className="hover:text-red-500">Contact</a></li>
              <li><a href="#" className="hover:text-red-500">Careers</a></li>
              <li><a href="#faq" className="hover:text-red-500">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2"><MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" /> 2418 S Seneca St, Wichita, KS 67213</li>
              <li className="flex gap-2"><Phone className="w-4 h-4 text-red-500" /> (316) 555-0142</li>
              <li className="flex gap-2"><Mail className="w-4 h-4 text-red-500" /> <span suppressHydrationWarning>service@jameshannahauto.com</span></li>
            </ul>
            <div className="mt-4 text-xs text-gray-500">
              <div className="font-semibold text-gray-300 mb-1">Financing Available</div>
              0% APR for 12 months on qualified repairs
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>© {new Date().getFullYear()} James Hannah Auto Body &amp; Collision Center. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-red-500">Privacy Policy</a>
            <a href="#" className="hover:text-red-500">Terms</a>
            <a href="#" className="hover:text-red-500">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false)
  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a href="tel:+13165550142" className="w-14 h-14 rounded-full btn-fire text-white shadow-2xl shadow-red-500/40 flex items-center justify-center animate-pulse-glow">
          <Phone className="w-6 h-6" />
        </a>
        <button onClick={() => setChatOpen(!chatOpen)} className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-2xl shadow-blue-500/40 flex items-center justify-center hover:scale-110 transition">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {chatOpen && (
        <div className="fixed bottom-28 right-6 z-40 w-80 glass rounded-2xl border-white/10 shadow-2xl overflow-hidden animate-fade-in-up">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">Live Chat</div>
              <div className="text-xs text-white/80 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 animate-blink" /> We&apos;re online</div>
            </div>
            <button onClick={() => setChatOpen(false)}><X className="w-5 h-5 text-white" /></button>
          </div>
          <div className="p-4 h-64 overflow-y-auto bg-[#0a0a0a]">
            <div className="flex gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">JH</div>
              <div className="glass rounded-xl rounded-tl-none px-3 py-2 text-sm text-white max-w-[80%]">Hi! 👋 Need a quote, want to schedule a repair, or have a question about your insurance claim?</div>
            </div>
          </div>
          <div className="p-3 border-t border-white/10 bg-[#0a0a0a]">
            <div className="flex gap-2">
              <Input placeholder="Type a message..." className="bg-[#1a1a1c] border-white/10 h-10 text-white text-sm" />
              <Button className="btn-fire h-10 px-3 border-0"><Send className="w-4 h-4" /></Button>
            </div>
            <div className="text-[10px] text-gray-500 mt-2 text-center">Or call us at <a href="tel:+13165550142" className="text-red-500">(316) 555-0142</a></div>
          </div>
        </div>
      )}
    </>
  )
}

function PromoBanner() {
  const [show, setShow] = useState(true)
  if (!show) return null
  return (
    <div className="relative z-40 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white text-sm py-2.5 px-4 text-center font-medium">
      <span className="inline-flex items-center gap-2">
        <Zap className="w-4 h-4" />
        <strong>SUMMER SPECIAL:</strong> $0 deductible coverage + free detail with every collision repair. 
        <a href="#estimate" className="underline font-bold hover:no-underline">Claim Offer →</a>
      </span>
      <button onClick={() => setShow(false)} className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70"><X className="w-4 h-4" /></button>
    </div>
  )
}

function App() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar onBook={() => scrollTo('#estimate')} />
      <Hero onBook={() => scrollTo('#estimate')} onEstimate={() => scrollTo('#estimate')} />
      <ServicesSection />
      <BeforeAfter />
      <WhyChoose />
      <Reviews />
      <EstimateAndBooking />
      <Gallery />
      <Insurance />
      <About />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingActions />
    </main>
  )
}

export default App
