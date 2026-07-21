import RewardList from "./RewardList";

const RewardShop = ({ rewards }) => {
  const { points, accessories, unlocked, equipped, buyOrEquip } = rewards;

  return (
    <section className="card shop-card">
      <div className="card-heading">
        <div>
          <p className="card-label">Reward shelf</p>
          <h2>Dress up your class friend.</h2>
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
    </section>
  );
};

export default RewardShop;