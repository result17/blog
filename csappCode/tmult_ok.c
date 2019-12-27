#include <stdio.h>

int tmult_ok(int x, int y) {
  int p = x * y;
  return !x || (p /x == y);
}

int main() {
  printf("%d\n", tmult_ok(300, 400));
  return 0;
}