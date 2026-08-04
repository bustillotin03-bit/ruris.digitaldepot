"use client";

import { useState, useEffect } from 'react';
import { Lilita_One, Quicksand } from 'next/font/google';
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE INITIALIZATION ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fonts
const titleFont = Lilita_One({ weight: '400', subsets: ['latin'] });
const subtitleFont = Quicksand({ weight: '700', subsets: ['latin'] });
const textFont = Quicksand({ weight: '500', subsets: ['latin'] });

// --- PRODUCT DATA ---
const productsData = [
  { category: "🍓 ，educational", items: ["Grammarly", "Google Ai+ Gemini", "Ms365", "Studocu", "Duolingo", "chatgpt", "Coursera", "Skillshare", "Camscanner", "Coursehero unlocks", "Quillbot", "Grok"] },
  { category: "🍓 ，Editing Apps", items: ["capcut", "canva", "meitu", "wink", "remini", "picsart", "alight motion", "collegemaker", "Adobe cc", "Faceapp", "Facelab", "Facetune", "Beautyplus"] },
  { category: "🍓 ，Entertainments", items: ["prime video", "Netflix", "Disney+", "crunchyroll", "youtube premium", "spotify", "Loklok", "Viu", "iQiyi", "HBO"] },
  { category: "🍓 ，VPNS", items: ["Surfshark", "Turbo", "HMA", "Cyberghost", "Vypr", "Express VPN", "Windscribe"] }
];

const allProductNames = productsData.flatMap(c => c.items);

