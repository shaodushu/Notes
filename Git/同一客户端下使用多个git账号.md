# 同一客户端下使用多个git账号

大多数人有时会需要在同一台机器上管理多个 github 账号，本文以管理两个 github 账号为例，记录了配置 git 的过程，方便下次遇到相同问题时，能节省处理时间。



# 约定

- github 账号 1： wylu, 对应邮箱为 wylu@gmail.com
- github 账号 2： 15wylu, 对应邮箱为 15wylu@gmail.com

# 生成第一对 SSH key

第一个密钥对以 wylu 账号为例，在生成之前，我们可以通过 `ls -al ~/.ssh` 查看是否已有 SSH key。

例如：

```
$ ls -al ~/.ssh
total 24
drwx------  2 wylu wylu 4096 Nov 24  2018 .
drwxr-xr-x 66 wylu wylu 4096 Jan  7 00:00 ..
-rw-------  1 wylu wylu 1675 Nov 24  2018 id_rsa
-rw-r--r--  1 wylu wylu  398 Nov 24  2018 id_rsa.pub
-rw-r--r--  1 wylu wylu 4841 Dec 22 21:46 known_hosts
```

如果 `~/.ssh` 下有 "id_rsa"（私钥） 和 "id_rsa.pub"（公钥），说明之前已生成过 SSH key 了，我们可以直接复用这个密钥对（SSH key）。

如果你没有 SSH key 或者你想要重新生成一个 SSH key，可以执行以下命令生成：

- 不存在 SSH Key 时。

遇到输入一路回车使用默认配置。

```
$ ssh-keygen -t rsa -C "wylu@gmail.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/home/pi/.ssh/id_rsa): 
Created directory '/home/pi/.ssh'.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/pi/.ssh/id_rsa.
Your public key has been saved in /home/pi/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:nGAMmHYEKfJ3/iEDLxOsg1xinfg/IzuYTQVggEnVSWQ wylu@gmail.com
The key's randomart image is:
+---[RSA 2048]----+
|==+B*E.          |
|* =.o=           |
|.+ooo +          |
| +.+=o.o .       |
|o.+o.*  S        |
|..ooo = .        |
|  =..o + .       |
| o + +  .        |
|   .+ o          |
+----[SHA256]-----+
```

- 已存在 SSH Key 时。

当询问是否 `Overwrite (y/n)?` 已存在的 `id_rsa` 时，直接输入 `y` 然后回车，其余的一路回车使用默认配置就好。

```
$ ssh-keygen -t rsa -C "wylu@gmail.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/home/pi/.ssh/id_rsa): 
/home/pi/.ssh/id_rsa already exists.
Overwrite (y/n)? y
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/pi/.ssh/id_rsa.
Your public key has been saved in /home/pi/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:rPh6Y081aG7URerEmd6aA5FVYi+1w0KPHR59KggFwLk wylu@gmail.com
The key's randomart image is:
+---[RSA 2048]----+
|     ..o.o*.*.   |
|      o .* # +. .|
|       .o.X.X  o |
|      E. B.=...  |
|        S * ..   |
|     . = o +     |
|    . . + +      |
|     .+o   .     |
|    .+.o.        |
+----[SHA256]-----+
```

我们以此 SSH Key 作为默认的密钥对。

# 生成第二对 SSH Key

假设我们已经拥有了一对 SSH Key 对应于管理 wylu 的 github 账号，现在需要生成另外一对 SSH Key 用于管理 15wylu 的 github 账号。

执行下面的命令生成另一对 SSH Key：

```
$ cd ~/.ssh
$ ssh-keygen -t rsa -C "15wylu@gmail.com" -f "15wylu_id_rsa"
Generating public/private rsa key pair.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in 15wylu_id_rsa.
Your public key has been saved in 15wylu_id_rsa.pub.
The key fingerprint is:
SHA256:6cQHRLvxRovTNQgPh1JiMCe4U1tFgkxe541ZGN+NiHA 15wylu@gmail.com
The key's randomart image is:
+---[RSA 2048]----+
|   +=oB=E+o      |
|  ..+*oOo& + o   |
|   o.o .O B = .  |
|  o .  . X o .   |
|   .    S *      |
|       o +       |
|        .        |
|                 |
|                 |
+----[SHA256]-----+
```

