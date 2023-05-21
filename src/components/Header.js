import headerLogo from '../images/Vector.svg';
function Header() {
    return (
        <>
        <header className="header">
            <img
                src={headerLogo}
                alt="Логотип"
                className="header__logo logo"/>
        </header>
        </>
    )
}
export default Header;