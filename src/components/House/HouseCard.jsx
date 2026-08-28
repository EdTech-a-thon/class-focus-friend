import { useEffect, useState } from "react";
import RewardShop from "../Rewards/RewardShop";
import RoomTabs from "./RoomTabs";
import RoomScene from "./RoomScene";
import HouseCatalog from "./HouseCatalog";
import Modal from "../Modal/Modal";

const HouseCard = ({ house, rewards }) => {
  const [openShop, setOpenShop] = useState(null);
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
    completedSessions,
    equipped,
    isCelebrating,
    isFocusing,
    noiseTone,
    otterName,
    setOtterName,
    isPreviewing,
  } = house;

  const nextRoom = houseRooms.find((room) => completedSessions < room.sessionsRequired);

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
      <div className="house-heading">
        <div>
          <p className="card-label">{otterName || "Otter"}'s house</p>
          <h2>{otterName || "Otter"} is ready to focus</h2>
        </div>
        <div className="house-progress">
          <span><b>{completedSessions}</b> total sessions completed</span>
          <small>{nextRoom ? `${nextRoom.sessionsRequired - completedSessions} until ${nextRoom.name}` : "Every room unlocked!"}</small>
        </div>
      </div>

      <div className={`house-actions ${showActions ? "" : "collapsed"}`}>
        {showActions && (
          <>
            <button className="outline" type="button" onClick={() => setOpenShop("rooms")}>Choose room</button>
            <button className="outline" type="button" disabled={!isPreviewing && completedSessions < activeRoomDetails.sessionsRequired} onClick={() => setOpenShop("decorations")}>Decorate room</button>
            <button className="outline" type="button" onClick={() => setOpenShop("accessories")}>Dress up otter</button>
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
      </div>

      <RoomScene
        room={activeRoomDetails}
        decorations={roomDecorations}
        equipped={equipped}
        isCelebrating={isCelebrating}
        isFocusing={isFocusing}
        noiseTone={noiseTone}
        otterName={otterName || "Otter"}
      />

      {openShop && (
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
                  completedSessions={completedSessions}
                  unlockAll={isPreviewing}
                />
              </div>
            ) : openShop === "decorations" ? (
              <HouseCatalog
                room={activeRoomDetails}
                items={houseItems}
                ownedItems={houseItemsOwned}
                points={points}
                buyHouseItem={buyHouseItem}
                isPreviewing={isPreviewing}
                titleId="shop-title"
              />
            ) : (
              <RewardShop rewards={rewards} titleId="shop-title" />
            )}
        </Modal>
      )}
    </section>
  );
};

export default HouseCard;