方法与上面生成第一对 SSH Key 一样，一路回车，这里使用 `-f` 选项的作用是指定生成的密钥对文件的名称，以避免覆盖之前的密钥对文件。从输出信息中可以看到，此次生成的私钥文件名为 `15wylu_id_rsa`，公钥文件名为 `15wylu_id_rsa.pub`。这样同一台机器下，wylu 和 15wylu 都拥有了各自的 SSH Keys：

```
$ ls -al ~/.ssh
total 24
drwx------ 2 pi pi 4096 Jan  6 17:00 .
drwxr-xr-x 7 pi pi 4096 Jan  6 16:55 ..
-rw------- 1 pi pi 1823 Jan  6 17:00 15wylu_id_rsa
-rw-r--r-- 1 pi pi  396 Jan  6 17:00 15wylu_id_rsa.pub
-rw------- 1 pi pi 1823 Jan  6 16:38 id_rsa
-rw-r--r-- 1 pi pi  396 Jan  6 16:38 id_rsa.pub
```

# 在对应的 github 账号中添加 SSH key

参考文章 [Git配置SSH Key](https://wylu.github.io/posts/5b767b23/) 中的 **添加 SSH Key 到 Github** 部分，分别将 `id_rsa.pub` 文件中的公钥添加到 wylu 账号，将 `15wylu_id_rsa.pub` 文件中的公钥添加到 15wylu 账号。

# 使用 ssh-agent 注册新的 SSH 密钥

ssh-agent：是一个可以控制和保存公钥身份验证所使用的私钥的程序，可以理解为一个密钥管理器，ssh-agent 是一个守护进程（daemon），设计它的唯一目的就是对解密的专用私钥进行高速缓存。

**如果没有正在运行的 ssh-agent，则执行 `eval "$(ssh-agent -s)"` 以确保 ssh-agent 运行。**

然后使用 ssh-add 添加私钥：

```
$ ssh-add ~/.ssh/id_rsa
$ ssh-add ~/.ssh/15wylu_id_rsa
```

使用 ssh-add 将私钥交给 ssh-agent 保管，其他程序需要身份验证时，ssh 将直接从 ssh-agent 获取私钥，而不会提示你输入密码口令以获取私钥，这样就不需要经常输入密码了。可以使用 `ssh-add -l` 查看已添加到 ssh-agent 中的密钥。

接下来，**需要使 ssh-agent 对不同的 SSH 主机使用各自的 SSH 密钥**，这是关键部分，我们有两种不同的方法（使用其中一种即可）：

- 使用 SSH 配置文件
- 在 ssh-agent 中只有一个活动的 SSH 密钥

# 使用 SSH 配置文件（推荐）

使用 `~/.ssh/config` 作为我们的配置文件，如果文件不存在，我们就创建它。

```
$ cd ~/.ssh/
$ touch config
```

编辑 `~/.ssh/config`，使相关 GitHub 帐户的配置类似于以下内容：

```
# github: wylu, email: wylu@gmail.com
# the default config
Host github.com
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa
   
# github: 15wylu, email: 15wylu@gmail.com
Host 15wylu.github.com
   HostName github.com
   User git
   IdentityFile ~/.ssh/15wylu_id_rsa
```

- Host: 别名，用于区分多个 git 账号，可随意
- HostName: 要连接的服务器的主机名
- IdentityFile: ssh 连接使用的私钥

上面的配置要求 ssh-agent：

- 使用 `id_rsa` 作为使用 @github.com 的任何 Git URL 的密钥
- 对于使用 @15wylu.github.com 的任何 Git URL，则使用 `15wylu_id_rsa` 密钥

其规则就是：从上至下读取 config 的内容，在每个 Host 下寻找对应的私钥，你可以根据需要添加更多的 Host。

## clone 新仓库

**注意：如果使用 SSH 配置文件前，仓库已存在，参考下方 "对于已存在的仓库" 的内容。**

这里以上面的配置为例，假设要克隆 15wylu 账号的一个项目，原来使用的命令如下：

```
$ git@github.com:15wylu/15wylu.github.io.git
```

但是经过配置，我们已经将 15wylu 的 Host 设为了 `15wylu.github.com`，而不再是原来的 `github.com`，所以相应地 clone 的命令也变成如下：

（请注意克隆时我们使用了 SSH 配置中使用的主机名）

```
$ git@15wylu.github.com:15wylu/15wylu.github.io.git
```

## 对于已存在的仓库

假设在配置之前，我们就已经 clone 了仓库。

首先使用 `git remote -v` 列出本地仓库对应的远程库，检查该 URL 是否与要使用的 GitHub 主机匹配，否则更新远程原始 URL：

以 15wylu 账号的仓库为例：

```
$ git remote set-url origin git@15wylu.github.com:15wylu/15wylu.github.io.git
```

确保 `@` 和 `:` 之间的字符串与我们在 SSH 配置中指定的主机（Host）匹配。

## 对于本地创建新的仓库

在项目文件夹中使用 `git init` 中初始化目录为一个 Git 仓库。然后在 GitHub 帐户中创建新的仓库，将其作为远程库添加到本地仓库中：

同样以 15wylu 账号为例：

```
$ git remote add origin git@15wylu.github.com:15wylu/remote_repo_name.git
```

确保 `@` 和 `:` 之间的字符串与我们在 SSH 配置中指定的主机（Host）匹配。将初始提交推送到 GitHub 仓库：

```
$ git add .
$ git commit -m "initial commit"
$ git push -u origin master
```

## 小结

**在这里，我们实际上是在为不同的主机（Host）添加 SSH 配置规则，说明要在哪个域中使用哪个身份文件（SSH key）。**

## 测试

```
$ ssh -T git@github.com
The authenticity of host 'github.com (13.250.177.223)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'github.com,13.250.177.223' (RSA) to the list of known hosts.
Hi wylu! You've successfully authenticated, but GitHub does not provide shell access.
$ ssh -T git@15wylu.github.com
Hi 15wylu! You've successfully authenticated, but GitHub does not provide shell access.
```

第一次执行 `ssh -T git@github.com` 时会有一段警告，直接输入 yes 回车既可。从输出的信息可以看到，wylu 和 15wylu 都认证成功了。

# 在 ssh-agent 中只有一个活动的 SSH 密钥

这种方法不需要 SSH 配置规则，而是我们手动确保 ssh-agent 在执行任何 Git 操作时仅附加了相关的密钥。

`ssh-add -l` 将列出附加到 ssh-agent 的所有 SSH 密钥，删除所有这些密钥后，添加你将要使用的一个密钥，以确保 ssh-agent 中只有一个活动的密钥。

例如，假设你要使用 git 操作 15wylu 账号，首先使用下面的命令删除 ssh-agent 中的所有密钥：

```
$ ssh-add -D
```

然后添加 15wylu 账号对应的密钥：

```
$ ssh-add ~/.ssh/15wylu_id_rsa
```

此时，ssh-agent 已将密钥映射到 15wylu GitHub 帐户，当我们使用 git 推送、克隆等操作时都是对 15wylu 账号的仓库进行操作。

类似地，假如要使用 git 操作 wylu 账号，则：

```
$ ssh-add -D
$ ssh-add ~/.ssh/id_rsa
```

# 为本地仓库设置 git remote url

clone 或创建本地 Git 仓库后，请确保 Git 配置的用户名和电子邮件正是你想要的。GitHub 通过 commit 描述附随的电子邮件 ID 来标识任何提交的作者。

要在本地 Git 目录（本地 Git 仓库下）中列出配置名称和电子邮件，请执行 `git config user.name` 和 `git config user.email`。如果找不到，则需要进行相应的更新，如：

```
$ git config user.name "wylu"
$ git config user.email "wylu@gmail.com"
```

https://link.jianshu.com/?t=http://blog.csdn.net/guang09080908/article/details/46545335)