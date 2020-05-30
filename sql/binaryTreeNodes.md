https://nifannn.github.io/2018/05/31/SQL-%E7%AC%94%E8%AE%B0-Hackerrank-Binary-Tree-Nodes/
https://www.hackerrank.com/challenges/binary-search-tree-1/problem
```sql
SELECT N, IF(P IS NULL,'Root',IF((SELECT COUNT(*) FROM BST WHERE P=B.N)>0,'Inner','Leaf')) FROM BST AS B ORDER BY N;
```