export default function CouponCard({ company, amount }) {
  return (
    <div className="coupon-card" style={{ borderLeftColor: company.color }}>
      <div className="coupon-company">{company.shortName}</div>
      <div className="coupon-amount">${amount} per donation</div>
      <div className="coupon-desc">New donor special rate</div>
    </div>
  );
}
