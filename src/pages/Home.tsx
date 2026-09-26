import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  Star, 
  Mail,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import lavenderHeroBg from '../../assets/lavender_hero_bg.png';
import lisaAtDesk from '../../assets/Lisa_at-desk.jpg';
import probioticEleven from '../../assets/supplements/NaturesSunshine_ProbioticEleven.png';
import chlorophyllPacks from '../../assets/supplements/NaturesSunshine_Chlorophyll-detox-stick-pack.png';
import calmDay from '../../assets/supplements/NutritionalFrontiers_CalmDay_120ct.png';

export function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setStatus('loading');
    
    try {
      const { error } = await supabase
        .from('lnp_email_list')
        .insert([{ email: email }]);

      if (error) throw error;

      setStatus('success');
      setMessage('Thank you for subscribing! Check your email for your 10% discount code.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
      console.error('Subscription error:', error);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-cover bg-center bg-no-repeat py-16 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${lavenderHeroBg})`,
        }}
      >
        {/* Subtle vignette/scrim around edges only if needed - no full white wash */}
        <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none"></div>
        
        <div className="relative max-w-4xl mx-auto text-center z-20 w-full">
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-8 sm:p-10 md:p-14 border border-white/90 shadow-2xl transition-all">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-brand-purple font-bold tracking-tight mb-6 leading-tight">
              Naturopathic Practitioner in Butler, PA
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-800 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
              Partnering with you to restore balance through natural health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/shop" 
                className="w-full sm:w-auto bg-brand-purple hover:bg-brand-purple/90 text-white font-semibold px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <ShoppingBag size={20} />
                Shop Now
              </Link>
              <Link 
                to="/consultation"
                className="w-full sm:w-auto bg-brand-green hover:bg-brand-green/90 text-white font-semibold px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Calendar size={20} />
                Book a Consultation
              </Link>
              <Link 
                to="/location"
                className="w-full sm:w-auto bg-white hover:bg-purple-50 text-brand-purple font-semibold border-2 border-brand-purple/30 px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <MapPin size={20} />
                Visit Our Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-gray-50 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl bg-brand-purple px-6 py-10 text-center text-white shadow-xl sm:px-10 md:py-14">
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" aria-hidden="true" />
            <div className="absolute -bottom-28 -left-12 h-64 w-64 rounded-full bg-brand-green/20" aria-hidden="true" />
            <div className="relative mx-auto max-w-3xl">
              <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                Featured Specialty Services
              </span>
              <h2 className="mt-5 text-3xl font-serif font-bold leading-tight sm:text-4xl">
                Targeted Hormone Testing & Computerized Allergy Scans
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                Pinpoint the root causes of fatigue, chronic pain, and digestive imbalance with advanced diagnostic testing.
              </p>
              <Link
                to="/services/bioenergetic-testing-zyto"
                className="mt-7 inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-brand-purple shadow-md transition-all hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-lg"
              >
                Learn About Diagnostic Testing
                <ChevronRight className="ml-2" size={19} />
              </Link>
            </div>
          </div>

          <div className="my-8 text-center md:my-10">
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-700 sm:text-lg">
              Lisa's Natural Path Serves the Butler, Shanor-Northvue, and surrounding areas, we partner with you to support your body's innate healing ability and reach your highest health potential.
            </p>
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-serif font-bold text-brand-purple sm:text-4xl">Our Wellness Services</h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Personalized natural health support from our practitioner, wellness center, and massage team.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="flex flex-col rounded-2xl border-2 border-brand-purple/20 bg-white p-7 shadow-lg transition-all hover:-translate-y-1 hover:border-brand-purple/40 hover:shadow-xl">
              <h3 className="text-2xl font-serif font-bold text-brand-purple">Holistic Medicine Practitioner</h3>
              <p className="mt-2 font-medium text-brand-green">Hormone Testing & Allergy Scans</p>
              <ul className="mt-6 space-y-3 text-gray-700">
                <li className="flex gap-3"><span className="text-brand-purple">•</span>Functional Hormone Assessments</li>
                <li className="flex gap-3"><span className="text-brand-purple">•</span>Computerized Allergy & Health Scans</li>
                <li className="flex gap-3"><span className="text-brand-purple">•</span>Digital Body Thermography</li>
              </ul>
              <Link to="/services" className="mt-7 inline-flex items-center font-semibold text-brand-purple transition-colors hover:text-brand-green">
                View Practitioner Services <ChevronRight className="ml-1" size={18} />
              </Link>
            </div>

            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-lg transition-all hover:-translate-y-1 hover:border-brand-green/50 hover:shadow-xl">
              <h3 className="text-2xl font-serif font-bold text-brand-purple">Wellness Center</h3>
              <p className="mt-2 font-medium text-brand-green">Colon Hydrotherapy & Detox Therapies</p>
              <ul className="mt-6 space-y-3 text-gray-700">
                <li className="flex gap-3"><span className="text-brand-green">•</span>Colon Hydrotherapy</li>
                <li className="flex gap-3"><span className="text-brand-green">•</span>Far Infrared Sauna & Foot Soaks</li>
                <li className="flex gap-3"><span className="text-brand-green">•</span>Harmonic Wave & Ear Candling</li>
              </ul>
              <Link to="/services" className="mt-7 inline-flex items-center font-semibold text-brand-purple transition-colors hover:text-brand-green">
                Explore Wellness Center <ChevronRight className="ml-1" size={18} />
              </Link>
            </div>

            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-lg transition-all hover:-translate-y-1 hover:border-brand-green/50 hover:shadow-xl">
              <h3 className="text-2xl font-serif font-bold text-brand-purple">Licensed Massage Therapist</h3>
              <p className="mt-2 font-medium text-brand-green">Therapeutic & Deep Tissue Bodywork</p>
              <ul className="mt-6 space-y-3 text-gray-700">
                <li className="flex gap-3"><span className="text-brand-green">•</span>Deep Tissue & Swedish Massage</li>
                <li className="flex gap-3"><span className="text-brand-green">•</span>Lymphatic & Cupping Therapy</li>
                <li className="flex gap-3"><span className="text-brand-green">•</span>Reflexology & Aromatherapy</li>
              </ul>
              <Link to="/services/massage-reflexology" className="mt-7 inline-flex items-center font-semibold text-brand-purple transition-colors hover:text-brand-green">
                Book Massage Therapy <ChevronRight className="ml-1" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={lisaAtDesk}
                alt="Lisa at her desk"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-serif text-brand-purple mb-6">About Lisa's Natural Path</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded with a passion for holistic healing, Lisa's Natural Path provides high-quality 
                herbal supplements, natural remedies, and expert wellness guidance. With over 15 years 
                of experience in natural medicine, we're committed to helping you achieve optimal health 
                through nature's wisdom.
              </p>
              <Link 
                to="/about" 
                className="bg-brand-green hover:bg-brand-green/90 text-white px-6 py-3 rounded-full flex items-center w-fit"
              >
                Learn More
                <ChevronRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-center text-brand-purple mb-12">
            Our Best-Selling Herbal Remedies & Supplements
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Probiotic Eleven",
                price: "$42.95",
                image: probioticEleven,
                description: "A comprehensive probiotic blend supporting digestive and immune health."
              },
              {
                name: "Chlorophyll Stick Packs",
                price: "$34.50",
                image: chlorophyllPacks,
                description: "Convenient, on-the-go packs for natural detoxification and energy support."
              },
              {
                name: "Calm Day 120 ct.",
                price: "$59.50",
                image: calmDay,
                description: "Natural stress relief and mood support supplement."
              }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <p className="text-brand-green font-bold mb-4">{product.price}</p>
                  <Link
                    to="/shop"
                    className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white px-4 py-2 rounded-full inline-block text-center"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="bg-brand-green hover:bg-brand-green/90 text-white px-8 py-3 rounded-full inline-flex items-center"
            >
              Shop All Products
              <ChevronRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-center text-brand-purple mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex text-brand-purple mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Dr. Lisa, your CleanStart Program has transformed my health. I've eliminated prescription meds, lost a jean size, and no longer crave coffee or sweets. Thank you!"
              </p>
              <p className="font-semibold text-gray-900">- Karen Landers</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex text-brand-purple mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "After one week of using CBD Hemp Bomb capsules, my IBS, rheumatoid arthritis, and gout symptoms improved significantly. I now have normal bowel movements, reduced pain, increased energy, and enjoy restful sleep."
              </p>
              <p className="font-semibold text-gray-900">- Sharon</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex text-brand-purple mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "After NAET treatments with Dr. Lisa, my headaches vanished, heartburn subsided, and seasonal allergies improved. I feel revitalized and healthier now."
              </p>
              <p className="font-semibold text-gray-900">- Sandy B.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 bg-brand-purple text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-6">Join Our Wellness Community</h2>
          <p className="text-xl mb-8">Subscribe & Get 10% Off Your First Order</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-6 py-3 rounded-full text-gray-800 w-full sm:w-96"
              required
            />
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="whitespace-nowrap bg-brand-green hover:bg-brand-green/90 text-white px-8 py-3 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail className="mr-2" size={20} />
              {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>
          {message && (
            <p className={`mt-4 text-sm ${
              status === 'success' ? 'text-green-300' : 'text-red-300'
            }`}>
              {message}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
