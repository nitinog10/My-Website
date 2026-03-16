import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const cards = [
  {
    id: '01',
    title: 'What I Work With',
    description: 'Capabilities, stack clusters, and the systems I ship with daily.',
    to: '/work-with',
    kicker: 'Capabilities',
  },
  {
    id: '02',
    title: 'Projects Lab',
    description: 'Case-study style project wall with richer storytelling and interaction.',
    to: '/projects',
    kicker: 'Selected Work',
  },
  {
    id: '03',
    title: 'Experience Timeline',
    description: 'Career trajectory represented as a cinematic, animated timeline.',
    to: '/experience',
    kicker: 'Journey',
  },
];

const PortfolioGateways = () => {
  return (
    <section className="min-h-screen py-28 md:py-40 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 md:mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-white/35">Explore</p>
          <h2
            className="text-[clamp(2.6rem,7vw,6rem)] uppercase tracking-tight leading-[0.88] mt-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            New Page
            <span className="text-accent"> Experiences</span>
          </h2>
          <p className="text-sm md:text-base text-white/55 max-w-2xl mt-6 leading-relaxed">
            The three key areas now live as focused pages with dedicated motion systems. Enter each view to see GSAP-driven load and scroll choreography.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={card.to}
                className="group h-full block rounded-3xl border border-white/10 bg-gradient-to-b from-white/8 to-transparent p-6 md:p-8 hover:border-accent/45 transition-colors duration-300"
              >
                <p className="text-xs tracking-[0.2em] uppercase text-white/35">{card.id}</p>
                <p className="text-xs tracking-[0.22em] uppercase text-accent mt-4">{card.kicker}</p>
                <h3
                  className="text-2xl md:text-3xl uppercase leading-[0.95] tracking-tight mt-3 group-hover:text-accent transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {card.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed mt-5">{card.description}</p>
                <div className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/45 group-hover:text-accent transition-colors duration-300">
                  Open Page
                  <span aria-hidden="true">↗</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGateways;
