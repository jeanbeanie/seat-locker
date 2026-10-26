import React, { useState } from 'react';

export default function SeatMap() {
  // demo values
  const [patronId] = useState("patron-uuid-abc-123");
  const [performanceId] = useState("show-uuid-xyz-789");
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [uiStatus, setUiStatus] = useState<'idle' | 'holding' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  //const { formatTime } = useInventoryTimer({ expiresAt, onExpire: handleLockExpired });
  const formatTime = () => "PLACEHOLDER TIME LEFT";

  const handleSeatClick = async (seatId: string) => {
    //seat clicked they already hold, do nothing
    if (selectedSeat === seatId && uiStatus === "holding") return;
    
    setErrorMessage("");
    const prevSeat = selectedSeat;

    try {
      // if user is already holding a diff seat, release it
      if(prevSeat && uiStatus === "holding"){
        // POST request to unlock seat
      }

      // POST request to lock seat
      // const data = await response.json();
      // if response isnt ok set error, remove seat and expire
      // lock success: set expired and uiStatus
      setUiStatus('holding');
      setSelectedSeat(seatId);
      // setExpiresAt(data.expiresAt)
    } catch (err) {
      setUiStatus('error');
      setErrorMessage("Network disruption. Please try clicking again!")
    }
  }

  /* Final transaction workflow */
  const handleCheckoutSubmit = async () => {
    if(!selectedSeat) return;

    try {
      // try POST request for checkout
      // const data = await response.json();
      // if response not ok null expire, set ui status and error and return
      // success: set ui status to success and expire to null
      setUiStatus('success');
      setExpiresAt(null);
    } catch (err) {
      setErrorMessage("Checkout failed. Try re-submitting.")
    }
  }

  const resetDemo = () => {
    setSelectedSeat(null);
    setUiStatus('idle');
    setExpiresAt(null);
    setErrorMessage("");
  }

  return(
    <div style={{ padding: '24px'}}>
      <div style={{ display: 'flex', gap: '8px', margin: '20px 0' }}>
        {/* Simple Seat Map Visual Buttons */}
        {['orch:A:1', 'orch:A:2', 'orch:A:3'].map((seat) => (
          <button 
            key={seat}
            disabled={uiStatus === 'success'}
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
      
      {/* Real-time Status and Countdowns */}
      {uiStatus === 'holding' && (
        <div style={{ background: '#f0f7f4', padding: '16px', borderRadius: '4px' }}>
          <p><strong>Seat Secured Temporarily!</strong></p>
          <p>Time remaining to finalize order: <span style={{ color: 'red', fontWeight: 'bold' }}>{formatTime()}</span></p>
          <button onClick={handleCheckoutSubmit} style={{ padding: '8px 16px', backgroundColor: '#005a9c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Complete Secure Purchase
          </button>
        </div>
      )}

      {errorMessage && (
        <div style={{ color: 'red', marginTop: '12px', background: '#ffebeb', padding: '10px', borderRadius: '4px' }}>
          ⚠️ {errorMessage}
        </div>
      )}

      {uiStatus === 'success' && (
        <div style={{ color: 'green', fontWeight: 'bold', marginTop: '12px' }}>
          🎉 Order Confirmed! See you at the show!
          <button onClick={resetDemo} style={{ display: 'block', margin: '1rem auto', padding: '8px 16px'}}>
            Reset Demo
          </button>
        </div>
      )}
  </div>
  );
}
