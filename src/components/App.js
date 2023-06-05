import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import { api } from '../utils/api.js';
import { renderLoading } from '../utils/utils.js';

function App() {

    const [isEditAvatarClicked, setIsEditAvatarClicked] = React.useState(false);
    const [isEditProfileClicked, setIsEditProfileClicked] = React.useState(false);
    const [isAddPlaceClicked, setIsAddPlaceClicked] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([
            api.getUserData(),
            api.getInitialCards()
        ])
        .then(data => {
            setCurrentUser(data[0]);
            setCards(data[1]);
        })
        .catch(err => {
            console.log(err.status);
        })
    }, []);

    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .catch((err) => {
            console.log(err.status);
        });
    }

    function handleUpdateUser(userData) {
        renderLoading(true, userData.button);
        api.editUser(userData.name, userData.about)
        .then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err.status);
        })
        .finally(() => {
            console.log(userData.button);
            renderLoading(false, userData.button)
        });
    }

    function handleUpdateAvatar(userData) {
        renderLoading(true, userData.button);
        api.setUserLogo(userData.avatar)
        .then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err.status);
        })
        .finally(() => {
            renderLoading(false, userData.button);
        });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    function handleAddPlaceSubmit(card) {
        renderLoading(true, card.button);
        api.addNewCard(card)
        .then(newCard => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, card.button);
        });
    }

    function handleCardClick (card) {
        setSelectedCard(card);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarClicked(!isEditAvatarClicked);
    }

    function handleEditProfileClick() {
        setIsEditProfileClicked(!isEditProfileClicked);
    }
    
    function handleAddPlaceClick() {
        setIsAddPlaceClicked(!isAddPlaceClicked);
    }

    function closeAllPopups() {
        setIsEditAvatarClicked(false);
        setIsEditProfileClicked(false);
        setIsAddPlaceClicked(false);
        setSelectedCard({});
    }

  return (
        <div className="pages">
            <CurrentUserContext.Provider  value={currentUser}>
                <Header />
                <Main 
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    user={currentUser}
                    handleCardLike={handleCardLike}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    />
                <EditProfilePopup isOpen={isEditProfileClicked} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlaceClicked} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <EditAvatarPopup isOpen={isEditAvatarClicked} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <Footer />
            </CurrentUserContext.Provider>
        </div>
  );
}

export default App;
