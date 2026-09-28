import React, { useState } from 'react';
import {
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

const subscribers = [
  { email: 'amanda.williams@gmail.com', joined: 'Sep 24, 2026', status: 'Subscribed' },
  { email: 'jordan.miller@yahoo.com', joined: 'Sep 22, 2026', status: 'Subscribed' },
  { email: 'sarah.bennett@gmail.com', joined: 'Sep 18, 2026', status: 'Subscribed' },
  { email: 'michael.turner@outlook.com', joined: 'Sep 15, 2026', status: 'Subscribed' },
  { email: 'emily.carter@gmail.com', joined: 'Sep 11, 2026', status: 'Subscribed' },
];

const appointments = [
  { time: '9:00 AM', name: 'Amanda Williams', service: 'Initial Consultation', detail: 'Hormone & wellness assessment', color: 'bg-brand-purple' },
  { time: '11:30 AM', name: 'Jordan Miller', service: 'Colon Hydrotherapy', detail: 'Wellness Center', color: 'bg-brand-green' },
  { time: '2:00 PM', name: 'Sarah Bennett', service: 'Deep Tissue Massage', detail: '60 minute session', color: 'bg-amber-500' },
  { time: '4:30 PM', name: 'Michael Turner', service: 'Follow-up Consultation', detail: 'Natural health plan review', color: 'bg-brand-purple' },
];

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setLoginError('Enter your email and password to continue.');
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
              Preview mode: connect authentication and a database to secure this portal and load live records.
            </p>
          </form>
        </div>
      </main>
    );
  }

  const filteredSubscribers = subscribers.filter((subscriber) => subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#f7f5f1] text-gray-900">
      <aside className={`fixed inset-y-0 left-0 z-20 w-72 border-r border-white/10 bg-[#302348] px-6 py-7 text-white transition-transform lg:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"><Leaf size={27} /><span className="font-serif text-xl">Lisa&apos;s Natural Path</span></div>
          <button className="lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={21} /></button>
        </div>
        <div className="mt-12 flex flex-col gap-2">
          <div className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 font-medium"><CalendarDays size={19} /> Overview</div>
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70"><Users size={19} /> Email list</div>
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70"><Clock3 size={19} /> Schedule</div>
        </div>
        <div className="absolute bottom-7 left-6 right-6 rounded-2xl bg-white/10 p-4 text-sm text-white/75">
          <p className="font-medium text-white">Owner account</p><p className="mt-1 truncate">{email}</p>
          <button onClick={() => setIsAuthenticated(false)} className="mt-4 flex items-center gap-2 text-white hover:text-brand-green"><LogOut size={16} /> Sign out</button>
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
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-brand-purple p-6 text-white shadow-lg"><div className="flex items-center justify-between"><p className="text-sm text-white/75">Today&apos;s appointments</p><CalendarDays size={21} /></div><p className="mt-4 text-4xl font-semibold">4</p><p className="mt-2 text-sm text-white/75">All appointments confirmed</p></div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"><div className="flex items-center justify-between"><p className="text-sm text-gray-500">Email subscribers</p><Mail className="text-brand-green" size={21} /></div><p className="mt-4 text-4xl font-semibold text-brand-purple">128</p><p className="mt-2 text-sm text-brand-green">+12 this month</p></div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"><div className="flex items-center justify-between"><p className="text-sm text-gray-500">Next appointment</p><Clock3 className="text-brand-purple" size={21} /></div><p className="mt-4 text-2xl font-semibold text-brand-purple">9:00 AM</p><p className="mt-2 text-sm text-gray-500">Amanda Williams</p></div>
          </div>

          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-semibold text-brand-purple">Today&apos;s schedule</h2><p className="mt-1 text-sm text-gray-500">Appointments for September 27, 2026</p></div><button className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><Download size={17} /> Export schedule</button></div><div className="mt-6 grid gap-3">{appointments.map((appointment) => <div key={appointment.time} className="flex items-center gap-4 rounded-xl border border-gray-100 p-4"><div className={`size-2.5 shrink-0 rounded-full ${appointment.color}`} /><div className="w-20 shrink-0 text-sm font-semibold text-gray-500">{appointment.time}</div><div className="min-w-0 flex-1"><p className="font-semibold text-gray-900">{appointment.name}</p><p className="truncate text-sm text-gray-500">{appointment.service} · {appointment.detail}</p></div><CheckCircle2 className="hidden text-brand-green sm:block" size={19} /></div>)}</div></section>

          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-semibold text-brand-purple">Email list</h2><p className="mt-1 text-sm text-gray-500">Recent newsletter subscribers</p></div><div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2"><Search size={17} className="text-gray-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search emails" className="w-full bg-transparent text-sm outline-none sm:w-48" aria-label="Search email subscribers" /></div></div><div className="mt-6 overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><thead className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-400"><tr><th className="pb-3 font-medium">Email address</th><th className="pb-3 font-medium">Joined</th><th className="pb-3 font-medium">Status</th></tr></thead><tbody>{filteredSubscribers.map((subscriber) => <tr key={subscriber.email} className="border-b border-gray-100 last:border-0"><td className="py-4 font-medium text-gray-800">{subscriber.email}</td><td className="py-4 text-gray-500">{subscriber.joined}</td><td className="py-4"><span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">{subscriber.status}</span></td></tr>)}</tbody></table>{filteredSubscribers.length === 0 && <p className="py-8 text-center text-sm text-gray-500">No subscribers match your search.</p>}</div></section>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
