const RoomTabs = ({ rooms, activeRoom, setActiveRoom, completedSessions }) => {
  
  return (
    <div 
      className="room-tabs" 
      role="tablist" 
      aria-label="Rooms in the friend's house"
    >
      {rooms.map((room) => {
        const isLocked = completedSessions < room.sessionsRequired;

        return (
        <button 
          key={room.id} 
          className={activeRoom === room.id ? "selected" : ""}
          type="button" 
          role="tab" 
          aria-selected={activeRoom === room.id}
          disabled={isLocked}
          onClick={() => setActiveRoom(room.id)}
        >
          <span aria-hidden="true">
            {room.icon}
          </span>
          
          <span className="room-tab-copy">
            <b>{room.name}</b>
            <small>{isLocked ? `${room.sessionsRequired} sessions` : "Unlocked"}</small>
          </span>

          </button>
        );
      })}
    </div>
  )
}

export default RoomTabs;
