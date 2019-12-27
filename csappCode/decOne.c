#include <stdio.h>

int main() {
  unsigned x = 0;
  printf("%u\n", x - 1);
  int y = 0x80000000;
  printf("%d\n", -y);
  return 0;
}