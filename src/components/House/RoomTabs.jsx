const RoomTabs = ({ rooms, activeRoom, setActiveRoom, completedSessions, unlockAll }) => {
  
  return (
    <div 
      className="room-tabs" 
      role="tablist" 
      aria-label="Rooms in the otter's house"
    >
      {rooms.map((room) => {
        const notYetEarned = completedSessions < room.sessionsRequired;
        const isLocked = notYetEarned && !unlockAll;

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
            <small>
              {notYetEarned ? `${room.sessionsRequired} sessions` : "Unlocked"}
            </small>
          </span>

          </button>
        );
      })}
    </div>
  )
}

export default RoomTabs;
