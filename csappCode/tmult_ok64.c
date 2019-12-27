#include <stdio.h>
#include <stdint.h>

int tmult_ok(int x, int y) {
  int64_t pll = (int64_t) x * y;
  return pll == (int) pll;
}

int main() {
  printf("%d\n", tmult_ok(300, 400));
  return 0;
}