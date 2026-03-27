import React from 'react';
import { Shield, ArrowLeft, Lock, Eye, FileText, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden"
    >
      <div className="bg-emerald-700 p-8 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-black tracking-tight">Privacy Policy</h2>
            <p className="text-emerald-100 text-sm font-bold">Last Updated: March 27, 2026</p>
          </div>
        </div>
        <Shield size={48} className="text-emerald-500/50" />
      </div>

      <div className="p-8 sm:p-12 space-y-12 text-slate-600 leading-relaxed">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <Globe size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-900">1. Introduction / परिचय</h3>
          </div>
          <p>
            Welcome to <strong>Gram Shakti</strong> ("भारत का अपना लोकल मार्केट"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website or use our application.
          </p>
          <p className="mt-2 text-sm italic">
            ग्राम शक्ति में आपका स्वागत है। हम आपकी गोपनीयता का सम्मान करते हैं और आपके व्यक्तिगत डेटा की सुरक्षा के लिए प्रतिबद्ध हैं।
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <FileText size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-900">2. Data We Collect / हम जो डेटा एकत्र करते हैं</h3>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data:</strong> Name, mobile number, and profile picture.</li>
            <li><strong>Location Data:</strong> Real-time GPS coordinates to show nearby services.</li>
            <li><strong>Professional Data:</strong> Skills, experience, and service categories for workers.</li>
            <li><strong>Usage Data:</strong> Information about how you use our app and services.</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
              <Eye size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-900">3. How We Use Your Data / हम आपके डेटा का उपयोग कैसे करते हैं</h3>
          </div>
          <p>
            We use your data to provide and improve our services, including:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Connecting local workers with customers.</li>
            <li>Displaying relevant local advertisements.</li>
            <li>Verifying worker profiles for safety.</li>
            <li>Improving app performance and user experience.</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <Lock size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-900">4. Data Security / डेटा सुरक्षा</h3>
          </div>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We use Firebase (a Google service) for secure data storage and authentication.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 rounded-lg text-red-600">
              <Shield size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-900">5. Contact Us / संपर्क करें</h3>
          </div>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          <div className="mt-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <p className="font-bold text-slate-900">Email: support@gramshakti.in</p>
            <p className="text-sm">Address: Jaipur, Rajasthan, India</p>
          </div>
        </section>
      </div>

      <div className="bg-slate-50 p-8 text-center border-t border-slate-100">
        <button 
          onClick={onBack}
          className="bg-emerald-700 text-white px-8 py-3 rounded-2xl font-black hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/20"
        >
          I UNDERSTAND / मैं समझ गया
        </button>
      </div>
    </motion.div>
  );
}
