import RewardList from "./RewardList";

const RewardShop = ({ rewards, titleId }) => {
  const { points, accessories, unlocked, equipped, buyOrEquip } = rewards;

  return (
    <div className="shop-card">
      <div className="card-heading">
        <div>
          <p className="card-label">Reward shelf</p>
          <h2 id={titleId}>Dress up your class friend.</h2>
        </div>

        <span className="points-badge">★ {points}</span>
      </div>

      <RewardList
        points={points}
        accessories={accessories}
        unlocked={unlocked}
        equipped={equipped}
        buyOrEquip={buyOrEquip}
      />
    </div>
  );
};

export default RewardShop;
