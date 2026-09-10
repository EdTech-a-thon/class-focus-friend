import RoomFixtures from "./RoomFixtures";
import Otter from "../Otter/Otter";

const RoomScene = ({ room, decorations, availableItems = [], accessoryItems = [], unlockedAccessories = [], equipped, isCelebrating, isFocusing, noiseTone, otterName, focusMode = false, editingMode, points, isPreviewing, selectedItem, onChooseItem, onConfirmItem, onCloseEditor }) => {
  const visibleItems = editingMode === "decorations" ? availableItems : decorations;
  const selectedIsOwned = selectedItem && (
    editingMode === "decorations"
      ? decorations.some((item) => item.id === selectedItem.id)
      : unlockedAccessories.includes(selectedItem.id)
  );
  const selectedX = selectedItem?.roomPosition?.x ?? 40;
  
  return (
    <>
      {editingMode && (
        <div className="scene-shop-toolbar">
          <b>{editingMode === "decorations" ? "Choose a gray room item" : "Choose a gray clothing spot"}</b>
          <span>{isPreviewing ? "Preview" : `$${points} budget`}</span>
          <button type="button" onClick={onCloseEditor}>Done</button>
        </div>
      )}
    <section
      className={`room-scene room-${room.id}`}
      aria-label={`${room.name} in the otter's house`}
    >
      {!focusMode && <div className="room-scene-label">
        <span>
          {room.icon}
        </span>

        <div>
          <b>{room.name}</b>
          <small>{room.description}</small>
        </div>
      </div>}

      <RoomFixtures room={room.id} />
      <div className="room-window" aria-hidden="true">
        {room.id === "bedroom" ? <svg className="window-moon" viewBox="0 0 60 60"><path d="M39 5A25 25 0 1 0 49 48 27 27 0 0 1 39 5Z" fill="#fff1c7" /></svg> : <span className="window-sun" />}
        <span className="window-cloud cloud-one" />
        <span className="window-cloud cloud-two" />
      </div>
      <div className="otter-at-home">
        <Otter
          equipped={equipped}
          showAccessorySlots={editingMode === "accessories"}
          isCelebrating={isCelebrating}
          isFocusing={isFocusing}
          noiseTone={noiseTone}
        />
        {editingMode === "accessories" && (
          <div className="accessory-price-spots" aria-label="Clothing choices">
            {accessoryItems.filter((item) => !equipped.includes(item.id)).map((item) => (
              <button
                className={`accessory-price-spot accessory-${item.id}`}
                key={item.id}
                type="button"
                aria-label={`${item.name}, ${unlockedAccessories.includes(item.id) ? "owned" : `$${item.cost}`}`}
                onClick={() => onChooseItem(item)}
              >
                <span>{unlockedAccessories.includes(item.id) ? "Owned" : `$${item.cost}`}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {visibleItems.length ? (
        <div
          className="placed-decorations"
          aria-label="Decorations in this room"
        >
          {visibleItems.map((item) => {
            const pos = item.roomPosition;
            const isAnchorTop = pos.anchor === "top";
            const owned = decorations.some((decoration) => decoration.id === item.id);
            return (
              <button
                key={item.id}
                className={`room-item room-item-${item.id} ${owned ? "" : "room-item-placeholder"}`}
                style={{
                  left: pos.x + "%",
                  [isAnchorTop ? "top" : "bottom"]: pos.y + "%",
                  width: pos.w + "%",
                  zIndex: pos.z,
                }}
                aria-label={item.name}
                type="button"
                disabled={editingMode !== "decorations" || owned}
                onClick={() => onChooseItem(item)}
              >
                <img
                  src={item.roomImage}
                  alt={item.name}
                  style={{ width: "100%", height: "auto" }}
                  draggable={false}
                />
                {!owned && (
                  <span className="room-item-price">
                    <b>+</b>
                    <small>${item.cost}</small>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ) : !focusMode ? (
        <p className="empty-room">
          {otterName} is settling in. Decorate this room to make it your own.
        </p>
      ) : null}

      {selectedItem && (
        <aside className={`scene-purchase-card ${selectedX < 50 ? "side-right" : "side-left"}`} aria-live="polite">
          <button className="scene-purchase-close" type="button" aria-label="Close item details" onClick={() => onChooseItem(null)}>×</button>
          {selectedItem.image ? (
            <img src={selectedItem.image} alt="" />
          ) : (
            <span className="scene-purchase-icon" aria-hidden="true">{selectedItem.icon}</span>
          )}
          <div>
            <small>{editingMode === "decorations" ? "Room decoration" : "Otter clothing"}</small>
            <h3>{selectedItem.name}</h3>
            <b>{selectedIsOwned ? "Already owned" : `$${selectedItem.cost}`}</b>
            {!isPreviewing && !selectedIsOwned && <p>${Math.max(0, points - selectedItem.cost)} left after purchase</p>}
          </div>
          <button
            className="scene-purchase-button"
            type="button"
            disabled={!isPreviewing && !selectedIsOwned && points < selectedItem.cost}
            onClick={() => onConfirmItem(selectedItem)}
          >
            {isPreviewing ? "Place in preview" : selectedIsOwned ? "Wear it" : points < selectedItem.cost ? "Not enough budget" : `Buy for $${selectedItem.cost}`}
          </button>
        </aside>
      )}
    </section>
    </>
  );
};

export default RoomScene;
