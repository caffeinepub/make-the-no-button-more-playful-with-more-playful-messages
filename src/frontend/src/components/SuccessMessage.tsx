import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Sparkles } from 'lucide-react';

interface SuccessMessageProps {
  name: string;
}

export default function SuccessMessage({ name }: SuccessMessageProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-valentine-light via-valentine-medium to-valentine-dark flex items-center justify-center p-4">
      {/* Confetti Hearts */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Heart
                className="text-valentine-primary fill-valentine-primary"
                style={{
                  width: 15 + Math.random() * 25,
                  height: 15 + Math.random() * 25,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      <Card className="relative z-10 max-w-3xl w-full p-8 md:p-16 bg-white/95 backdrop-blur-sm shadow-2xl border-valentine-accent/20 animate-scale-in">
        <div className="text-center space-y-8">
          {/* Celebration Icons */}
          <div className="flex justify-center gap-4">
            <Sparkles className="w-12 h-12 text-valentine-accent animate-spin-slow" />
            <Heart className="w-16 h-16 text-valentine-primary fill-valentine-primary animate-heartbeat" />
            <Sparkles className="w-12 h-12 text-valentine-accent animate-spin-slow" />
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-handwritten text-valentine-dark leading-tight animate-bounce-in">
              YAYYY!! 🎉
            </h1>
            <p className="text-2xl md:text-4xl text-valentine-medium font-rounded leading-relaxed">
              You just made me the happiest person 💘🥰
            </p>
            <p className="text-xl md:text-2xl text-valentine-accent font-rounded pt-4">
              {name}, you're amazing! ✨
            </p>
          </div>

          {/* Date Reminder */}
          <div className="pt-8 border-t-2 border-valentine-accent/20">
            <p className="text-2xl md:text-3xl text-valentine-primary font-handwritten">
              See you on our Valentine date ❤️
            </p>
          </div>

          {/* Decorative Hearts */}
          <div className="flex justify-center gap-2 pt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                className="w-6 h-6 text-valentine-primary fill-valentine-primary animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
