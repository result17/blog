#include <stdio.h>

void inplace_swap(int *x, int *y) {
  *y = *x ^ *y;
  *x = *x ^ *y;
  *y = *x ^ *x;
}

void reverse_array(int a[], int cnt) {
  int first, last;
  for (first = 0, last = cnt - 1; first < last; first++, last--)
    inplace_swap(&a[first], &a[last]);
}

int main() {
  int ary[5];
  int i = 0;
  for (i = 0; i < 5; i++)
    ary[i] = i + 1;
  reverse_array(ary, 5);
  int e = 0;
  for (e = 0; e < 5; e++)
    printf("ary[%d] = %d\n", e, ary[e]);
  return 0;
}