import { api } from '../utils/api.js';
import Card from './Card.js';
import React from 'react';
function Main(props) {

    const [userName, isUserName] = React.useState('');
    const [userDescription , isUserDescription] = React.useState('');
    const [userAvatar , isUserAvatar] = React.useState('');
    const [cards, isCards] = React.useState([]);
    
    React.useEffect(() => {
        Promise.all([
            api.getUserData(),
            api.getInitialCards()
        ])
        .then(data => {
            isUserName(data[0].name);
            isUserDescription(data[0].about);
            isUserAvatar(data[0].avatar);
            const cardData = data[1].map(card => {
                return {
                    name: card.name,
                    link: card.link,
                    likes: card.likes
                }
            })
            isCards(cardData);
        })
    }, []);
    
    return (
        <>
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <button 
                        type="button" 
                        className="profile__avatar-button" 
                        onClick={props.onEditAvatar}></button>
                    <img
                        src={userAvatar}
                        alt="Фотография профиля"
                        className="profile__image"
                        />
                </div>
                <div className="profile__info">
                    <div className="profile__form">
                        <h1 className="profile__name">{userName}</h1>
                        <button
                            type="button"
                            className="profile__edit profile__button"
                            onClick={props.onEditProfile}>
                        </button>
                    </div>
                    <p className="profile__role">{userDescription}</p>
                </div>
                <button 
                    type="button"
                    className="profile__add profile__button"
                    onClick={props.onAddPlace}>
                </button>
            </section>
            <section className="gallery">
                {cards.map((card) => 
                    <Card name={card.name} link={card.link} likes={card.likes.length} onCardClick={props.onCardClick} />
                )}
            </section>
        </main>
        </>
    )
}
export default Main;