import { useEffect, useRef, useState } from 'react';

// simple hook for tracking user behavior
const useBotDetection = () => {
  const behaviorData = useRef({
    startTime: Date.now(),
    mouseMovements: 0,
    scrolled: false,
    keystrokes: 0
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mouseMoveCount = 0;
    let hasScrolled = false;
    let keystrokeCount = 0;

    // mouse movement track karna
    const handleMouseMove = () => {
      mouseMoveCount++;
      behaviorData.current.mouseMovements = mouseMoveCount;
    };

    // scroll detect karna
    const handleScroll = () => {
      if (!hasScrolled) {
        hasScrolled = true;
        behaviorData.current.scrolled = true;
      }
    };

    // keyboard events
    const handleKeyPress = () => {
      keystrokeCount++;
      behaviorData.current.keystrokes = keystrokeCount;
    };

    // throttle kar rahe hain performance ke liye
    let mouseMoveTimer;
    const throttledMouseMove = () => {
      if (!mouseMoveTimer) {
        mouseMoveTimer = setTimeout(() => {
          handleMouseMove();
          mouseMoveTimer = null;
        }, 100);
      }
    };

    window.addEventListener('mousemove', throttledMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyPress);

    // minimum 1 sec wait karo before marking ready
    const readyTimer = setTimeout(() => setIsReady(true), 1000);

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyPress);
      clearTimeout(readyTimer);
      if (mouseMoveTimer) clearTimeout(mouseMoveTimer);
    };
  }, []);

  // behavior metadata generate karna
  const getBehaviorMeta = () => {
    const timeToSubmit = Date.now() - behaviorData.current.startTime;
    
    return {
      timeToSubmit,
      mouseMovements: behaviorData.current.mouseMovements,
      scrolled: behaviorData.current.scrolled,
      keystrokes: behaviorData.current.keystrokes
    };
  };

  return { getBehaviorMeta, isReady };
};

export default useBotDetection;
