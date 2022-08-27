# simple-blog

打算使用layoutit来做页面布局，前端只使用bootstrap和jquery。

后端express，模板ejs，数据库用sqlite。

在前端用jquery进行基本信息的验证，不用提交到服务端才验证，这样可以减轻服务端的负担。

但是服务端要做二次验证。

https://www.runoob.com/jquery/jquery-plugin-validate.html

所有的jquery、bootstrap版本，都从菜鸟教程下载基本版本。

express的骨架，就用express-generator来生成。减少手写代码。

保证这个过程可以快速二次重做。

这个说了ejs的文件包含。

https://zhuanlan.zhihu.com/p/52722144

在body里进行包含。

但是效果总是不符合预期。

我知道了，应该是layoutit自己还有需要包含的css文件。

还是不对，一个很简单的布局，都不符合预期。

下面这样：

```
<div class="container-fluid">
		<div class="row-fluid">
			<div class="span6">
				<h3>
					h3. 这是一套可视化布局系统.
				</h3>
			</div>
			<div class="span6">
				<p>
					<em>Git</em>是一个分布式的版本控制系统，最初由<strong>Linus Torvalds</strong>编写，用作Linux内核代码的管理。在推出后，Git在其它项目中也取得了很大成功，尤其是在Ruby社区中。
				</p>
			</div>
		</div>
	</div>
```

看起来是span6这个class不认。

bootstrap3.0版本不再使用原来spanX的class了，你该使用col-xx-##的形式了

所以，是layoutit使用的bootstrap版本实在是太老了。比3.0的还要老。

所以layoutit可以弃用了。

layui

代码在这里：

https://github.com/layui/layui

http://lowcode.magicalcoder.com/magicalcoder/index-bootstrap4.html



layui.com这个官网下线了。用了下面这个。

https://layuion.com/

但是这个方案有些复杂。我不需要这么复杂。而且这个方案也已经下线了。

https://zh.altapps.net/soft/layoutit 这里有layoutit相关的替代品。

都是国外要收费的。

这个有点搞不清楚怎么用的。

https://grid.layoutit.com/

这个版本支持到bootstrap3.6了。

https://github.com/savokiss/layoutit

没有在线版本，我下载到本地，用python启动一个简单的webserver来运行这个

随便放了一个6:6的行，可以看到使用的是col-md-6这样的了。

很好。在我的express测试可以生效了。

就继续在layoutit的基础上走。

使用bootstrap3版本。

