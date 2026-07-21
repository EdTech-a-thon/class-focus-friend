import { useEffect, useState } from "react";
import RewardShop from "../Rewards/RewardShop";
import RoomTabs from "./RoomTabs";
import RoomScene from "./RoomScene";
import HouseCatalog from "./HouseCatalog";

const HouseCard = ({ house, rewards }) => {
  const [openShop, setOpenShop] = useState(null);
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
    roomsOwned,
    buyRoom,
    equipped,
    isCelebrating,
    isFocusing,
    isMusicPlaying,
    noiseTone,
  } = house;

  const nextRoom = houseRooms.find((room) => !roomsOwned.includes(room.id));

  useEffect(() => {
    if (!openShop) return;

    function closeOnEscape(event) {
      if (event.key === "Escape") setOpenShop(null);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [openShop]);

  return (
    <section className="house-card" id="dashboard">
      <div className="house-heading">
        <div>
          <p className="card-label">Focus friend&apos;s house</p>
          <h2>{activeRoomDetails.name} is ready for focus</h2>
        </div>
        <div className="house-progress">
          <b>{roomsOwned.length}</b> rooms owned
          <small>{nextRoom ? `${nextRoom.cost} points for ${nextRoom.name}` : "Every room unlocked!"}</small>
        </div>
      </div>

      <div className="house-actions">
        <button className="outline" type="button" onClick={() => setOpenShop("rooms")}>Choose room</button>
        <button className="outline" type="button" disabled={!roomsOwned.includes(activeRoom)} onClick={() => setOpenShop("decorations")}>Decorate room</button>
        <button className="outline" type="button" onClick={() => setOpenShop("accessories")}>Dress up friend</button>
      </div>

      <RoomScene
        room={activeRoomDetails}
        decorations={roomDecorations}
        equipped={equipped}
        isCelebrating={isCelebrating}
        isFocusing={isFocusing}
        isMusicPlaying={isMusicPlaying}
        noiseTone={noiseTone}
      />

      {openShop && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpenShop(null);
        }}>
          <section className="shop-modal" role="dialog" aria-modal="true" aria-labelledby="shop-title">
            <button className="modal-close" type="button" aria-label="Close shop" autoFocus onClick={() => setOpenShop(null)}>&times;</button>
            {openShop === "rooms" ? (
              <div className="room-picker">
                <p className="card-label">Focus friend&apos;s house</p>
                <h2 id="shop-title">Choose a room to focus in</h2>
                <RoomTabs
                  rooms={houseRooms}
                  activeRoom={activeRoom}
                  setActiveRoom={(room) => {
                    setActiveRoom(room);
                    setOpenShop(null);
                  }}
                  roomsOwned={roomsOwned}
                  points={points}
                  buyRoom={buyRoom}
                />
              </div>
            ) : openShop === "decorations" ? (
              <HouseCatalog
                room={activeRoomDetails}
                items={houseItems}
                ownedItems={houseItemsOwned}
                points={points}
                buyHouseItem={buyHouseItem}
                titleId="shop-title"
              />
            ) : (
              <RewardShop rewards={rewards} titleId="shop-title" />
            )}
          </section>
        </div>
      )}
    </section>
  );
};

export default HouseCard;
