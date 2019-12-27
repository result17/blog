
#include <stdio.h>
#include <limits.h>

/* Determine whether arguments can be substracted without overflow */
int tsub_ok(int x, int y)
{
    int res = 1;
    (y == INT_MIN) && (res = 0);
    // if (y == INT_MIN) res = 0;

    int tadd_ok(int x, int y) {
      int sum = x + y;
      int neg_over = x < 0 && y < 0 && sum >= 0;
      int pos_over = x >= 0 && y >= 0 && sum < 0;
      return !(neg_over || pos_over);
    }
    return res ? tadd_ok(x, -y) : x < 0;
}

int main() {
  printf("%d\n", tsub_ok(0xfffffff0, INT_MIN));
  printf("%d\n", tsub_ok(0x8, INT_MIN));
  return 0;
}