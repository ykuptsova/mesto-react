import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import api from '../utils/api.js'
import CurrentUserContext from '../contexts/CurrentUserContext'

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    _id: null,
    name: '',
    description: '',
    avatar: null,
  })

  // fetch currentUser on component mount
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser({
          _id: data._id,
          name: data.name,
          description: data.description,
          avatar: data.avatar,
        })
      })
      .catch((error) => {
        console.log('Could not fetch user info:', error)
      })
  }, [])

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
  const handleUpdateUser = (user) => {
    closeAllPopups()
    api
      .setUserInfo(user)
      .then((user) => setCurrentUser(user))
      .catch((error) => {
        console.log('Could not update user info:', error)
      })
  }
  const handleUpdateAvatar = (data) => {
    closeAllPopups()
    api
      .setUserAvatar(data)
      .then((user) => setCurrentUser(user))
      .catch((error) => {
        console.log('Could not update user avatar:', error)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

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
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
