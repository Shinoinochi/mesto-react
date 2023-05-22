function PopupWithForm(props) {
    return (
        <div className={props.isOpen? `popup ${props.name}-popup popup_opened` : `popup ${props.name}-popup`}>
            <div className="popup__container">
                <button type="button" className="popup__button-close" onClick={props.onClose}></button>
                <h3 className="popup__title">{props.title}</h3>
                <form
                    name={`${props.name}-form`}
                    action="#"
                    method="post"
                    target="_blank"
                    className="popup__form form">
                    {props.children}
                    <button type="submit" className="popup__button-create popup__button">
                        {props.buttonText}
                    </button>
                </form>
            </div>
        </div>   
    )
}
export default PopupWithForm;