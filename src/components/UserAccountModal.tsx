import React, { useState } from 'react';
import { X, User, Compass, Bookmark, Package, ShieldCheck, Heart, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ConstellationDisplay } from './ConstellationDisplay';
import { MoonPhaseDisplay } from './MoonPhaseDisplay';

export const UserAccountModal: React.FC = () => {
  const {
    isAccountOpen,
    setIsAccountOpen,
    user,
    updateUserProfile,
    savedConstellation,
    savedSharedSkies,
    removeSharedSky,
    orders
  } = useShop();

  const [activeTab, setActiveTab] = useState<'archive' | 'orders' | 'profile'>('archive');
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);

  if (!isAccountOpen) return null;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(userName, userEmail);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#070B14] border border-white/15 shadow-2xl my-auto overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAccountOpen(false)}
          className="absolute top-4 right-4 z-20 text-[#94A3B8] hover:text-[#F8F9FA] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-10 max-h-[88vh] overflow-y-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C] block font-light">
                {user.tier}
              </span>
              <h2 className="font-serif text-3xl font-light text-[#F8F9FA] mt-1">
                {user.name}&rsquo;s Atelier Account
              </h2>
              <p className="text-xs text-[#94A3B8] font-light mt-0.5">
                Client Member since {user.memberSince} · Private Client Services
              </p>
            </div>

            {/* Navigation Tabs (Zero-pill discipline: clean segmented buttons) */}
            <div className="flex items-center gap-1 bg-[#0B101E] border border-white/10 p-1 self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('archive')}
                className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-colors ${
                  activeTab === 'archive'
                    ? 'bg-[#F8F9FA] text-[#070B14] font-medium'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Celestial Archive
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-[#F8F9FA] text-[#070B14] font-medium'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-[#F8F9FA] text-[#070B14] font-medium'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Profile
              </button>
            </div>
          </div>

          {/* TAB 1: THE CELESTIAL ARCHIVE */}
          {activeTab === 'archive' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Natal Constellation Card */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D6B27C] block mb-4">
                  1. Natal Alignment Blueprint
                </span>

                {savedConstellation ? (
                  <div className="p-6 bg-[#0B101E] border border-white/[0.08] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-4 flex justify-center bg-[#070B14] p-3 border border-white/[0.04]">
                      <ConstellationDisplay name={savedConstellation.constellation} size={150} />
                    </div>

                    <div className="md:col-span-8 space-y-3 text-left">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-2xl text-[#F8F9FA]">
                          {savedConstellation.constellation}
                        </h3>
                        <div className="flex items-center gap-2 bg-[#070B14] px-3 py-1 border border-white/10 text-xs text-[#CBD5E1]">
                          <MoonPhaseDisplay phaseName={savedConstellation.moonPhase} size={20} showGlow={false} />
                          <span>{savedConstellation.moonPhase}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#CBD5E1] font-light leading-relaxed">
                        {savedConstellation.symbolism}
                      </p>

                      <div className="pt-2 text-[11px] text-[#64748B] flex items-center gap-4">
                        <span>Natal Date: {savedConstellation.dob}</span>
                        <span>Archived: {new Date(savedConstellation.dateCalculated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#0B101E] border border-white/[0.06] text-xs text-[#64748B]">
                    No natal constellation archived yet. Use &ldquo;Discover Your Constellation&rdquo; to calculate and save your celestial chart.
                  </div>
                )}
              </div>

              {/* Saved Two Skies, One Moon Experiences */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D6B27C] block mb-4">
                  2. Preserved Two Skies, One Moon Experiences ({savedSharedSkies.length})
                </span>

                {savedSharedSkies.length > 0 ? (
                  <div className="space-y-4">
                    {savedSharedSkies.map((sky) => (
                      <div
                        key={sky.id}
                        className="p-6 bg-[#0B101E] border border-white/[0.08] relative space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                          <span className="font-serif text-lg text-[#F8F9FA]">
                            {sky.personOne.name} &amp; {sky.personTwo.name}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-[#D6B27C] uppercase tracking-wider">
                              Shared Moon: {sky.sharedMoon}
                            </span>
                            <button
                              onClick={() => removeSharedSky(sky.id)}
                              className="text-[#64748B] hover:text-rose-400 p-1"
                              title="Delete from archive"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="font-serif italic text-xs text-[#CBD5E1] leading-relaxed">
                          &ldquo;{sky.poeticStory}&rdquo;
                        </p>

                        <div className="text-[11px] text-[#64748B] flex items-center justify-between pt-2">
                          <span>
                            Alignments: {sky.personOne.constellation} ✦ {sky.personTwo.constellation}
                          </span>
                          <span>Preserved {new Date(sky.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#0B101E] border border-white/[0.06] text-xs text-[#64748B]">
                    No shared skies preserved. Visit the Two Skies, One Moon feature to record a bond between two people.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fadeIn">
              <span className="text-xs uppercase tracking-widest text-[#D6B27C] block">
                Order History &amp; Crafting Status
              </span>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="p-6 bg-[#0B101E] border border-white/[0.08] space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                        <div>
                          <span className="font-mono text-xs text-[#D6B27C] tracking-wider">{order.id}</span>
                          <span className="text-xs text-[#64748B] ml-3">Placed on {order.date}</span>
                        </div>
                        <span className="text-xs px-2.5 py-0.5 bg-[#D6B27C]/10 text-[#D6B27C] border border-[#D6B27C]/30 self-start sm:self-auto">
                          {order.status}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="text-[#CBD5E1] font-serif text-sm">
                              {item.product.name} ({item.selectedMetal}) × {item.quantity}
                            </span>
                            <span className="font-mono text-white">
                              ${(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] flex justify-between items-center text-xs">
                        <span className="text-[#64748B]">Dispatch: White Glove Courier to {order.shippingDetails.city}</span>
                        <span className="font-mono font-medium text-white text-sm">
                          Total: ${order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-xs text-[#64748B]">No previous orders recorded.</div>
              )}
            </div>
          )}

          {/* TAB 3: PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleUpdate} className="max-w-lg space-y-4 animate-fadeIn">
              <span className="text-xs uppercase tracking-widest text-[#D6B27C] block mb-2">
                Atelier Client Details
              </span>

              <div>
                <label className="block text-xs uppercase text-[#94A3B8] mb-1">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-[#0B101E] border border-white/15 text-xs text-white p-2.5 focus:outline-none focus:border-[#D6B27C]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-[#94A3B8] mb-1">Email Address</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-[#0B101E] border border-white/15 text-xs text-white p-2.5 focus:outline-none focus:border-[#D6B27C]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D6B27C] hover:bg-[#E5C79A] text-[#070B14] text-xs uppercase tracking-wider font-medium cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
