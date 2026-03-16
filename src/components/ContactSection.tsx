import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { SiGithub, SiLinkedin, SiInstagram, SiX } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';

const socials = [
  {
    icon: SiLinkedin,
    label: 'LinkedIn',
    handle: 'nitin-kumar-mishra',
    href: 'https://www.linkedin.com/in/nitin-kumar-mishra-520615331',
    color: '#0A66C2'
  },
  {
    icon: SiGithub,
    label: 'GitHub',
    handle: '@nitinog10',
    href: 'https://github.com/nitinog10',
    color: '#ffffff'
  },
  {
    icon: MdEmail,
    label: 'Email',
    handle: 'nitiniszod10@gmail.com',
    href: 'mailto:nitiniszod10@gmail.com',
    color: '#EA4335'
  },
  {
    icon: SiInstagram,
    label: 'Instagram',
    handle: '@nitinn10_',
    href: 'https://instagram.com/nitinn10_',
    color: '#E1306C'
  },
  {
    icon: SiX,
    label: 'Twitter / X',
    handle: '@nitinog10',
    href: 'https://x.com/nitinog10',
    color: '#ffffff'
  },
];

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:nitiniszod10@gmail.com?subject=Message from ${formData.name}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email)}`;
    window.open(mailto);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <motion.section
      ref={ref}
      className="py-32 md:py-48 overflow-hidden"
      style={{ opacity }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-4 mb-16">
          <motion.div
            className="col-span-12 md:col-span-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs md:text-sm tracking-[0.2em] text-white/30 uppercase">007</span>
            <span className="block text-xs md:text-sm tracking-[0.3em] text-accent uppercase mt-4">CONTACT</span>
          </motion.div>
          <div className="col-span-12 md:col-span-10 md:col-start-3">
            <motion.h2
              className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-white uppercase tracking-tighter leading-[0.85]"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', overflow: 'visible' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25em', lineHeight: 1 }}>
                LET'S BUILD
              </span>
              <br />
              <span className="text-accent">THE FUTURE</span>
            </motion.h2>
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT — Contact form box */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div
              className="rounded-2xl p-6 md:p-8 h-full relative overflow-hidden"
              style={{
                background: 'rgba(17,17,20,0.9)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
              }}
            >
              {/* Top accent border */}
              <div className="absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-transparent via-accent to-transparent" />

              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Send a Message
              </h3>
              <p className="text-sm text-white/40 mb-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Have a project in mind? Let's talk.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-accent/50"
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-accent/50"
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none resize-none transition-all duration-300 focus:border-accent/50"
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-sm font-semibold text-black transition-all duration-300 hover:brightness-110 active:scale-95"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    background: 'rgba(0,255,200,1)'
                  }}
                >
                  {sent ? '✓ Message Sent!' : 'Send Message →'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* RIGHT — Social links */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            {socials.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl p-4 md:p-5 transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'rgba(17,17,20,0.9)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                  textDecoration: 'none'
                }}
                whileHover={{
                  border: `1px solid ${social.color}40`,
                  boxShadow: `0 8px 32px ${social.color}15`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ background: `${social.color}15`, border: `1px solid ${social.color}25` }}
                >
                  <social.icon
                    className="w-5 h-5 transition-all duration-300"
                    style={{ color: social.color }}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-white/30 uppercase tracking-wider block mb-0.5" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    {social.label}
                  </span>
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors duration-300 truncate block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    {social.handle}
                  </span>
                </div>

                {/* Arrow */}
                <svg className="w-4 h-4 text-white/20 group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.a>
            ))}

            {/* Resume download */}
            <motion.a
              href="/Nitin_Kumar_Mishra_AI_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 rounded-2xl p-4 transition-all duration-300"
              style={{
                background: 'rgba(0,255,200,0.06)',
                border: '1px solid rgba(0,255,200,0.2)'
              }}
              whileHover={{ background: 'rgba(0,255,200,0.12)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + socials.length * 0.08 }}
            >
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm font-semibold text-accent" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Download Resume
              </span>
            </motion.a>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="text-[10px] text-white/20 uppercase tracking-[0.3em]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            © 2026 Nitin Mishra
          </span>
          <span className="text-[10px] text-white/20 uppercase tracking-[0.3em]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Bhopal, India
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;

