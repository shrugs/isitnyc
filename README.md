is it brooklyn

cleans up duplicate tags (??)

```sql
DELETE FROM "Tag"
WHERE id IN (
  SELECT t2.id
  FROM "Tag" t2
  INNER JOIN (
    SELECT "placeId", "like", MIN(id) as "firstId"
    FROM "Tag"
    GROUP BY "placeId", "like"
    HAVING COUNT(*) > 1
  ) dupes
  ON t2."placeId" = dupes."placeId"
  AND t2."like" = dupes."like"
  WHERE t2.id != dupes."firstId"
);
```
