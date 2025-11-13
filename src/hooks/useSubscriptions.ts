import { useContext } from 'react';
import { SubscriptionsContext } from '../contexts/SubscriptionsContext';


export function useSubscriptions() {
    const context = useContext(SubscriptionsContext);
    if(!context) {
        throw new Error('useSubscriptions must be used within a SubscriptionsProvider');
    }
    return context;
}