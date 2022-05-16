import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ConfirmDeletePopup from './ConfirmDeletePopup'
import api from '../utils/api.js'
import CurrentUserContext from '../contexts/CurrentUserContext'

function App() {
  // component states
  const [currentUser, setCurrentUser] = React.useState({
    _id: null,
    name: '',
    description: '',
    avatar: null,
  })
  const [cards, setCards] = React.useState([])
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
    false,
  )
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(
    false,
  )
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [deletingCard, setDeletingCard] = React.useState(null)

  // handling popups
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setAddPlacePopupOpen(false)
    setConfirmDeletePopupOpen(false)
    setSelectedCard(null)
  }

  // handling user profile
  const handleEditProfileClick = () => setEditProfilePopupOpen(true)
  const handleUpdateUser = (user) => {
    closeAllPopups()
    api
      .setUserInfo(user)
      .then((user) => setCurrentUser(user))
      .catch((error) => {
        console.log('Could not update user info:', error)
      })
  }

  // handling avatar
  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true)
  const handleUpdateAvatar = (data) => {
    closeAllPopups()
    api
      .setUserAvatar(data)
      .then((user) => setCurrentUser(user))
      .catch((error) => {
        console.log('Could not update user avatar:', error)
      })
  }

  // handling cards
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true)
  const handleCardClick = (card) => setSelectedCard(card)
  const handleImagePopupClose = () => setSelectedCard(null)
  function handleCardLike(card) {
    ;(card.liked
      ? api.unlikeCard(card._id, currentUser._id)
      : api.likeCard(card._id, currentUser._id)
    ).then((newCard) => {
      setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)))
    })
  }
  function handleCardDelete(card) {
    setDeletingCard(card)
    setConfirmDeletePopupOpen(true)
  }
  function handleConfirmDeleteCard() {
    closeAllPopups()
    api.deleteCard(deletingCard._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== deletingCard._id))
    })
  }
  function handleAddPlace(card) {
    closeAllPopups()
    api
      .addCard(card)
      .then((card) => {
        setCards([card, ...cards])
      })
      .catch((error) => {
        console.log('Could not save card:', error)
      })
  }

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

  // fetch cards on current user update
  React.useEffect(() => {
    api
      .getInitialCards(currentUser._id)
      .then((cards) => {
        setCards(cards)
      })
      .catch((error) => {
        console.log('Could not fetch cards:', error)
      })
  }, [currentUser._id])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header />

        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
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

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleConfirmDeleteCard}
        />

        <ImagePopup card={selectedCard} onClose={handleImagePopupClose} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
