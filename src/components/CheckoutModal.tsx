import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Lock, CreditCard, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    cartSubtotal,
    placeOrder,
    user
  } = useShop();

  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: user.name || 'Eleanor Vance',
    email: user.email || 'eleanor.celestial@example.com',
    phone: '+1 (555) 392-1084',
    address: '742 Evergreen Terrace, Suite 4B',
    city: 'San Francisco',
    postalCode: '94102',
    country: 'United States',
    giftMessage: 'Written beneath the same sky, with infinite devotion.',
    paymentMethod: 'credit-card',
    cardNumber: '•••• •••• •••• 4289',
    cardExp: '11/29',
    cardCvc: '•••'
  });

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order = placeOrder({
      name: formData.name,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country
    });
    setConfirmedOrder(order);
    setStep('confirmation');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('details');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#070B14] border border-white/15 shadow-2xl my-auto overflow-hidden">
        
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 text-[#94A3B8] hover:text-[#F8F9FA] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
            
            {/* Left: Checkout Form */}
            <form onSubmit={handleSubmitOrder} className="lg:col-span-7 p-6 sm:p-10 space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C] block font-light">
                  Private Client Atelier
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#F8F9FA] mt-1">
                  Atelier Checkout
                </h2>
              </div>

              {/* Client & Shipping */}
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-wider text-[#CBD5E1] block border-b border-white/[0.08] pb-1">
                  1. Delivery Destination
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase text-[#64748B] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0B101E] border border-white/15 text-xs text-[#CBD5E1] p-2.5 focus:outline-none focus:border-[#D6B27C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-[#64748B] mb-1">Email for Archival Receipt</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0B101E] border border-white/15 text-xs text-[#CBD5E1] p-2.5 focus:outline-none focus:border-[#D6B27C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#64748B] mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#0B101E] border border-white/15 text-xs text-[#CBD5E1] p-2.5 focus:outline-none focus:border-[#D6B27C]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase text-[#64748B] mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#0B101E] border border-white/15 text-xs text-[#CBD5E1] p-2.5 focus:outline-none focus:border-[#D6B27C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#64748B] mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-[#0B101E] border border-white/15 text-xs text-[#CBD5E1] p-2.5 focus:outline-none focus:border-[#D6B27C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#64748B] mb-1">Country</label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#0B101E] border border-white/15 text-xs text-[#CBD5E1] p-2.5 focus:outline-none focus:border-[#D6B27C]"
                    />
                  </div>
                </div>
              </div>

              {/* Complimentary Celestial Note */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#CBD5E1] block border-b border-white/[0.08] pb-1">
                  2. Hand-Written Celestial Seal Note
                </span>
                <textarea
                  rows={2}
                  value={formData.giftMessage}
                  onChange={(e) => setFormData({ ...formData, giftMessage: e.target.value })}
                  placeholder="Inscribed in silver ink with midnight wax seal..."
                  className="w-full bg-[#0B101E] border border-white/15 text-xs text-[#CBD5E1] p-2.5 focus:outline-none focus:border-[#D6B27C]"
                />
              </div>

              {/* Payment Section */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#CBD5E1] block border-b border-white/[0.08] pb-1">
                  3. Secure Payment
                </span>
                
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs text-[#CBD5E1] cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'credit-card' })}
                      className="accent-[#D6B27C]"
                    />
                    <span>Credit / Debit Card</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-[#CBD5E1] cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={formData.paymentMethod === 'apple-pay'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'apple-pay' })}
                      className="accent-[#D6B27C]"
                    />
                    <span>Apple Pay</span>
                  </label>
                </div>

                <div className="p-3 bg-[#0B101E] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <span>Card ending in 4289</span>
                    <Lock className="w-3.5 h-3.5 text-[#D6B27C]" />
                  </div>
                  <div className="font-mono text-xs text-white">4532 •••• •••• 4289</div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#D6B27C] hover:bg-[#E5C79A] text-[#070B14] transition-colors text-xs tracking-[0.2em] uppercase font-medium cursor-pointer shadow-xl shadow-black/40"
              >
                Confirm Atelier Commission (${cartSubtotal.toLocaleString()})
              </button>
            </form>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5 bg-[#0B101E] p-6 sm:p-10 border-t lg:border-t-0 lg:border-l border-white/[0.08] space-y-6">
              <span className="text-xs uppercase tracking-wider text-[#CBD5E1] block border-b border-white/[0.08] pb-2">
                Order Summary ({cartItems.length})
              </span>

              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 text-xs border-b border-white/[0.04] pb-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover bg-[#070B14]" />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-[#F8F9FA] truncate">{item.product.name}</p>
                      <p className="text-[10px] text-[#64748B]">{item.selectedMetal} × {item.quantity}</p>
                      {item.isSharedSkySet && (
                        <p className="text-[9px] text-[#D6B27C] uppercase tracking-wider">Shared Sky Set</p>
                      )}
                    </div>
                    <span className="font-mono text-white tabular-nums">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-[#94A3B8] pt-4 border-t border-white/[0.08]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono text-white">${cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Courier:</span>
                  <span className="text-[#D6B27C] uppercase">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm text-white font-medium pt-2 border-t border-white/[0.06]">
                  <span className="font-serif">Total:</span>
                  <span className="font-mono">${cartSubtotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-4 bg-[#070B14] border border-white/[0.06] text-[11px] text-[#64748B] space-y-1">
                <p className="text-[#CBD5E1] font-medium">Célune Atelier Guarantee</p>
                <p>Every piece includes a numbered Certificate of Authenticity and Astrometric Verification Document.</p>
              </div>
            </div>

          </div>
        ) : (
          /* Order Confirmation View */
          <div className="p-8 sm:p-14 text-center space-y-6 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full border border-[#D6B27C] bg-[#D6B27C]/10 flex items-center justify-center mx-auto text-[#D6B27C]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D6B27C]">
                Commission Confirmed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F8F9FA] font-light">
                Your Sky is Being Forged
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Order Reference: <strong className="font-mono text-white">{confirmedOrder?.id}</strong>
              </p>
            </div>

            <p className="text-sm text-[#CBD5E1] font-light leading-relaxed">
              Thank you, {formData.name}. Our master artisans have received your commission. Your pieces will be crafted in our atelier, accompanied by hand-scribed astrological alignment charts.
            </p>

            <div className="p-4 bg-[#0B101E] border border-white/10 text-left text-xs space-y-1.5 font-light text-[#94A3B8]">
              <div className="flex justify-between">
                <span>Dispatch To:</span>
                <span className="text-white">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span>Tracking Notification:</span>
                <span className="text-white">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Commission Value:</span>
                <span className="font-mono text-[#D6B27C]">${confirmedOrder?.total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 bg-[#F8F9FA] text-[#070B14] hover:bg-[#D6B27C] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer"
            >
              Return to Célune Gallery
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
