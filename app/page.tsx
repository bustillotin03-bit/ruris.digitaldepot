"use client";

import { useState, useEffect } from 'react';
import { Lilita_One, Quicksand } from 'next/font/google';
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE INITIALIZATION ---
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';
const cleanUrl = rawUrl.replace(/['"]/g, '').trim();
const cleanKey = rawKey.replace(/['"]/g, '').trim();
const supabase = createClient(cleanUrl, cleanKey);

// Fonts
const titleFont = Lilita_One({ weight: '400', subsets: ['latin'] });
const subtitleFont = Quicksand({ weight: '700', subsets: ['latin'] });
const textFont = Quicksand({ weight: '500', subsets: ['latin'] });

// --- LEGACY PRODUCT DATA (LOCKED) ---
const productsData = [
  { category: "🍓 ，educational", items: ["Grammarly", "Google Ai+ Gemini", "Ms365", "Studocu", "Duolingo", "chatgpt", "Coursera", "Skillshare", "Camscanner", "Coursehero unlocks", "Quillbot", "Grok"] },
  { category: "🍓 ，Editing Apps", items: ["capcut", "canva", "meitu", "wink", "remini", "picsart", "alight motion", "collegemaker", "Adobe cc", "Faceapp", "Facelab", "Facetune", "Beautyplus"] },
  { category: "🍓 ，Entertainments", items: ["prime video", "Netflix", "Disney+", "crunchyroll", "youtube premium", "spotify", "Loklok", "Viu", "iQiyi", "HBO"] },
  { category: "🍓 ，VPNS", items: ["Surfshark", "Turbo", "HMA", "Cyberghost", "Vypr", "Express VPN", "Windscribe"] }
];

const allProductNames = productsData.flatMap(c => c.items);

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
const domainPrices = [
  { ext: ".online", price: "₱150" }, { ext: ".site", price: "₱150" }, { ext: ".website", price: "₱150" }, 
  { ext: ".shop", price: "₱150" }, { ext: ".space", price: "₱150" }, { ext: ".fun", price: "₱150" }, 
  { ext: ".icu", price: "₱150" }, { ext: ".life", price: "₱150" }, { ext: ".click", price: "₱170" }, 
  { ext: ".xyz", price: "₱170" }, { ext: ".com", price: "₱150" }
];
const acceptedPayments = ["Gcash", "Paymaya", "Gotyme", "Union Bank", "Cimb", "Maribank", "Paypal", "Pioneer", "Wise"];

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openOwner, setOpenOwner] = useState(false);

  // Category & Legacy Toggles
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedBoosting, setSelectedBoosting] = useState<string | null>(null);
  const [openService, setOpenService] = useState<string | null>(null);

  // Digital Products & Rules Toggle
  const [dbDigitalProducts, setDbDigitalProducts] = useState<any[]>([]);
  const [activeDigitalProduct, setActiveDigitalProduct] = useState<any>(null);
  const [openDigitalRules, setOpenDigitalRules] = useState(false);

  // Media Upload States (Supabase Storage)
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // Database Synced Records
  const [dbProducts, setDbProducts] = useState<Record<string, { status: string, prices: any[] }>>({});
  const [dbServices, setDbServices] = useState<any[]>([]);
  const [dbReferralCodes, setDbReferralCodes] = useState<any[]>([]);
  const [dbFreeRequests, setDbFreeRequests] = useState<any[]>([]);
  const [newReferralCode, setNewReferralCode] = useState('');

  // Admin Authentication & Sub-tabs
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [adminSection, setAdminSection] = useState<'tickets' | 'products' | 'services' | 'digital-products' | 'free-requests' | 'referrals'>('tickets');
  
  // Admin Editing Forms
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState('Available');
  const [editPrices, setEditPrices] = useState<{label: string, price: string}[]>([]);

  const [editingSvcId, setEditingSvcId] = useState<string | null>(null);
  const [svcTitle, setSvcTitle] = useState('');
  const [svcContent, setSvcContent] = useState('');
  const [svcNote, setSvcNote] = useState('');

  const [editingDpId, setEditingDpId] = useState<string | null>(null);
  const [dpForm, setDpForm] = useState({
    title: '', 
    price: '', 
    category: '', 
    cover_url: '', 
    previews: '', 
    video_url: '', 
    file_url: '', 
    external_link: '',
    short_desc: '', 
    full_desc: '', 
    includes: '', 
    format: '', 
    notes: '', 
    is_free: false
  });

  // Ticket Submission & Stats
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successTicketId, setSuccessTicketId] = useState('');
  const [tickets, setTickets] = useState<any[]>([]);
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);
  const [ticketSearch, setTicketSearch] = useState('');

  const [formData, setFormData] = useState({
    premium_type: '', 
    telegram_username: '', 
    first_email: '', 
    contact_email: '', 
    personal_email: '',
    account_password: '', 
    subscription: '', 
    solo_shared: '', 
    purchased_price: '',
    date_purchased: '', 
    date_reported: '', 
    remaining_days: '', 
    issue: ''
  });

  // Free Digital Creator Starter Guide Modal State
  const [freeModal, setFreeModal] = useState({ 
    open: false, 
    step: 1, 
    source: '', 
    otherSource: '', 
    referralCode: '',
    igUsername: '', 
    ruriUsername: '', 
    igName: '', 
    email: '',
    screenshotSent: false
  });

  // Initial Data Fetching
  useEffect(() => { 
    fetchDbProducts(); 
    fetchDbServices(); 
    fetchDigitalProducts(); 
  }, []);

  useEffect(() => {
    if (activeTab === 'public-tickets' || (isAdminLoggedIn && activeTab === 'admin' && adminSection === 'tickets')) {
      fetchTickets();
    }
    if (isAdminLoggedIn && activeTab === 'admin') {
      if (adminSection === 'referrals') fetchReferrals();
      if (adminSection === 'free-requests') fetchFreeRequests();
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

  const fetchDbServices = async () => {
    const { data } = await supabase.from('ruri_services').select('*').order('created_at', { ascending: true });
    if (data) setDbServices(data);
  };

  const fetchDigitalProducts = async () => {
    const { data } = await supabase.from('ruri_digital_products').select('*').order('created_at', { ascending: false });
    if (data) setDbDigitalProducts(data);
  };

  const fetchTickets = async () => {
    const { data } = await supabase.from('ruri_tickets').select('*').order('created_at', { ascending: false });
    if (data) setTickets(data);
  };

  const fetchReferrals = async () => {
    const { data } = await supabase.from('ruri_referral_codes').select('*').order('created_at', { ascending: false });
    if (data) setDbReferralCodes(data);
  };

  const fetchFreeRequests = async () => {
    const { data } = await supabase.from('ruri_free_requests').select('*').order('created_at', { ascending: false });
    if (data) setDbFreeRequests(data);
  };

  // Media Upload Handler (Images & Videos directly to Supabase Storage)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'cover_url' | 'video_url') => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      if (field === 'cover_url') setUploadingCover(true);
      if (field === 'video_url') setUploadingVideo(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${field === 'cover_url' ? 'covers' : 'videos'}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('product-media').getPublicUrl(filePath);
      setDpForm(prev => ({ ...prev, [field]: data.publicUrl }));
      alert(`✅ ${field === 'cover_url' ? 'Image' : 'Video'} uploaded successfully from gallery/files!`);
    } catch (err: any) {
      alert('Upload error: ' + (err.message || 'Make sure you have created the public "product-media" storage bucket in Supabase.'));
    } finally {
      if (field === 'cover_url') setUploadingCover(false);
      if (field === 'video_url') setUploadingVideo(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsSubmitting(true); 
    setSubmitMessage(''); 

    const generatedId = Math.floor(100000 + Math.random() * 900000).toString();
    const payload = { ...formData, ticket_id: generatedId };

    const { error } = await supabase.from('ruri_tickets').insert([payload]);

    if (error) { 
      setSubmitMessage('❌ Error submitting ticket. Please try again.'); 
    } else {
      setSuccessTicketId(generatedId); 
      setShowSuccessModal(true);
      setFormData({ 
        premium_type: '', telegram_username: '', first_email: '', contact_email: '', personal_email: '', 
        account_password: '', subscription: '', solo_shared: '', purchased_price: '', date_purchased: '', 
        date_reported: '', remaining_days: '', issue: '' 
      });
      fetchTickets();
    }
    setIsSubmitting(false);
  };

  const updateTicketStatus = async (id: string, newStatus: string) => { 
    await supabase.from('ruri_tickets').update({ status: newStatus }).eq('id', id); 
    fetchTickets(); 
  };

  // Free Digital Creator Starter Guide Access Flow
  const handleNextFreeStep = async () => {
    if (freeModal.step === 1) {
      if (!freeModal.source) return alert("Please select where you heard about the free guide.");
      if (freeModal.source === 'Other' && !freeModal.otherSource.trim()) return alert("Please specify the platform.");
      setFreeModal({ ...freeModal, step: 2 });
      return;
    }
    
    if (freeModal.step === 2) {
      if (freeModal.source === 'Instagram' || freeModal.source === 'TikTok') {
        if (!freeModal.igUsername.trim() || !freeModal.ruriUsername.trim() || !freeModal.email.trim()) {
          return alert("Please fill in your username, our account username you followed, and your email.");
        }
        
        await supabase.from('ruri_free_requests').insert([{
          platform: freeModal.source,
          user_username: freeModal.igUsername,
          ruri_username: freeModal.ruriUsername,
          email: freeModal.email,
          screenshot_url: 'Optional Proof Via Channels',
          status: 'Pending'
        }]);
        setFreeModal({ ...freeModal, step: 3 });

      } else {
        // Facebook, Referral, Other Flow
        if (freeModal.source === 'Referral' && !freeModal.referralCode.trim()) {
          return alert("Please enter your valid Referral Code.");
        }
        if (!freeModal.igName.trim() || !freeModal.igUsername.trim() || !freeModal.email.trim()) {
          return alert("Please fill in your Instagram Name, Instagram Username, and Email.");
        }
        
        if (freeModal.source === 'Referral') {
          const { data } = await supabase.from('ruri_referral_codes')
            .select('*')
            .eq('code', freeModal.referralCode.trim())
            .eq('is_used', false)
            .single();

          if (!data) return alert("Invalid or already used Referral Code.");
          await supabase.from('ruri_referral_codes').update({ is_used: true }).eq('id', data.id);
        }

        await supabase.from('ruri_free_requests').insert([{
          platform: freeModal.source === 'Other' ? freeModal.otherSource : freeModal.source,
          referral_code: freeModal.referralCode,
          user_username: freeModal.igUsername, // Instagram Username
          ruri_username: freeModal.igName,     // Instagram Name
          email: freeModal.email,
          screenshot_url: 'Optional Proof Via Channels',
          status: 'Pending'
        }]);

        setFreeModal({ ...freeModal, step: 3 });
      }
    }
  };

  const handleCreateReferralCode = async () => { 
    if (!newReferralCode.trim()) return; 
    await supabase.from('ruri_referral_codes').insert([{ code: newReferralCode.trim() }]); 
    setNewReferralCode(''); 
    fetchReferrals(); 
  };

  const updateFreeRequestStatus = async (id: string, newStatus: string) => { 
    await supabase.from('ruri_free_requests').update({ status: newStatus }).eq('id', id); 
    fetchFreeRequests(); 
  };

  // Digital Product Handlers
  const handleDpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { 
    const { name, value, type } = e.target as HTMLInputElement; 
    setDpForm({ ...dpForm, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }); 
  };

  const loadDpToEdit = (dp: any) => { 
    setEditingDpId(dp.id); 
    setDpForm({ 
      title: dp.title || '', 
      price: dp.price || '', 
      category: dp.category || '', 
      cover_url: dp.cover_url || '', 
      previews: dp.previews ? (Array.isArray(dp.previews) ? dp.previews.join(', ') : dp.previews) : '', 
      video_url: dp.video_url || '', 
      file_url: dp.file_url || '', 
      external_link: dp.external_link || '', 
      short_desc: dp.short_desc || '', 
      full_desc: dp.full_desc || '', 
      includes: dp.includes ? (Array.isArray(dp.includes) ? dp.includes.join(', ') : dp.includes) : '', 
      format: dp.format || '', 
      notes: dp.notes || '', 
      is_free: dp.is_free || false 
    }); 
  };

  const cancelDpEdit = () => { 
    setEditingDpId(null); 
    setDpForm({ 
      title: '', price: '', category: '', cover_url: '', previews: '', video_url: '', 
      file_url: '', external_link: '', short_desc: '', full_desc: '', includes: '', 
      format: '', notes: '', is_free: false 
    }); 
  };

  const handleSaveDp = async () => { 
    if (!dpForm.title) return alert("Product title is required."); 
    const previewArray = typeof dpForm.previews === 'string' 
      ? dpForm.previews.split(',').map(s => s.trim()).filter(s => s) 
      : [];
    const includesArray = typeof dpForm.includes === 'string' 
      ? dpForm.includes.split(',').map(s => s.trim()).filter(s => s) 
      : [];
      
    const payload = { 
      title: dpForm.title, 
      price: dpForm.price, 
      category: dpForm.category, 
      cover_url: dpForm.cover_url, 
      previews: previewArray, 
      video_url: dpForm.video_url, 
      file_url: dpForm.file_url, 
      external_link: dpForm.external_link, 
      short_desc: dpForm.short_desc, 
      full_desc: dpForm.full_desc, 
      includes: includesArray, 
      format: dpForm.format, 
      notes: dpForm.notes, 
      is_free: dpForm.is_free 
    }; 
    
    if (editingDpId) {
      await supabase.from('ruri_digital_products').update(payload).eq('id', editingDpId); 
    } else {
      await supabase.from('ruri_digital_products').insert([payload]); 
    }
    alert('✅ Digital Product Saved Successfully!'); 
    cancelDpEdit(); 
    fetchDigitalProducts(); 
  };

  const handleDeleteDp = async (id: string) => { 
    if (confirm('Delete this digital product permanently?')) { 
      await supabase.from('ruri_digital_products').delete().eq('id', id); 
      fetchDigitalProducts(); 
    } 
  };

  // Legacy Accounts & Services Admin Handlers
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
    const { error } = await supabase.from('ruri_products').upsert({ product_name: editingProduct, status: editStatus, prices: editPrices }); 
    if (!error) { 
      alert('✅ Product Pricing Updated!'); 
      fetchDbProducts(); 
    } else alert('❌ Error updating product.'); 
  };
  
  const loadServiceToEdit = (svc: any) => { 
    setEditingSvcId(svc.id); 
    setSvcTitle(svc.title); 
    setSvcContent(svc.content); 
    setSvcNote(svc.note || ''); 
  };

  const cancelServiceEdit = () => { 
    setEditingSvcId(null); 
    setSvcTitle(''); 
    setSvcContent(''); 
    setSvcNote(''); 
  };

  const handleSaveService = async () => { 
    if (!svcTitle || !svcContent) return alert('Title and Content are required!'); 
    const payload = { title: svcTitle, content: svcContent, note: svcNote }; 
    if (editingSvcId) await supabase.from('ruri_services').update(payload).eq('id', editingSvcId); 
    else await supabase.from('ruri_services').insert([payload]); 
    alert('✅ Service saved successfully!'); 
    cancelServiceEdit(); 
    fetchDbServices(); 
  };

  const handleDeleteService = async (id: string) => { 
    if (confirm('Delete this service permanently?')) { 
      await supabase.from('ruri_services').delete().eq('id', id); 
      fetchDbServices(); 
    } 
  };

  // Nav Handlers
  const toggleCategory = (categoryName: string) => setOpenCategory(openCategory === categoryName ? null : categoryName);
  const toggleService = (serviceName: string) => setOpenService(openService === serviceName ? null : serviceName);
  const handleNav = (tab: string) => { setActiveTab(tab); setIsSidebarOpen(false); window.scrollTo(0,0); };
  const handleAdminLogin = (e: React.FormEvent) => { 
    e.preventDefault(); 
    if (adminUsername === 'rurishopz' && adminPin === '192005') { 
      setIsAdminLoggedIn(true); 
      setLoginError(false); 
      setAdminUsername(''); 
      setAdminPin(''); 
    } else {
      setLoginError(true); 
    }
  };
  const handleAdminLogout = () => { setIsAdminLoggedIn(false); setActiveTab('dashboard'); };
  
  const openProductDetail = (product: any) => { 
    if (product.external_link && product.external_link.trim() !== '') {
      window.open(product.external_link, '_blank');
      return;
    }
    setActiveDigitalProduct(product); 
    setActiveTab('product-detail'); 
    window.scrollTo(0, 0); 
  };

  const inputStyle = { width: '100%', padding: '12px 15px', borderRadius: '10px', border: '1px solid #E6A8D7', backgroundColor: '#FDF0F5', color: '#8A2BE2', marginBottom: '15px', fontFamily: textFont.style.fontFamily, outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block', color: '#8A2BE2', fontWeight: 'bold', marginBottom: '5px', fontSize: '0.95rem' };
  
  const totalTicketsCount = tickets.length;
  const pendingCount = tickets.filter(t => t.status === 'Pending').length;
  const inProgressCount = tickets.filter(t => t.status === 'In Progress').length;
  const completedCount = tickets.filter(t => t.status === 'Completed').length;
  
  const visibleTickets = tickets.filter(ticket => { 
    const ticketDate = new Date(ticket.created_at); 
    const ninetyDaysAgo = new Date(); 
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90); 
    return ticketDate >= ninetyDaysAgo; 
  });
  const displayedPublicTickets = ticketSearch.trim() ? tickets.filter(t => t.ticket_id?.includes(ticketSearch.trim())) : visibleTickets;

  const TicketStatsGrid = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '25px' }}>
      <div style={{ backgroundColor: '#F3E8FF', padding: '15px', borderRadius: '10px', textAlign: 'center', border: '1px solid #D8B4FE', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <h4 style={{ margin: 0, color: '#7E22CE', fontSize: '1.8rem' }}>{totalTicketsCount}</h4>
        <p style={{ margin: '5px 0 0 0', color: '#9333EA', fontSize: '0.85rem', fontWeight: 'bold' }}>LIFETIME TOTAL</p>
      </div>
      <div style={{ backgroundColor: '#FEE2E2', padding: '15px', borderRadius: '10px', textAlign: 'center', border: '1px solid #FCA5A5', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <h4 style={{ margin: 0, color: '#991B1B', fontSize: '1.8rem' }}>{pendingCount}</h4>
        <p style={{ margin: '5px 0 0 0', color: '#EF4444', fontSize: '0.85rem', fontWeight: 'bold' }}>PENDING</p>
      </div>
      <div style={{ backgroundColor: '#FEF3C7', padding: '15px', borderRadius: '10px', textAlign: 'center', border: '1px solid #FCD34D', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <h4 style={{ margin: 0, color: '#92400E', fontSize: '1.8rem' }}>{inProgressCount}</h4>
        <p style={{ margin: '5px 0 0 0', color: '#F59E0B', fontSize: '0.85rem', fontWeight: 'bold' }}>IN PROGRESS</p>
      </div>
      <div style={{ backgroundColor: '#DCFCE7', padding: '15px', borderRadius: '10px', textAlign: 'center', border: '1px solid #86EFAC', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <h4 style={{ margin: 0, color: '#166534', fontSize: '1.8rem' }}>{completedCount}</h4>
        <p style={{ margin: '5px 0 0 0', color: '#22C55E', fontSize: '0.85rem', fontWeight: 'bold' }}>COMPLETED</p>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#FDF0F5', fontFamily: textFont.style.fontFamily, overflow: 'hidden' }}>
      
      {/* GLOBAL STYLES FOR ANIMATIONS */}
      <style dangerouslySetInnerHTML={{__html: `
        .hover-card { transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: pointer; }
        .hover-card:hover { transform: translateY(-4px) scale(1.01); box-shadow: 0 12px 25px rgba(230, 168, 215, 0.4) !important; }
        .hover-btn { transition: background-color 0.2s, transform 0.1s; }
        .hover-btn:active { transform: scale(0.95); }
      `}} />

      {/* SIDEBAR NAVIGATION (NO LOGIN BUTTON) */}
      <button 
        onClick={() => setIsSidebarOpen(true)} 
        style={{ position: 'fixed', top: '15px', left: '15px', zIndex: 50, backgroundColor: '#8A2BE2', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 15px', fontSize: '1.5rem', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
      >
        ☰
      </button>

      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 90 }} 
        />
      )}

      <nav style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px', backgroundColor: '#FFD1DC', zIndex: 100, transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s ease-in-out', boxShadow: '4px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ backgroundColor: '#000000', padding: '25px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className={titleFont.className} style={{ color: '#FFD1DC', margin: 0, fontSize: '1.8rem', letterSpacing: '1px' }}>Ruri&apos;s Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#FFD1DC', fontSize: '2rem', cursor: 'pointer' }}>×</button>
        </div>
        <div style={{ padding: '20px 0', flex: 1, overflowY: 'auto' }}>
          {[
            { id: 'dashboard', label: '🏠 Dashboard' }, 
            { id: 'digital-store', label: '✨ Digital Products' },
            { id: 'products', label: '🛍️ Accounts & Apps' },
            { id: 'services', label: '💼 Services Offered' }, 
            { id: 'payment', label: '💳 Payment Options' },
            { id: 'reports', label: '🎫 Submit a Ticket' }, 
            { id: 'public-tickets', label: '✅ Submitted Tickets' },
            { id: 'contact', label: '📞 Customer Service' }
          ].map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleNav(item.id)} 
              style={{ padding: '15px 25px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', backgroundColor: activeTab === item.id ? '#000000' : 'transparent', color: activeTab === item.id ? '#FFD1DC' : '#000000', borderBottom: '1px solid rgba(0,0,0,0.05)', transition: 'all 0.2s' }}
            >
              {item.label}
            </div>
          ))}
          <div 
            onClick={() => handleNav('admin')} 
            style={{ padding: '15px 25px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', backgroundColor: activeTab === 'admin' ? '#000000' : 'transparent', color: activeTab === 'admin' ? '#FFD1DC' : '#8A2BE2', borderTop: '2px solid rgba(0,0,0,0.1)', marginTop: '20px', transition: 'all 0.2s' }}
          >
            🔒 Admin Tool
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '5rem 1rem 2rem 1rem', width: '100%' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>

          {/* ========================================================= */}
          {/* VIEW: DASHBOARD                                             */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div style={{ animation: 'fadeIn 0.5s' }}>
              
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h1 className={titleFont.className} style={{ color: '#ffffff', fontSize: '5rem', letterSpacing: '3px', margin: '0', lineHeight: '1', textShadow: `-2px -2px 0 #8A2BE2, 2px -2px 0 #8A2BE2, -2px 2px 0 #8A2BE2, 2px 2px 0 #8A2BE2, 6px 6px 0 #8A2BE2, 0 0 25px #E6A8D7` }}>Ruri&apos;s Shop</h1>
                <h2 className={subtitleFont.className} style={{ color: '#D27DCE', fontSize: '1.6rem', marginTop: '5px', letterSpacing: '1px' }}>Ruri&apos;s Digital Depot</h2>
              </div>
              
              {/* DIGITAL PRODUCTS ENTRY CARD */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', marginBottom: '25px' }}>
                <div onClick={() => handleNav('digital-store')} className="hover-card" style={{ backgroundColor: '#8A2BE2', borderRadius: '20px', padding: '30px 20px', textAlign: 'center', boxShadow: '0 4px 15px rgba(138,43,226,0.3)', border: '2px solid #E6A8D7', color: 'white' }}>
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '10px' }}>✨ 🛍️ ✨</span>
                  <h3 className={subtitleFont.className} style={{ fontSize: '1.8rem', margin: '0 0 5px 0' }}>Digital Products</h3>
                  <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 'bold', color: '#FFD1DC' }}>Explore Ruri&apos;s Digital Depot</p>
                </div>
              </div>

              {/* REVISION 2 ITEM 1: SMALL LANDSCAPE BOX BEFORE IMPORTANT NOTICE */}
              <div style={{ backgroundColor: '#FDF0F5', border: '1.5px dashed #D27DCE', borderRadius: '12px', padding: '10px 15px', marginBottom: '15px', textAlign: 'center' }}>
                <p style={{ margin: 0, color: '#8A2BE2', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  (Below is not related to Digital Products but premium account.)
                </p>
              </div>

              {/* REVISION 2 ITEM 2: REVERTED IMPORTANT NOTICE TEXT */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', marginBottom: '15px', borderLeft: '6px solid #8A2BE2', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>⚠️</span>
                  <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', margin: 0, fontSize: '1.2rem' }}>Important Notice</h3>
                </div>
                <p style={{ color: '#D27DCE', margin: 0, fontWeight: 'bold', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Please note that the premium accounts are BMed. This simply means that possible errors or problems may occur on the account.
                </p>
              </div>
              
              {/* REFORMATTED RULES & REGULATIONS */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', marginBottom: '25px', borderLeft: '6px solid #D27DCE', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', margin: '0 0 15px 0', fontSize: '1.3rem' }}>📜 Rules & Regulations</h3>
                <div style={{ color: '#8A2BE2', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  
                  <div style={{ display: 'flex', marginBottom: '15px' }}>
                    <strong style={{ marginRight: '8px' }}>ⓘ</strong>
                    <div>
                      <strong>order processing time :</strong><br/>
                      <div style={{ paddingLeft: '15px' }}>
                        supplied : secs/mins<br/>
                        mto : mins/hrs
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', marginBottom: '15px' }}>
                    <strong style={{ marginRight: '8px' }}>ⓘ</strong>
                    <div>
                      <strong>reports & tickets :</strong><br/>
                      <div style={{ paddingLeft: '15px' }}>
                        1-7 business days
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', marginBottom: '15px' }}>
                    <strong style={{ marginRight: '8px' }}>ⓘ</strong>
                    <div>
                      <strong>Refunds :</strong><br/>
                      <div style={{ paddingLeft: '15px' }}>
                        strictly no refund.<br/>
                        unless stated by owner. If incorrect amount<br/>
                        is sent, it will be considered as a balance.<br/>
                        If insist, a 2% deduction may apply.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex' }}>
                    <strong style={{ marginRight: '8px' }}>ⓘ</strong>
                    <div>
                      I don&apos;t cater rude and impatient<br/>
                      <div style={{ paddingLeft: '15px' }}>
                        clients. please read rules<br/>
                        before making a purchase.
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              
              <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '1.8rem', textAlign: 'center', marginBottom: '15px' }}>Other Categories 👇</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '3rem' }}>
                {[
                  { id: 'products', label: '🛍️ Accounts', bg: '#8A2BE2', color: 'white' }, 
                  { id: 'services', label: '✨ Services', bg: '#D27DCE', color: 'white' },
                  { id: 'payment', label: '💳 Payments', bg: '#ffffff', color: '#8A2BE2', border: '2px solid #8A2BE2' }, 
                  { id: 'reports', label: '🎫 Submit Ticket', bg: '#ffffff', color: '#D27DCE', border: '2px solid #D27DCE' }
                ].map((btn) => (
                  <button 
                    key={btn.id} 
                    onClick={() => handleNav(btn.id)} 
                    className="hover-btn"
                    style={{ backgroundColor: btn.bg, color: btn.color, border: btn.border || 'none', padding: '15px', borderRadius: '15px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* ABOUT OWNER */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', marginBottom: '25px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                <div onClick={() => setOpenOwner(!openOwner)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', margin: 0, fontSize: '1.4rem' }}>🌸 About Owner</h3>
                  <span style={{ color: '#D27DCE', fontSize: '1.2rem', fontWeight: 'bold' }}>{openOwner ? '▴' : '▾'}</span>
                </div>
                
                {openOwner && (
                  <div style={{ marginTop: '15px', color: '#8A2BE2', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    
                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                      <strong style={{ whiteSpace: 'nowrap', marginRight: '5px' }}>ෆ about :</strong>
                      <div>
                        i&apos;ll be ur seller, supplier,<br/>
                        reseller, service provider,<br/>
                        mid, booster & keeper.
                      </div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                      <strong style={{ whiteSpace: 'nowrap', marginRight: '5px' }}>ෆ tenurity :</strong>
                      <div>
                        since 2019<br/>
                        highest keep : 5.2k
                      </div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                      <strong style={{ whiteSpace: 'nowrap', marginRight: '5px' }}>ෆ services :</strong>
                      <div>
                        check my website<br/>
                        rurika.shop
                      </div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                      <strong style={{ whiteSpace: 'nowrap', marginRight: '5px' }}>ෆ mop :</strong>
                      <div>gcash, gotyme, maya</div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                      <strong style={{ whiteSpace: 'nowrap', marginRight: '5px' }}>ෆ proofs & vouches :</strong>
                      <div>
                        <a href="https://t.me/rurishoppu" target="_blank" rel="noopener noreferrer" style={{color:'#D27DCE', textDecoration:'none', fontWeight:'bold'}}>https://t.me/rurishoppu</a>
                      </div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                      <strong style={{ whiteSpace: 'nowrap', marginRight: '5px' }}>ෆ telegram :</strong>
                      <div>@strobariii</div>
                    </div>
                    
                    <hr style={{ border: '1px dashed #E6A8D7', margin: '15px 0' }} />
                    
                    <p style={{ margin: '5px 0' }}>
                      <strong>more about owner:</strong><br/>
                      age: 21 | pronouns: she, her<br/>
                      zodiac: cancer | stats: nbsb<br/>
                      cat lover & sweet tooth
                    </p>
                    
                    <div style={{ backgroundColor: '#FDF0F5', padding: '12px', borderRadius: '8px', marginTop: '15px', fontSize: '0.85rem', fontWeight: 'bold', color: '#D27DCE' }}>
                      just to set clear a expectation that the owner has a full-time job and is unable to address your concerns immediately. aside from that, she has other hustles during her free time. if unresponsive, she might be busy, on-duty, or asleep. spamming is not allowed unless stated as important.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW: ADMIN LOGIN (DEDICATED SCREEN)                       */}
          {/* ========================================================= */}
          {activeTab === 'admin' && !isAdminLoggedIn && (
             <div style={{ animation: 'fadeIn 0.5s' }}>
                <div style={{ backgroundColor: '#000000', borderRadius: '20px', padding: '40px 25px', boxShadow: '0 10px 30px rgba(0,0,0,0.4)', borderTop: '8px solid #FFD1DC' }}>
                  <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h3 className={subtitleFont.className} style={{ color: '#FFD1DC', fontSize: '2rem', margin: '0 0 5px 0' }}>🔒 Admin Tool</h3>
                    <p style={{ color: '#8A2BE2', margin: 0, fontWeight: 'bold' }}>Restricted Access.</p>
                  </div>
                  <form onSubmit={handleAdminLogin}>
                    <input 
                      type="text" 
                      placeholder="Username" 
                      value={adminUsername} 
                      onChange={(e) => setAdminUsername(e.target.value)} 
                      style={{ ...inputStyle, backgroundColor: '#333', color: 'white', border: 'none', padding: '15px' }} 
                      required 
                    />
                    <input 
                      type="password" 
                      placeholder="PIN Code" 
                      value={adminPin} 
                      onChange={(e) => setAdminPin(e.target.value)} 
                      style={{ ...inputStyle, backgroundColor: '#333', color: 'white', border: 'none', padding: '15px' }} 
                      required 
                    />
                    {loginError && <p style={{ color: '#EF4444', fontSize: '0.9rem', marginTop: '-10px', marginBottom: '10px', textAlign: 'center' }}>Incorrect Username or PIN.</p>}
                    <button type="submit" className="hover-btn" style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#FFD1DC', color: '#000000', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginTop: '10px' }}>
                      Login to Dashboard
                    </button>
                  </form>
                </div>
             </div>
          )}

          {/* ========================================================= */}
          {/* VIEW: ADMIN PANEL (ALL 6 SECTIONS INTACT)                  */}
          {/* ========================================================= */}
          {activeTab === 'admin' && isAdminLoggedIn && (
            <div style={{ animation: 'fadeIn 0.5s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '2rem', margin: 0 }}>⚙️ Admin Panel</h3>
                <button onClick={handleAdminLogout} style={{ padding: '8px 15px', borderRadius: '10px', backgroundColor: '#EF4444', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Logout</button>
              </div>
              
              {/* ADMIN SUB-TABS */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {[
                  { id: 'tickets', label: '🎫 Tickets' },
                  { id: 'products', label: '🛍️ Legacy' }, 
                  { id: 'services', label: '✨ Services' },
                  { id: 'digital-products', label: '📦 Digitals' },
                  { id: 'free-requests', label: '🎁 Free Req.' },
                  { id: 'referrals', label: '🎟️ Codes' }
                ].map(tab => (
                  <button 
                    key={tab.id} 
                    onClick={() => setAdminSection(tab.id as any)} 
                    style={{ flex: 1, minWidth: '90px', padding: '10px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: adminSection === tab.id ? '#8A2BE2' : '#ffffff', color: adminSection === tab.id ? 'white' : '#8A2BE2', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* ADMIN SUB-TAB 1: TICKETS */}
              {adminSection === 'tickets' && (
                <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                  <TicketStatsGrid />
                  <h4 style={{ color: '#D27DCE', margin: '0 0 15px 0', fontSize: '1.4rem', borderTop: '2px dashed #FDF0F5', paddingTop: '15px' }}>🎫 Recent Tickets</h4>
                  
                  {visibleTickets.length === 0 ? (
                    <p style={{ color: '#8A2BE2', fontStyle: 'italic' }}>No recent tickets submitted.</p>
                  ) : (
                    visibleTickets.map((ticket) => (
                      <div key={ticket.id} style={{ border: '2px solid #FDF0F5', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <strong style={{ fontSize: '1.1rem' }}>{ticket.premium_type || 'Unknown Item'}</strong>
                          <select 
                            value={ticket.status} 
                            onChange={(e) => updateTicketStatus(ticket.id, e.target.value)} 
                            style={{ padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold', border: 'none', outline: 'none', backgroundColor: ticket.status === 'Completed' ? '#4ADE80' : ticket.status === 'In Progress' ? '#FBBF24' : '#FCA5A5', color: 'white' }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                        
                        <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#888', fontWeight: 'bold' }}>Ticket ID: #{ticket.ticket_id || 'N/A'}</p>
                        <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#888' }}>Account Email: {ticket.contact_email || 'Not Provided'}</p>
                        
                        <button 
                          onClick={() => setExpandedTicketId(expandedTicketId === ticket.id ? null : ticket.id)} 
                          style={{ background: 'none', border: 'none', color: '#8A2BE2', fontWeight: 'bold', cursor: 'pointer', padding: 0, marginTop: '10px' }}
                        >
                          {expandedTicketId === ticket.id ? 'Hide Details ▲' : 'View Full Details ▼'}
                        </button>

                        {expandedTicketId === ticket.id && (
                          <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#FDF0F5', borderRadius: '8px', fontSize: '0.85rem', color: '#333' }}>
                            <p style={{ margin: '3px 0' }}><strong>TG Username:</strong> {ticket.telegram_username || 'Not Provided'}</p>
                            <p style={{ margin: '3px 0' }}><strong>First Email:</strong> {ticket.first_email || 'Not Provided'}</p>
                            <p style={{ margin: '3px 0' }}><strong>Password:</strong> {ticket.account_password || 'Not Provided'}</p>
                            <p style={{ margin: '3px 0' }}><strong>Subscription:</strong> {ticket.subscription || 'Not Provided'}</p>
                            <p style={{ margin: '3px 0' }}><strong>Solo/Shared:</strong> {ticket.solo_shared || 'Not Provided'}</p>
                            <p style={{ margin: '3px 0' }}><strong>Price:</strong> {ticket.purchased_price || 'Not Provided'}</p>
                            <p style={{ margin: '3px 0' }}><strong>Date Purchased:</strong> {ticket.date_purchased || 'Not Provided'}</p>
                            <p style={{ margin: '3px 0' }}><strong>Date Reported:</strong> {ticket.date_reported || 'Not Provided'}</p>
                            <p style={{ margin: '3px 0' }}><strong>Remaining Days:</strong> {ticket.remaining_days || 'Not Provided'}</p>
                            <p style={{ margin: '3px 0' }}><strong>Issue:</strong> {ticket.issue || 'Not Provided'}</p>
                            <p style={{ margin: '8px 0 0 0', paddingTop: '8px', borderTop: '1px dashed #D27DCE', color: '#8A2BE2' }}><strong>Personal Email:</strong> {ticket.personal_email || 'Not Provided'}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* ADMIN SUB-TAB 2: REFERRAL CODES */}
              {adminSection === 'referrals' && (
                <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                  <h4 style={{ color: '#D27DCE', margin: '0 0 15px 0', fontSize: '1.4rem' }}>🎟️ Referral Codes</h4>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. RURI12345" 
                      value={newReferralCode} 
                      onChange={e => setNewReferralCode(e.target.value)} 
                      style={{ ...inputStyle, marginBottom: 0, flex: 1 }} 
                    />
                    <button onClick={handleCreateReferralCode} style={{ padding: '12px 20px', borderRadius: '10px', backgroundColor: '#8A2BE2', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                      Add Code
                    </button>
                  </div>
                  
                  {dbReferralCodes.length === 0 ? (
                    <p style={{ color: '#888' }}>No codes generated yet.</p>
                  ) : (
                    dbReferralCodes.map(code => (
                      <div key={code.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px dashed #E6A8D7' }}>
                        <strong style={{ fontSize: '1.1rem', color: code.is_used ? '#888' : '#8A2BE2', textDecoration: code.is_used ? 'line-through' : 'none' }}>
                          {code.code}
                        </strong>
                        <span style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold', backgroundColor: code.is_used ? '#FEE2E2' : '#DCFCE7', color: code.is_used ? '#EF4444' : '#22C55E' }}>
                          {code.is_used ? 'Used' : 'Available'}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* ADMIN SUB-TAB 3: FREE PRODUCT REQUESTS */}
              {adminSection === 'free-requests' && (
                <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                  <h4 style={{ color: '#D27DCE', margin: '0 0 15px 0', fontSize: '1.4rem' }}>🎁 Free Product Requests</h4>
                  
                  {dbFreeRequests.length === 0 ? (
                    <p style={{ color: '#888' }}>No pending requests.</p>
                  ) : (
                    dbFreeRequests.map(req => (
                      <div key={req.id} style={{ border: '2px solid #FDF0F5', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                           <strong style={{ color: '#8A2BE2' }}>Platform: {req.platform}</strong>
                           <select 
                             value={req.status} 
                             onChange={(e) => updateFreeRequestStatus(req.id, e.target.value)} 
                             style={{ padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold', border: 'none', outline: 'none', backgroundColor: req.status === 'Approved' ? '#4ADE80' : req.status === 'Pending' ? '#FBBF24' : '#FCA5A5', color: 'white' }}
                           >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                           </select>
                         </div>
                         <div style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
                           {req.user_username && <p style={{ margin: '2px 0' }}><strong>Username:</strong> {req.user_username}</p>}
                           {req.ruri_username && <p style={{ margin: '2px 0' }}><strong>Account / Name:</strong> {req.ruri_username}</p>}
                           {req.referral_code && <p style={{ margin: '2px 0' }}><strong>Ref Code:</strong> {req.referral_code}</p>}
                           {req.platform_link && <p style={{ margin: '2px 0' }}><strong>Profile Link:</strong> <a href={req.platform_link} target="_blank" rel="noreferrer" style={{ color: '#8A2BE2' }}>{req.platform_link}</a></p>}
                           <p style={{ margin: '2px 0' }}><strong>Email:</strong> {req.email}</p>
                           <p style={{ margin: '2px 0', color: '#D27DCE', fontWeight: 'bold' }}><strong>Verification:</strong> {req.screenshot_url}</p>
                         </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* ADMIN SUB-TAB 4: DIGITAL PRODUCTS (DIRECT GALLERY UPLOADS) */}
              {adminSection === 'digital-products' && (
                <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                  <h4 style={{ color: '#D27DCE', margin: '0 0 15px 0', fontSize: '1.4rem' }}>📦 Digital Products Manager</h4>
                  
                  {dbDigitalProducts.map(dp => (
                    <div key={dp.id} style={{ border: '1px dashed #E6A8D7', padding: '15px', marginBottom: '10px', borderRadius: '10px', backgroundColor: '#FDF0F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ color: '#8A2BE2', fontSize: '1.1rem', display: 'block' }}>{dp.title}</strong>
                        <span style={{ fontSize: '0.85rem', color: '#D27DCE', fontWeight: 'bold' }}>{dp.is_free ? 'FREE' : dp.price}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button onClick={() => loadDpToEdit(dp)} style={{ padding: '8px 12px', borderRadius: '5px', backgroundColor: '#8A2BE2', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Edit</button>
                        <button onClick={() => handleDeleteDp(dp.id)} style={{ padding: '8px 12px', borderRadius: '5px', backgroundColor: '#EF4444', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                      </div>
                    </div>
                  ))}

                  <div style={{ borderTop: '2px solid #FDF0F5', paddingTop: '20px', marginTop: '20px' }}>
                    <h5 style={{ color: '#8A2BE2', margin: '0 0 15px 0', fontSize: '1.1rem' }}>{editingDpId ? '✏️ Edit Digital Product' : '➕ Add New Digital Product'}</h5>
                    
                    <label style={labelStyle}>Product Title</label>
                    <input type="text" name="title" value={dpForm.title} onChange={handleDpChange} placeholder="Product Title" style={inputStyle} />
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Price</label>
                        <input type="text" name="price" value={dpForm.price} onChange={handleDpChange} placeholder="e.g. ₱250" style={inputStyle} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Category</label>
                        <input type="text" name="category" value={dpForm.category} onChange={handleDpChange} placeholder="e.g. Productivity" style={inputStyle} />
                      </div>
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: '#D27DCE', fontWeight: 'bold', cursor: 'pointer' }}>
                      <input type="checkbox" name="is_free" checked={dpForm.is_free} onChange={handleDpChange} style={{ marginRight: '10px', transform: 'scale(1.5)' }} /> 
                      Is this a FREE product?
                    </label>

                    {/* DIRECT GALLERY UPLOAD FOR COVER IMAGE */}
                    <label style={labelStyle}>Cover Image (Upload from Gallery / Files)</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'cover_url')} style={inputStyle} />
                    {uploadingCover && <p style={{ color: '#8A2BE2', fontSize: '0.85rem', fontWeight: 'bold', margin: '-5px 0 10px 0' }}>⏳ Uploading image to storage...</p>}
                    {dpForm.cover_url && (
                      <div style={{ marginBottom: '15px' }}>
                        <p style={{ margin: '0 0 5px 0', fontSize: '0.8rem', color: '#888' }}>Current Cover Preview:</p>
                        <img src={dpForm.cover_url} alt="Cover preview" style={{ height: '90px', borderRadius: '8px', border: '2px solid #E6A8D7', objectFit: 'cover' }} />
                      </div>
                    )}
                    
                    <label style={labelStyle}>Preview Image URLs (Optional comma-separated)</label>
                    <textarea name="previews" value={dpForm.previews} onChange={handleDpChange} placeholder="url1, url2" rows={2} style={inputStyle}></textarea>
                    
                    {/* DIRECT GALLERY / FILE UPLOAD FOR VIDEO */}
                    <label style={labelStyle}>Product Video (Upload from Files / Gallery)</label>
                    <input type="file" accept="video/*" onChange={(e) => handleFileUpload(e, 'video_url')} style={inputStyle} />
                    {uploadingVideo && <p style={{ color: '#8A2BE2', fontSize: '0.85rem', fontWeight: 'bold', margin: '-5px 0 10px 0' }}>⏳ Uploading video to storage...</p>}
                    {dpForm.video_url && (
                      <p style={{ fontSize: '0.85rem', color: '#22C55E', fontWeight: 'bold', marginBottom: '15px' }}>✅ Video file attached!</p>
                    )}
                    
                    <label style={labelStyle}>Direct Open from Gumroad/RaketPH/Etsy/Stanstore URL</label>
                    <input type="text" name="external_link" value={dpForm.external_link} onChange={handleDpChange} placeholder="https://gumroad.com/..." style={inputStyle} />

                    <label style={labelStyle}>Direct File URL (If direct download)</label>
                    <input type="text" name="file_url" value={dpForm.file_url} onChange={handleDpChange} placeholder="https://..." style={inputStyle} />

                    <label style={labelStyle}>Short Description</label>
                    <textarea name="short_desc" value={dpForm.short_desc} onChange={handleDpChange} placeholder="1-2 sentences..." rows={2} style={inputStyle}></textarea>
                    
                    <label style={labelStyle}>Full Description</label>
                    <textarea name="full_desc" value={dpForm.full_desc} onChange={handleDpChange} placeholder="Detailed explanation..." rows={4} style={inputStyle}></textarea>
                    
                    <label style={labelStyle}>What&apos;s Included (Comma Separated)</label>
                    <textarea name="includes" value={dpForm.includes} onChange={handleDpChange} placeholder="Item 1, Item 2" rows={2} style={inputStyle}></textarea>
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Format</label>
                        <input type="text" name="format" value={dpForm.format} onChange={handleDpChange} placeholder="e.g. PDF, Notion" style={inputStyle} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Notes</label>
                        <input type="text" name="notes" value={dpForm.notes} onChange={handleDpChange} placeholder="Important note..." style={inputStyle} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button onClick={handleSaveDp} style={{ flex: 1, padding: '15px', borderRadius: '10px', border: 'none', backgroundColor: '#8A2BE2', color: 'white', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                        {editingDpId ? '💾 Update Product' : '💾 Create Product'}
                      </button>
                      {editingDpId && <button onClick={cancelDpEdit} style={{ padding: '15px 20px', borderRadius: '10px', border: '1px solid #EF4444', backgroundColor: 'transparent', color: '#EF4444', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>}
                    </div>
                  </div>
                </div>
              )}

              {/* ADMIN SUB-TAB 5: LEGACY ACCOUNTS */}
              {adminSection === 'products' && (
                <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                  <h4 style={{ color: '#D27DCE', margin: '0 0 15px 0', fontSize: '1.4rem' }}>🛍️ Legacy Accounts Manager</h4>
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
                          <input type="text" value={p.label} onChange={(e) => updateEditPrice(index, 'label', e.target.value)} style={{...inputStyle, marginBottom: 0, flex: 2}} placeholder="Variant" />
                          <input type="text" value={p.price} onChange={(e) => updateEditPrice(index, 'price', e.target.value)} style={{...inputStyle, marginBottom: 0, flex: 1}} placeholder="Price" />
                          <button onClick={() => removePriceOption(index)} style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#EF4444', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
                        </div>
                      ))}
                      
                      <button onClick={addPriceOption} style={{ padding: '10px 15px', borderRadius: '10px', backgroundColor: 'transparent', color: '#8A2BE2', border: '2px dashed #8A2BE2', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginBottom: '25px' }}>+ Add Price Option</button>
                      <button onClick={handleSaveProduct} style={{ width: '100%', padding: '15px', borderRadius: '10px', border: 'none', backgroundColor: '#8A2BE2', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 10px rgba(138,43,226,0.3)' }}>💾 Save Changes to Store</button>
                    </div>
                  )}
                </div>
              )}

              {/* ADMIN SUB-TAB 6: SERVICES */}
              {adminSection === 'services' && (
                <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                  <h4 style={{ color: '#D27DCE', margin: '0 0 15px 0', fontSize: '1.4rem' }}>✨ Services Manager</h4>
                  
                  {dbServices.length > 0 && (
                    <div style={{ marginBottom: '25px' }}>
                      <label style={labelStyle}>Your Custom Services:</label>
                      {dbServices.map(svc => (
                        <div key={svc.id} style={{ border: '1px dashed #E6A8D7', padding: '15px', marginBottom: '10px', borderRadius: '10px', backgroundColor: '#FDF0F5' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ color: '#8A2BE2', fontSize: '1.1rem' }}>{svc.title}</strong>
                            <div style={{ display: 'flex', gap: '5px' }}>
                              <button onClick={() => loadServiceToEdit(svc)} style={{ padding: '8px 12px', borderRadius: '5px', backgroundColor: '#8A2BE2', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Edit</button>
                              <button onClick={() => handleDeleteService(svc.id)} style={{ padding: '8px 12px', borderRadius: '5px', backgroundColor: '#EF4444', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ borderTop: '2px solid #FDF0F5', paddingTop: '20px' }}>
                    <h5 style={{ color: '#8A2BE2', margin: '0 0 15px 0', fontSize: '1.1rem' }}>{editingSvcId ? '✏️ Edit Service' : '➕ Add New Service'}</h5>
                    <label style={labelStyle}>Service Title:</label>
                    <input type="text" value={svcTitle} onChange={e => setSvcTitle(e.target.value)} placeholder="(e.g. Domain Making)" style={inputStyle} />
                    
                    <label style={labelStyle}>Details / List (Line by line):</label>
                    <textarea value={svcContent} onChange={e => setSvcContent(e.target.value)} placeholder="Type details here... Press Enter for a new line." rows={5} style={{...inputStyle, resize: 'vertical'}}></textarea>
                    
                    <label style={labelStyle}>Additional Note (Optional):</label>
                    <input type="text" value={svcNote} onChange={e => setSvcNote(e.target.value)} placeholder="(e.g. ⓘ good for email hosting)" style={inputStyle} />
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={handleSaveService} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#8A2BE2', color: 'white', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                        {editingSvcId ? '💾 Update Service' : '💾 Create Service'}
                      </button>
                      {editingSvcId && <button onClick={cancelServiceEdit} style={{ padding: '12px 20px', borderRadius: '10px', border: '1px solid #EF4444', backgroundColor: 'transparent', color: '#EF4444', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW: DIGITAL STOREFRONT (WITH 14 RULES & FREE GUIDE)      */}
          {/* ========================================================= */}
          {activeTab === 'digital-store' && (
            <div style={{ animation: 'fadeIn 0.5s' }}>
              <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '2.2rem', textAlign: 'center', marginBottom: '0.5rem' }}>Digital Depot</h3>
              <p style={{ textAlign: 'center', color: '#D27DCE', fontWeight: 'bold', marginBottom: '1.5rem' }}>Templates, Assets, and Creative Resources.</p>
              
              {/* DIGITAL PRODUCTS - REVISION 2 ITEM 3: 14 RULES & REGULATIONS (FOLDABLE) */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', marginBottom: '25px', borderLeft: '6px solid #8A2BE2', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                <div onClick={() => setOpenDigitalRules(!openDigitalRules)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <h4 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '1.2rem', margin: 0 }}>
                    📜 Digital Products — Rules &amp; Regulations
                  </h4>
                  <span style={{ color: '#D27DCE', fontSize: '1.2rem', fontWeight: 'bold' }}>{openDigitalRules ? '▴' : '▾'}</span>
                </div>
                
                {openDigitalRules && (
                  <div style={{ marginTop: '15px', color: '#8A2BE2', fontSize: '0.9rem', lineHeight: '1.7', borderTop: '1px dashed #E6A8D7', paddingTop: '15px' }}>
                    <p style={{ fontStyle: 'italic', color: '#D27DCE', marginBottom: '15px' }}>
                      Thank you for choosing Ruri&apos;s Digital Depot! Before purchasing or downloading any digital product, please take a moment to read these rules and regulations. By purchasing or accessing our digital products, you agree to the following terms.
                    </p>

                    <div style={{ marginBottom: '12px' }}>
                      <strong>1. Please Review Before Purchasing</strong><br/>
                      Please review the product description, previews, included files, features, and other available information before purchasing. Because our products are delivered digitally and may be downloaded or accessed immediately, all digital product purchases are final and non-refundable. If you are unsure whether a product is suitable for your needs, please contact us before purchasing.
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <strong>2. Lifetime Access</strong><br/>
                      Your purchase comes with lifetime access to the digital product you purchased, subject to the continued availability of our website and digital services. Please keep your purchase information and downloaded files in a safe place for your own records.
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <strong>3. Resell &amp; Modification Rights</strong><br/>
                      Selected products may come with resell or commercial-use rights as stated on the individual product page. You may use our templates as a starting point and redesign, edit, customize, or significantly alter them for your own business or projects. However, you may not simply download our original product and repost, re-upload, or resell it unchanged while claiming it as your own creation. If you choose to publish or distribute a product without making meaningful changes to the original design/content, proper credit to Rurika Digital Products is required. Purchasing a digital product does not transfer ownership of Rurika&apos;s original intellectual property.
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <strong>4. No Unauthorized Redistribution</strong><br/>
                      You may not: Upload our original files to free-download websites, file-sharing platforms, or public groups; Give away the original files as freebies; Share your purchased files with people who did not purchase them; Repackage and redistribute the original product as your own; Claim the original design, content, or template as your exclusive creation; Sell or distribute an unchanged copy of our product without permission. Please respect the time, creativity, and work invested into creating each digital product.
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <strong>5. You May Customize Your Product</strong><br/>
                      We encourage you to make the product your own. Depending on the rights included with your purchase, you may customize elements such as: Colors, Fonts, Text, Layouts, Images, Branding, Content, and other design elements. If you substantially redesign or transform the product into your own original work, you may use it according to the rights stated on the product page.
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <strong>6. Digital Products Only</strong><br/>
                      All products available under our Digital Products section are digital products. No physical item will be shipped unless specifically stated otherwise. Please make sure your device, software, application, or platform is compatible with the product before purchasing.
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <strong>7. Download &amp; File Responsibility</strong><br/>
                      Once your files have been successfully delivered or made available to you, please download and store a backup copy for your personal records. We recommend keeping your purchased files somewhere safe so you can access them when needed.
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <strong>8. Technical Issues</strong><br/>
                      If you experience a broken download link, missing file, corrupted file, or another technical problem related to your purchase, please contact us at <a href="mailto:digipro.customerhelp@rurika.shop" style={{ color: '#D27DCE', fontWeight: 'bold' }}>digipro.customerhelp@rurika.shop</a>. We will do our best to investigate and provide a reasonable solution. Technical assistance does not automatically qualify a purchase for a refund.
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <strong>9. Updates &amp; Changes</strong><br/>
                      From time to time, we may improve, update, correct, or modify our digital products. Unless specifically stated on the product page, purchasing a product does not guarantee access to every future version, redesign, or completely new edition of that product.
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <strong>10. Intellectual Property</strong><br/>
                      All original designs, written content, graphics, branding, layouts, and other creative materials remain the intellectual property of Rurika Digital Products unless otherwise stated. Your purchase gives you the rights specifically stated for that product. It does not give you ownership of Rurika&apos;s brand, original files, or intellectual property.
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <strong>11. Feedback &amp; Customer Support</strong><br/>
                      We genuinely want to improve the products and service we provide. If there is something you are not satisfied with, please let us know. You may leave a short feedback, complaint, suggestion, or review through our website: <a href="https://www.rurika.shop" target="_blank" rel="noreferrer" style={{ color: '#D27DCE' }}>www.rurika.shop</a> or email us at: <a href="mailto:digitaldepot@rurika.shop" style={{ color: '#D27DCE' }}>digitaldepot@rurika.shop</a>.
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <strong>12. Respectful Communication</strong><br/>
                      We welcome honest feedback, including complaints and constructive criticism. We simply ask that communication with our team remains respectful so we can focus on solving the issue and helping you as effectively as possible.
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <strong>13. Violation of These Rules</strong><br/>
                      If a customer intentionally distributes, reproduces, or resells our original products in violation of these terms, we reserve the right to restrict access to our digital services, discontinue customer support, and take other appropriate action where necessary.
                    </div>

                    <div>
                      <strong>14. Agreement</strong><br/>
                      By purchasing, downloading, or accessing a Rurika Digital Product, you acknowledge that you have read and agreed to these Digital Product Rules &amp; Regulations. Thank you for supporting our work and respecting the creativity behind each product. We truly appreciate your support. ♡
                    </div>
                  </div>
                )}
              </div>

              {/* DIGITAL PRODUCTS LIST (DIRECT REDIRECT TO EXTERNAL STORES) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
                {dbDigitalProducts.length > 0 ? (
                  dbDigitalProducts.map((product) => (
                    <div key={product.id} className="hover-card" style={{ backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(230,168,215,0.3)', border: '1px solid #FDF0F5' }}>
                      <div style={{ height: '200px', width: '100%', backgroundImage: `url(${product.cover_url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#FDF0F5' }}></div>
                      <div style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                          <span style={{ backgroundColor: '#FDF0F5', color: '#D27DCE', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>{product.category}</span>
                          <span className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '1.2rem' }}>{product.is_free ? 'FREE' : product.price}</span>
                        </div>
                        <h4 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '1.4rem', margin: '0 0 10px 0' }}>{product.title}</h4>
                        <p style={{ color: '#888', fontSize: '0.95rem', margin: '0 0 20px 0', lineHeight: '1.5' }}>{product.short_desc}</p>
                        
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => openProductDetail(product)} className="hover-btn" style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '2px solid #E6A8D7', backgroundColor: 'transparent', color: '#D27DCE', fontWeight: 'bold', cursor: 'pointer' }}>
                            {product.external_link ? 'View on Store ↗' : 'View Details'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: 'center', color: '#8A2BE2', fontStyle: 'italic', margin: '20px 0' }}>More digital products coming soon!</p>
                )}
              </div>

              {/* REVISION 2 ITEM 4: RENAMED FREE STARTER GUIDE BANNER AT BOTTOM */}
              <div 
                onClick={() => setFreeModal({ open: true, step: 1, source: '', otherSource: '', referralCode: '', igUsername: '', ruriUsername: '', igName: '', email: '', screenshotSent: false })} 
                className="hover-card" 
                style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '25px 20px', textAlign: 'center', boxShadow: '0 4px 15px rgba(230,168,215,0.4)', border: '3px dashed #D27DCE', color: '#8A2BE2', marginTop: '40px' }}
              >
                <span style={{ fontSize: '2.5rem', display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }}>🎁</span>
                <h3 className={subtitleFont.className} style={{ fontSize: '1.4rem', margin: 0, display: 'inline-block', verticalAlign: 'middle' }}>Free Digital Creator Starter Guide</h3>
                <p style={{ color: '#D27DCE', fontSize: '0.95rem', margin: '8px 0 0 0', fontWeight: 'bold' }}>Click here to claim your free creator starter guide!</p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW: PRODUCT DETAIL (DIGITAL STORE)                       */}
          {/* ========================================================= */}
          {activeTab === 'product-detail' && activeDigitalProduct && (
             <div style={{ animation: 'fadeIn 0.5s' }}>
                <button onClick={() => handleNav('digital-store')} style={{ background: 'none', border: 'none', color: '#D27DCE', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                  ← Back to Store
                </button>
                <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(230,168,215,0.4)' }}>
                  {activeDigitalProduct.video_url ? (
                     <video controls style={{ width: '100%', height: '250px', backgroundColor: '#000' }}>
                       <source src={activeDigitalProduct.video_url} type="video/mp4" />
                       Your browser does not support the video tag.
                     </video>
                  ) : (
                     <div style={{ height: '250px', width: '100%', backgroundImage: `url(${activeDigitalProduct.cover_url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#FDF0F5' }}></div>
                  )}
                  
                  {/* CRASH-PROOF PREVIEW PARSER */}
                  {(() => {
                    const previewsList = Array.isArray(activeDigitalProduct.previews) 
                      ? activeDigitalProduct.previews 
                      : (typeof activeDigitalProduct.previews === 'string' && activeDigitalProduct.previews ? activeDigitalProduct.previews.split(',').map((s: string) => s.trim()) : []);
                    return previewsList.length > 0 ? (
                      <div style={{ display: 'flex', overflowX: 'auto', padding: '15px', gap: '10px', backgroundColor: '#FAFAFA' }}>
                         {previewsList.map((img: string, i: number) => <img key={i} src={img} alt={`Preview ${i}`} style={{ height: '80px', borderRadius: '8px', border: '1px solid #eee' }} />)}
                      </div>
                    ) : null;
                  })()}

                  <div style={{ padding: '25px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h2 className={titleFont.className} style={{ color: '#8A2BE2', margin: 0, fontSize: '2rem' }}>{activeDigitalProduct.title}</h2>
                      <span className={subtitleFont.className} style={{ backgroundColor: '#FDF0F5', color: '#8A2BE2', padding: '8px 15px', borderRadius: '12px', fontSize: '1.2rem' }}>
                        {activeDigitalProduct.is_free ? 'FREE' : activeDigitalProduct.price}
                      </span>
                    </div>
                    
                    <p style={{ color: '#666', lineHeight: '1.7', fontSize: '1rem', marginBottom: '25px', whiteSpace: 'pre-wrap' }}>{activeDigitalProduct.full_desc}</p>
                    
                    {/* CRASH-PROOF INCLUDES PARSER */}
                    <div style={{ backgroundColor: '#FDF0F5', padding: '20px', borderRadius: '15px', marginBottom: '25px', border: '1px dashed #E6A8D7' }}>
                      <h4 style={{ color: '#D27DCE', margin: '0 0 10px 0' }}>📦 What&apos;s Included:</h4>
                      <ul style={{ color: '#8A2BE2', margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
                        {(() => {
                          const incList = Array.isArray(activeDigitalProduct.includes) 
                            ? activeDigitalProduct.includes 
                            : (typeof activeDigitalProduct.includes === 'string' && activeDigitalProduct.includes ? activeDigitalProduct.includes.split(',').map((s: string) => s.trim()) : []);
                          return incList.length > 0 ? incList.map((item: string, i: number) => <li key={i}>{item}</li>) : <li>Standard digital access included</li>;
                        })()}
                      </ul>
                      <p style={{ margin: '15px 0 0 0', fontSize: '0.9rem', color: '#888' }}><strong>Format:</strong> {activeDigitalProduct.format || 'Digital Download'}</p>
                    </div>

                    {activeDigitalProduct.notes && (
                      <div style={{ backgroundColor: '#FEF2F2', padding: '15px', borderRadius: '10px', marginBottom: '25px' }}>
                        <p style={{ margin: 0, color: '#EF4444', fontSize: '0.9rem', fontWeight: 'bold' }}>⚠️ Important Note: {activeDigitalProduct.notes}</p>
                      </div>
                    )}

                    {activeDigitalProduct.is_free ? (
                      <button onClick={() => setFreeModal({ open: true, step: 1, source: '', otherSource: '', referralCode: '', igUsername: '', ruriUsername: '', igName: '', email: '', screenshotSent: false })} className="hover-btn" style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#D27DCE', color: '#ffffff', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(210,125,206,0.4)' }}>
                        Claim Free Guide
                      </button>
                    ) : (
                      <a href={activeDigitalProduct.external_link || activeDigitalProduct.file_url || '#'} target="_blank" rel="noopener noreferrer" className="hover-btn" style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#8A2BE2', color: '#ffffff', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(138,43,226,0.4)', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {activeDigitalProduct.external_link ? 'Buy on Store ↗' : 'Buy Now'}
                      </a>
                    )}
                  </div>
                </div>
             </div>
          )}

          {/* ========================================================= */}
          {/* VIEW: ACCOUNTS & APPS (LEGACY PRODUCTS)                    */}
          {/* ========================================================= */}
          {activeTab === 'products' && (
            <div style={{ animation: 'fadeIn 0.5s' }}>
              <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', borderBottom: '3px solid #E6A8D7', paddingBottom: '10px' }}>Accounts &amp; Apps</h3>
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

          {/* ========================================================= */}
          {/* VIEW: SERVICES OFFERED (ALWAYS SHOWS HARDCODED + DYNAMIC)  */}
          {/* ========================================================= */}
          {activeTab === 'services' && (
            <div style={{ animation: 'fadeIn 0.5s' }}>
              <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', borderBottom: '3px solid #E6A8D7', paddingBottom: '10px' }}>Services Offered</h3>
              
              {/* Dynamic Services from Admin (Shown Above) */}
              {dbServices.length > 0 && dbServices.map(svc => (
                  <div key={svc.id} style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '20px', marginBottom: '15px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                    <div onClick={() => toggleService(svc.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                      <h4 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '1.3rem', margin: 0 }}>{svc.title}</h4>
                      <span style={{ color: '#D27DCE', fontSize: '0.9rem', fontWeight: 'bold' }}>{openService === svc.id ? '▴' : '▾'} 𝐢. details</span>
                    </div>
                    {openService === svc.id && (
                      <div style={{ marginTop: '15px' }}>
                        <div style={{ whiteSpace: 'pre-wrap', color: '#8A2BE2', fontSize: '0.95rem', lineHeight: '1.8' }}>{svc.content}</div>
                        {svc.note && <div style={{ borderTop: '1px solid #E6A8D7', paddingTop: '10px', marginTop: '15px', color: '#D27DCE', fontSize: '0.9rem', fontWeight: 'bold' }}>ⓘ {svc.note}</div>}
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
                          <button onClick={() => setOpenService(null)} style={{ flex: 1, padding: '10px 0', borderRadius: '10px', border: '2px solid #E6A8D7', backgroundColor: 'transparent', color: '#D27DCE', fontWeight: 'bold', cursor: 'pointer' }}>Not Now</button>
                          <a href="https://t.me/strobariii" target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '10px 0', borderRadius: '10px', border: 'none', backgroundColor: '#8A2BE2', color: '#ffffff', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Contact Owner</a>
                        </div>
                      </div>
                    )}
                  </div>
              ))}

              {/* Hardcoded Services (Always Present & Preserved) */}
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

          {/* ========================================================= */}
          {/* VIEW: PAYMENT METHOD                                       */}
          {/* ========================================================= */}
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

          {/* ========================================================= */}
          {/* VIEW: REPORTS & TICKETS                                    */}
          {/* ========================================================= */}
          {activeTab === 'reports' && (
             <div style={{ animation: 'fadeIn 0.5s' }}>
              <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', borderBottom: '3px solid #E6A8D7', paddingBottom: '10px' }}>Report Forms</h3>
              <div style={{ backgroundColor: '#FDF0F5', padding: '18px', borderRadius: '10px', border: '2px dashed #D27DCE', color: '#8A2BE2', fontSize: '1rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', boxShadow: '0 4px 10px rgba(230, 168, 215, 0.3)' }}>
                🔔 Reminder: After submitting, you can check the live status of your ticket anytime by clicking <span style={{ color: '#ffffff', backgroundColor: '#8A2BE2', padding: '3px 8px', borderRadius: '5px' }}>✅ Submitted Tickets</span> in the side menu! We are working on it!
              </div>

              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '25px 20px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                <p style={{ color: '#D27DCE', fontSize: '0.95rem', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>Please note that process can take 1-7 business days, depending on the service purchased. You&apos;ll be notified once your service is fixed.</p>
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
                  <label style={labelStyle}>⩇ Account email :</label>
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
                  <label style={labelStyle}>⩇ Personal Email to receive updates :</label>
                  <input type="email" name="personal_email" value={formData.personal_email} onChange={handleInputChange} placeholder="(e.g. yourownemail@gmail.com)" style={inputStyle} required />
                  <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: isSubmitting ? '#ccc' : '#8A2BE2', color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem', cursor: isSubmitting ? 'not-allowed' : 'pointer', marginTop: '10px', boxShadow: '0 2px 5px rgba(138,43,226,0.3)' }}>Submit Report</button>
                </form>
              </div>
             </div>
          )}

          {/* ========================================================= */}
          {/* VIEW: LIVE SUBMITTED TICKETS                               */}
          {/* ========================================================= */}
          {activeTab === 'public-tickets' && (
             <div style={{ animation: 'fadeIn 0.5s' }}>
              <h3 className={subtitleFont.className} style={{ color: '#8A2BE2', fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', borderBottom: '3px solid #E6A8D7', paddingBottom: '10px' }}>Live Ticket Status</h3>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '25px 20px', boxShadow: '0 4px 15px rgba(230, 168, 215, 0.3)' }}>
                <TicketStatsGrid />
                <h4 style={{ color: '#D27DCE', margin: '0 0 15px 0', fontSize: '1.2rem', borderTop: '2px dashed #FDF0F5', paddingTop: '15px', textAlign: 'center' }}>Recent Tickets (Last 90 Days)</h4>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <input type="text" placeholder="🔍 Search by Ticket ID..." value={ticketSearch} onChange={e => setTicketSearch(e.target.value)} style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
                </div>
                {displayedPublicTickets.length === 0 ? <p style={{ textAlign: 'center', color: '#8A2BE2', fontStyle: 'italic' }}>No tickets found.</p> : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {displayedPublicTickets.map(ticket => (
                      <div key={ticket.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #E6A8D7', paddingBottom: '15px' }}>
                        <div>
                          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#8A2BE2', fontSize: '1.1rem' }}>{ticket.premium_type || 'Unknown Premium'}</p>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>Ticket ID: <span style={{fontWeight:'bold', color:'#D27DCE'}}>#{ticket.ticket_id || 'N/A'}</span></p>
                          <p style={{ margin: '3px 0 0 0', fontSize: '0.85rem', color: '#888' }}>Submitted: {new Date(ticket.created_at).toLocaleDateString()}</p>
                        </div>
                        <span style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', backgroundColor: ticket.status === 'Completed' ? '#DCFCE7' : ticket.status === 'In Progress' ? '#FEF3C7' : '#FEE2E2', color: ticket.status === 'Completed' ? '#166534' : ticket.status === 'In Progress' ? '#92400E' : '#991B1B' }}>{ticket.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
             </div>
          )}

          {/* ========================================================= */}
          {/* VIEW: CUSTOMER SERVICE                                     */}
          {/* ========================================================= */}
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

      {/* ========================================================= */}
      {/* GLOBAL MODALS (REVISED REVISION 2 FLOW)                     */}
      {/* ========================================================= */}
      
      {/* REVISION 2 ITEM 5: FREE DIGITAL CREATOR STARTER GUIDE ACCESS MODAL */}
      {freeModal.open && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '20px', maxWidth: '420px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', position: 'relative' }}>
            
            <button onClick={() => setFreeModal({ open: false, step: 1, source: '', otherSource: '', referralCode: '', igUsername: '', ruriUsername: '', igName: '', email: '', screenshotSent: false })} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', color: '#D27DCE', cursor: 'pointer' }}>×</button>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '2.5rem' }}>🎁</span>
              <h2 className={titleFont.className} style={{ color: '#8A2BE2', margin: '5px 0 0 0', fontSize: '1.6rem' }}>Free Creator Starter Guide</h2>
            </div>

            {/* STEP 1: SOURCE SURVEY */}
            {freeModal.step === 1 && (
              <div style={{ animation: 'fadeIn 0.3s' }}>
                <p style={{ color: '#D27DCE', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>Where did you hear about the Free Guide?</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  {['Instagram', 'TikTok', 'Facebook', 'Referral', 'Other'].map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', padding: '12px', borderRadius: '10px', border: freeModal.source === opt ? '2px solid #8A2BE2' : '1px solid #E6A8D7', backgroundColor: freeModal.source === opt ? '#F3E8FF' : '#FDF0F5', cursor: 'pointer', fontWeight: 'bold', color: '#8A2BE2' }}>
                      <input type="radio" name="source" value={opt} checked={freeModal.source === opt} onChange={(e) => setFreeModal({...freeModal, source: e.target.value})} style={{ marginRight: '10px' }} /> {opt}
                    </label>
                  ))}
                  {freeModal.source === 'Other' && (
                    <input type="text" placeholder="Please specify platform..." value={freeModal.otherSource} onChange={(e) => setFreeModal({...freeModal, otherSource: e.target.value})} style={{...inputStyle, marginTop: '10px'}} autoFocus />
                  )}
                </div>
                <button onClick={handleNextFreeStep} className="hover-btn" style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#8A2BE2', color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>Continue →</button>
              </div>
            )}

            {/* STEP 2A: INSTAGRAM & TIKTOK FORM */}
            {freeModal.step === 2 && (freeModal.source === 'Instagram' || freeModal.source === 'TikTok') && (
              <div style={{ animation: 'fadeIn 0.3s' }}>
                <p style={{ color: '#D27DCE', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>Please fill out verification details:</p>
                <div style={{ backgroundColor: '#FDF0F5', padding: '10px', borderRadius: '8px', marginBottom: '15px', border: '1px dashed #E6A8D7' }}>
                  <p style={{ margin: 0, color: '#8A2BE2', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>Make sure you have followed @ruris_digitaldepot!</p>
                </div>
                
                <label style={labelStyle}>Your Instagram username:</label>
                <input type="text" placeholder="@yourusername" value={freeModal.igUsername} onChange={(e) => setFreeModal({...freeModal, igUsername: e.target.value})} style={inputStyle} />
                
                <label style={labelStyle}>Our Instagram account username that you followed:</label>
                <input type="text" placeholder="@ruris_digitaldepot" value={freeModal.ruriUsername} onChange={(e) => setFreeModal({...freeModal, ruriUsername: e.target.value})} style={inputStyle} />
                
                <label style={labelStyle}>Email to receive the product:</label>
                <input type="email" placeholder="you@example.com" value={freeModal.email} onChange={(e) => setFreeModal({...freeModal, email: e.target.value})} style={inputStyle} />
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={() => setFreeModal({...freeModal, step: 1})} style={{ flex: 1, padding: '15px', borderRadius: '12px', border: '2px solid #E6A8D7', backgroundColor: 'transparent', color: '#D27DCE', fontWeight: 'bold', cursor: 'pointer' }}>Back</button>
                  <button onClick={handleNextFreeStep} className="hover-btn" style={{ flex: 2, padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#8A2BE2', color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>Request Access</button>
                </div>
              </div>
            )}

            {/* STEP 2B: FACEBOOK, REFERRAL, OTHER FORM */}
            {freeModal.step === 2 && (freeModal.source === 'Facebook' || freeModal.source === 'Referral' || freeModal.source === 'Other') && (
              <div style={{ animation: 'fadeIn 0.3s' }}>
                <p style={{ color: '#D27DCE', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>Please fill out verification details:</p>
                
                <label style={labelStyle}>Valid Referral Code (Required for Referral):</label>
                <input type="text" placeholder="e.g. RURI12345" value={freeModal.referralCode} onChange={(e) => setFreeModal({...freeModal, referralCode: e.target.value})} style={{...inputStyle, border: freeModal.source === 'Referral' ? '2px solid #8A2BE2' : '1px solid #E6A8D7'}} />
                
                <label style={labelStyle}>Instagram Name:</label>
                <input type="text" placeholder="Your Display Name" value={freeModal.igName} onChange={(e) => setFreeModal({...freeModal, igName: e.target.value})} style={inputStyle} />

                <label style={labelStyle}>Instagram Username:</label>
                <input type="text" placeholder="@yourusername" value={freeModal.igUsername} onChange={(e) => setFreeModal({...freeModal, igUsername: e.target.value})} style={inputStyle} />
                
                <label style={labelStyle}>Email to receive the product:</label>
                <input type="email" placeholder="you@example.com" value={freeModal.email} onChange={(e) => setFreeModal({...freeModal, email: e.target.value})} style={inputStyle} />
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={() => setFreeModal({...freeModal, step: 1})} style={{ flex: 1, padding: '15px', borderRadius: '12px', border: '2px solid #E6A8D7', backgroundColor: 'transparent', color: '#D27DCE', fontWeight: 'bold', cursor: 'pointer' }}>Back</button>
                  <button onClick={handleNextFreeStep} className="hover-btn" style={{ flex: 2, padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#8A2BE2', color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>Request Access</button>
                </div>
              </div>
            )}

            {/* STEP 3: CONFIRMATION SCREEN WITH CLICKABLE CONTACT BUTTONS */}
            {freeModal.step === 3 && (
              <div style={{ animation: 'fadeIn 0.3s', textAlign: 'center' }}>
                <div style={{ backgroundColor: '#FEF3C7', color: '#92400E', padding: '18px', borderRadius: '15px', marginBottom: '15px', fontWeight: 'bold' }}>
                  ⏳ Request Submitted!
                </div>
                
                <p style={{ color: '#8A2BE2', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '15px' }}>
                  To speed up your approval, you may send a screenshot proof of follow via email, instagram, telegram alongside your preferred email address to receive the product:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <a href="mailto:digitaldepot@rurika.shop?subject=Proof%20of%20Follow%20-%20Free%20Guide" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '12px', backgroundColor: '#EA4335', color: '#ffffff', borderRadius: '10px', fontWeight: 'bold', textDecoration: 'none' }}>
                    ✉️ Send via Gmail (digitaldepot@rurika.shop)
                  </a>
                  <a href="https://t.me/strobariii" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '12px', backgroundColor: '#229ED9', color: '#ffffff', borderRadius: '10px', fontWeight: 'bold', textDecoration: 'none' }}>
                    ✈️ Send via Telegram (@strobariii)
                  </a>
                  <a href="https://www.instagram.com/ruris_digitaldepot?stkn=cDd2MHMwdzVzbHF6" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '12px', backgroundColor: '#E1306C', color: '#ffffff', borderRadius: '10px', fontWeight: 'bold', textDecoration: 'none' }}>
                    📸 Send via Instagram (@ruris_digitaldepot)
                  </a>
                </div>

                <button onClick={() => setFreeModal({ open: false, step: 1, source: '', otherSource: '', referralCode: '', igUsername: '', ruriUsername: '', igName: '', email: '', screenshotSent: false })} style={{ background: 'none', border: 'none', color: '#D27DCE', fontWeight: 'bold', cursor: 'pointer' }}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. SUCCESS POPUP MODAL (TICKET SUBMIT) */}
      {showSuccessModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '20px', textAlign: 'center', maxWidth: '400px', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', border: '3px solid #8A2BE2' }}>
            <h2 style={{ color: '#22C55E', margin: '0 0 15px 0', fontSize: '2rem' }}>✅ Success!</h2>
            <p style={{ color: '#8A2BE2', fontSize: '1.1rem', marginBottom: '15px', fontWeight: 'bold' }}>Your ticket has been submitted successfully.</p>
            <div style={{ backgroundColor: '#FDF0F5', padding: '20px', borderRadius: '10px', marginBottom: '20px', border: '2px dashed #E6A8D7' }}>
              <p style={{ margin: 0, color: '#D27DCE', fontWeight: 'bold' }}>Your Ticket ID:</p>
              <h3 style={{ margin: '5px 0 0 0', color: '#8A2BE2', fontSize: '2.5rem', letterSpacing: '3px' }}>#{successTicketId}</h3>
            </div>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px' }}>Please save this ID. You can track your live ticket status in the <strong>&quot;Submitted Tickets&quot;</strong> tab using this number.</p>
            <button onClick={() => setShowSuccessModal(false)} style={{ width: '100%', padding: '12px', borderRadius: '10px', backgroundColor: '#8A2BE2', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', border: 'none', cursor: 'pointer', boxShadow: '0 2px 5px rgba(138,43,226,0.3)' }}>Close</button>
          </div>
        </div>
      )}

      {/* 3. LEGACY PRODUCT SELECTION MODAL */}
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
                <div style={{ backgroundColor: '#FDF0F5', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}><p style={{ margin: '0 0 5px 0', color: '#8A2BE2', fontWeight: 'bold', fontSize: '0.9rem' }}>Rules &amp; Details:</p><ul style={{ margin: 0, paddingLeft: '20px', color: '#D27DCE', fontSize: '0.85rem', lineHeight: '1.5' }}>{fallback.rules.map((rule, i) => <li key={i}>{rule}</li>)}</ul></div>
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

      {/* 4. BOOSTING POPUP MODAL */}
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