import PopupWithForm  from './PopupWithForm.js';
import React from 'react';
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();    

    function handleSubmit(evt) {
        evt.preventDefault();
        const button = evt.currentTarget.querySelector('.popup__button');
        onUpdateAvatar({
            avatar: avatarRef.current.value,
            button: button
        });
    }  
    
    return (
        <PopupWithForm 
            name="avatar" 
            title="Обновить аватар" 
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input 
                type="url"
                required
                placeholder="Ссылка на аватар"
                className="popup__url form__input-second popup__input"
                id="avatar-input"
                name="text"
                ref={avatarRef}/>
        <span className="form__input-error form__input-second-error form__avatar-input-error" ></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;