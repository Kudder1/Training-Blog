const Burger = () => {
    const onBurgerClick = () => {
        document.body.classList.toggle('burger-open');
    }
    return (
        <div onClick={onBurgerClick} className="bars">
            <span className="bars__item bars__item-1"></span>
            <span className="bars__item bars__item-2"></span>
            <span className="bars__item bars__item-3"></span>
        </div>
    );
};

export default Burger;