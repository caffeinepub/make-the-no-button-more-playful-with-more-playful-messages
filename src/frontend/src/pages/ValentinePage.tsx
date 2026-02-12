import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import FloatingHearts from '@/components/FloatingHearts';
import SuccessMessage from '@/components/SuccessMessage';
import { useSubmitResponse, useCheckResponse } from '@/hooks/useQueries';
import { Heart, Copy, Check } from 'lucide-react';
import { getShareUrl } from '@/lib/shareSlug';

// Name constant as requested
const name = "Sanya baby ay";

const noButtonTexts = [
  "Let me think 🤔",
  "You're too cute 😳",
  "Ask me again 🙈",
  "I'm shy 😝",
  "Maybe tomorrow? 🌙",
  "I need more time ⏰",
  "Catch me if you can! 🏃‍♀️",
  "Not so fast! 🚀",
  "Hmm... nope! 😏",
  "Try the other button 👉",
  "I'm playing hard to get 💅",
  "Oops, wrong button! 🙊",
  "Still thinking... 🧠",
  "Ask me nicely 🥺",
  "I'm too nervous! 😰",
  "You almost had me! 😅",
  "So close, yet so far 🎯",
  "I'm allergic to commitment 🤧",
  "My heart says yes, but... 💔",
  "Can I phone a friend? 📞",
  "Let me check my schedule 📅",
  "I need to consult my cat 🐱",
  "The stars aren't aligned ✨",
  "Mercury is in retrograde 🪐",
  "I'm washing my hair that day 💇‍♀️",
  "I have plans with Netflix 📺",
  "My horoscope says no 🔮",
  "I'm too fabulous for this 💃",
  "Nah, I'm good 😎",
  "Error 404: Yes not found 🤖",
  "System.out.println('No'); 💻",
  "Nope.exe has stopped working 🖥️",
  "Loading... still loading... ⏳",
  "Buffering... 99% 📶",
  "Connection timeout ⚠️",
  "Access denied! 🚫",
  "Permission not granted 🔒",
  "You shall not pass! 🧙‍♂️",
  "Not today, Satan! 😈",
  "I choose violence 🗡️",
  "Catch these hands! 👊",
  "I'm too cool for school 😎",
  "My mom said no 👩",
  "I'm grounded 🏠",
  "I have trust issues 💔",
  "It's not you, it's me 🤷‍♀️",
  "We need to talk... 😬",
  "Let's just be friends 🤝",
  "I'm focusing on myself 🧘‍♀️",
  "I'm on a self-love journey 💖",
  "I'm married to my work 💼",
  "Pizza is my Valentine 🍕",
  "Tacos > Romance 🌮",
  "Coffee is my soulmate ☕",
  "Books are my true love 📚",
  "My bed is my Valentine 🛏️",
  "Sleep > Everything 😴",
  "Napping is my passion 💤",
  "I'm in a relationship with food 🍔",
  "Snacks before romance 🍿",
  "Dessert first! 🍰"
];

type AnimationType = 'wiggle' | 'squish' | 'spin' | 'juke' | 'shake' | 'flip';

