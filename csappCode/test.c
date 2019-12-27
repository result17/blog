#include <stdio.h>
#include <limits.h>

int tadd_ok(int x, int y) {
  int sum = x + y;
  int neg_over = x < 0 && y < 0 && sum >= 0;
  int pos_over = x >= 0 && y >= 0 && sum < 0;
  return !neg_over && !pos_over;
}

int main() {
  // int x = 0x7ffffff8;
  // printf("%d\n", x);
  // int tmin = 0x80000000;
  // printf("%d\n%d\n", 0x8 - tmin, 0xfffffff0 - tmin);
  printf("%d\n", tadd_ok(-1, INT_MIN + 1));
  return 0;
}