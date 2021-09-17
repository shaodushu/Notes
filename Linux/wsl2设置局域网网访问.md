### 查看wsl2虚拟机的ip

```shell
ip addr show eth0
```

### 设置端口转发(需要管理员权限运行powershell)

```shell
netsh interface portproxy add v4tov4 listenport=8000 listenaddress=* connectport=8000 connectaddress=172.19.156.37 protocol=tcp
```

### 端口转发状态

```shell
netsh interface portproxy show all
```

### 删除端口转发

```shell
netsh interface portproxy delete v4tov4 listenport=8000 listenaddress=*
```

### 配置入站规则

1.设置–>更新和安全–>Windows安全中心–>防火墙和网络保护–>高级设置—>入站规则–>新建规则–>端口–>TCP,特定本地端口–>允许连接

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200929172015581.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NmMzEzOTk1,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200929172057694.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NmMzEzOTk1,size_16,color_FFFFFF,t_70#pic_center)



