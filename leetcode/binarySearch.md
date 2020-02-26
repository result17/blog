```python
def lower_bound(array, first, last, value):
    while first < last:
        mid = first + (last - first) // 2
        if array[mid] < value: first = mid + 1
        else last = mid
    return first
```
https://www.zhihu.com/question/36132386

## tips
ceil(p / m) == (p - m + 1) / m 
https://www.youtube.com/watch?v=J-IQxfYRTto