// --- HARDCODED FALLBACK PRICING & RULES ---
const productDetails: Record<string, { prices?: { label: string; price: string }[], rules?: string[], note?: string }> = {
  "Grammarly": { prices: [{ label: "1 month, shared", price: "₱15" }, { label: "1 month, solo via inv", price: "₱25" }, { label: "1 month, solo acc prov", price: "₱45" }], rules: ["Not straight sub", "Weekly rep/renew", "Full warranty"] },
  "Google Ai+ Gemini": { prices: [{ label: "Ai+ 1m 2TB inv", price: "₱35" }, { label: "Ai+ 1m 5TB inv", price: "₱65" }, { label: "Ai+ 1yr 5TB + Gemini + 1k Veo3 + gmeet", price: "₱150" }, { label: "Ai Pro 18m 5TB sharing", price: "₱175" }], rules: ["Via invite", "200 credits google flow", "Straight sub", "Full warranty", "Strictly 1 dev only for shared"] },
  "Ms365": { prices: [{ label: "Via inv 1 month", price: "₱20" }, { label: "Via inv 2 months", price: "₱35" }, { label: "Famhead 1 month", price: "₱55" }, { label: "Famhead 2 months", price: "₱80" }, { label: "Famhead 4 months", price: "₱140" }, { label: "Famhead 12 months", price: "₱320" }], rules: ["Full warranty", "Monthly invitation", "Famhead - up to 5 members"] },
  "Studocu": { prices: [{ label: "1 month shared", price: "₱20" }, { label: "1 month solo", price: "₱40" }], rules: ["Can download files", "Not straight sub", "Weekly rep - full warranty"] },
  "Duolingo": { prices: [{ label: "7 days", price: "₱20" }, { label: "1 month via inv", price: "₱40" }, { label: "1 month via acc", price: "₱55" }, { label: "1 month famhead", price: "₱65" }], rules: ["Auto hold / unlimited rep", "Same day replacement"] },
  "chatgpt": { prices: [{ label: "GO 1 month shared", price: "₱55" }, { label: "GO 1 month solo", price: "₱180" }, { label: "PLUS 1 month shared", price: "₱155" }, { label: "PLUS 1 month solo", price: "₱195" }], rules: ["Strictly 1 device", "Limited sharing features (via code log in)", "Not best for image generation", "Light to moderate usage only"] },
  "Coursera": { prices: [{ label: "7 days shared", price: "₱15" }, { label: "7 days solo", price: "₱20" }, { label: "1 month shared", price: "₱25" }, { label: "1 month solo", price: "₱40" }], rules: ["Not / straight sub", "Same day replacement", "Full warranty"] },
  "Skillshare": { prices: [{ label: "7 days shared", price: "₱15" }, { label: "7 days solo", price: "₱20" }, { label: "1 month shared", price: "₱25" }, { label: "1 month solo", price: "₱40" }], rules: ["Not / straight sub", "Same day replacement", "Full warranty"] },
  "Camscanner": { prices: [{ label: "1 month shared", price: "₱30" }, { label: "1 month solo (up to 3 mos)", price: "₱50" }], rules: ["Auto hold / unlimited rep", "Same day replacement", "Monthly replacement"] },
  "Coursehero unlocks": { prices: [{ label: "Per link", price: "₱10" }] },
  "Quillbot": { prices: [{ label: "1 month shared", price: "₱25" }, { label: "2 months shared", price: "₱35" }, { label: "3 months shared", price: "₱55" }], rules: ["Full warranty"] },
  "Grok": { prices: [{ label: "7 days shared", price: "₱45" }, { label: "1 month shared", price: "₱80" }, { label: "1 month solo", price: "₱265" }], rules: ["Not / straight sub", "Same day replacement", "Full warranty"] },
  "capcut": { prices: [{ label: "Pro 7d shared", price: "₱40" }, { label: "Pro 7d solo", price: "₱60" }, { label: "Pro 30d shared", price: "₱80" }, { label: "Pro 30d solo", price: "₱135" }], note: "Restocking" },
  "canva": { prices: [{ label: "Per invite", price: "₱5" }, { label: "With brandkit", price: "₱6" }] },
  "meitu": { prices: [{ label: "7d shared", price: "₱45" }, { label: "7d solo", price: "₱60" }, { label: "1 month shared", price: "₱80" }, { label: "1 month solo", price: "₱155" }], rules: ["Not straight sub", "Same day / weekly replacement"] },
  "wink": { prices: [{ label: "7d shared", price: "₱40" }, { label: "7d solo", price: "₱55" }, { label: "1 month shared", price: "₱80" }, { label: "1 month solo", price: "₱155" }], rules: ["iOS only", "Not straight sub", "Same day / weekly replacement"] },
  "remini": { prices: [{ label: "Pro App 7d shared", price: "₱40" }, { label: "Pro App 7d solo", price: "₱65" }, { label: "Pro App 1m shared", price: "₱80" }, { label: "Pro App 1m solo", price: "₱150" }, { label: "Pro Web 7d shared", price: "₱15" }, { label: "Pro Web 7d solo", price: "₱25" }, { label: "Pro Web 1m shared", price: "₱35" }, { label: "Pro Web 1m solo", price: "₱45" }], rules: ["Not straight sub", "Same day / weekly replacement", "Full warranty"] },
  "picsart": { prices: [{ label: "7d shared", price: "₱20" }, { label: "7d solo", price: "₱30" }, { label: "30d shared", price: "₱45" }, { label: "30d solo", price: "₱55" }], rules: ["Not straight sub", "Weekly rep", "Strictly 1 dev only for shared"] },
  "alight motion": { prices: [{ label: "7d solo", price: "₱30" }, { label: "1m solo", price: "₱55" }, { label: "2m solo", price: "₱95" }, { label: "3m solo", price: "₱130" }], rules: ["Not straight sub", "Weekly / monthly replacement", "Full warranty"] },
  "collegemaker": { prices: [{ label: "7d shared", price: "₱13" }, { label: "7d solo", price: "₱20" }, { label: "1m shared", price: "₱25" }, { label: "1m solo", price: "₱50" }], rules: ["Not straight sub", "Same day / weekly replacement", "Full warranty"] },
  "Adobe cc": { prices: [{ label: "1 month solo", price: "₱65" }, { label: "2 months solo", price: "₱90" }, { label: "3 months solo", price: "₱170" }, { label: "4 months solo", price: "₱245" }, { label: "5 months solo", price: "₱270" }], rules: ["Weekly/monthly renew/rep", "Full warranty"] },
  "Faceapp": { prices: [{ label: "7 days solo", price: "₱45" }, { label: "14 days solo", price: "₱60" }, { label: "1 month solo", price: "₱80" }], rules: ["iOS only - app store log in", "Strictly 1 device"] },
  "Facelab": { prices: [{ label: "7 days solo", price: "₱45" }, { label: "14 days solo", price: "₱60" }, { label: "1 month solo", price: "₱80" }], rules: ["iOS only - app store log in", "Strictly 1 device"] },
  "Facetune": { prices: [{ label: "7 days solo", price: "₱45" }, { label: "14 days solo", price: "₱60" }, { label: "1 month solo", price: "₱80" }], rules: ["iOS only - app store log in", "Strictly 1 device"] },
  "Beautyplus": { prices: [{ label: "7d shared", price: "₱40" }, { label: "7d solo", price: "₱60" }, { label: "1 month shared", price: "₱75" }, { label: "1 month solo", price: "₱130" }], rules: ["Not straight sub", "Same day/ weekly replacement"] },
  "prime video": { prices: [{ label: "1m solo prof", price: "₱30" }, { label: "1m solo acc", price: "₱70" }, { label: "2m solo prof", price: "₱45" }, { label: "2m solo acc", price: "₱115" }, { label: "3m solo prof", price: "₱90" }, { label: "3m solo acc", price: "₱160" }], rules: ["1 month straight sub", "Monthly renew / replacement", "Full warranty"] },
  "crunchyroll": { prices: [{ label: "1m shared prof (1dev)", price: "₱30" }, { label: "1m solo prof (1dev)", price: "₱35" }, { label: "1m solo prof (2dev)", price: "₱45" }, { label: "1m solo acc", price: "₱65" }], rules: ["4 concurrent streams at the same time", "Not straight sub - dm for renewal", "No need VPN (can use VPN for other movies)", "Less hold"] },
  "youtube premium": { prices: [{ label: "30d via inv", price: "₱13" }, { label: "30d solo", price: "₱40" }, { label: "30d fam head", price: "₱55" }, { label: "30d solo own email", price: "₱25" }, { label: "30d fam head own email", price: "₱40" }] },
  "spotify": { prices: [{ label: "1m shared", price: "₱30" }, { label: "1m solo inv", price: "₱45" }, { label: "1m famhead", price: "₱160" }, { label: "2m solo", price: "₱80" }, { label: "2m famhead", price: "₱230" }], rules: ["My/your acc for solo"] },
  "Loklok": { prices: [{ label: "1m basic shared", price: "₱50" }, { label: "1m standard shared", price: "₱65" }, { label: "1m basic solo", price: "₱165" }, { label: "1m standard solo", price: "₱275" }], rules: ["Straight sub", "Full warranty"] },
  "Disney+": { prices: [{ label: "30d shared (1dev)", price: "₱30" }, { label: "30d solo (1dev)", price: "₱40" }, { label: "30d solo (2dev)", price: "₱55" }, { label: "30d solo acc", price: "₱135" }, { label: "12m shared prof (1dev)", price: "₱110" }, { label: "12m solo prof (1dev)", price: "₱170" }, { label: "12m solo prof (2dev)", price: "₱210" }, { label: "12m solo acc (10dev)", price: "₱480" }], rules: ["Straight billed", "Full warranty"] },
  "iQiyi": { prices: [{ label: "Standard 1m shared", price: "₱45" }, { label: "Standard 1m solo", price: "₱150" }, { label: "Premium 1m solo", price: "₱170" }], rules: ["1 month straight sub", "Monthly renew / replacement", "Full warranty"] },
  "Viu": { prices: [{ label: "PH 1m shared", price: "₱35" }, { label: "PH 2m solo", price: "₱65" }, { label: "Non-PH 1m shared", price: "₱25" }, { label: "Non-PH 1m solo", price: "₱55" }, { label: "Non-PH 2m shared", price: "₱45" }, { label: "Non-PH 2m solo", price: "₱60" }], rules: ["Full warranty"] },
  "HBO": { prices: [{ label: "1m shared", price: "₱35" }, { label: "1m solo prof (1dev)", price: "₱50" }, { label: "1m solo prof (2dev)", price: "₱65" }, { label: "1m solo acc", price: "₱130" }], rules: ["Full warranty"] }
};

