import trash from '../images/trash.svg'

function Card(props) {
  const card = props.card

  const heardClass = `element__heart ${
    card.liked ? 'element__heart_active' : ''
  }`
  const trashClass = `element__trash ${
    card.owned ? 'element__trash_active' : ''
  }`

  return (
    <article className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.alt}
        onClick={() => props.onCardClick(card)}
      />
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button className={heardClass} type="button"></button>
          <div className="element__like_counter">{card.likes || ''}</div>
        </div>
      </div>
      <img className={trashClass} src={trash} alt="Удалить карточку" />
    </article>
  )
}

export default Card
