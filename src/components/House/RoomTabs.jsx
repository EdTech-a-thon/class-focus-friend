const RoomTabs = ({ rooms, activeRoom, setActiveRoom, unlockedRoomIds, unlockAll }) => {
  
  return (
    <div 
      className="room-tabs" 
      role="tablist" 
      aria-label="Rooms in the otter's house"
    >
      {rooms.map((room) => {
        const isLocked = !unlockedRoomIds.includes(room.id) && !unlockAll;

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
              {isLocked ? "Buy everything in the previous room" : "Available"}
            </small>
          </span>

          </button>
        );
      })}
    </div>
  )
}

export default RoomTabs;
