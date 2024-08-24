import EmptyState from '@/app/components/dashboard/EmptyState';
import { Button } from '@/components/ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const Sites = async () => {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login")
    }

    return (
        <>
            <div className='flex w-full justify-end'>
                <Button asChild>
                    <Link href={"/dashboard/sites/new"}>
                        <PlusCircle className='mr-2 size-4' /> Create Site
                    </Link>
                </Button>
            </div>

            <EmptyState title='You dont have any Sites created' description="You currently dont have any Sites. Please create some so that you can
        see them right here!"
                buttonText="Create Site"
                href="/dashboard/sites/new" />
        </>
    )
}

export default Sites
