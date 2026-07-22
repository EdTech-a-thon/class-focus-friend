import Friend from "../Friend/Friend";

const RoomScene = ({ room, decorations, equipped, isCelebrating, isFocusing, isMusicPlaying, noiseTone, friendName }) => {
  
  return (
    <section
      className="room-scene"
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

      <div className="room-window" aria-hidden="true">
        <span className="window-sun" />
        <span className="window-cloud cloud-one" />
        <span className="window-cloud cloud-two" />
      </div>
      <div className="friend-at-home">
        <Friend
          equipped={equipped}
          isCelebrating={isCelebrating}
          isFocusing={isFocusing}
          isMusicPlaying={isMusicPlaying}
          noiseTone={noiseTone}
        />
      </div>

      {decorations.length ? (
        <div
          className="placed-decorations"
          aria-label="Decorations in this room"
        >
          {decorations.map((item, index) => (
            <div
              key={item.id}
              className={`room-item room-item-${item.sceneType}`}
              style={{
                "--item-position": index % 4,
                "--item-rise": index % 3,
              }}
              aria-label={item.name}
              role="img"
            >
              <span aria-hidden="true">{item.symbol}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-room">
          {friendName} is settling in. Decorate this room to make it your own.
        </p>
      )}
    </section>
  );
};

export default RoomScene;
