is it brooklyn


```ts
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
