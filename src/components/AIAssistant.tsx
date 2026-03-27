import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Send, X, Phone, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { AdRequest } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestForm, setRequestForm] = useState({ name: '', mobile: '', message: '' });

  const handleAdRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const adRequest: AdRequest = {
        name: requestForm.name,
        mobile: requestForm.mobile,
        message: requestForm.message,
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, 'ad_requests'), adRequest);
      setMessages(prev => [...prev, { role: 'ai', text: 'Your request has been sent to the admin. We will contact you soon! / आपका अनुरोध एडमिन को भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे!' }]);
      setShowRequestForm(false);
      setRequestForm({ name: '', mobile: '', message: '' });
    } catch (error) {
      console.error('Error sending ad request:', error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Failed to send request. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: userMsg }] }],
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are the Gram Shakti Assistant. Help users find local services, explain how the app works, and provide information about various trades like plumbing, electrical work, or farming services in rural India. The app supports both Hindi and English (Bilingual). Use Google Search to provide up-to-date information if needed. If the user asks about posting ads or advertising, explain the process (Post Ad button in header) and offer to take their contact details to send to the admin."
        }
      });

      const aiText = response.text || 'Sorry, I could not process that.';
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);

      if (aiText.toLowerCase().includes('ad') || aiText.includes('विज्ञापन') || aiText.includes('contact details')) {
        setShowRequestForm(true);
      }
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: 'I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all z-50 flex items-center justify-center"
      >
        <Sparkles size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] max-w-[90vw] h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-slate-100 overflow-hidden"
          >
            <div className="bg-emerald-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Sparkles size={20} />
                <span className="font-bold">Gram Shakti AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-emerald-500 p-1 rounded">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-slate-500 mt-10">
                  <p>How can I help you today?</p>
                  <p className="text-xs mt-2">Ask about local services or how to use the app.</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {showRequestForm && (
                <motion.form 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onSubmit={handleAdRequestSubmit}
                  className="bg-emerald-50 p-4 rounded-2xl space-y-3 border border-emerald-100"
                >
                  <p className="text-xs font-bold text-emerald-800 uppercase">Send Request to Admin / एडमिन को अनुरोध भेजें</p>
                  <div className="relative">
                    <User className="absolute left-2 top-1/2 -translate-y-1/2 text-emerald-400" size={14} />
                    <input 
                      required
                      type="text"
                      placeholder="Your Name"
                      value={requestForm.name}
                      onChange={e => setRequestForm({...requestForm, name: e.target.value})}
                      className="w-full pl-8 pr-2 py-2 bg-white border border-emerald-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-2 top-1/2 -translate-y-1/2 text-emerald-400" size={14} />
                    <input 
                      required
                      type="tel"
                      placeholder="Mobile Number"
                      value={requestForm.mobile}
                      onChange={e => setRequestForm({...requestForm, mobile: e.target.value})}
                      className="w-full pl-8 pr-2 py-2 bg-white border border-emerald-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <textarea 
                    required
                    placeholder="Your Message"
                    value={requestForm.message}
                    onChange={e => setRequestForm({...requestForm, message: e.target.value})}
                    className="w-full p-2 bg-white border border-emerald-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500 h-16"
                  />
                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => setShowRequestForm(false)}
                      className="flex-1 py-2 text-xs font-bold text-slate-500 hover:bg-white rounded-lg transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-2 text-xs font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
                    >
                      {isLoading ? 'Sending...' : 'Send Request'}
                    </button>
                  </div>
                </motion.form>
              )}
              {isLoading && !showRequestForm && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 disabled:bg-slate-300 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
