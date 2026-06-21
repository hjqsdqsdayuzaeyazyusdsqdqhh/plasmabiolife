export default function AdSlot({ slot, format = "auto" }) {
  return (
    <div className="ad-slot">
      <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-xxxxxxxxxxxxxx"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
