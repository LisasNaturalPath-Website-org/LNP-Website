import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AdminMonthCalendar } from '../components/AdminMonthCalendar';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Leaf,
  LogOut,
  Mail,
  Menu,
  Search,
  Users,
  X,
} from 'lucide-react';

type Subscriber = { email: string; joined: string; status: string };
type Appointment = { time: string; date: string; name: string; phone: string; email: string; service: string; duration: string; healthConcerns: string; color: string };

const appointmentColors = ['bg-brand-purple', 'bg-brand-green', 'bg-amber-500'];

const ADMIN_EMAIL = 'lnpfrontdesk@lisasnaturalpath.com';
const ADMIN_PASSWORD = 'admin';

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [liveSubscribers, setLiveSubscribers] = useState<Subscriber[]>([]);
  const [liveAppointments, setLiveAppointments] = useState<Appointment[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataError, setDataError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadDashboardData = async () => {
      setIsLoadingData(true);
      setDataError('');
      const [subscriberResult, bookingResult] = await Promise.all([
        (supabase as any).from('lnp_email_list').select('email, created_at').order('created_at', { ascending: false }),
        (supabase as any).from('lnp_bookings').select('full_name, email, phone, service_title, duration, health_concerns, booking_date, booking_time, status').order('booking_date', { ascending: true }),
      ]);

      if (subscriberResult.error || bookingResult.error) {
        setDataError('Live records could not be loaded. Check that the lnp_email_list and lnp_bookings tables are available to this project.');
        setLiveSubscribers([]);
        setLiveAppointments([]);
      } else {
        setLiveSubscribers((subscriberResult.data ?? []).map((subscriber: { email: string; created_at: string | null }) => ({
          email: subscriber.email,
          joined: subscriber.created_at ? new Date(subscriber.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently joined',
          status: 'Subscribed',
        })));
        setLiveAppointments((bookingResult.data ?? []).map((booking: { booking_time: string | null; booking_date: string | null; full_name: string | null; email: string | null; phone: string | null; service_title: string | null; duration: string | null; health_concerns: string | null }, index: number) => ({
          time: booking.booking_time || 'Time pending',
          date: booking.booking_date || 'Date pending',
          name: booking.full_name || 'New client',
          phone: booking.phone || 'No phone',
          email: booking.email || 'No email',
          service: booking.service_title || 'Wellness appointment',
          duration: booking.duration || 'Duration pending',
          healthConcerns: booking.health_concerns || 'No health concerns listed',
          color: appointmentColors[index % appointmentColors.length],
        })));
      }
      setIsLoadingData(false);
    };

    void loadDashboardData();
  }, [isAuthenticated]);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (email.trim() !== 'lnpfrontdesk@lisasnaturalpath.com' || password !== 'admin') {
      setLoginError('Invalid email or password.');
      return;
    }
    setLoginError('');
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f5f1] px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-brand-purple text-white shadow-lg">
              <Leaf size={30} aria-hidden="true" />
            </div>
            <h1 className="mt-6 text-4xl font-semibold text-brand-purple">Owner Portal</h1>
            <p className="mt-2 text-gray-600">Lisa&apos;s Natural Path administration</p>
          </div>
          <form onSubmit={handleLogin} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
              <p className="mt-1 text-sm text-gray-500">Sign in to view your business activity.</p>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Email address
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="owner@example.com"
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                />
              </label>
            </div>
            {loginError && <p className="mt-3 text-sm text-red-600" role="alert">{loginError}</p>}
            <button type="submit" className="mt-6 w-full rounded-xl bg-brand-purple px-4 py-3.5 font-semibold text-white shadow-md transition hover:bg-brand-purple/90">
              Sign in to dashboard
            </button>
            <p className="mt-5 text-center text-xs leading-relaxed text-gray-500">
              Dashboard records are loaded from your configured Supabase tables after sign-in.
            </p>
          </form>
          <div className="mt-6 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-brand-purple transition hover:text-brand-purple/80">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const filteredSubscribers = liveSubscribers.filter((subscriber) => subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#f7f5f1] text-gray-900">
      <aside className={`fixed inset-y-0 left-0 z-20 flex w-72 flex-col overflow-y-auto border-r border-white/10 bg-[#302348] px-6 py-7 text-white transition-transform lg:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"><Leaf size={27} /><span className="font-serif text-xl">Lisa&apos;s Natural Path</span></div>
          <button className="lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={21} /></button>
        </div>
        <div className="mt-12 flex flex-col gap-2">
          <div className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 font-medium"><CalendarDays size={19} /> Overview</div>
          <Link to="/admin/email-list" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70 transition hover:bg-white/10"><Users size={19} /> Email list</Link>
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70"><Clock3 size={19} /> Schedule</div>
        </div>
        <AdminMonthCalendar />
        <div className="mt-auto pt-8 text-sm text-white/75">
          <div className="rounded-2xl bg-white/10 p-4">
          <p className="font-medium text-white">Owner account</p><p className="mt-1 truncate">{email}</p>
          <button onClick={() => setIsAuthenticated(false)} className="mt-4 flex items-center gap-2 text-white hover:text-brand-green"><LogOut size={16} /> Sign out</button>
          </div>
        </div>
      </aside>

      {menuOpen && <button className="fixed inset-0 z-10 bg-black/30 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}
      <main className="lg:pl-72">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-5 sm:px-8">
          <button className="rounded-lg p-2 text-gray-700 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={23} /></button>
          <div className="hidden sm:block"><p className="text-sm text-gray-500">Saturday, September 27, 2026</p><h1 className="mt-1 text-2xl font-semibold text-brand-purple">Good morning, Lisa</h1></div>
          <div className="ml-auto flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-full bg-brand-green font-semibold text-white">L</div><span className="hidden text-sm font-medium sm:inline">Business owner</span></div>
        </header>
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="mb-8 sm:hidden"><p className="text-sm text-gray-500">Saturday, September 27, 2026</p><h1 className="mt-1 text-2xl font-semibold text-brand-purple">Good morning, Lisa</h1></div>
          {dataError && <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800" role="status">{dataError}</p>}
          {isLoadingData && <p className="mb-6 text-sm text-gray-500" role="status">Loading live records...</p>}
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-brand-purple p-6 text-white shadow-lg"><div className="flex items-center justify-between"><p className="text-sm text-white/75">Today&apos;s appointments</p><CalendarDays size={21} /></div><p className="mt-4 text-4xl font-semibold">{liveAppointments.length}</p><p className="mt-2 text-sm text-white/75">All appointments confirmed</p></div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"><div className="flex items-center justify-between"><p className="text-sm text-gray-500">Email subscribers</p><Mail className="text-brand-green" size={21} /></div><p className="mt-4 text-4xl font-semibold text-brand-purple">{liveSubscribers.length}</p><p className="mt-2 text-sm text-gray-500">Live records from Supabase</p></div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"><div className="flex items-center justify-between"><p className="text-sm text-gray-500">Next appointment</p><Clock3 className="text-brand-purple" size={21} /></div><p className="mt-4 text-2xl font-semibold text-brand-purple">{liveAppointments[0]?.time ?? 'None scheduled'}</p><p className="mt-2 text-sm text-gray-500">{liveAppointments[0]?.name ?? 'No upcoming appointments'}</p></div>
          </div>

          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-semibold text-brand-purple">Today&apos;s schedule</h2><p className="mt-1 text-sm text-gray-500">Appointments for September 27, 2026</p></div><button className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><Download size={17} /> Export schedule</button></div><div className="mt-6 grid gap-3">{liveAppointments.map((appointment) => <div key={appointment.time + appointment.name} className="flex items-start gap-4 rounded-xl border border-gray-100 p-4"><div className={`mt-1.5 size-2.5 shrink-0 rounded-full ${appointment.color}`} /><div className="w-24 shrink-0"><div className="text-sm font-semibold text-gray-500">{appointment.time}</div><div className="text-xs text-gray-400">{appointment.date}</div></div><div className="min-w-0 flex-1"><p className="font-semibold text-gray-900">{appointment.name} <span className="font-normal text-gray-500">· {appointment.phone}</span></p><p className="truncate text-sm text-gray-600">{appointment.service} · {appointment.duration}</p><p className="truncate text-sm text-gray-500">{appointment.email}</p><p className="mt-1 text-sm text-gray-500">Health concerns: {appointment.healthConcerns}</p></div><CheckCircle2 className="hidden text-brand-green sm:block" size={19} /></div>)}</div></section>

          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-semibold text-brand-purple">Email list</h2><p className="mt-1 text-sm text-gray-500">Recent newsletter subscribers</p></div><div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2"><Search size={17} className="text-gray-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search emails" className="w-full bg-transparent text-sm outline-none sm:w-48" aria-label="Search email subscribers" /></div></div><div className="mt-6 overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><thead className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-400"><tr><th className="pb-3 font-medium">Email address</th><th className="pb-3 font-medium">Joined</th><th className="pb-3 font-medium">Status</th></tr></thead><tbody>{filteredSubscribers.map((subscriber) => <tr key={subscriber.email} className="border-b border-gray-100 last:border-0"><td className="py-4 font-medium text-gray-800">{subscriber.email}</td><td className="py-4 text-gray-500">{subscriber.joined}</td><td className="py-4"><span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">{subscriber.status}</span></td></tr>)}</tbody></table>{filteredSubscribers.length === 0 && <p className="py-8 text-center text-sm text-gray-500">No subscribers match your search.</p>}</div></section>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
