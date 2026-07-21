const RewardList = ({ points, accessories, unlocked, equipped, buyOrEquip }) => {
    const rewardItems = accessories.map((item) => {
    const owned = unlocked.includes(item.id);
    const wearing = equipped.includes(item.id);

    return (
      <article className="reward" key={item.id}>
        <span className="reward-icon" aria-hidden="true">
          {item.icon}
        </span>

        <div>
          <b>{item.name}</b>
          <small>
            {owned
              ? wearing
                ? "Wearing now"
                : "Unlocked"
              : `${item.cost} points`}
          </small>
        </div>

        <button
          type="button"
          disabled={!owned && points < item.cost}
          onClick={() => buyOrEquip(item)}
        >
          {owned
            ? wearing
              ? "Remove"
              : "Wear"
            : "Unlock"}
        </button>
      </article>
    );
  });
  
  return (
    <div className="reward-list">
      {rewardItems}
    </div>
  )
};

export default RewardList;