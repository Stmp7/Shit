import React from 'react';
import './CompletionAnimation.css';

interface CompletionAnimationProps {
  isVisible: boolean;
}

const CompletionAnimation: React.FC<CompletionAnimationProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="completion-animation">
      <div className="completion-badge">
        <div className="checkmark">✓</div>
        <div className="sparkles">
          <div className="sparkle">♪</div>
          <div className="sparkle">♫</div>
          <div className="sparkle">♬</div>
        </div>
      </div>
    </div>
  );
};

export default CompletionAnimation; 