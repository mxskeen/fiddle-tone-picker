import React, { useState, useRef, useEffect } from 'react';


const getToneFromPosition = (position) => {
  let yTone = 'Neutral';
  if (position.y < 33) yTone = 'Professional';
  else if (position.y > 66) yTone = 'Casual';

  let xTone = 'Balanced';
  if (position.x < 33) xTone = 'Concise';
  else if (position.x > 66) xTone = 'Expanded';
  
  return { x: xTone, y: yTone };
};

function ToneMatrix({ onToneChange, isLoading }) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 50, y: 50 }); 
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    let y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    setPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      const finalTone = getToneFromPosition(position);
      console.log('Final Tone Selected:', finalTone);
      onToneChange(finalTone); 
      setIsDragging(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]); 

  return (
    <div 
      className="matrix-container" 
      ref={containerRef}
      style={{ cursor: isDragging ? 'grabbing' : 'default', opacity: isLoading ? 0.5 : 1 }}
    >
      <span className="matrix-label top">Professional</span>
      <span className="matrix-label bottom">Casual</span>
      <span className="matrix-label left">Concise</span>
      <span className="matrix-label right">Expanded</span>

      <div className="grid-line v-line-1"></div>
      <div className="grid-line v-line-2"></div>
      <div className="grid-line h-line-1"></div>
      <div className="grid-line h-line-2"></div>

      <div
        className="matrix-puck"
        onMouseDown={() => !isLoading && setIsDragging(true)}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          cursor: isLoading ? 'not-allowed' : 'grab',
        }}
      />
    </div>
  );
}

export default ToneMatrix;