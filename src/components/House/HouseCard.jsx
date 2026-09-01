import { useEffect, useState } from "react";
import RoomTabs from "./RoomTabs";
import RoomScene from "./RoomScene";
import Modal from "../Modal/Modal";

const HouseCard = ({ house, rewards, focusMode = false }) => {
  const [openShop, setOpenShop] = useState(null);
  const [editingMode, setEditingMode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showActions, setShowActions] = useState(true);
  const {
    points,
    houseRooms,
    activeRoom,
    setActiveRoom,
    activeRoomDetails,
    roomDecorations,
    houseItems,
    houseItemsOwned,
    buyHouseItem,
    unlockedRoomIds,
    equipped,
    isCelebrating,
    isFocusing,
    noiseTone,
    otterName,
    setOtterName,
    isPreviewing,
  } = house;

  const activeRoomItems = houseItems.filter((item) => item.room === activeRoomDetails.id);
  const itemsStillNeeded = activeRoomItems.filter((item) => !houseItemsOwned.includes(item.id)).length;
  const allRoomsUnlocked = unlockedRoomIds.length === houseRooms.length;

  useEffect(() => {
    if (!openShop) return;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpenShop(null);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [openShop]);

  return (
    <section className="house-card" id="dashboard">
      {!focusMode && <div className="house-heading">
        <div>
          <p className="card-label">{otterName || "Otter"}'s house</p>
          <h2>{otterName || "Otter"} is ready to focus</h2>
        </div>
        <div className="house-progress">
          <span><b>{activeRoomItems.length - itemsStillNeeded}</b> of {activeRoomItems.length} room items bought</span>
          <small>{allRoomsUnlocked ? "Every room is available!" : "Buy every item to open the next room"}</small>
        </div>
      </div>}

      {!focusMode && <div className={`house-actions ${showActions ? "" : "collapsed"}`}>
        {showActions && (
          <>
            <button className="outline" type="button" onClick={() => setOpenShop("rooms")}>Choose room</button>
            <button className="outline" type="button" onClick={() => { setEditingMode((mode) => mode === "decorations" ? null : "decorations"); setSelectedItem(null); }}>Decorate room</button>
            <button className="outline" type="button" onClick={() => { setEditingMode((mode) => mode === "accessories" ? null : "accessories"); setSelectedItem(null); }}>Dress up otter</button>
            <button className="outline" type="button" onClick={() => setOpenShop("name")}>Name your otter</button>
          </>
        )}
        <button
          className="house-actions-toggle"
          type="button"
          aria-expanded={showActions}
          onClick={() => setShowActions((visible) => !visible)}
        >
          {showActions ? "Hide house actions" : "Show house actions"}
        </button>
      </div>}

      <RoomScene
        room={activeRoomDetails}
        decorations={roomDecorations}
        availableItems={houseItems.filter((item) => item.room === activeRoomDetails.id)}
        equipped={equipped}
        isCelebrating={isCelebrating}
        isFocusing={isFocusing}
        noiseTone={noiseTone}
        otterName={otterName || "Otter"}
        focusMode={focusMode}
        editingMode={focusMode ? null : editingMode}
        accessoryItems={rewards.accessories}
        unlockedAccessories={rewards.unlocked}
        points={points}
        isPreviewing={isPreviewing}
        selectedItem={selectedItem}
        onChooseItem={setSelectedItem}
        onCloseEditor={() => { setEditingMode(null); setSelectedItem(null); }}
        onConfirmItem={(item) => {
          if (editingMode === "decorations") buyHouseItem(item);
          else rewards.buyOrEquip(item);
          setSelectedItem(null);
        }}
      />

      {!focusMode && openShop && (
        <Modal
          isOpen={Boolean(openShop)}
          onClose={() => setOpenShop(null)}
          className="shop-modal"
          ariaLabelledBy="shop-title"
          closeLabel="Close shop"
        >
            {openShop === "name" ? (
              <form className="otter-name-modal" onSubmit={(event) => {
                event.preventDefault();
                setOpenShop(null);
              }}>
                <p className="card-label">Your otter</p>
                <h2 id="shop-title">What should we call your otter?</h2>
                <label className="otter-name-field">
                  <span>Otter&apos;s name</span>
                  <input
                    type="text"
                    value={otterName}
                    maxLength="30"
                    autoFocus
                    onChange={(event) => setOtterName(event.target.value)}
                    placeholder="Otter"
                  />
                </label>
                <button className="outline" type="submit">Save name</button>
              </form>
            ) : openShop === "rooms" ? (
              <div className="room-picker">
                <p className="card-label">Otter&apos;s house</p>
                <h2 id="shop-title">Choose a room to focus in</h2>
                <RoomTabs
                  rooms={houseRooms}
                  activeRoom={activeRoom}
                  setActiveRoom={(room) => {
                    setActiveRoom(room);
                    setOpenShop(null);
                  }}
                  unlockedRoomIds={unlockedRoomIds}
                  unlockAll={isPreviewing}
                />
              </div>
            ) : null}
        </Modal>
      )}
    </section>
  );
};

export default HouseCard;
