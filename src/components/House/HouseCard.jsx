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
    completedSessions,
    equipped,
    isCelebrating,
    isFocusing,
    isMusicPlaying,
    noiseTone,
  } = house;

  const nextRoom = houseRooms.find((room) => completedSessions < room.sessionsRequired);

  return (
    <section className="card house-card">
      <div className="house-heading">
        <div>
          <p className="card-label">Focus friend&apos;s house</p>
          <h2>Choose a room to focus in</h2>
        </div>
        <div className="house-progress">
          <b>{completedSessions}</b> sessions
          <small>{nextRoom ? `${nextRoom.sessionsRequired - completedSessions} until ${nextRoom.name}` : "Every room unlocked!"}</small>
        </div>
      </div>

      <RoomTabs
        rooms={houseRooms}
        activeRoom={activeRoom}
        setActiveRoom={setActiveRoom}
        completedSessions={completedSessions}
      />

      <RoomScene
        room={activeRoomDetails}
        decorations={roomDecorations}
        equipped={equipped}
        isCelebrating={isCelebrating}
        isFocusing={isFocusing}
        isMusicPlaying={isMusicPlaying}
        noiseTone={noiseTone}
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
