const RoomScene = ({ room, decorations }) => {
  
  return (
    <section
      className="room-scene"
      style={{ backgroundImage: `url(${room.image})` }}
      aria-label={`${room.name} in the friend's house`}
    >
      <div className="room-scene-label">
        <span>
          {room.icon}
        </span>

        <div>
          <b>{room.name}</b>
          <small>{room.description}</small>
        </div>
      </div>

      {decorations.length ? (
        <div
          className="placed-decorations"
          aria-label="Decorations in this room"
        >
          {decorations.map((item) => (
            <img
              key={item.id}
              src={item.image}
              alt={item.name}
            />
          ))}
        </div>
      ) : (
        <p className="empty-room">
          This room is empty. Choose something from the catalog to begin decorating.
        </p>
      )}
    </section>
  );
};

export default RoomScene;