import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, Calendar, X } from 'lucide-react';
import { JOURNAL_ARTICLES, JournalArticle } from '../data/journal';

export const JournalSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <section id="celune-journal" className="py-24 sm:py-36 relative bg-[#060912] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#D6B27C] font-light">
            <BookOpen className="w-3.5 h-3.5 text-[#D6B27C]" />
            <span>The Célune Gazette</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F8F9FA] tracking-wide text-balance">
            The Celestial Journal
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed">
            Essays on astrometric fine jewelry, lunar cycles, ocean movements, and the quiet poetry of human connections.
          </p>
        </div>

        {/* Featured Article Hero */}
        {JOURNAL_ARTICLES.length > 0 && (
          <div
            onClick={() => setSelectedArticle(JOURNAL_ARTICLES[0])}
            className="mb-16 border border-white/[0.08] hover:border-[#D6B27C]/40 bg-[#0B101E]/60 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer group transition-all"
          >
            <div className="lg:col-span-7 aspect-[16/9] w-full overflow-hidden bg-[#070B14]">
              <img
                src={JOURNAL_ARTICLES[0].image}
                alt={JOURNAL_ARTICLES[0].title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-light">
                <span className="uppercase text-[#D6B27C] tracking-wider">{JOURNAL_ARTICLES[0].category}</span>
                <span aria-hidden="true">·</span>
                <span>{JOURNAL_ARTICLES[0].readTime}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F9FA] font-light leading-snug group-hover:text-[#D6B27C] transition-colors">
                {JOURNAL_ARTICLES[0].title}
              </h3>

              <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed">
                {JOURNAL_ARTICLES[0].excerpt}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs uppercase tracking-wider text-[#D6B27C] font-medium">
                <span>Read Full Essay</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        )}

        {/* Remaining Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.slice(1).map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group cursor-pointer flex flex-col justify-between border border-white/[0.08] hover:border-[#D6B27C]/40 bg-[#0B101E]/40 p-5 space-y-4 transition-all"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#070B14]">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                  <span className="text-[#D6B27C] uppercase tracking-wider">{art.category}</span>
                  <span>{art.readTime}</span>
                </div>

                <h4 className="font-serif text-xl text-[#F8F9FA] font-light group-hover:text-[#D6B27C] transition-colors line-clamp-2">
                  {art.title}
                </h4>

                <p className="text-xs text-[#94A3B8] font-light line-clamp-2 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#CBD5E1]">
                <span className="text-[11px] text-[#64748B]">{art.date}</span>
                <span className="text-[11px] uppercase tracking-wider text-[#D6B27C] group-hover:underline">
                  Read
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-[#070B14] border border-white/15 p-6 sm:p-12 shadow-2xl max-h-[88vh] overflow-y-auto space-y-6">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 text-[#94A3B8] hover:text-[#F8F9FA] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3 border-b border-white/[0.08] pb-6">
              <span className="text-xs uppercase tracking-widest text-[#D6B27C]">
                {selectedArticle.category} · {selectedArticle.readTime}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F8F9FA] font-light leading-snug">
                {selectedArticle.title}
              </h2>
            </div>

            <div className="aspect-[16/9] w-full overflow-hidden bg-[#0A101E]">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {selectedArticle.quote && (
              <blockquote className="p-4 border-l-2 border-[#D6B27C] bg-[#0B101E] font-serif italic text-base sm:text-lg text-[#CBD5E1]">
                {selectedArticle.quote}
              </blockquote>
            )}

            <div className="space-y-4 text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed">
              {selectedArticle.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-[#64748B]">Published by Célune Haute Joaillerie</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 border border-white/20 hover:border-[#D6B27C] text-xs uppercase tracking-wider text-[#CBD5E1] hover:text-[#D6B27C]"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
