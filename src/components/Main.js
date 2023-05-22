import { api } from '../utils/api.js';
import Card from './Card.js';
import React from 'react';
function Main(props) {

    const [userName, setUserName] = React.useState('');
    const [userDescription , setUserDescription] = React.useState('');
    const [userAvatar , setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);
    
    React.useEffect(() => {
        Promise.all([
            api.getUserData(),
            api.getInitialCards()
        ])
        .then(data => {
            setUserName(data[0].name);
            setUserDescription(data[0].about);
            setUserAvatar(data[0].avatar);
            setCards(data[1]);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);
    
    return (
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
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} />
                )}
            </section>
        </main>
    )
}
export default Main;