const boostingCategories = ["Facebook", "Instagram", "Tiktok", "Telegram", "Youtube"];
const domainPrices = [{ ext: ".online", price: "₱150" }, { ext: ".site", price: "₱150" }, { ext: ".website", price: "₱150" }, { ext: ".shop", price: "₱150" }, { ext: ".space", price: "₱150" }, { ext: ".fun", price: "₱150" }, { ext: ".icu", price: "₱150" }, { ext: ".life", price: "₱150" }, { ext: ".click", price: "₱170" }, { ext: ".xyz", price: "₱170" }, { ext: ".com", price: "₱150" }];
const acceptedPayments = ["Gcash", "Paymaya", "Gotyme", "Union Bank", "Cimb", "Maribank", "Paypal", "Pioneer", "Wise"];

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedBoosting, setSelectedBoosting] = useState<string | null>(null);
  const [openService, setOpenService] = useState<string | null>(null);

  const [dbProducts, setDbProducts] = useState<Record<string, { status: string, prices: any[] }>>({});

  const [adminUsername, setAdminUsername] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [adminSection, setAdminSection] = useState<'tickets' | 'products'>('tickets');
  
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState('Available');
  const [editPrices, setEditPrices] = useState<{label: string, price: string}[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [tickets, setTickets] = useState<any[]>([]);
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    premium_type: '', telegram_username: '', first_email: '', contact_email: '', personal_email: '',
    account_password: '', subscription: '', solo_shared: '', purchased_price: '',
    date_purchased: '', date_reported: '', remaining_days: '', issue: ''
  });

  useEffect(() => {
    fetchDbProducts();
  }, []);

  // Sync tickets automatically if Admin is logged in OR if the user is checking the public tickets view
  useEffect(() => {
    if (activeTab === 'public-tickets' || (isAdminLoggedIn && activeTab === 'admin' && adminSection === 'tickets')) {
      fetchTickets();
    }
  }, [isAdminLoggedIn, activeTab, adminSection]);

  const fetchDbProducts = async () => {
    const { data } = await supabase.from('ruri_products').select('*');
    if (data) {
      const mapping: any = {};
      data.forEach(d => { mapping[d.product_name] = { status: d.status, prices: d.prices }; });
      setDbProducts(mapping);
    }
  };

  const fetchTickets = async () => {
    const { data } = await supabase.from('ruri_tickets').select('*').order('created_at', { ascending: false });
    if (data) setTickets(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const { error } = await supabase.from('ruri_tickets').insert([formData]);

    if (error) {
      setSubmitMessage('❌ Error submitting ticket. Please try again.');
    } else {
      setSubmitMessage('✅ Ticket submitted successfully! Please check the "Submitted Tickets" section for live updates.');
      setFormData({ premium_type: '', telegram_username: '', first_email: '', contact_email: '', personal_email: '', account_password: '', subscription: '', solo_shared: '', purchased_price: '', date_purchased: '', date_reported: '', remaining_days: '', issue: '' });
    }
    setIsSubmitting(false);
  };

  const updateTicketStatus = async (id: string, newStatus: string) => {
    await supabase.from('ruri_tickets').update({ status: newStatus }).eq('id', id);
    fetchTickets();
  };

  const handleSelectEditProduct = (name: string) => {
    setEditingProduct(name);
    const dbData = dbProducts[name];
    const fallback = productDetails[name];
    setEditStatus(dbData?.status || 'Available');
    setEditPrices(dbData?.prices || fallback?.prices || []);
  };

  const updateEditPrice = (index: number, field: 'label' | 'price', value: string) => {
    const newPrices = [...editPrices];
    newPrices[index][field] = value;
    setEditPrices(newPrices);
  };

  const addPriceOption = () => setEditPrices([...editPrices, { label: 'New Option', price: '₱0' }]);
  const removePriceOption = (index: number) => setEditPrices(editPrices.filter((_, i) => i !== index));

  const handleSaveProduct = async () => {
    if (!editingProduct) return;
    const { error } = await supabase.from('ruri_products').upsert({
      product_name: editingProduct,
      status: editStatus,
      prices: editPrices
    });
    if (!error) {
      alert('✅ Product Pricing & Status Updated!');
      fetchDbProducts();
    } else {
      alert('❌ Error updating product.');
    }
  };

  const toggleCategory = (categoryName: string) => setOpenCategory(openCategory === categoryName ? null : categoryName);
  const toggleService = (serviceName: string) => setOpenService(openService === serviceName ? null : serviceName);
  const handleNav = (tab: string) => { setActiveTab(tab); setIsSidebarOpen(false); };
  
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername === 'rurishopz' && adminPin === '192005') { setIsAdminLoggedIn(true); setLoginError(false); setAdminUsername(''); setAdminPin(''); } 
    else { setLoginError(true); }
  };
  const handleAdminLogout = () => { setIsAdminLoggedIn(false); setActiveTab('dashboard'); };

  const inputStyle = { width: '100%', padding: '12px 15px', borderRadius: '10px', border: '1px solid #E6A8D7', backgroundColor: '#FDF0F5', color: '#8A2BE2', marginBottom: '15px', fontFamily: textFont.style.fontFamily, outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block', color: '#8A2BE2', fontWeight: 'bold', marginBottom: '5px', fontSize: '0.95rem' };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#FDF0F5', fontFamily: textFont.style.fontFamily, overflow: 'hidden' }}>
      
      {/* SIDEBAR NAVIGATION */}
      <button onClick={() => setIsSidebarOpen(true)} style={{ position: 'fixed', top: '15px', left: '15px', zIndex: 50, backgroundColor: '#8A2BE2', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 15px', fontSize: '1.5rem', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>☰</button>
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 90 }} />}
      <nav style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px', backgroundColor: '#FFD1DC', zIndex: 100, transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s ease-in-out', boxShadow: '4px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ backgroundColor: '#000000', padding: '25px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className={titleFont.className} style={{ color: '#FFD1DC', margin: 0, fontSize: '1.8rem', letterSpacing: '1px' }}>Ruri&apos;s Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#FFD1DC', fontSize: '2rem', cursor: 'pointer' }}>×</button>
        </div>
        <div style={{ padding: '20px 0', flex: 1, overflowY: 'auto' }}>
          {[
            { id: 'dashboard', label: '🏠 Dashboard' }, 
            { id: 'products', label: '🛍️ Products Offered' },
            { id: 'services', label: '✨ Services Offered' }, 
            { id: 'payment', label: '💳 Payment Options' },
            { id: 'reports', label: '🎫 Submit a Ticket' }, 
            { id: 'public-tickets', label: '✅ Submitted Tickets' }, // NEW PUBLIC TICKETS SECTION
            { id: 'contact', label: '📞 Customer Service' }
          ].map((item) => (
            <div key={item.id} onClick={() => handleNav(item.id)} style={{ padding: '15px 25px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', backgroundColor: activeTab === item.id ? '#000000' : 'transparent', color: activeTab === item.id ? '#FFD1DC' : '#000000', borderBottom: '1px solid rgba(0,0,0,0.05)', transition: 'all 0.2s' }}>{item.label}</div>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '5rem 1rem 2rem 1rem', width: '100%' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>

          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div style={{ animation: 'fadeIn 0.5s' }}>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h1 className={titleFont.className} style={{ color: '#ffffff', fontSize: '5rem', letterSpacing: '3px', margin: '0', lineHeight: '1', textShadow: `-2px -2px 0 #8A2BE2, 2px -2px 0 #8A2BE2, -2px 2px 0 #8A2BE2, 2px 2px 0 #8A2BE2, 6px 6px 0 #8A2BE2, 0 0 25px #E6A8D7` }}>Ruri&apos;s Shop</h1>
                <h2 className={subtitleFont.className} style={{ color: '#D27DCE', fontSize: '1.6rem', marginTop: '5px', letterSpacing: '1px' }}>Ruri&apos;s Digital Depot</h2>
              </div>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', marginBottom: '15px', borderLeft: '5px solid #8A2BE2', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                <p style={{ color: '#8A2BE2', margin: 0, fontWeight: 'bold', fontSize: '1.05rem', lineHeight: '1.5' }}>⚠️ <span style={{ color: '#D27DCE' }}>Reminder:</span> Please note that the premium products are BMed; this simply means that possible errors/problems may occur on the account.</p>
              </div>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', marginBottom: '25px', borderLeft: '5px solid #D27DCE', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', margin: '0 0 10px 0', fontSize: '1.3rem' }}>📜 Rules & Regulations</h3>
                <p style={{ color: '#8A2BE2', margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}><strong>No Refund Policy</strong>, unless stated by owner. If incorrect amount is sent, it will be considered as a balance. If insist, a 2% deduction may apply.</p>
              </div>
              <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '1.8rem', textAlign: 'center', marginBottom: '15px' }}>Navigate Here 👇</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '3rem' }}>
                {[
                  { id: 'products', label: '🛍️ Products', bg: '#8A2BE2', color: 'white' }, { id: 'services', label: '✨ Services', bg: '#D27DCE', color: 'white' },
                  { id: 'payment', label: '💳 Payments', bg: '#ffffff', color: '#8A2BE2', border: '2px solid #8A2BE2' }, { id: 'reports', label: '🎫 Submit Ticket', bg: '#ffffff', color: '#D27DCE', border: '2px solid #D27DCE' }
                ].map((btn) => (
                  <button key={btn.id} onClick={() => handleNav(btn.id)} style={{ backgroundColor: btn.bg, color: btn.color, border: btn.border || 'none', padding: '15px', borderRadius: '15px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>{btn.label}</button>
                ))}
              </div>
              <div style={{ backgroundColor: '#000000', borderRadius: '20px', padding: '25px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                <h3 className={subtitleFont.className} style={{ color: '#FFD1DC', margin: '0 0 15px 0', fontSize: '1.4rem', textAlign: 'center' }}>🔒 Admin Tool</h3>
                {isAdminLoggedIn ? (
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#4ADE80', fontWeight: 'bold', marginBottom: '15px' }}>✅ Login Successful!</p>
                    <button onClick={() => handleNav('admin')} style={{ width: '100%', padding: '12px', borderRadius: '10px', backgroundColor: '#8A2BE2', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginBottom: '10px' }}>Enter Admin Panel</button>
                    <button onClick={handleAdminLogout} style={{ width: '100%', padding: '12px', borderRadius: '10px', backgroundColor: 'transparent', color: '#FFD1DC', fontWeight: 'bold', border: '1px solid #FFD1DC', cursor: 'pointer' }}>Logout</button>
                  </div>
                ) : (
                  <form onSubmit={handleAdminLogin}>
                    <input type="text" placeholder="Username" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} style={{ ...inputStyle, backgroundColor: '#333', color: 'white', border: 'none' }} required />
                    <input type="password" placeholder="PIN Code" value={adminPin} onChange={(e) => setAdminPin(e.target.value)} style={{ ...inputStyle, backgroundColor: '#333', color: 'white', border: 'none' }} required />
                    {loginError && <p style={{ color: '#EF4444', fontSize: '0.9rem', marginTop: '-10px', marginBottom: '10px', textAlign: 'center' }}>Incorrect Username or PIN.</p>}
                    <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#FFD1DC', color: '#000000', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>Login</button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* VIEW: ADMIN PANEL */}
          {activeTab === 'admin' && isAdminLoggedIn && (
            <div style={{ animation: 'fadeIn 0.5s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '2rem', margin: 0 }}>⚙️ Admin Panel</h3>
                <button onClick={handleAdminLogout} style={{ padding: '8px 15px', borderRadius: '10px', backgroundColor: '#EF4444', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Logout</button>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setAdminSection('tickets')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: adminSection === 'tickets' ? '#8A2BE2' : '#ffffff', color: adminSection === 'tickets' ? 'white' : '#8A2BE2', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>🎫 Tickets</button>
                <button onClick={() => setAdminSection('products')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: adminSection === 'products' ? '#8A2BE2' : '#ffffff', color: adminSection === 'products' ? 'white' : '#8A2BE2', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>🛍️ Edit Products</button>
              </div>
              {adminSection === 'tickets' && (
                <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                  <h4 style={{ color: '#D27DCE', margin: '0 0 15px 0', fontSize: '1.4rem' }}>🎫 Submitted Tickets</h4>
                  {tickets.length === 0 ? <p style={{ color: '#8A2BE2', fontStyle: 'italic' }}>No tickets submitted yet.</p> : (
                    tickets.map((ticket) => (
                      <div key={ticket.id} style={{ border: '2px solid #FDF0F5', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <strong>{ticket.premium_type || 'Unknown Item'}</strong>
                          <select value={ticket.status} onChange={(e) => updateTicketStatus(ticket.id, e.target.value)} style={{ padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold', border: 'none', outline: 'none', backgroundColor: ticket.status === 'Completed' ? '#4ADE80' : ticket.status === 'In Progress' ? '#FBBF24' : '#FCA5A5', color: 'white' }}>
                            <option value="Pending">Pending</option><option value="In Progress">In Progress</option><option value="Completed">Completed</option>
                          </select>
                        </div>
                        <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#888' }}>Contact Email: {ticket.contact_email}</p>
                        <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#888' }}>Issue: {ticket.issue}</p>
                        <button onClick={() => setExpandedTicketId(expandedTicketId === ticket.id ? null : ticket.id)} style={{ background: 'none', border: 'none', color: '#8A2BE2', fontWeight: 'bold', cursor: 'pointer', padding: 0, marginTop: '10px' }}>
                          {expandedTicketId === ticket.id ? 'Hide Details ▲' : 'View Full Details ▼'}
                        </button>
                        {expandedTicketId === ticket.id && (
                          <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#FDF0F5', borderRadius: '8px', fontSize: '0.85rem', color: '#333' }}>
                            <p style={{ margin: '3px 0' }}><strong>Personal Email:</strong> {ticket.personal_email}</p>
                            <p style={{ margin: '3px 0' }}><strong>TG Username:</strong> {ticket.telegram_username}</p>
                            <p style={{ margin: '3px 0' }}><strong>First Email:</strong> {ticket.first_email}</p>
                            <p style={{ margin: '3px 0' }}><strong>Password:</strong> {ticket.account_password}</p>
                            <p style={{ margin: '3px 0' }}><strong>Subscription:</strong> {ticket.subscription}</p>
                            <p style={{ margin: '3px 0' }}><strong>Solo/Shared:</strong> {ticket.solo_shared}</p>
                            <p style={{ margin: '3px 0' }}><strong>Price:</strong> {ticket.purchased_price}</p>
                            <p style={{ margin: '3px 0' }}><strong>Date Purchased:</strong> {ticket.date_purchased}</p>
                            <p style={{ margin: '3px 0' }}><strong>Date Reported:</strong> {ticket.date_reported}</p>
                            <p style={{ margin: '3px 0' }}><strong>Remaining Days:</strong> {ticket.remaining_days}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
              {adminSection === 'products' && (
                <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                  <h4 style={{ color: '#D27DCE', margin: '0 0 15px 0', fontSize: '1.4rem' }}>🛍️ Product Manager</h4>
                  <label style={labelStyle}>Select a Product to Edit:</label>
                  <select value={editingProduct || ''} onChange={(e) => handleSelectEditProduct(e.target.value)} style={{...inputStyle, marginBottom: '25px'}}>
                    <option value="">-- Choose a Product --</option>
                    {allProductNames.map(name => <option key={name} value={name}>{name}</option>)}
                  </select>
                  {editingProduct && (
                    <div style={{ borderTop: '2px dashed #E6A8D7', paddingTop: '20px' }}>
                      <label style={labelStyle}>Availability Status:</label>
                      <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} style={{...inputStyle, backgroundColor: editStatus === 'Out of Stock' ? '#FEE2E2' : '#DCFCE7', color: editStatus === 'Out of Stock' ? '#EF4444' : '#22C55E', fontWeight: 'bold'}}>
                        <option value="Available">Available</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Restocking">Restocking</option>
                      </select>
                      <label style={{...labelStyle, marginTop: '20px'}}>Pricing Options:</label>
                      {editPrices.map((p, index) => (
                        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                          <input type="text" value={p.label} onChange={(e) => updateEditPrice(index, 'label', e.target.value)} style={{...inputStyle, marginBottom: 0, flex: 2}} placeholder="Variant (e.g. 1 Month Solo)" />
                          <input type="text" value={p.price} onChange={(e) => updateEditPrice(index, 'price', e.target.value)} style={{...inputStyle, marginBottom: 0, flex: 1}} placeholder="Price (e.g. ₱50)" />
                          <button onClick={() => removePriceOption(index)} style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#EF4444', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
                        </div>
                      ))}
                      <button onClick={addPriceOption} style={{ padding: '10px 15px', borderRadius: '10px', backgroundColor: 'transparent', color: '#8A2BE2', border: '2px dashed #8A2BE2', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginBottom: '25px' }}>+ Add Price Option</button>
                      <button onClick={handleSaveProduct} style={{ width: '100%', padding: '15px', borderRadius: '10px', border: 'none', backgroundColor: '#8A2BE2', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 10px rgba(138,43,226,0.3)' }}>💾 Save Changes to Store</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* VIEW: PRODUCTS, SERVICES, PAYMENT (Unchanged logic omitted here for brevity, full code is included) */}
          {activeTab === 'products' && (
            <div style={{ animation: 'fadeIn 0.5s' }}>
              <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', borderBottom: '3px solid #E6A8D7', paddingBottom: '10px' }}>Products Offered</h3>
              {productsData.map((data, index) => (
                <div key={index} style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '15px 20px', marginBottom: '15px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                  <div onClick={() => toggleCategory(data.category)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                    <h4 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '1.2rem', margin: 0 }}>{data.category}</h4>
                    <span style={{ color: '#D27DCE', fontSize: '0.9rem', fontWeight: 'bold' }}>{openCategory === data.category ? '▴' : '▾'} 𝐢. lists informations</span>
                  </div>
                  {openCategory === data.category && (
                    <div style={{ marginTop: '15px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {data.items.map((item, idx) => (
                        <button key={idx} onClick={() => setSelectedProduct(item)} style={{ backgroundColor: '#FDF0F5', color: '#8A2BE2', border: '1px solid #E6A8D7', borderRadius: '20px', padding: '8px 15px', fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s' }}>‣ {item}</button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'services' && (
            <div style={{ animation: 'fadeIn 0.5s' }}>
              <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', borderBottom: '3px solid #E6A8D7', paddingBottom: '10px' }}>Services Offered</h3>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', marginBottom: '15px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                <h4 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '1.4rem', margin: '0 0 15px 0', textAlign: 'center' }}>Boosting Service</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                  {boostingCategories.map((category, idx) => (
                    <button key={idx} onClick={() => setSelectedBoosting(category)} style={{ backgroundColor: '#8A2BE2', color: '#ffffff', border: 'none', borderRadius: '20px', padding: '10px 20px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(138,43,226,0.3)' }}>{category}</button>
                  ))}
                </div>
              </div>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '15px 20px', marginBottom: '15px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                <div onClick={() => toggleService('moneyKeep')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <h4 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '1.2rem', margin: 0 }}>🍓 ，For Money keep : 🍀</h4>
                  <span style={{ color: '#D27DCE', fontSize: '0.9rem', fontWeight: 'bold' }}>{openService === 'moneyKeep' ? '▴' : '▾'} 𝐢. read informations</span>
                </div>
                {openService === 'moneyKeep' && (
                  <div style={{ marginTop: '15px', color: '#8A2BE2', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    <p style={{ margin: '5px 0' }}>‣ Only accepting Paymaya as payment method</p>
                    <p style={{ margin: '5px 0' }}>‣ 5% dc</p>
                    <p style={{ margin: '5px 0' }}>‣ fee is not included in 5% dc if bank transfer</p>
                    <p style={{ margin: '5px 0' }}>‣ spam or ring me if unresponsive</p>
                    <p style={{ margin: '5px 0' }}>‣ I accept rush and long term keep</p>
                  </div>
                )}
              </div>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '15px 20px', marginBottom: '15px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                <div onClick={() => toggleService('domainMaking')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <h4 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '1.2rem', margin: 0 }}>🍓 ，Domain Making</h4>
                  <span style={{ color: '#D27DCE', fontSize: '0.9rem', fontWeight: 'bold' }}>{openService === 'domainMaking' ? '▴' : '▾'} 𝐢. read informations</span>
                </div>
                {openService === 'domainMaking' && (
                  <div style={{ marginTop: '15px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', color: '#8A2BE2', fontSize: '0.95rem', marginBottom: '15px' }}>
                      {domainPrices.map((domain, idx) => <p key={idx} style={{ margin: 0 }}>‣ {domain.ext} — {domain.price}</p>)}
                    </div>
                    <div style={{ borderTop: '1px solid #E6A8D7', paddingTop: '10px', color: '#D27DCE', fontSize: '0.9rem' }}>
                      <p style={{ margin: '3px 0' }}>ⓘ good for email hosting</p>
                      <p style={{ margin: '3px 0' }}>ⓘ no warranty</p>
                      <p style={{ margin: '3px 0' }}>ⓘ 1 year validity</p>
                      <p style={{ margin: '3px 0' }}>ⓘ legally paid</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
             <div style={{ animation: 'fadeIn 0.5s' }}>
              <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', borderBottom: '3px solid #E6A8D7', paddingBottom: '10px' }}>Payment Method</h3>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '25px 20px', marginBottom: '20px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)', textAlign: 'center', border: '2px dashed #E6A8D7' }}>
                <p style={{ color: '#D27DCE', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px', fontWeight: 'bold' }}>⚠️ For premium products, direct message owner first before making a payment to check product&apos;s availability. Please note that prices may change.</p>
                <a href="https://t.me/strobariii" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 30px', borderRadius: '10px', backgroundColor: '#8A2BE2', color: '#ffffff', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 2px 5px rgba(138,43,226,0.3)' }}>Message Owner</a>
              </div>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '25px 20px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                <h4 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '1.2rem', margin: '0 0 15px 0', textAlign: 'center' }}>Payments Accepted</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                  {acceptedPayments.map((payment, idx) => (
                    <span key={idx} style={{ backgroundColor: '#FDF0F5', color: '#8A2BE2', border: '1px solid #E6A8D7', borderRadius: '20px', padding: '8px 18px', fontSize: '0.95rem', fontWeight: 'bold' }}>{payment}</span>
                  ))}
                </div>
              </div>
             </div>
          )}

          {/* VIEW: REPORTS */}
          {activeTab === 'reports' && (
             <div style={{ animation: 'fadeIn 0.5s' }}>
              <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', borderBottom: '3px solid #E6A8D7', paddingBottom: '10px' }}>Report Forms</h3>
              
              {/* NEW SMART REMINDER */}
              <div style={{ backgroundColor: '#FDF0F5', padding: '18px', borderRadius: '10px', border: '2px dashed #D27DCE', color: '#8A2BE2', fontSize: '1rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', boxShadow: '0 4px 10px rgba(230, 168, 215, 0.3)' }}>
                🔔 Reminder: After submitting, you can check the live status of your ticket anytime by clicking <span style={{ color: '#ffffff', backgroundColor: '#8A2BE2', padding: '3px 8px', borderRadius: '5px' }}>✅ Submitted Tickets</span> in the side menu! We are working on it!
              </div>

              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '25px 20px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                <p style={{ color: '#D27DCE', fontSize: '0.95rem', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>Please note that process can take 1-3 days, depending on the service purchased. You&apos;ll be notified once your service is fixed.</p>
                <div style={{ textAlign: 'center', whiteSpace: 'pre', fontFamily: 'monospace', color: '#8A2BE2', lineHeight: '1.2', margin: '20px 0', fontSize: '1.1rem', fontWeight: 'bold' }}>
                  {`❀ (\\  (\\ ❀\n(„• ֊ •„)\n╔─O─O─────────┓\n Report Form 🍀\n┗─────────────╝`}
                </div>
                
                {submitMessage && (
                  <div style={{ padding: '15px', marginBottom: '20px', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold', backgroundColor: submitMessage.includes('❌') ? '#FEE2E2' : '#DCFCE7', color: submitMessage.includes('❌') ? '#EF4444' : '#22C55E' }}>
                    {submitMessage}
                  </div>
                )}

                <form onSubmit={handleTicketSubmit}>
                  <label style={labelStyle}>⩇ premium type :</label>
                  <input type="text" name="premium_type" value={formData.premium_type} onChange={handleInputChange} placeholder="(e.g. Netflix)" style={inputStyle} required />
                  <label style={labelStyle}>⩇ telegram username :</label>
                  <input type="text" name="telegram_username" value={formData.telegram_username} onChange={handleInputChange} placeholder="(NA - if none)" style={inputStyle} />
                  <label style={labelStyle}>⩇ first email (if applicable) :</label>
                  <input type="text" name="first_email" value={formData.first_email} onChange={handleInputChange} placeholder="First email..." style={inputStyle} />
                  <label style={labelStyle}>⩇ Personal Email to receive updates :</label>
                  <input type="email" name="personal_email" value={formData.personal_email} onChange={handleInputChange} placeholder="(e.g. yourownemail@gmail.com)" style={inputStyle} required />
                  <label style={labelStyle}>⩇ email :</label>
                  <input type="email" name="contact_email" value={formData.contact_email} onChange={handleInputChange} placeholder="(ruris.digitaldepot@rurika.shop)" style={inputStyle} required />
                  <label style={labelStyle}>⩇ password :</label>
                  <input type="password" name="account_password" value={formData.account_password} onChange={handleInputChange} placeholder="Password..." style={inputStyle} />
                  <label style={labelStyle}>⩇ subscription :</label>
                  <input type="text" name="subscription" value={formData.subscription} onChange={handleInputChange} placeholder="(e.g. plus, pro, max, premium)" style={inputStyle} />
                  <label style={labelStyle}>⩇ solo / shared :</label>
                  <select name="solo_shared" value={formData.solo_shared} onChange={handleInputChange} style={inputStyle}>
                    <option value="">Select option...</option><option value="solo">Solo</option><option value="shared">Shared</option>
                  </select>
                  <label style={labelStyle}>⩇ purchased price :</label>
                  <input type="text" name="purchased_price" value={formData.purchased_price} onChange={handleInputChange} placeholder="Amount..." style={inputStyle} />
                  <label style={labelStyle}>⩇ date purchased :</label>
                  <input type="date" name="date_purchased" value={formData.date_purchased} onChange={handleInputChange} style={inputStyle} />
                  <label style={labelStyle}>⩇ date reported :</label>
                  <input type="date" name="date_reported" value={formData.date_reported} onChange={handleInputChange} style={inputStyle} />
                  <label style={labelStyle}>⩇ remaining days :</label>
                  <input type="number" name="remaining_days" value={formData.remaining_days} onChange={handleInputChange} placeholder="Days..." style={inputStyle} />
                  <label style={labelStyle}>⩇ issue :</label>
                  <textarea name="issue" value={formData.issue} onChange={handleInputChange} placeholder="Describe the issue..." rows={4} style={{...inputStyle, resize: 'vertical'}} required></textarea>
                  <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: isSubmitting ? '#ccc' : '#8A2BE2', color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem', cursor: isSubmitting ? 'not-allowed' : 'pointer', marginTop: '10px', boxShadow: '0 2px 5px rgba(138,43,226,0.3)' }}>Submit Report</button>
                </form>
                <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#FDF0F5', borderRadius: '10px', borderLeft: '4px solid #D27DCE', color: '#8A2BE2', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  <span style={{ color: '#D27DCE', fontWeight: 'bold' }}>ⓘ Take note:</span> This is only for those who activated their warranties. Contact us at <a href="mailto:ruris.digitaldepot@rurika.shop" style={{ color: '#D27DCE', fontWeight: 'bold', textDecoration: 'none' }}>ruris.digitaldepot@rurika.shop</a> if you encountered an issue. <br/><br/>
                  <span style={{ fontSize: '0.85rem' }}>(Subject should be: Report Form - type of service availed e.g., Report Form - Netflix)</span>
                </div>
              </div>
             </div>
          )}

          {/* ========================================== */}
          {/* VIEW: PUBLIC TICKETS TRACKER (NEW)         */}
          {/* ========================================== */}
          {activeTab === 'public-tickets' && (
             <div style={{ animation: 'fadeIn 0.5s' }}>
              <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', borderBottom: '3px solid #E6A8D7', paddingBottom: '10px' }}>
                Live Ticket Status
              </h3>
              
              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '25px 20px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                <p style={{ color: '#D27DCE', textAlign: 'center', marginBottom: '25px', fontWeight: 'bold', fontSize: '1.05rem' }}>
                  Track the status of your submitted tickets here. We process them as fast as we can!
                </p>

                {tickets.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#8A2BE2', fontStyle: 'italic' }}>No tickets are currently submitted.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {tickets.map(ticket => (
                      <div key={ticket.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #E6A8D7', paddingBottom: '15px' }}>
                        <div>
                          {/* Only showing safe, public info */}
                          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#8A2BE2', fontSize: '1.1rem' }}>
                            {ticket.premium_type || 'Unknown Premium'}
                          </p>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>
                            Submitted: {new Date(ticket.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        
                        {/* Dynamic Status Badge */}
                        <span style={{ 
                          padding: '6px 14px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold',
                          backgroundColor: ticket.status === 'Completed' ? '#DCFCE7' : ticket.status === 'In Progress' ? '#FEF3C7' : '#FEE2E2', 
                          color: ticket.status === 'Completed' ? '#166534' : ticket.status === 'In Progress' ? '#92400E' : '#991B1B' 
                        }}>
                          {ticket.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
             </div>
          )}

          {/* VIEW: CUSTOMER SERVICE */}
          {activeTab === 'contact' && (
             <div style={{ animation: 'fadeIn 0.5s' }}>
              <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', borderBottom: '3px solid #E6A8D7', paddingBottom: '10px' }}>Customer Service</h3>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '25px 20px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)', textAlign: 'center' }}>
                <p style={{ color: '#D27DCE', fontSize: '1.1rem', marginBottom: '15px', fontWeight: 'bold' }}>Need help? Reach out to us!</p>
                <div style={{ margin: '15px 0', padding: '15px', backgroundColor: '#FDF0F5', borderRadius: '10px', border: '1px solid #E6A8D7' }}>
                  <p style={{ margin: '5px 0', color: '#8A2BE2', fontWeight: 'bold' }}>Email:</p>
                  <a href="mailto:ruris.digitaldepot@rurika.shop?subject=Ruri%20Shop%20%2B%20Assistance%20Required" style={{ color: '#D27DCE', fontSize: '1.1rem', fontWeight: 'bold', textDecoration: 'none', wordBreak: 'break-all' }}>ruris.digitaldepot@rurika.shop</a>
                </div>
              </div>
             </div>
          )}
          
        </div>
      </main>

      {/* GLOBAL POP-UPS */}
      {selectedProduct && (() => {
        const fallback = productDetails[selectedProduct];
        const dbData = dbProducts[selectedProduct];
        const displayPrices = dbData?.prices || fallback?.prices || [];
        const displayStatus = dbData?.status || 'Available';

        return (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '20px', textAlign: 'left', maxWidth: '400px', width: '100%', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
              <h2 className={titleFont.className} style={{ color: '#8A2BE2', margin: '0 0 15px 0', textAlign: 'center', fontSize: '2rem' }}>{selectedProduct}</h2>
              {displayStatus === 'Out of Stock' && <div style={{ backgroundColor: '#FEE2E2', color: '#EF4444', padding: '10px', borderRadius: '10px', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>⚠️ This product is currently Out of Stock.</div>}
              {displayPrices.length > 0 ? (
                <div style={{ marginBottom: '15px' }}>
                  {displayPrices.map((p, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px dashed #E6A8D7' }}><span style={{ color: '#8A2BE2', fontWeight: '600', fontSize: '0.95rem' }}>{p.label}</span><span style={{ color: '#D27DCE', fontWeight: 'bold', fontSize: '0.95rem' }}>{p.price}</span></div>
                  ))}
                </div>
              ) : <p style={{ color: '#D27DCE', margin: '15px 0', fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center' }}>Direct Message Owner for the price.</p>}
              {fallback && fallback.rules && fallback.rules.length > 0 && (
                <div style={{ backgroundColor: '#FDF0F5', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}><p style={{ margin: '0 0 5px 0', color: '#8A2BE2', fontWeight: 'bold', fontSize: '0.9rem' }}>Rules & Details:</p><ul style={{ margin: 0, paddingLeft: '20px', color: '#D27DCE', fontSize: '0.85rem', lineHeight: '1.5' }}>{fallback.rules.map((rule, i) => <li key={i}>{rule}</li>)}</ul></div>
              )}
              <p style={{ color: '#EF4444', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center', margin: '10px 0', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '8px' }}>⚠️ Ask first before sending payment to check stock&apos;s availability.{fallback && fallback.note && <><br/><br/>📌 Note: {fallback.note}</>}</p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={() => setSelectedProduct(null)} style={{ flex: 1, padding: '12px 0', borderRadius: '10px', border: '2px solid #E6A8D7', backgroundColor: 'transparent', color: '#D27DCE', fontWeight: 'bold', cursor: 'pointer' }}>Close</button>
                <a href={displayStatus === 'Out of Stock' ? "#" : "https://t.me/strobariii"} target={displayStatus === 'Out of Stock' ? "_self" : "_blank"} rel="noopener noreferrer" onClick={(e) => { if (displayStatus === 'Out of Stock') e.preventDefault(); }} style={{ flex: 1, padding: '12px 0', borderRadius: '10px', border: 'none', backgroundColor: displayStatus === 'Out of Stock' ? '#D1D5DB' : '#8A2BE2', color: '#ffffff', fontWeight: 'bold', cursor: displayStatus === 'Out of Stock' ? 'not-allowed' : 'pointer', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{displayStatus === 'Out of Stock' ? 'Out of Stock' : 'Buy Now'}</a>
              </div>
            </div>
          </div>
        );
      })()}

      {selectedBoosting && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '20px', textAlign: 'center', maxWidth: '400px', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h2 className={titleFont.className} style={{ color: '#8A2BE2', margin: '0 0 10px 0' }}>{selectedBoosting} Boosting</h2>
            <p style={{ color: '#8A2BE2', margin: '15px 0', fontSize: '1rem', lineHeight: '1.5' }}>Direct message owner for pricelist, due to constant change of service cost.</p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '25px' }}>
              <button onClick={() => setSelectedBoosting(null)} style={{ flex: 1, padding: '10px 0', borderRadius: '10px', border: '2px solid #E6A8D7', backgroundColor: 'transparent', color: '#D27DCE', fontWeight: 'bold', cursor: 'pointer' }}>Close</button>
              <a href="https://t.me/strobariii" target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '10px 0', borderRadius: '10px', border: 'none', backgroundColor: '#8A2BE2', color: '#ffffff', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Message Owner</a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}