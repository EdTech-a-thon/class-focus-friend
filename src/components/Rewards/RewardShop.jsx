import RewardList from "./RewardList";

const RewardShop = ({ rewards, titleId }) => {
  const { points, accessories, unlocked, equipped, buyOrEquip, isPreviewing } = rewards;

  return (
    <div className="shop-card">
      <div className="card-heading">
        <div>
          <p className="card-label">Reward shelf</p>
          <h2 id={titleId}>Dress up your class otter.</h2>
        </div>

        <span className="points-badge">{isPreviewing ? "Preview" : `★ ${points} stars`}</span>
      </div>

      <RewardList
        points={points}
        accessories={accessories}
        unlocked={unlocked}
        equipped={equipped}
        buyOrEquip={buyOrEquip}
        isPreviewing={isPreviewing}
      />
    </div>
  );
};

export default RewardShop;
