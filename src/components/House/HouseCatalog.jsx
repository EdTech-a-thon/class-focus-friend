const HouseCatalog = ({
  room,
  items,
  ownedItems,
  points,
  buyHouseItem,
  isPreviewing,
  titleId,
}) => {
  const catalogItems = items.filter(
    (item) => item.room === room.id
  );

  return (
    <div className="house-catalog">
      <div className="catalog-heading">
        <div>
          <p className="catalog-label">House shop</p>
          <h2 id={titleId}>Decorate the {room.name.toLowerCase()}</h2>
        </div>
        <span className="points-badge">{isPreviewing ? "Preview" : `★ ${points} stars`}</span>
      </div>

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
                  {owned ? "In this room" : `★ ${item.cost}`}
                </small>
              </div>

              <button
                type="button"
                disabled={!isPreviewing && (owned || points < item.cost)}
                onClick={() => buyHouseItem(item)}
              >
                {isPreviewing ? (owned ? "Take away" : "Place") : owned ? "Placed" : "Buy"}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default HouseCatalog;
