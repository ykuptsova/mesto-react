import React from 'react'
import Card from './Card.js'
import pencil from '../images/pencil.svg'
import api from '../utils/api.js'

function Main(props) {
  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUserName(data.name)
        setUserDescription(data.info)
        setUserAvatar(data.avatar)
        return data.userId
      })
      .then((userId) => api.getInitialCards(userId))
      .then((cards) => {
        setCards(cards)
      })
      .catch((error) => {
        console.log('Could not fetch user info or cards:', error)
      })
  }, [])

  const profileEditClassName =
    'profile__edit-button ' + (userName ? 'profile__edit-button_enabled' : '')

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__pic-container" onClick={props.onEditAvatar}>
            <img className="profile__pic" src={userAvatar} alt="Фото Профиля" />
            <img
              className="profile__pencil"
              alt="Редактировать аватар"
              src={pencil}
            />
          </div>
          <div className="profile__texts">
            <div className="profile__name-container">
              <h1 className="profile__name">{userName}</h1>
              <button
                className={profileEditClassName}
                type="button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__info">{userDescription}</p>
          </div>
          <button
            className="profile__new-card-button"
            onClick={props.onAddPlace}
          ></button>
        </div>
      </section>

      <section className="elements">
        <div className="elements__content">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Main
