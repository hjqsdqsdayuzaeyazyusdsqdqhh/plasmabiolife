export default function AdSlot({ slot }) {
  const label = `ADSENSE ${slot.toUpperCase()}`;
  return <span style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- ${label} -->` }} />;
}
