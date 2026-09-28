import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, ArrowLeft, Check, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export const QuizModal: React.FC = () => {
  const { isQuizOpen, setIsQuizOpen, addToCart, openProductDetail } = useShop();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    recipient: 'Myself',
    call: 'Moon',
    representation: 'New beginnings',
    jewelryType: 'Necklace',
    finish: 'Gold'
  });

  const [completed, setCompleted] = useState(false);

  if (!isQuizOpen) return null;

  const questions = [
    {
      step: 1,
      title: 'What are you shopping for?',
      key: 'recipient',
      options: ['Myself', 'Partner', 'Sibling', 'Friend', 'Family', 'Gift']
    },
    {
      step: 2,
      title: 'What calls to you?',
      key: 'call',
      options: ['Moon', 'Stars', 'Water', 'Constellations', 'Tides', 'Minimal celestial']
    },
    {
      step: 3,
      title: 'What should the piece represent?',
      key: 'representation',
      options: ['Love', 'Friendship', 'Protection', 'New beginnings', 'Forever', 'Self-expression', 'Memory']
    },
    {
      step: 4,
      title: 'What type of jewelry?',
      key: 'jewelryType',
      options: ['Necklace', 'Bracelet', 'Ring', 'Earrings', 'Pendant', 'Matching Set']
    },
    {
      step: 5,
      title: 'Which finish do you prefer?',
      key: 'finish',
      options: ['Silver', 'Gold', 'Rose Gold']
    }
  ];

  const currentQ = questions[step - 1];

  const handleSelectOption = (opt: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.key]: opt }));
    if (step < 5) {
      setStep(step + 1);
    } else {
      setCompleted(true);
    }
  };

  // Recommendations based on user answers
  const recommendedProducts: Product[] = PRODUCTS.slice(0, 3);

  const resetQuiz = () => {
    setStep(1);
    setCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#070B14] border border-white/15 p-6 sm:p-10 shadow-2xl overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D6B27C]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsQuizOpen(false)}
          className="absolute top-5 right-5 text-[#94A3B8] hover:text-[#F8F9FA] transition-colors"
          aria-label="Close Quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {!completed ? (
          <div className="space-y-8">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#64748B] mb-2 font-mono">
                <span>QUESTION {step} OF 5</span>
                <span>{Math.round((step / 5) * 100)}%</span>
              </div>
              <div className="w-full h-[2px] bg-white/10 mb-6">
                <div
                  className="h-full bg-[#D6B27C] transition-all duration-300"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>

              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C]">
                Célune Concierge Finder
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F8F9FA] mt-1">
                {currentQ.title}
              </h3>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.key as keyof typeof answers] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-4 text-xs tracking-wider uppercase text-left transition-all ${
                      isSelected
                        ? 'border border-[#D6B27C] bg-[#D6B27C]/15 text-[#F8F9FA] font-medium'
                        : 'border border-white/10 bg-[#0B101E]/60 text-[#CBD5E1] hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#D6B27C]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Back button */}
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-2 text-xs text-[#94A3B8] hover:text-[#F8F9FA] tracking-wider uppercase"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Previous Step</span>
              </button>
            )}

          </div>
        ) : (
          /* Results View */
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-2 border-b border-white/[0.08] pb-6">
              <div className="inline-flex items-center gap-1.5 text-xs tracking-[0.25em] uppercase text-[#D6B27C]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Your Personalized Alignment</span>
              </div>
              <h3 className="font-serif text-3xl font-light text-[#F8F9FA]">
                Jewels Written for Your Intent
              </h3>
              <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
                Curated for {answers.recipient.toLowerCase()} honoring {answers.representation.toLowerCase()} with a {answers.call.toLowerCase()} aesthetic in {answers.finish.toLowerCase()}.
              </p>
            </div>

            {/* Recommended Products List */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2">
              {recommendedProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3.5 bg-[#0B101E] border border-white/10 hover:border-[#D6B27C]/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      onClick={() => {
                        setIsQuizOpen(false);
                        openProductDetail(p);
                      }}
                      className="w-16 h-16 object-cover cursor-pointer hover:opacity-90"
                    />
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#D6B27C]">
                        {p.constellation} · {p.moonPhase}
                      </span>
                      <h4
                        onClick={() => {
                          setIsQuizOpen(false);
                          openProductDetail(p);
                        }}
                        className="font-serif text-base text-[#F8F9FA] cursor-pointer hover:text-[#D6B27C]"
                      >
                        {p.name}
                      </h4>
                      <p className="font-mono text-xs text-[#CBD5E1]">${p.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(p)}
                      className="px-3 py-2 bg-[#D6B27C] hover:bg-[#E5C79A] text-[#070B14] text-[11px] uppercase tracking-wider font-medium flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/[0.08]">
              <button
                onClick={resetQuiz}
                className="text-xs text-[#64748B] hover:text-[#94A3B8] tracking-wider uppercase"
              >
                Retake Quiz
              </button>

              <button
                onClick={() => setIsQuizOpen(false)}
                className="px-5 py-2.5 bg-[#F8F9FA] text-[#070B14] hover:bg-[#D6B27C] text-xs tracking-[0.16em] uppercase font-medium transition-colors"
              >
                Browse Full Catalog
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
