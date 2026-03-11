"use client";
import React, { useState } from 'react';

export const ContactMicro3D: React.FC = () => {
  return (
    <section className="py-32 px-4 bg-bg relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-text-primary relative z-10">Get In Touch</h2>
      
      <div className="w-full max-w-lg bg-surface-1 border border-white/5 rounded-2xl p-8 shadow-xl relative z-20 preserve-3d hover:-translate-y-1 hover:shadow-2xl transition-all duration-500">
        <form className="space-y-6 flex flex-col">
          <InputGroup label="Name" type="text" placeholder="John Doe" />
          <InputGroup label="Email" type="email" placeholder="john@example.com" />
          <div className="space-y-2">
            <label className="text-sm text-text-secondary font-medium block">Message</label>
            <textarea 
              rows={4}
              className="w-full bg-bg border border-white/10 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-300 focus:-translate-y-1 focus:shadow-[0_10px_20px_rgba(0,0,0,0.5)] resize-none"
              placeholder="How can we collaborate?"
            />
          </div>
          
          <button 
            type="button" 
            className="mt-4 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:brightness-110 focus:ring-2 focus:ring-white focus:outline-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

const InputGroup: React.FC<{ label: string, type: string, placeholder: string }> = ({ label, type, placeholder }) => {
  return (
    <div className="space-y-2 group">
      <label className="text-sm text-text-secondary font-medium block transition-colors group-focus-within:text-accent">
        {label}
      </label>
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full bg-bg border border-white/10 rounded-lg p-3 text-text-primary focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-300 focus:-translate-y-1 focus:shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
      />
    </div>
  );
};

export const ExtrasCards: React.FC = () => {
  // Resume & Blog preview lightweight depth shift
  return (
    <section className="py-24 px-4 bg-surface-1 perspective-container">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        
        {/* Resume Card */}
        <div className="h-64 bg-bg border border-white/10 rounded-xl p-8 flex flex-col justify-center items-center group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:rotate-y-6 hover:rotate-x-3 hover:scale-[1.02] preserve-3d">
          <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 delay-75">📄</span>
          <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors">Download Resume</h3>
          <p className="text-muted mt-2 text-sm">PDF, 1.2MB</p>
        </div>

        {/* Blog Entry Card */}
        <div className="h-64 bg-bg border border-white/10 rounded-xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-rotate-y-3 hover:-rotate-x-3 hover:scale-[1.02] preserve-3d relative">
          <div className="absolute inset-0 w-full h-full bg-[url('/design/layers/hero-z1-atmosphere.webp')] bg-cover opacity-30 group-hover:opacity-50 transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:-translate-y-2 pointer-events-none" />
          <div className="relative z-10 p-8 h-full flex flex-col justify-end bg-gradient-to-t from-bg via-bg/80 to-transparent">
            <span className="text-accent text-xs font-mono mb-2 trackig-wider">TUTORIAL</span>
            <h3 className="text-xl font-bold text-text-primary">Mastering the 3D Web</h3>
            <p className="text-muted mt-1 text-sm line-clamp-2">Exploring purely CSS and DOM driven animations for performance-first designs.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
