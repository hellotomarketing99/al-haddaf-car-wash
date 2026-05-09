import { CheckCircle2, ShieldCheck, Zap, Droplets, MapPin, Star } from 'lucide-react'

export const trustLogos = [
  { name: 'Dubai Police', logo: '/logos/dubai-police.svg' },
  { name: 'RTA', logo: '/logos/rta.svg' },
  { name: 'Dubai Municipality', logo: '/logos/municipality.svg' },
  { name: 'DEWA', logo: '/logos/dewa.svg' },
]

export const whyChooseUs = [
  {
    title: 'Eco-Friendly Steam',
    description: 'We use advanced dry steam technology that saves 95% more water than traditional washes.',
    icon: Droplets,
  },
  {
    title: 'Certified Detailers',
    description: 'Our team consists of professionally trained and certified detailing experts.',
    icon: ShieldCheck,
  },
  {
    title: 'Convenient & Fast',
    description: 'Book in 60 seconds and we arrive at your location within the hour.',
    icon: Zap,
  },
  {
    title: 'Premium Products',
    description: 'We only use world-class detailing brands like Gtechniq, Menzerna, and Sonax.',
    icon: CheckCircle2,
  },
]

export const steps = [
  {
    number: '01',
    title: 'Book Online',
    description: 'Select your service and preferred time slot through our simple booking portal.',
  },
  {
    number: '02',
    title: 'We Arrive',
    description: 'Our fully-equipped mobile unit arrives at your home, office, or gym in Dubai.',
  },
  {
    number: '03',
    title: 'Premium Cleaning',
    description: 'We perform the detailing service while you relax or continue your work.',
  },
  {
    number: '04',
    title: 'Drive Fresh',
    description: 'Inspect your gleaming vehicle and pay securely via card or cash.',
  },
]

export const reviews = [
  {
    id: 1,
    author: 'Ahmed Al Mansoori',
    role: 'Tesla Model S Owner',
    content: 'The best mobile wash in Dubai Marina. Their attention to detail on the interior is unmatched. Highly recommended!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=ahmed',
  },
  {
    id: 2,
    author: 'Sarah Johnson',
    role: 'Range Rover Sport Owner',
    content: 'Professional, punctual, and premium. My car looks like it just came out of the showroom. Love the steam cleaning!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    id: 3,
    author: 'Rajesh Gupta',
    role: 'BMW M4 Owner',
    content: 'Incredible service. They handled my matte paint with extreme care. The ceramic coating they applied is fantastic.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=rajesh',
  },
]

export const faqs = [
  {
    question: 'How long does a mobile car wash take?',
    answer: 'A standard Platinum Wash takes about 45-60 minutes, while full Executive Detailing can take 2-4 hours depending on the vehicle condition.',
  },
  {
    question: 'Do you need access to my water or electricity?',
    answer: 'No, our mobile units are completely self-sufficient. We carry our own water tanks and generators.',
  },
  {
    question: 'Do you serve all areas of Dubai?',
    answer: 'Yes, we cover almost all residential and commercial areas in Dubai, including Marina, Palm Jumeirah, Downtown, and Arabian Ranches.',
  },
  {
    question: 'How do I pay for the service?',
    answer: 'We accept cash on delivery, credit/debit cards via our mobile POS, and online payments through our booking portal.',
  },
]