export default function ValentinePage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [noButtonIndex, setNoButtonIndex] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonMoving, setIsNoButtonMoving] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<AnimationType>('wiggle');
  const [interactionCount, setInteractionCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  
  const { mutate: submitResponse, isPending } = useSubmitResponse();
  const { data: hasResponded } = useCheckResponse();

  // Check if user already responded
  useEffect(() => {
    if (hasResponded) {
      setShowSuccess(true);
    }
  }, [hasResponded]);

  const handleYesClick = () => {
    setShowSuccess(true);
    submitResponse({ name, response: "yes" });
  };

  const getRandomAnimation = (): AnimationType => {
    const animations: AnimationType[] = ['wiggle', 'squish', 'spin', 'juke', 'shake', 'flip'];
    return animations[Math.floor(Math.random() * animations.length)];
  };

  const handleNoInteraction = () => {
    // Change text to next cute excuse
    setNoButtonIndex((prev) => (prev + 1) % noButtonTexts.length);
    setInteractionCount((prev) => prev + 1);
    
    // Pick a random animation
    setCurrentAnimation(getRandomAnimation());
    
    // Calculate safe position within viewport
    const button = noButtonRef.current;
    if (!button) return;
    
    const buttonRect = button.getBoundingClientRect();
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    
    // Use visualViewport if available for better mobile support
    const viewportWidth = window.visualViewport?.width || window.innerWidth;
    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    
    // Add safe margins
    const margin = 20;
    const maxX = Math.max(margin, viewportWidth - buttonWidth - margin);
    const maxY = Math.max(margin, viewportHeight - buttonHeight - margin);
    
    // Generate random position within safe bounds
    const newX = margin + Math.random() * (maxX - margin);
    const newY = margin + Math.random() * (maxY - margin);
    
    setNoButtonPosition({ x: newX, y: newY });
    setIsNoButtonMoving(true);
    
    setTimeout(() => setIsNoButtonMoving(false), 600);
  };

  const handleCopyLink = async () => {
    const shareUrl = getShareUrl();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (showSuccess) {
    return <SuccessMessage name={name} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-valentine-light via-valentine-medium to-valentine-dark flex items-center justify-center p-4">
      <FloatingHearts />
      
      <Card className="relative z-10 max-w-2xl w-full p-8 md:p-12 bg-white/95 backdrop-blur-sm shadow-2xl border-valentine-accent/20 animate-fade-in-bounce">
        <div className="text-center space-y-6">
          {/* Heart Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <Heart className="w-20 h-20 text-valentine-primary fill-valentine-primary animate-heartbeat" />
              <div className="absolute inset-0 animate-ping-slow">
                <Heart className="w-20 h-20 text-valentine-primary/30 fill-valentine-primary/30" />
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-handwritten text-valentine-dark leading-tight">
            Will you be my Valentine? 💖
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-valentine-medium font-rounded">
            I promise unlimited love, hugs & chocolates 🍫
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 relative min-h-[80px]">
            {/* Yes Button */}
            <Button
              onClick={handleYesClick}
              disabled={isPending}
              size="lg"
              className="text-xl px-12 py-6 bg-valentine-primary hover:bg-valentine-primary-dark text-white font-rounded shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {isPending ? "Sending..." : "Yes 💕"}
            </Button>

            {/* No Button - moves around with playful animations */}
            <Button
              ref={noButtonRef}
              onMouseEnter={handleNoInteraction}
              onClick={handleNoInteraction}
              onPointerDown={handleNoInteraction}
              size="lg"
              variant="outline"
              className={`text-xl px-12 py-6 border-2 border-valentine-accent text-valentine-accent hover:bg-valentine-accent/10 font-rounded shadow-lg transition-all duration-500 ${
                isNoButtonMoving ? `fixed animate-${currentAnimation}` : 'relative'
              }`}
              style={
                isNoButtonMoving
                  ? {
                      left: `${noButtonPosition.x}px`,
                      top: `${noButtonPosition.y}px`,
                      zIndex: 50,
                    }
                  : {}
              }
            >
              {noButtonTexts[noButtonIndex]}
            </Button>
          </div>

          {/* Cute hint with dynamic message */}
          <p className="text-sm text-valentine-medium/70 italic pt-4 font-rounded">
            {interactionCount === 0 && "Psst... the \"No\" button is a bit shy 😊"}
            {interactionCount > 0 && interactionCount < 5 && "It's getting away! 🏃‍♀️"}
            {interactionCount >= 5 && interactionCount < 10 && "You're persistent, I like that! 😏"}
            {interactionCount >= 10 && interactionCount < 20 && "Still trying? How romantic! 💕"}
            {interactionCount >= 20 && "Okay, you've earned it... maybe try \"Yes\"? 😉"}
          </p>

          {/* Share Link Section */}
          <div className="pt-6 border-t border-valentine-accent/20 mt-8">
            <p className="text-sm text-valentine-medium/80 font-rounded mb-3">
              Share this with someone special:
            </p>
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
              <div className="bg-valentine-light/50 px-4 py-2 rounded-lg border border-valentine-accent/20 text-sm text-valentine-dark font-mono break-all max-w-full overflow-hidden text-ellipsis">
                {getShareUrl()}
              </div>
              <Button
                onClick={handleCopyLink}
                variant="outline"
                size="sm"
                className="border-valentine-accent text-valentine-accent hover:bg-valentine-accent/10 font-rounded whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Signature */}
          <div className="pt-6 mt-6 border-t border-valentine-accent/10">
            <p className="text-lg font-handwritten text-valentine-dark/80">
              {name}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
