import { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { Subscription} from '../../types/subscription'
//import SubscriptionFiltersComponent from './SubscriptionFilters'
import SubscriptionList from './SubscriptionList'
import SubscriptionLoading from './SubscriptionLoading'
import { useSubscriptions } from '@/hooks/useSubscriptions'
import Image from 'next/image'
import SearchBar from '../SearchBar'

const WrapperContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
`

const WrapperLogo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`

const WrapperHeader = styled.div`
  margin-bottom: 32px;
`

const Title = styled.h1`
  color: ${props => props.theme.colors.groverPrimary};
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
`

const Subtitle = styled.p`
  color: #6c757d;
  font-size: 18px;
  text-align: center;
  margin: 0;
`


export default function SubscriptionWrapper() {
  
  // Estados
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([])
  
  // Custom hook
  const {subscriptions, loading, fetchSubscriptions} = useSubscriptions()

  // Fetch inicial
  useEffect(() => {
    fetchSubscriptions()
  }, [fetchSubscriptions])
  
  // Initialize filtered subscriptions when subscriptions change
  useEffect(() => {
    setFilteredSubscriptions(subscriptions)
  }, [subscriptions])


  // Handle search results
  const handleSearchResults = useCallback((results: Subscription[]) => {
    setFilteredSubscriptions(results)
  }, [])

//  useEffect(()=>{

//   setLoading(true)
//   try{
//     const fetchData = async () => {
//      const response = await fetch("/api/subscriptions")
//       const data = await response.json()
//       setSubscriptions(Array.isArray(data) ? data : [])
//     }
//     fetchData()
//   }catch(e){
//     throw new Error(`Error fetching subscriptions: ${e instanceof Error ? e.message : String(e)}`)

//   }finally{
//     setLoading(false)
//   }

//  },[])
  // Fetch de suscripciones
  // useEffect(()=>{
  //   try{
  //       setLoading(true)
  //       fetch("/api/subscriptions")
  //       .then(res =>
  //           {
  //               if(!res.ok){
  //                   throw new Error(`Error ${res.status}: ${res.statusText}`)
  //               }else{
  //                   return res.json()
  //               }
  //           } )
  //       .then(data => {
  //           setSubscriptions(Array.isArray(data) ? data : [])
  //           setLoading(false)
  //       })
  //   }catch(e){
  //       console.error('Error fetching subscriptions:', e)
  //   }

  // },[])


  // Filtrado y ordenamiento
  
//   const filteredSubscriptions = useMemo(() => {
//     let filtered = [...subscriptions]

//     // Filtrar por estado
//     if (filters.status !== 'all') {
//       filtered = filtered.filter(sub => sub.state === filters.status)
//     }

//     // Filtrar por término de búsqueda
//     if (filters.searchTerm) {
//       const searchTerm = filters.searchTerm.toLowerCase()
//       filtered = filtered.filter(sub =>
//         sub.product.title.toLowerCase().includes(searchTerm) ||
//         sub.referenceId.toLowerCase().includes(searchTerm)
//       )
//     }

//     // Ordenar
//     filtered.sort((a, b) => {
//       let aValue: any
//       let bValue: any

//       switch (filters.sortBy) {
//         case 'price':
//           aValue = a.monthlyPrice
//           bValue = b.monthlyPrice
//           break
//         case 'title':
//           aValue = a.product.title.toLowerCase()
//           bValue = b.product.title.toLowerCase()
//           break
//         case 'date':
//         default:
//           aValue = new Date(a.activatedAt).getTime()
//           bValue = new Date(b.activatedAt).getTime()
//           break
//       }

//       if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1
//       if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1
//       return 0
//     })

//     return filtered
//   }, [subscriptions, filters])


  return (
    <WrapperContainer>
      <WrapperLogo>
        <Image src='https://tse3.mm.bing.net/th/id/OIP.rodGlR9A94kLbOwFYwC_VAHaD4?pid=Api&P=0&h=180' alt='Grover Logo' width={200} height={200} style={{objectFit: "contain"}} />
      </WrapperLogo>
      <WrapperHeader>
        <Title>My Subscriptions</Title>
        <Subtitle>
          Manage all your Grover subscriptions from one place
        </Subtitle>
      </WrapperHeader>

      {loading ? (
        <SubscriptionLoading />
      ) : (
        <>
          <SearchBar 
            subscriptions={subscriptions}
            onSearchResults={handleSearchResults}
          />
          <SubscriptionList
            subscriptions={filteredSubscriptions}
            loading={loading}
          />
        </>
      )}
    </WrapperContainer>
  )
}