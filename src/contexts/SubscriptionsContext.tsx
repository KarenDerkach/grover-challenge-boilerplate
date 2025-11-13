import { Subscription } from '@/types/subscription';
import { createContext, useState, useCallback } from 'react';
interface SubscriptionsContextType {
    subscriptions: Subscription[];
    loading: boolean;
    fetchSubscriptions: () => Promise<void>;
    updateSubscription: (id: string, updates: Partial<Subscription>) => void;
    cancelSubscription: (id: string) => Promise<boolean>;
    extendSubscription: (id: string, newRentalPeriod: number) => Promise<boolean>;
}
const SubscriptionsContext = createContext<SubscriptionsContextType | null>(null)

function SubscriptionsProvider({ children }: { children: React.ReactNode }) {

    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const fetchSubscriptions = useCallback(async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/subscriptions')
            const data = await response.json()
            setSubscriptions(data)
        } catch (error) {
            console.error('Error fetching subscriptions:', error)
        } finally {
            setLoading(false)
        }
    },[])

    const updateSubscription = useCallback((id: string, updates: Partial<Subscription>)=>{
        setSubscriptions(prev => prev.map(sub => 
            sub.id === id ? { ...sub, ...updates } : sub
        ));
    }, []) 

    const extendSubscription = useCallback(async (id: string, newRentalPeriod: number): Promise<boolean> => {
        // Validaciones previas
        const subscription = subscriptions.find(sub => sub.id === id);
        
        if (!subscription) {
            console.error('Subscription not found');
            return false;
        }
        
        if (subscription.state !== 'ACTIVE') {
            console.error('Cannot extend: Subscription is not active');
            return false;
        }
        
        if (subscription.rentalPeriod >= newRentalPeriod) {
            console.error('Cannot extend: New rental period must be longer than current period');
            return false;
        }
        
        try {
            // TODO: Implementar endpoint de extensión en la API
            // Por ahora simulamos la extensión con un delay
            console.log(`Simulating extension of subscription ${id} to ${newRentalPeriod} months...`);
            
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Simular respuesta exitosa (en un entorno real, esto sería la llamada a la API)
            // const response = await fetch(`/api/subscriptions/${id}/extend`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ newRentalPeriod })
            // });
            
            // if (!response.ok) {
            //     throw new Error(`Error ${response.status}: ${response.statusText}`);
            // }
            
            // Actualización optimista del estado local
            updateSubscription(id, { 
                rentalPeriod: newRentalPeriod
            });
            
            console.log(`Subscription extended to ${newRentalPeriod} months successfully (simulated)`);
            return true;
        } catch (error) {
            console.error('Error extending subscription:', error);
            return false;
        }
    }, [subscriptions, updateSubscription]);

    const cancelSubscription = useCallback(async (id: string): Promise<boolean> => {
        // Validación previa
        const subscription = subscriptions.find(sub => sub.id === id);
        
        if (!subscription) {
            console.error('Subscription not found');
            return false;
        }
        
        if (subscription.state !== 'ACTIVE') {
            console.error('Cannot cancel: Subscription is not active');
            return false;
        }

        try {
            // TODO: Implementar endpoint de cancelación en la API
            // Por ahora simulamos la cancelación con un delay
            console.log(`Simulating cancellation of subscription ${id}...`);
            
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Simular respuesta exitosa (en un entorno real, esto sería la llamada a la API)
            // const response = await fetch(`/api/subscriptions/${id}/cancel`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // })
            
            // if (!response.ok) {
            //     throw new Error(`Error ${response.status}: ${response.statusText}`)
            // }
            
            // Actualización optimista del estado local
            updateSubscription(id, { 
                state: 'CANCELLED',
                terminatedAt: new Date().toISOString()
            })
            
            console.log('Subscription cancelled successfully (simulated)');
            return true;
        } catch (error) {
            console.error('Error cancelling subscription:', error)
            return false;
        }
    }, [subscriptions, updateSubscription])

      return (
    <SubscriptionsContext.Provider value={{
      subscriptions,
      loading,
      fetchSubscriptions,
      updateSubscription,
      cancelSubscription,
      extendSubscription
    }}>
      {children}
    </SubscriptionsContext.Provider>
  )
}


export { SubscriptionsContext, SubscriptionsProvider }