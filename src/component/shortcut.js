import { useEffect, useRef } from 'react';

export default function LongSwipeToAssess() {
  const startX = useRef(0);

    useEffect(() => {
        const handleTouchStart = (e) => {
              startX.current = e.touches[0].clientX;
                  };

                      const handleTouchEnd = (e) => {
                            const endX = e.changedTouches[0].clientX;
                                  const dx = endX - startX.current;

                                        if (dx > 150) {
                                                window.location.href = '#/assess'; // Redirect on long swipe right
                                                      }
                                                          };

                                                              window.addEventListener('touchstart', handleTouchStart);
                                                                  window.addEventListener('touchend', handleTouchEnd);

                                                                      return () => {
                                                                            window.removeEventListener('touchstart', handleTouchStart);
                                                                                  window.removeEventListener('touchend', handleTouchEnd);
                                                                                      };
                                                                                        }, []);

                                                                                          return null;
                                                                                          }