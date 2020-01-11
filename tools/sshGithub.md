https://help.github.com/cn/github/authenticating-to-github/connecting-to-github-with-ssh
生成公私钥
```bash
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
打开，并复制你的公钥到你的GitHub账号
```bash
ssh -T git@github.com
```
尝试登陆
如果你的github一直用https连接的话，更改ssh连接的话，我的做法是
```bash
git remote rm origin
gir remote add origin git@github.com:yourusername/reponame,git
git push -u origin master
```