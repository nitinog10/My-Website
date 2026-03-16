import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Home } from 'lucide-react';

const DesignToggle = () => {
  const location = useLocation();
  const isRedesign = location.pathname === '/redesign';

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <Link to={isRedesign ? '/' : '/redesign'}>
        <motion.button
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-accent text-black font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isRedesign ? (
            <>
              <Home className="w-5 h-5" />
              Original
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Redesign
            </>
          )}
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default DesignToggle;
