function ImagePopup(props) {
    return (
        
        <div className={`popup popup-image ${Object.keys(props.card).length > 0 ? 'popup_opened' : ''}` }>
            <div className="popup__image-container">
                <button type="button" className="popup__button-close popup__button-image" onClick={props.onClose}></button>
                <img src={props.card.link} alt="#" className="popup__image"/>
                <h3 className="popup-image__title">{props.card.name}</h3>
            </div>
        </div>

    )
}
export default ImagePopup;