function Menu({onClick,items}) {
    return (
        <div className='blog-menu font-family'>
            {items.map(({key,label}) => {
                return (
                    <div onClick={() => onClick({key})} className='blog-menu-item' key={key}>
                        {label}
                    </div>
                )
            })}
        </div>
    )
}

export default Menu;