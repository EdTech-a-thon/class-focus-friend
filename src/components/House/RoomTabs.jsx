const RoomTabs = ({ rooms, activeRoom, setActiveRoom }) => {
  
  return (
    <div 
      className="room-tabs" 
      role="tablist" 
      aria-label="Rooms in the friend&apos;s house"
    >
      {rooms.map((room) => (
        <button 
          key={room.id} 
          className={activeRoom === room.id ? "selected" : ""} 
          type="button" 
          role="tab" 
          aria-selected={activeRoom === room.id} 
          onClick={() => setActiveRoom(room.id)}
        >
          <span aria-hidden="true">
            {room.icon}
          </span>
          
          {room.name}

          </button>
        ))}
    </div>
  )
}

export default RoomTabs;