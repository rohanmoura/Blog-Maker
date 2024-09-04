import { PricingTable } from '@/app/components/shared/Pricing';
import { requireUser } from '@/app/utils/requireUser'
import React from 'react'

const Pricing = async () => {

  const user = await requireUser();

  return (
    <div>
      <PricingTable />
    </div>
  )
}

export default Pricing
