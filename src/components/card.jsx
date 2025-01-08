
import './card.css'
export const Card = ({ name, url, onClick }) => {

  return <>
    <div className="card_container" onClick={onClick}>
      <img src={url} alt="" width={200} height={200} />
      <p>{name}</p>
    </div>
  </>
}
