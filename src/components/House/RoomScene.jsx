import Friend from "../Friend/Friend";

const RoomScene = ({ room, decorations, equipped, isCelebrating, isFocusing, isMusicPlaying, noiseTone }) => {
  
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
      <div className="wall-picture" aria-hidden="true">♥</div>
      <div className="room-shelf" aria-hidden="true"><span>▥</span><span>●</span><span>▯</span></div>
      <div className="room-sofa" aria-hidden="true"><span /><span /></div>
      <div className="room-rug" aria-hidden="true" />
      <div className="room-plant" aria-hidden="true"><span>✦</span></div>

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
          Your friend is settling in. Decorate this room to make it your own.
        </p>
      )}
    </section>
  );
};

export default RoomScene;
