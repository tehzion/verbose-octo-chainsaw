import { Badge } from '@/types/gamification';
import { X, Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface BadgeUnlockNotificationProps {
  badge: Badge;
  onClose: () => void;
}

export const BadgeUnlockNotification = ({ badge, onClose }: BadgeUnlockNotificationProps) => {
  const { playSuccess } = useSoundEffects();

  // Auto-dismiss after 4 seconds (increased for better viewing)
  useEffect(() => {
    playSuccess();
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose, playSuccess]);

  const getTierColors = (tier: Badge['tier']) => {
    switch (tier) {
      case 'gold':
        return {
          gradient: 'from-yellow-400 via-amber-500 to-yellow-600',
          glow: 'shadow-yellow-500/50',
          ring: 'ring-yellow-400/30',
          text: 'text-yellow-600',
          bg: 'bg-yellow-500/10'
        };
      case 'silver':
        return {
          gradient: 'from-gray-300 via-slate-400 to-gray-500',
          glow: 'shadow-gray-400/50',
          ring: 'ring-gray-400/30',
          text: 'text-gray-600',
          bg: 'bg-gray-400/10'
        };
      case 'bronze':
        return {
          gradient: 'from-orange-400 via-amber-700 to-orange-800',
          glow: 'shadow-orange-600/50',
          ring: 'ring-orange-500/30',
          text: 'text-orange-700',
          bg: 'bg-orange-500/10'
        };
    }
  };

  const colors = getTierColors(badge.tier);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in text-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 backdrop-blur-md" />

      {/* Pulsing radial gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent animate-pulse-slow" />

      {/* Enhanced Confetti with more particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-confetti-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              backgroundColor: ['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1', '#C0C0C0'][Math.floor(Math.random() * 6)],
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>

      {/* Sparkle effects around the card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-yellow-300 animate-ping"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              width: `${Math.random() * 20 + 15}px`,
              height: `${Math.random() * 20 + 15}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
              opacity: Math.random() * 0.6 + 0.2
            }}
          />
        ))}
      </div>

      <div className={cn(
        "relative bg-gradient-to-br from-card/95 to-card rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center",
        "animate-scale-in-bounce border-2",
        colors.ring,
        "backdrop-blur-xl"
      )}>
        {/* Shine effect overlay */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute -inset-full animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground hover:bg-foreground/10 rounded-full p-1 transition-all"
          aria-label="Close notification"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration header with animated stars */}
        <div className="flex items-center justify-center gap-3 text-primary mb-6">
          <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 animate-spin-slow" />
          <div className="relative">
            <span className="text-lg font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🎉 Badge Unlocked! 🎉
            </span>
          </div>
          <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 animate-spin-slow-reverse" />
        </div>

        {/* Badge icon with enhanced glow */}
        <div className="relative mx-auto w-32 h-32 mb-6">
          {/* Outer glow rings */}
          <div className={cn(
            "absolute -inset-4 rounded-full bg-gradient-to-br opacity-30 blur-2xl animate-pulse",
            colors.gradient
          )} />
          <div className={cn(
            "absolute -inset-2 rounded-full bg-gradient-to-br opacity-40 blur-xl animate-pulse-slow",
            colors.gradient
          )} />

          {/* Badge container */}
          <div className={cn(
            "relative w-full h-full rounded-full flex items-center justify-center text-5xl",
            "bg-gradient-to-br shadow-2xl ring-4 animate-badge-unlock-bounce",
            colors.gradient,
            colors.glow,
            colors.ring
          )}>
            <span className="drop-shadow-lg">{badge.icon}</span>

            {/* Rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-white/30 border-t-white/60 animate-spin-slow" />
          </div>
        </div>

        {/* Badge info with enhanced typography */}
        <div className={cn("inline-block px-4 py-1 rounded-full mb-3 text-xs font-bold uppercase tracking-widest", colors.bg, colors.text)}>
          {badge.tier} Tier
        </div>

        <h3 className="text-2xl font-black text-foreground mb-3 font-display tracking-tight">
          {badge.name}
        </h3>
        <p className="text-sm text-muted-foreground/80 mb-6 leading-relaxed max-w-xs mx-auto">
          {badge.description}
        </p>

        {/* XP reward with enhanced styling */}
        <div className="relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg shadow-emerald-500/30">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
          <span className="text-white font-black text-lg drop-shadow">+{badge.xpReward} XP</span>
          <Sparkles className="w-5 h-5 text-white animate-pulse" />

          {/* Shimmer effect */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};
