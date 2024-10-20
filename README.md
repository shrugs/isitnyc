is it brooklyn


```ts
const neighborhoods = await prisma.neighborhood.findMany({
  include: { tags: true }
});

const newNeighborhoods = await prisma.neighborhood.findMany({
  where: {
    description: { not: null },
    tags: { some: {} }
  },
  include: { tags: true },
  orderBy: { createdAt: 'desc' },
  take: 10
});

const similarNeighborhoods = await prisma.neighborhood.findMany({
  where: {
    AND: [
      {
        tags: {
          some: {
            like: 'Williamsburg',
            weight: { gt: 20 }
          }
        }
      },
      {
        tags: {
          some: {
            like: 'CrownHeights',
            weight: { gt: 20 }
          }
        }
      }
    ]
  },
  include: { tags: true }
});
```
