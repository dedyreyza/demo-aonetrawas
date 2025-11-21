'use client';

import { useCustomCursor } from '@/hooks/useCustomCursor';

export default function CustomCursor() {
  useCustomCursor();

  return (
    <div className="custom-cursor" data-cursor-init="false">
      <div
        className="cursor-bubble"
        data-cursor-bubble="not-active"
        style={{
          backdropFilter: 'blur(1em)',
          WebkitBackdropFilter: 'blur(1em)',
        }}
      >
        <div className="cursor-before"></div>
        <span className="cursor-text">View</span>
      </div>
    </div>
  );
}
