'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Download, 
  ExternalLink,
  Code,
  Palette,
  TrendingUp,
  Users,
  Calendar,
  Building,
  GraduationCap,
  Award,
  Send,
  Menu,
  X,
  Instagram,
  FileText,
  CreditCard,
  CheckCircle
} from 'lucide-react'
import Image from 'next/image'
import Head from 'next/head'

// Animated Loader Component
const AnimatedLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0)
  
  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 1000)
    const timer2 = setTimeout(() => setCurrentStep(2), 2500)
    const timer3 = setTimeout(() => setCurrentStep(3), 4000)
    const timer4 = setTimeout(() => onComplete(), 5000)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  return (
    <motion.div 
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        {/* Handwritten Name Animation */}
        {currentStep >= 0 && (
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-white mb-4"
            style={{ fontFamily: 'Dancing Script, cursive' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            Ryan Moshi
          </motion.h1>
        )}
        
        {/* Typewriter Effect */}
        {currentStep >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <TypewriterText 
              text="Chief Technology & Brand Strategist"
              className="text-xl md:text-2xl text-gray-300 mb-6"
            />
          </motion.div>
        )}
        
        {/* Tagline */}
        {currentStep >= 2 && (
          <motion.p
            className="text-lg text-red-400 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Building Brands. Engineering Solutions. Leading Innovation.
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

// Typewriter Component
const TypewriterText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState('')
  
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)
    
    return () => clearInterval(timer)
  }, [text])
  
  return <span className={className}>{displayText}</span>
}

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' }
  ]
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-40 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="text-white font-bold text-xl"
            style={{ fontFamily: 'Dancing Script, cursive' }}
            whileHover={{ scale: 1.05 }}
          >
            Ryan Moshi
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-red-400 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 text-gray-300 hover:text-red-400 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default function Portfolio() {
  const [showLoader, setShowLoader] = useState(true)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    source: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      let payload: any = null
      try { payload = await res.json() } catch {}
      if (!res.ok && !(payload && payload.ok)) {
        throw new Error((payload && payload.error) || 'Submission failed')
      }
      setFormSubmitted(true)
      setTimeout(() => setFormSubmitted(false), 6000)
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: '',
        source: ''
      })
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>Ryan Moshi - Chief Technology & Brand Strategist | Digital Solutions Expert</title>
        <meta name="description" content="Ryan Moshi is a Chief Technology & Brand Strategist helping businesses scale through digital solutions, web development, mobile apps, and brand strategy. Based in Nairobi, Kenya, serving clients worldwide." />
        <meta name="keywords" content="Ryan Moshi, brand strategist, technology consultant, web development, mobile apps, digital transformation, Nairobi Kenya, Retrosoft, RetroWorld Studios, DropEx Logistics" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Ryan Moshi - Chief Technology & Brand Strategist" />
        <meta property="og:description" content="Building Brands. Engineering Solutions. Leading Innovation. Expert in digital transformation and brand strategy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ryan-moshi-portfolio.lindy.site" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ryan Moshi - Chief Technology & Brand Strategist" />
        <meta name="twitter:description" content="Building Brands. Engineering Solutions. Leading Innovation." />
        <link rel="canonical" href="https://ryan-moshi-portfolio.lindy.site" />
      </Head>
      
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet" />
      
      <AnimatePresence>
        {showLoader && (
          <AnimatedLoader onComplete={() => setShowLoader(false)} />
        )}
      </AnimatePresence>

      {!showLoader && (
        <>
          <Navigation />
          
          {/* Hero Section */}
          <section id="home" className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                {/* Company Logos with better spacing */}
                <div className="flex justify-center lg:justify-start space-x-6 mb-8 mt-4">
                  <motion.div whileHover={{ scale: 1.1 }} className="w-16 h-16 bg-white rounded-full p-2 flex items-center justify-center shadow-lg">
                    <Image src="/images/retrosoft-logo.png" alt="Retrosoft" width={48} height={48} className="object-contain" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} className="w-16 h-16 bg-white rounded-full p-2 flex items-center justify-center shadow-lg">
                    <Image src="/images/retroworld-logo.png" alt="RetroWorld Studios" width={48} height={48} className="object-contain" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} className="w-16 h-16 bg-white rounded-full p-2 flex items-center justify-center shadow-lg">
                    <Image src="/images/dropex-logo-blue.png" alt="DropEx Logistics" width={48} height={48} className="object-contain" />
                  </motion.div>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  Ryan Moshi
                </h1>
                <h2 className="text-2xl md:text-3xl text-gray-300 mb-4">
                  Chief Technology & Brand Strategist
                </h2>
                <p className="text-lg text-red-400 mb-6">
                  Building Brands. Engineering Solutions. Leading Innovation.
                </p>
                <p className="text-gray-400 mb-8 max-w-2xl">
                  Founder of The RetroWorld Studios Inc., Retrosoft Inc., and DropEx Logistics.
                  Blending creativity and technology to transform global brands since 2018.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    onClick={scrollToContact}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-600/25"
                  >
                    Let's Collaborate
                  </Button>
                  <Button 
                    onClick={scrollToPortfolio}
                    className="bg-white text-black hover:bg-gray-100 border-2 border-white px-8 py-3 rounded-full font-medium transition-all duration-300"
                  >
                    View My Work
                  </Button>
                  <Button 
                    onClick={() => window.open('https://342646301392609280.hello.cv', '_blank')}
                    variant="outline" 
                    className="border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    View CV Online
                  </Button>
                </div>

                {/* Digital Business Card */}
                <div className="mt-6">
                  <Button 
                    onClick={() => window.open('https://blinq.me/V1BglblPJaWE', '_blank')}
                    variant="outline" 
                    className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-6 py-2 rounded-full font-medium transition-all duration-300"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Digital Business Card
                  </Button>
                </div>
              </motion.div>
              
              {/* Right Side - Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-red-400 shadow-2xl">
                    <Image 
                      src="/images/ryan-profile-white.jpg" 
                      alt="Ryan Moshi - Chief Technology & Brand Strategist" 
                      width={320} 
                      height={320}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-400/20 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* About Section - Updated "Who I Am" */}
          <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                  Who I Am
                </h2>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    I'm a business professional with a strong tech background, specializing in brand strategy and digital transformation. Since 2018, I've been helping businesses and organizations grow through strategic digital solutions, developing apps, websites, graphics and engaging content that drive conversions, build loyalty, and enhance brand credibility.
                  </p>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    With a solid foundation in Business and Information Technology, I blend my expertise in app development, web design, social media strategy, and graphic design with business management skills to streamline operations and boost efficiency.
                  </p>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    My mission is to help clients establish a powerful online presence by aligning digital efforts with long-term business objectives.
                  </p>
                  <p className="text-lg text-gray-700 font-medium mb-6">
                    Let's elevate your brand — strategically, creatively, and sustainably.
                  </p>

                  {/* Online CV and Digital Card Links */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={() => window.open('https://342646301392609280.hello.cv', '_blank')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Full Resume
                    </Button>
                    <Button 
                      onClick={() => window.open('https://blinq.me/V1BglblPJaWE', '_blank')}
                      variant="outline"
                      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-full font-medium transition-all duration-300"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Digital Contact Card
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex justify-center"
                >
                  <div className="relative">
                    <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-red-400 shadow-xl">
                      <Image 
                        src="/images/ryan-profile-red.jpg" 
                        alt="Ryan Moshi - Professional Portrait" 
                        width={256} 
                        height={256}
                        className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-20 bg-gray-50">
            <div className="desktop-container">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                  Your Brand's Strategic Growth Partner
                </h2>
              </motion.div>
              
              <div className="desktop-grid-4">
                {[
                  {
                    icon: <TrendingUp className="h-8 w-8" />,
                    title: "Brand Strategy & Identity",
                    services: ["Naming, Visual Identity, Storytelling", "Positioning & Messaging", "Logo & Brand Systems"]
                  },
                  {
                    icon: <Code className="h-8 w-8" />,
                    title: "Web & Mobile Solutions",
                    services: ["Full-stack Web Development", "Android & iOS Apps", "CMS, E-Commerce, SaaS"]
                  },
                  {
                    icon: <Palette className="h-8 w-8" />,
                    title: "Creative & Content Design",
                    services: ["Graphic Design & UI", "Photography & Editing", "Motion Graphics & Ads"]
                  },
                  {
                    icon: <Users className="h-8 w-8" />,
                    title: "Digital Transformation",
                    services: ["IT Operations Management", "Business Process Automation", "Cloud & Infrastructure Strategy"]
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-red-200">
                      <CardContent className="card-spacing">
                        <div className="baseline-align-top card-internal-spacing">
                          <div className="text-red-600 mr-3 flex items-center card-icon">{service.icon}</div>
                          <h3 className="card-title title-wrap-control text-xl font-bold text-black leading-tight">{service.title}</h3>
                        </div>
                        <ul className="card-list space-y-2">
                          {service.services.map((item, i) => (
                            <li key={i} className="card-body text-gray-600 text-sm leading-relaxed">{item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="py-20 bg-white">
            <div className="desktop-container">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                  Real Results. Real Impact.
                </h2>
              </motion.div>
              
              <div className="desktop-grid-3">
                {[
                  {
                    title: "The RetroWorld Studios",
                    subtitle: "Global Branding Campaign",
                    description: "Built a global creative agency from scratch – led multi-platform campaigns for clients in 3 continents.",
                    image: "/images/retroworld-logo.png",
                    instagram: "https://www.instagram.com/theretroworldstudios.inc?igsh=MWN3djg1cTdpbmliYg%3D%3D&utm_source=qr"
                  },
                  {
                    title: "Retrosoft",
                    subtitle: "SaaS Web Platform for SMEs",
                    description: "Designed and engineered scalable, user-centric enterprise solutions adopted by growing businesses.",
                    image: "/images/retrosoft-logo.png",
                    instagram: "https://www.instagram.com/retrosoft.inc?igsh=MjNlZzBocDVmOXhi&utm_source=qr"
                  },
                  {
                    title: "DropEx Logistics",
                    subtitle: "Operations System & Brand Identity",
                    description: "Co-founded a tech-driven logistics startup; streamlined operations and expanded across multiple markets.",
                    image: "/images/dropex-logo-blue.png",
                    instagram: "https://www.instagram.com/dropexlogistics?igsh=MXVnM3N6YWI0NTFuYg%3D%3D&utm_source=qr"
                  }
                ].map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 hover:border-red-200">
                      <CardContent className="card-spacing">
                        <div className="w-20 h-20 card-internal-spacing rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center p-2">
                          <Image src={project.image} alt={project.title} width={64} height={64} className="object-contain" />
                        </div>
                        <h3 className="card-title title-wrap-control text-xl font-bold text-black leading-tight card-internal-spacing-sm">{project.title}</h3>
                        <p className="card-subtitle text-red-600 font-medium card-internal-spacing-sm">{project.subtitle}</p>
                        <p className="card-body text-gray-600 text-sm leading-relaxed card-internal-spacing">{project.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-red-600 group-hover:text-red-700 transition-colors">
                            <span className="text-sm font-medium">View Project</span>
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </div>
                          <Button
                            onClick={() => window.open(project.instagram, '_blank')}
                            variant="outline"
                            size="sm"
                            className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
                          >
                            <Instagram className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                  Experience
                </h2>
              </motion.div>
              
              <div className="space-y-8">
                {[
                  {
                    role: "Founder & CEO",
                    company: "The RetroWorld Studios Inc.",
                    period: "Dec 2023 – Present",
                    location: "North America, Europe, Africa",
                    description: "Brand strategy, marketing campaigns, content creation, global partnerships.",
                    color: "bg-green-500"
                  },
                  {
                    role: "Founder & CEO",
                    company: "Retrosoft Inc.",
                    period: "Dec 2022 – Present",
                    location: "",
                    description: "Software development, enterprise solutions, product leadership.",
                    color: "bg-green-500"
                  },
                  {
                    role: "Co-Founder",
                    company: "DropEx Logistics",
                    period: "Jan 2024 – Present",
                    location: "",
                    description: "Business operations, logistics systems, scaling strategy.",
                    color: "bg-green-500"
                  },
                  {
                    role: "Team Lead Manager",
                    company: "Shinji (Remote, Côte d'Ivoire)",
                    period: "Jan 2024 – Present",
                    location: "",
                    description: "Team leadership, mobile development, cross-functional collaboration.",
                    color: "bg-blue-500"
                  },
                  {
                    role: "Senior Manager IT Operations",
                    company: "Retrosoft Inc.",
                    period: "Dec 2021 – Dec 2022",
                    location: "",
                    description: "Infrastructure, cybersecurity, vendor management.",
                    color: "bg-purple-500"
                  }
                ].map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className={`w-4 h-4 rounded-full ${job.color} mt-2 flex-shrink-0`}></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-black">{job.role}</h3>
                      <p className="text-lg text-red-600 font-medium">{job.company}</p>
                      <p className="text-gray-600 mb-2">{job.period} {job.location && `| ${job.location}`}</p>
                      <p className="text-gray-700">{job.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section className="py-20 bg-white">
            <div className="desktop-container">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                  Education
                </h2>
              </motion.div>
              
              <div className="desktop-grid-2">
                {[
                  {
                    degree: "Bachelor's in Business & Information Technology",
                    school: "Strathmore University",
                    year: "2024",
                    focus: "AI, Marketing, Digital Strategy"
                  },
                  {
                    degree: "Bachelor's in Computer Science & Cybersecurity",
                    school: "American National University",
                    year: "2025",
                    focus: "Dev, Networking, Mobile Apps, Systems Mgmt"
                  }
                ].map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-red-200">
                      <CardContent className="card-spacing">
                        <div className="baseline-align-top card-internal-spacing">
                          <GraduationCap className="h-8 w-8 text-red-600 mr-3 flex items-center card-icon" />
                          <h3 className="card-title title-wrap-control text-xl font-bold text-black leading-tight">{edu.degree}</h3>
                        </div>
                        <p className="card-subtitle text-lg text-red-600 font-medium card-internal-spacing-sm">{edu.school}</p>
                        <p className="card-body text-gray-600 card-internal-spacing-sm">{edu.year}</p>
                        <p className="card-body text-gray-700 text-sm leading-relaxed">{edu.focus}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="py-20 bg-gray-50">
            <div className="desktop-container">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                  Skills
                </h2>
              </motion.div>
              
              <div className="desktop-grid-4">
                {[
                  {
                    category: "Tech & Development",
                    icon: <Code className="h-8 w-8" />,
                    skills: ["Application Development", "Web Design & Development", "Mobile (iOS / Android)", "Cybersecurity & Networking", "Database Administration"]
                  },
                  {
                    category: "Creative & Branding",
                    icon: <Palette className="h-8 w-8" />,
                    skills: ["Graphic Design", "Brand Identity & Visual Systems", "UI/UX Design", "Photography & Editing", "Adobe Suite, Figma, Canva"]
                  },
                  {
                    category: "Strategy & Business",
                    icon: <TrendingUp className="h-8 w-8" />,
                    skills: ["Brand Strategy", "Digital Marketing & SEO", "Project Management", "Startup Leadership", "Supply Chain & Logistics"]
                  },
                  {
                    category: "Leadership Skills",
                    icon: <Users className="h-8 w-8" />,
                    skills: ["Leadership & Team Building", "Strategic Planning", "Global Operations Management", "Mentorship & Coaching", "Client Communication"]
                  }
                ].map((skillGroup, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-red-200">
                      <CardContent className="card-spacing">
                        <div className="baseline-align-top card-internal-spacing">
                          <div className="text-red-600 mr-3 flex items-center card-icon">{skillGroup.icon}</div>
                          <h3 className="card-title title-wrap-control text-xl font-bold text-black leading-tight">{skillGroup.category}</h3>
                        </div>
                        <div className="space-y-2">
                          {skillGroup.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="card-badge text-xs bg-red-50 text-red-700 hover:bg-red-100">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section - Updated Form */}
          <section id="contact" className="py-20 bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to transform your digital future?
                </h2>
                <p className="text-xl text-gray-300">
                  Let's build something remarkable — together.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <MapPin className="h-6 w-6 text-red-400 mr-4" />
                      <span>Nairobi, Kenya (Available Worldwide)</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-6 w-6 text-red-400 mr-4" />
                      <span>+254 790 310 699</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-6 w-6 text-red-400 mr-4" />
                      <span>ryanemmanuelmoshi@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                      <Linkedin className="h-6 w-6 text-red-400 mr-4" />
                      <span>LinkedIn Profile</span>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="mt-8">
                    <h4 className="text-lg font-bold mb-4">Follow My Work</h4>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        onClick={() => window.open('https://www.instagram.com/ryan_moshi?igsh=YXV1cXdyZDN3MG12&utm_source=qr', '_blank')}
                        variant="outline"
                        size="sm"
                        className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
                      >
                        <Instagram className="mr-2 h-4 w-4" />
                        Personal
                      </Button>
                      <Button
                        onClick={() => window.open('https://www.instagram.com/retrosoft.inc?igsh=MjNlZzBocDVmOXhi&utm_source=qr', '_blank')}
                        variant="outline"
                        size="sm"
                        className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
                      >
                        <Instagram className="mr-2 h-4 w-4" />
                        Retrosoft
                      </Button>
                      <Button
                        onClick={() => window.open('https://www.instagram.com/theretroworldstudios.inc?igsh=MWN3djg1cTdpbmliYg%3D%3D&utm_source=qr', '_blank')}
                        variant="outline"
                        size="sm"
                        className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
                      >
                        <Instagram className="mr-2 h-4 w-4" />
                        RetroWorld
                      </Button>
                      <Button
                        onClick={() => window.open('https://www.instagram.com/dropexlogistics?igsh=MXVnM3N6YWI0NTFuYg%3D%3D&utm_source=qr', '_blank')}
                        variant="outline"
                        size="sm"
                        className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
                      >
                        <Instagram className="mr-2 h-4 w-4" />
                        DropEx
                      </Button>
                    </div>
                  </div>
                </motion.div>
                
                {/* Project Inquiry Form - Updated */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="">
                      {!formSubmitted ? (
                        <>
                          <h3 className="text-2xl font-bold text-white mb-6">Start Your Project</h3>
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Input
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                                required
                              />
                              <Input
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                                required
                              />
                            </div>
                            
                            <Input
                              placeholder="Company/Organization"
                              value={formData.company}
                              onChange={(e) => handleInputChange('company', e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                            />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Select onValueChange={(value) => handleInputChange('projectType', value)}>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                  <SelectValue placeholder="Project Type" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                  <SelectItem value="brand-strategy" className="text-white hover:bg-gray-700">Brand Strategy</SelectItem>
                                  <SelectItem value="web-development" className="text-white hover:bg-gray-700">Web Development</SelectItem>
                                  <SelectItem value="mobile-app" className="text-white hover:bg-gray-700">Mobile App</SelectItem>
                                  <SelectItem value="digital-transformation" className="text-white hover:bg-gray-700">Full Digital Transformation</SelectItem>
                                  <SelectItem value="other" className="text-white hover:bg-gray-700">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              {/* Custom Budget Field */}
                              <Input
                                placeholder="Enter your estimated budget (e.g., $500 - $1500)"
                                value={formData.budget}
                                onChange={(e) => handleInputChange('budget', e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                              />
                            </div>
                            
                            <Input
                              placeholder="Project Timeline"
                              value={formData.timeline}
                              onChange={(e) => handleInputChange('timeline', e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                            />
                            
                            <Textarea
                              placeholder="Tell me about your project..."
                              value={formData.description}
                              onChange={(e) => handleInputChange('description', e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 min-h-[120px]"
                              required
                            />
                            
                            <Select onValueChange={(value) => handleInputChange('source', value)}>
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder="How did you hear about me?" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="linkedin" className="text-white hover:bg-gray-700">LinkedIn</SelectItem>
                                <SelectItem value="referral" className="text-white hover:bg-gray-700">Referral</SelectItem>
                                <SelectItem value="google" className="text-white hover:bg-gray-700">Google Search</SelectItem>
                                <SelectItem value="social-media" className="text-white hover:bg-gray-700">Social Media</SelectItem>
                                <SelectItem value="other" className="text-white hover:bg-gray-700">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Button 
                              type="submit" 
                              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/25"
                            >
                              <Send className="mr-2 h-4 w-4" />
                              Send Project Inquiry
                            </Button>
                          </form>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
                          <p className="text-gray-300 mb-4">
                            Your project inquiry has been received successfully.
                          </p>
                          <p className="text-gray-400 text-sm">
                            I'll review your request and get back to you within 24-48 hours with next steps.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Footer - Updated with Logos */}
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  Ryan Moshi
                </h3>
                <p className="text-gray-400 mb-6">
                  Chief Technology & Brand Strategist
                </p>
                
                {/* Company Logos in Footer */}
                <div className="flex justify-center space-x-6 mb-8">
                  <motion.div whileHover={{ scale: 1.1 }} className="w-12 h-12 bg-white rounded-full p-2 flex items-center justify-center">
                    <Image src="/images/retrosoft-logo.png" alt="Retrosoft" width={32} height={32} className="object-contain" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} className="w-12 h-12 bg-white rounded-full p-2 flex items-center justify-center">
                    <Image src="/images/retroworld-logo.png" alt="RetroWorld Studios" width={32} height={32} className="object-contain" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} className="w-12 h-12 bg-white rounded-full p-2 flex items-center justify-center">
                    <Image src="/images/dropex-logo-blue.png" alt="DropEx Logistics" width={32} height={32} className="object-contain" />
                  </motion.div>
                </div>
                
                <div className="flex justify-center space-x-4 mb-8">
                  <Button 
                    onClick={scrollToContact}
                    variant="outline" 
                    className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white font-medium transition-all duration-300"
                  >
                    Contact Me
                  </Button>
                  <Button 
                    onClick={() => window.open('https://342646301392609280.hello.cv', '_blank')}
                    className="bg-white text-black hover:bg-gray-100 font-medium transition-all duration-300"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    View CV Online
                  </Button>
                  <Button 
                    onClick={() => window.open('https://blinq.me/V1BglblPJaWE', '_blank')}
                    variant="outline" 
                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-medium transition-all duration-300"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Digital Card
                  </Button>
                </div>
                <Separator className="bg-gray-800 mb-6" />
                <p className="text-gray-500 text-sm">
                  © 2025 Ryan Moshi. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  )
}
