const HouseCatalog = ({
  room,
  items,
  ownedItems,
  points,
  buyHouseItem,
}) => {
  const catalogItems = items.filter(
    (item) => item.room === room.id
  );

  return (
    <div className="house-catalog">
      <p className="catalog-label">
        {room.name} catalog
      </p>

      <div className="reward-list">
        {catalogItems.map((item) => {
          const owned = ownedItems.includes(item.id);

          return (
            <article className="reward" key={item.id}>
              <img
                className="reward-icon house-item-icon"
                src={item.image}
                alt=""
              />

              <div>
                <b>{item.name}</b>
                <small>
                  {owned ? "In this room" : `${item.cost} points`}
                </small>
              </div>

              <button
                type="button"
                disabled={owned || points < item.cost}
                onClick={() => buyHouseItem(item)}
              >
                {owned ? "Placed" : "Buy"}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default HouseCatalog;