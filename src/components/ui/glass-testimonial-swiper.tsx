"use client";
import React, { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';

export interface Testimonial {
  id: string | number;
  initials: string;
  name: string;
  role: string;
  quote: string;
  tags: { text: string; type: 'featured' | 'default' }[];
  stats: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; text: string; }[];
  avatarGradient: string;
}

export interface TestimonialStackProps {
  testimonials: Testimonial[];
  visibleBehind?: number;
}

export const TestimonialStack = ({ testimonials, visibleBehind = 2 }: TestimonialStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const totalCards = testimonials.length;

  const navigate = useCallback((newIndex: number) => {
    setActiveIndex((newIndex + totalCards) % totalCards);
  }, [totalCards]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    if (index !== activeIndex) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    setDragOffset(clientX - dragStartRef.current);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    if (Math.abs(dragOffset) > 60) {
      navigate(activeIndex + (dragOffset < 0 ? 1 : -1));
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, activeIndex, navigate]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove as EventListener);
      window.addEventListener('touchmove', handleDragMove as EventListener);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove as EventListener);
      window.removeEventListener('touchmove', handleDragMove as EventListener);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  if (!testimonials?.length) return null;

  return (
    <div>
      {/* Card stack */}
      <div style={{ position: 'relative', height: 380 }}>
        {testimonials.map((testimonial, index) => {
          const displayOrder = (index - activeIndex + totalCards) % totalCards;

          const style: CSSProperties = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transition: isDragging && displayOrder === 0 ? 'none' : 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease',
            cursor: displayOrder === 0 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            userSelect: 'none',
            borderRadius: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(43,122,181,0.18)',
            backdropFilter: 'blur(20px)',
            boxShadow: displayOrder === 0 ? '0 24px 60px rgba(0,0,0,0.4)' : 'none',
          };

          if (displayOrder === 0) {
            style.transform = `translateX(${dragOffset}px)`;
            style.opacity = 1;
            style.zIndex = totalCards;
          } else if (displayOrder <= visibleBehind) {
            const scale = 1 - 0.05 * displayOrder;
            const translateY = 14 * displayOrder;
            style.transform = `scale(${scale}) translateY(${translateY}px)`;
            style.opacity = 1 - 0.25 * displayOrder;
            style.zIndex = totalCards - displayOrder;
            style.pointerEvents = 'none';
          } else {
            style.transform = 'scale(0.85) translateY(40px)';
            style.opacity = 0;
            style.zIndex = 0;
            style.pointerEvents = 'none';
          }

          return (
            <div
              key={testimonial.id}
              style={style}
              onMouseDown={(e) => handleDragStart(e, index)}
              onTouchStart={(e) => handleDragStart(e, index)}
            >
              <div style={{ padding: '28px 32px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{
                    flexShrink: 0, width: 46, height: 46, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 700, fontSize: 16,
                    background: testimonial.avatarGradient,
                  }}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>{testimonial.name}</div>
                    <div style={{ color: '#7A9BB5', fontSize: 13, marginTop: 2 }}>
                      {/* 5 gold stars */}
                      {[0,1,2,3,4].map(i => (
                        <svg key={i} style={{ display: 'inline', width: 13, height: 13, marginRight: 1 }} viewBox="0 0 24 24" fill="#F5C518">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                      <span style={{ marginLeft: 6, verticalAlign: 'middle' }}>Google Review</span>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote style={{
                  color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 1.75,
                  marginBottom: 20, fontStyle: 'italic',
                }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, borderTop: '1px solid rgba(43,122,181,0.15)', paddingTop: 16 }}>
                  {testimonial.tags.map((tag, i) => (
                    <span key={i} style={{
                      fontSize: 11, padding: '3px 10px', borderRadius: 6, fontWeight: 600,
                      background: tag.type === 'featured' ? 'rgba(43,122,181,0.2)' : 'rgba(255,255,255,0.06)',
                      color: tag.type === 'featured' ? '#5BA8E0' : '#A0B8CC',
                      border: tag.type === 'featured' ? '1px solid rgba(43,122,181,0.3)' : '1px solid rgba(255,255,255,0.08)',
                    }}>
                      {tag.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 32 }}>
        {/* Prev */}
        <button
          onClick={() => navigate(activeIndex - 1)}
          style={{ background: 'rgba(43,122,181,0.15)', border: '1px solid rgba(43,122,181,0.3)', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#5BA8E0' }}
          aria-label="Previous review"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 6 }}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => navigate(index)}
              aria-label={`Go to review ${index + 1}`}
              style={{
                width: activeIndex === index ? 20 : 7,
                height: 7,
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                transition: 'width 0.3s ease, background 0.3s ease',
                background: activeIndex === index ? '#2B7AB5' : 'rgba(255,255,255,0.2)',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => navigate(activeIndex + 1)}
          style={{ background: 'rgba(43,122,181,0.15)', border: '1px solid rgba(43,122,181,0.3)', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#5BA8E0' }}
          aria-label="Next review"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      {/* Counter */}
      <div style={{ textAlign: 'center', marginTop: 12, color: '#4A6A7A', fontSize: 13 }}>
        {activeIndex + 1} / {totalCards}
      </div>
    </div>
  );
};
