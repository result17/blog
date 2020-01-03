import threading  # 引入线程库
import queue     
import time


def run_test(q):
    while not q.empty():  # 队列不为空的话
        value = q.get()
        time.sleep(0.8)  # 线程休眠.8秒
        # print("值",value)
        # print("线程名",threading.current_thread().name)
        q.task_done()


def progressbar(nowprogress, total):
    get_progress = int((nowprogress + 1)*(50/total))   # 显示>数量
    get_pro = int(50-get_progress)  # 显示-数量
    percent = (nowprogress+1)*(100/total)
    if percent > 100:
        percent = 100
    print("\r"+"["+">"*get_progress+"-"*get_pro+']'+"%.2f" %
          percent + "%", end="")


def show_test(q, qlen):
    while not q.empty():
        # print(q.qsize(),q.unfinished_tasks,qlen )
        progressbar(qlen-q.unfinished_tasks, qlen)
        time.sleep(1)
    progressbar(qlen, qlen)


def main():
    threadlist = []
    q = queue.Queue()
    qlen = 0   # 记录队列长度
    for i in range(0, 100):
        q.put(i)
        qlen += 1
    # 处理线程
    for x in range(0, 10):  # 运行的线程数量
        th = threading.Thread(target=run_test, args=(q,))
        threadlist.append(th)
    threadlist.append(threading.Thread(target=show_test, args=(q, qlen,)))

    #  运行并加入等待运行完成
    for t in threadlist:
        t.start()
    for t in threadlist:
        t.join()


if __name__ == '__main__':
    print("运行")
    main()
    print("结束")