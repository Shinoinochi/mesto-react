import { CurrentUserContext } from '../context/CurrentUserContext.js';
import Card from './Card.js';
import React from 'react';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, user, handleCardLike, cards, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <button 
                        type="button" 
                        className="profile__avatar-button" 
                        onClick={onEditAvatar}></button>
                    <img
                        src={currentUser.avatar}
                        alt="Фотография профиля"
                        className="profile__image"
                        />
                </div>
                <div className="profile__info">
                    <div className="profile__form">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            type="button"
                            className="profile__edit profile__button"
                            onClick={onEditProfile}>
                        </button>
                    </div>
                    <p className="profile__role">{currentUser.about}</p>
                </div>
                <button 
                    type="button"
                    className="profile__add profile__button"
                    onClick={onAddPlace}>
                </button>
            </section>
            <section className="gallery">
                {cards.map((card) => 
                    <Card  card={card} key={card._id} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={onCardDelete} />
                )}
            </section>
        </main>
    )
}
export default Main;