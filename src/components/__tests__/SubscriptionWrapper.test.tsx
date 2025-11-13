import { describe, expect, it} from "vitest";
import { screen, waitFor} from "@testing-library/react";
import { render } from '@/test/utils'
import SubscriptionWrapper from "../subscription/SubscriptionWrapper";


describe('SubscriptionWrapper', ()=>{

    it('Display Main Title correctly', async ()=>{
        render(<SubscriptionWrapper/>)
        
        // Wait for the component to fully render
        await waitFor(() => {
            expect(screen.getByText('My Subscriptions')).toBeInTheDocument()
        })
    })

})
