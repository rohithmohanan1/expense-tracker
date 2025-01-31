import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, QueryConstraint } from 'firebase/firestore'
import { db } from '@/config/firebase'

const useFetchData = <T>(
    collectionName: string,
    constrains: QueryConstraint[] = []
) => {

    const [ data, setData ] = useState<T[]>([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState<string | null>(null)

    useEffect(() => {
        if(!collectionName) return;
        const collectionRef = collection(db, collectionName)
        const q = query(collectionRef, ...constrains)

        const unsub = onSnapshot(q, (snapshot) => {
            const fetchedData = snapshot.docs.map(doc => {
                return{ 
                    id: doc.id,
                    ...doc.data()
                }
            }) as T[]
            setData(fetchedData)
            setLoading(false)
        }, (err) => {
            console.log('Error fetching data: ', err)
            setError(err.message)
            setLoading(false)
        })
        return () => unsub();
    }, [])

    return { data, loading, error }
}

export default useFetchData

const styles = StyleSheet.create({})