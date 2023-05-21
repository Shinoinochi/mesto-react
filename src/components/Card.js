function Card({name, link, likes, onCardClick}) {
    function handleClick() {
        onCardClick({ link, name });
      }  

      return (
        <div className="gallery__item">
            <button type="button" className="gallery__delete"></button>
            <img
                src={link}
                alt={name}
                className="gallery__image"
                onClick={handleClick} />
            <div className="gallery__info">
                <h3 className="gallery__title">{name}</h3>
                <div className="gallery__like">
                    <button 
                        type="button"
                        className="gallery__button-like">
                    </button>
                    <p className="gallery__like-count">{likes}</p>
                </div>
            </div>
        </div>
      )
}

export default Card;