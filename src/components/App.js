import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import trash from '../images/trash.svg'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
    false,
  )
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)

  const handleEditProfileClick = () => setEditProfilePopupOpen(true)
  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true)
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true)
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setAddPlacePopupOpen(false)
    setSelectedCard(null)
  }
  const handleCardClick = (card) => setSelectedCard(card)
  const handleImagePopupClose = () => setSelectedCard(null)

  return (
    <div>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__form-field">
          <input
            className="popup__input popup__input_type_name"
            name="name"
            type="text"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__input-error popup__input-error_type_name"></span>
        </label>
        <label className="popup__form-field">
          <input
            className="popup__input popup__input_type_info"
            name="info"
            type="text"
            placeholder="О Себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__input-error popup__input-error_type_info"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="pic"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__form-field">
          <input
            className="popup__input popup__input_type_pic"
            name="avatar"
            type="url"
            placeholder="Ссылка на аватар"
            required
          />
          <span className="popup__input-error popup__input-error_type_pic"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="card-add"
        title="Новое место"
        saveButtonName="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__form-field">
          <input
            className="popup__input popup__input_type_name"
            name="card_name"
            type="text"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__input-error popup__input-error_type_name"></span>
        </label>
        <label className="popup__form-field">
          <input
            className="popup__input popup__input_type_info"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error popup__input-error_type_info"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="confirm-trash"
        title="Вы уверены?"
        saveButtonName="Да"
      />

      <ImagePopup card={selectedCard} onClose={handleImagePopupClose} />

      <template className="element__template">
        <article className="element">
          <img className="element__image" src="{{src}}" alt="{{alt}}" />
          <div className="element__description">
            <h2 className="element__title">{/* name */}</h2>
            <div className="element__likes">
              <button className="element__heart" type="button"></button>
              <div className="element__like_counter">&nbsp;</div>
            </div>
          </div>
          <img className="element__trash" alt="Delete" src={trash} />
        </article>
      </template>
    </div>
  )
}

export default App
