import { ThemeToggle } from '@/app/components/dashboard/ThemeToggle'
import prisma from '@/app/utils/db'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

async function getData(subDir: string) {
    const data = await prisma.site.findUnique({
        where: {
            subdirectory: subDir
        },
        select: {
            name: true,
            Post: {
                select: {
                    smallDescription: true,
                    title: true,
                    image: true,
                    createdAt: true,
                    slug: true,
                    id: true,
                },
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })

    if (!data) {
        return notFound()
    }

    return data;
}

const Blogpage = async ({ params }: { params: { name: string } }) => {

    const data = await getData(params.name)

    return (
        <>
            <nav className="grid grid-cols-3 my-10">
                <div className="col-span-1" />
                <div className="flex items-center gap-x-4 justify-center">
                    <Image src={'/logo.svg'} alt="Logo" width={40} height={40} />
                    <h1 className="text-3xl font-semibold tracking-tight">{data.name}</h1>
                </div>
                <div className='col-span-1 flex w-full justify-end'>
                    <ThemeToggle />
                </div>
            </nav>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                {data.Post.map(({ id, image, title, smallDescription, createdAt, slug }) => (
                    <Card key={id}>
                        <Image src={image ?? "./default.png"} alt={title}
                            className="rounded-t-lg object-cover w-full h-[200px]"
                            width={400}
                            height={200} />
                        <CardHeader>
                            <CardTitle className="truncate">{title}</CardTitle>
                            <CardDescription className="line-clamp-3">
                                {smallDescription}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={`/blog/${params.name}/${slug}`}>
                                    Read more
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default Blogpage
