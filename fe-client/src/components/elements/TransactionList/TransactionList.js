import React from 'react';
import styles from './index.module.css'

const TransactionList = ({ transactionList }) => {
  return (
    <div className={styles['transaction-list']}>
      {transactionList.map((transaction, index) => {
        return (
          <div key={index} className={styles['transaction-list__card']}>
            <h3>{transaction.no_order}</h3>
            <div className={styles['transaction-list__card__product-list']}>
              {transaction.products.map((product, indexProduct) => {
                return (
                  <div key={indexProduct}>
                    <p>Nama Barang: {product.product}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                )
              })}
            </div>
            <div className={styles['transaction-list__card__pay']}>
              <p>Total Harga: {transaction.total_price}</p>
              <p>Total Bayar: {transaction.paid_amount}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TransactionList