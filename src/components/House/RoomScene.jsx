import Otter from "../Otter/Otter";

const RoomScene = ({ room, decorations, equipped, isCelebrating, isFocusing, noiseTone, otterName }) => {
  
  return (
    <section
      className="room-scene"
      aria-label={`${room.name} in the otter's house`}
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
      <div className="otter-at-home">
        <Otter
          equipped={equipped}
          isCelebrating={isCelebrating}
          isFocusing={isFocusing}
          noiseTone={noiseTone}
        />
      </div>

      {decorations.length ? (
        <div
          className="placed-decorations"
          aria-label="Decorations in this room"
        >
          {decorations.map((item) => {
            const pos = item.roomPosition;
            const isAnchorTop = pos.anchor === "top";
            return (
              <div
                key={item.id}
                className="room-item"
                style={{
                  left: pos.x + "%",
                  [isAnchorTop ? "top" : "bottom"]: pos.y + "%",
                  width: pos.w + "%",
                }}
                aria-label={item.name}
                role="img"
              >
                <img
                  src={item.roomImage}
                  alt={item.name}
                  style={{ width: "100%", height: "auto" }}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="empty-room">
          {otterName} is settling in. Decorate this room to make it your own.
        </p>
      )}
    </section>
  );
};

export default RoomScene;
