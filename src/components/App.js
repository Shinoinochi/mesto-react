import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm  from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';


function App() {

    let [isEditAvatarClicked, setIsEditAvatarClicked] = React.useState(false);
    let [isEditProfileClicked, setIsEditProfileClicked] = React.useState(false);
    let [isAddPlaceClicked, setIsAddPlaceClicked] = React.useState(false);
    const [selectedCard, isSelectedCard] = React.useState([]);

    function handleCardClick (card) {
        isSelectedCard(card);
    }

    function handleEditAvatarClick() {
        document.querySelector('.avatar-popup').classList.add('popup_opened');
        setIsEditAvatarClicked(true);
    }

    function handleEditProfileClick() {
        document.querySelector('.profile-popup').classList.add('popup_opened');
        setIsEditProfileClicked(true);
    }
    
    function handleAddPlaceClick() {
        document.querySelector('.create-popup').classList.add('popup_opened');
        setIsAddPlaceClicked(true);
    }
    function closeAllPopups() {
        const popups = document.querySelectorAll('.popup_opened');
        popups.forEach((popup) => {
            popup.classList.remove('popup_opened');
        })
        isSelectedCard([]);
    }
    
  return (
    <>
        <div className="pages">
            <Header />
                <Main 
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    />
                <PopupWithForm 
                    name="profile" 
                    title="Редактировать профиль" 
                    buttonText = "Сохранить"
                    isOpen={isEditProfileClicked}
                    onClose={closeAllPopups}>
                    <input 
                            type="text"
                            placeholder="Имя"
                            minLength="2"
                            maxLength="40"
                            required
                            className="popup__username form__input-first popup__input"
                            id="username-input"
                            name="name"/>
                    <span className="form__input-error form__input-first-error form__username-input-error" ></span>
                    <input 
                            type="text"
                            placeholder="О себе"
                            minLength="2"
                            maxLength="200"
                            required
                            className="popup__role form__input-second popup__input"
                            id="role-input"
                            name="link"/>
                    <span className="form__input-error form__input-second-error form__role-input-error" ></span>
                </PopupWithForm>
                <PopupWithForm 
                    name="create" 
                    title="Новое место"
                    buttonText="Создать"
                    isOpen={isAddPlaceClicked}
                    onClose={closeAllPopups}>
                    <input 
                        type="text"
                        minLength="2"
                        maxLength="30"
                        required
                        placeholder="Название"
                        className="popup__name form__input-first popup__input"
                        id="name-input"
                        name="name"/>
                    <span className="form__input-error form__input-first-error form__name-input-error" ></span>
                    <input 
                        type="url"
                        required
                        placeholder="Ссылка на картинку"
                        className="popup__url form__input-second popup__input"
                        id="url-input"
                        name="link"/>
                    <span className="form__input-error form__input-second-error form__url-input-error" ></span>
                </PopupWithForm>
                <PopupWithForm 
                    name="avatar" 
                    title="Обновить аватар" 
                    buttonText="Сохранить"
                    isOpen={isEditAvatarClicked}
                    onClose={closeAllPopups}>
                    <input 
                        type="url"
                        required
                        placeholder="Ссылка на аватар"
                        className="popup__url form__input-second popup__input"
                        id="avatar-input"
                        name="text"/>
                <span className="form__input-error form__input-second-error form__avatar-input-error" ></span>
                </PopupWithForm>
                <PopupWithForm 
                    name="confirm" 
                    title="Вы уверены?"
                    buttonText="Да">
                </PopupWithForm>
                <ImagePopup 
                    card={selectedCard}
                    onClose={closeAllPopups} />
                <Footer />
                
            </div>
        </>
  );
}

export default App;
