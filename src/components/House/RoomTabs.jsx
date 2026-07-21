const RoomTabs = ({ rooms, activeRoom, setActiveRoom, roomsOwned, points, buyRoom }) => {
  
  return (
    <div 
      className="room-tabs" 
      role="tablist" 
      aria-label="Rooms in the friend's house"
    >
      {rooms.map((room) => {
        const owned = roomsOwned.includes(room.id);
        const canBuy = points >= room.cost;

        return (
        <button 
          key={room.id} 
          className={activeRoom === room.id ? "selected" : ""}
          type="button" 
          role="tab" 
          aria-selected={activeRoom === room.id}
          disabled={!owned && !canBuy}
          onClick={() => owned ? setActiveRoom(room.id) : buyRoom(room)}
        >
          <span aria-hidden="true">
            {room.icon}
          </span>
          
          <span className="room-tab-copy">
            <b>{room.name}</b>
            <small>{owned ? "Owned" : `${room.cost} points`}</small>
          </span>

          </button>
        );
      })}
    </div>
  )
}

export default RoomTabs;
