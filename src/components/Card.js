function Card({card, onCardClick}) {
    function handleClick() {
        onCardClick(card);
      }  
      return (
        <div className="gallery__item">
            <button type="button" className="gallery__delete"></button>
            <img
                src={card.link}
                alt={card.name}
                className="gallery__image"
                onClick={handleClick} />
            <div className="gallery__info">
                <h3 className="gallery__title">{card.name}</h3>
                <div className="gallery__like">
                    <button 
                        type="button"
                        className="gallery__button-like">
                    </button>
                    <p className="gallery__like-count">{card.likes.length}</p>
                </div>
            </div>
        </div>
      )
}

export default Card;