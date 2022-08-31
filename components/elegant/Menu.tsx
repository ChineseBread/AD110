interface Props{
    onClick:(value:any) => void
    items:Array<{key:BlogCategory['cate_id'] | string,label:React.ReactNode}>
}
function Menu({onClick,items}:Props) {
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