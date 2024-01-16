import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { checkTransfer } from '../store/transferFilterSlice'

import classes from './Aside.module.scss'

export default function Aside() {
  const transferFilterList = useSelector((state) => state.transferFilterList)
  return (
    <div className={classes['transfer-filter']}>
      <p className={classes['transfer-filter--text']}>Количество пересадок</p>
      <ul className={classes['transfer-filter__list']}>
        <AsideCheckbox label="Все" checked={transferFilterList.allTransfers} id="allTransfers" />
        <AsideCheckbox label="Без пересадок" checked={transferFilterList.withoutTransfers} id="withoutTransfers" />
        <AsideCheckbox label="1 пересадка" checked={transferFilterList['1transfer']} id="1transfer" />
        <AsideCheckbox label="2 пересадки" checked={transferFilterList['2transfers']} id="2transfers" />
        <AsideCheckbox label="3 пересадки" checked={transferFilterList['3transfers']} id="3transfers" />
      </ul>
    </div>
  )
}

const AsideCheckbox = ({ label, checked, id }) => {
  const dispatch = useDispatch()
  const check = ({ target }) => {
    dispatch(checkTransfer({ id, value: target.checked }))
  }
  return (
    <li className={classes['transfer-filter__element']}>
      <label className={classes['transfer-filter__element--label']}>
        <input
          type="checkbox"
          className={classes['transfer-filter__element--checkbox']}
          checked={checked}
          onChange={check}
        />
        {label}
      </label>
    </li>
  )
}
