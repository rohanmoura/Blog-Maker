import React from 'react'
import { requireUser } from '../utils/requireUser'
import prisma from '../utils/db';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EmptyState from '../components/dashboard/EmptyState';


async function getData(userId: string) {
  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 3
    }),
    prisma.post.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 3,
    })
  ]);

  return { sites, articles };
}

const DashboardIndexPage = async () => {

  const user = await requireUser();

  const { sites, articles } = await getData(user.id)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Your Sites</h1>
      {sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {sites.map(({ imageUrl, name, description, id }) => (
            <Card key={id}>
              <Image src={imageUrl ?? '/default.png'} alt={name} className='rounded-t-lg object-cover w-full h-[200px]' height={200} width={400} />
              <CardHeader>
                <CardTitle className="truncate">
                  {name}
                </CardTitle>
                <CardDescription>
                  {description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className='w-full'>
                  <Link href={`/dashboard/sites/${id}`} >
                    View Articles
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="You dont have any sites created"
          description="You currently dont have any Sites. Please create some so that you can see them right here."
          href="/dashboard/sites/new"
          buttonText="Create Site" />
      )}

      <h1 className="text-2xl mt-10 font-semibold mb-5">Recent Articles</h1>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {articles.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.image ?? '/default.png'}
                alt={item.title}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {item.smallDescription}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>
                    Edit Article
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="You dont have any articles created"
          description="Your currently dont have any articles created. Please create some so that you can see them right here"
          buttonText="Create Article"
          href="/dashboard/sites" />
      )}
    </div>
  )
}

export default DashboardIndexPage
