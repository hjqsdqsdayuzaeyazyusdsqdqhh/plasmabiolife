export default function FAQ({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="faq-section">
      <h2 className="section-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {items.map((item, i) => (
          <details key={i} className="faq-item">
            <summary className="faq-q">{item.q}</summary>
            <p className="faq-a">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
