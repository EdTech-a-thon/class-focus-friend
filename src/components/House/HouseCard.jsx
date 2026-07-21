import RoomScene from "./RoomScene";
import RoomTabs from "./RoomTabs";
import HouseCatalog from "./HouseCatalog";

const HouseCard = ({ house }) => {
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
  } = house;

  return (
    <section className="card house-card">
      <RoomTabs
        rooms={houseRooms}
        activeRoom={activeRoom}
        setActiveRoom={setActiveRoom}
      />

      <RoomScene
        room={activeRoomDetails}
        decorations={roomDecorations}
      />

      <HouseCatalog
        room={activeRoomDetails}
        items={houseItems}
        ownedItems={houseItemsOwned}
        points={points}
        buyHouseItem={buyHouseItem}
      />
    </section>
  );
};

export default HouseCard;