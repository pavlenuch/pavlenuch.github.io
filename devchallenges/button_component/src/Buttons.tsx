import React, { FC } from 'react'
import s from './Buttons.module.scss';
import Button from './components/Btn';

const Buttons: FC = () => {
  return (
    <>
      <h4>Different button types</h4>
      <div className={s.wrap_btns}>
        { ['default', 'outline', 'text'].map(el => <Button typeBtn={el}/>) }
      </div>

      <h4>Disable button types</h4>
      <div className={s.wrap_btns}>
        { ['disableShadow', 'disabled', 'disabled-text'].map(el => <Button typeBtn={el}/>) }
      </div>

      <h4>Icon button types</h4>
      <div className={s.wrap_btns}>
        { ['icon-right', 'icon-left'].map(el => <Button typeBtn={el}/>) }
      </div>

      <h4>Different button sizes</h4>
      <div className={s.wrap_btns}>
        { ['sm', 'md', 'lg'].map(el => <Button typeBtn={el}/>) }
      </div>

      <h4>different colors</h4>
      <div className={s.wrap_btns}>
        { ['default', 'primary', 'secondary', 'danger'].map(el => <Button typeBtn={el}/>) }
      </div>

      <footer>
        created by <a href="https://devchallenges.io/portfolio/pavlenuch" target="_blank"><b>Aleksandr</b></a> - devChallenges.io
      </footer>
    </>
  )
}

export default Buttons
