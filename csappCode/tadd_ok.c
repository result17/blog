#include <stdio.h>

int tadd_ok(int x, int y) {
  int s = x + y;
  if (x > 0 && y < 0 && s <= 0) {
    return 0;
  } else if (x < 0 && y < 0 && s >= 0) {
    return 0;
  }
  return 1;
}

int main() {
  int res = tadd_ok(0xff7787f8, 0x00781524);
  printf("%d\n", res);
  return 0;
}