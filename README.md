# web_design
栖居（租房网站设计，前端部分）

一、html文件分布结构如下：

![image](https://github.com/perseverance123/web_design/blob/master/栖居页面分布.jpg)

前端尚在完善中，我主要负责与数据渲染和获取有关的js代码及页面动效，宇琪主要负责前端css美化。目前，已经加强了大部分的表单的js功能模块，还有几个页面的js还在完善中。以下分几个部分说明一下现在的工作进度：

二、闲置有关页面展示(和房屋的展示方式相同):

![image](https://github.com/perseverance123/web_design/blob/master/display1.jpg)
tips：

1.闲置页面初步美化已完成，目前尚未实现翻页功能。

2.这里的xianzhi页对应六个分类，点击跳转，由路由定位至相应tab。

4.模拟展示的时候，每种类型的数据不要少于6个(也就是需要先写一些每种类型的具体数据用于展示)。

三、个人页面展示:

![image](https://github.com/perseverance123/web_design/blob/master/display2.jpg)
tips：

1.初步实现数据渲染（尚未测试）。

2.尚未增加房主对房子管理的按钮及功能，如“已租出”（点后下架，数据库中该值未删，但不能显示在主页，除非“再次上新”）

3.尚未实现下架删除功能。（下架目前的想法是去掉编辑按钮，直接变成“再次上新”）

四、登录注册页面展示:

![image](https://github.com/perseverance123/web_design/blob/master/display3.jpg)
tips：

1.这个两个页面的制作暂时告一段落。相应功能已经测试完毕。

五、编辑页面/安全页面展示:

![image](https://github.com/perseverance123/web_design/blob/master/display4.jpg)
tips：

1.关于edit页面：

1)前端正在重新赶制୧(｡･ω･｡)୨，接近尾声，目前尚未实现单次上传多图、多图预览。

2)写完评论后，信息是否可以的实时更新？（堆楼）

2.关于safe_support页的一些目前无法完善的bug：

1)发送邮箱验证码的功能尚未测试。

2)信息填写出错的提示框在切换tab时无法消除，bug！(js部分,主要也是formeasy.js和HTML下方代码)

六、首页index
正在美化，尚未截图。

1)搜索功能尚未测试，前端js基本模块已经写好。

2)收藏数和按收藏排名显示尚未实现。

3)翻页功能尚未实现。
