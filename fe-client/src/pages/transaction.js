import React, { useState, useEffect } from 'react';
import Layout from "@/components/layouts/Layout";
import api from '@/api';
import TransactionList from '@/components/elements/TransactionList/TransactionList';

export default function Transaction() {
  const [transactionList, setTransactionList] = useState([])

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/transactions');
      const data = response.data.payload.transactions
      setTransactionList(data)
    } catch (err) {
      throw Error(err)
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Layout>
      <h1>Transaction History</h1>
      <TransactionList transactionList={transactionList} />
    </Layout>
  )
}
