import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface HeartProps {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    // Generate random hearts
    const generatedHearts: HeartProps[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 20 + Math.random() * 30,
    }));
    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 animate-float-up opacity-30"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <Heart
            className="text-valentine-primary fill-valentine-primary"
            style={{ width: heart.size, height: heart.size }}
          />
        </div>
      ))}
    </div>
  );
}
