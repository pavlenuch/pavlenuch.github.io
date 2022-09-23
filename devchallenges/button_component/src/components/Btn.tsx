import { FC } from 'react'
import './Btn.scss'

interface IProps {
  typeBtn: string
}

const Btn: FC<IProps> = ({typeBtn}) => {
  return (
    <button className={`${typeBtn}`}>
      {typeBtn === 'icon-left' ? <span className="material-icons material-icons-outlined">add_shopping_cart</span> : null}
      {typeBtn === 'secondary' || typeBtn === 'danger' ? `${typeBtn.charAt(0).toUpperCase()}${typeBtn.slice(1)}` : 'Default'}
      {typeBtn === 'icon-right' ? <span className="material-icons">add_shopping_cart</span> : null}
    </button>
  )
}

export default Btn