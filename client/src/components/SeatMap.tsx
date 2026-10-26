import React, { useState } from 'react';

export default function SeatMap() {
  // demo values
  const [patronId] = useState("patron-uuid-abc-123");
  const [performanceId] = useState("show-uuid-xyz-789");
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const [uiStatus, setUiStatus] = useState<'idle' | 'holding' | 'error' | 'success'>('idle');

  return(
      <div style={{ display: 'flex', gap: '8px', margin: '20px 0' }}>
        {/* Simple Seat Map Visual Buttons */}
        {['orch:A:1', 'orch:A:2', 'orch:A:3'].map((seat) => (
          <button 
            key={seat}
            disabled={uiStatus === 'holding' && selectedSeat !== seat}
            onClick={() => handleSeatClick(seat)}
            style={{
              padding: '12px',
              backgroundColor: selectedSeat === seat 
                ? (uiStatus === 'error' ? 'red' : 'green') 
                : '#ccc',
              color: selectedSeat === seat ? '#fff' : '#000',
              cursor: 'pointer'
            }}
          >
            {seat}
          </button>
        ))}
      </div>
  );
}
