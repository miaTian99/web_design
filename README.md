# web_design
栖居（租房网站设计，前端部分）

html文件分布结构如下：

![image](https://github.com/perseverance123/web_design/blob/master/栖居页面分布.jpg)

前端尚在完善中，我主要负责与数据渲染和获取有关的js代码及页面动效，宇琪主要负责前端css美化。目前，已经加强了大部分的表单的js功能模块，还有几个页面的js还在完善中。以下分几个部分说明一下现在的工作进度：

闲置有关页面展示(和房屋的展示方式相同):

![image](https://github.com/perseverance123/web_design/blob/master/display1.jpg)
tips：
1.这里的闲置页面是我摘取的我这里比较久之前的，没有展示深度美化(尚在美化中)的的页面。
2.每个展示模块通过id绑定了一个信息显示弹框，如何通过数据量多少确定显示的模块量呢？
3.这里的xianzhi页相当于筛选条件，选择的类别决定了打开的item页面的显示内容是与什么有关的，这使得闲置物品可以分类别显示。
4.模拟展示的时候，每种类型的数据不要少于3个(也就是需要先写一些每种类型的具体数据用于展示)。

个人页面展示:

![image](https://github.com/perseverance123/web_design/blob/master/display2.jpg)
tips：
1.在修改框内已经实现图片上传及预览。
2.尚在完善增加模块(append)相关功能。
3.如何实现收藏的信息的数据渲染？根据什么条件append呢？

登录注册页面展示:

![image](https://github.com/perseverance123/web_design/blob/master/display3.jpg)
tips：
1.通过forget your password进入safe_support，目前只有这一个方式进入安全信息修改页。
2.remember me(login)和统一协议(register)的复选框目前尚未实现相关功能。
3.注册页目前实现了对读入数据的初步判断和限制，具体js代码见html下方(有些是试验代码)和formeasy.js
4.注册页面的头像及下方样式会删除。下拉框的数据尚不明确是否可以顺利传输。
5.登录页输入电话/邮箱信息的数据输入框直接获取框内数据，没有写js实现对输入数据的类型判断。

编辑页面/安全页面展示:

![image](https://github.com/perseverance123/web_design/blob/master/display4.jpg)
tips：
1.关于edit页面：
1)通过下载kindeditor有关的包，可以实现在线编辑功能，删除键目前对应的是reset(相当于只实现了简单的内容清空，而不是对已经保存的编辑内容的资源删除)，保存键也只是简单的submit...预期的效果是，点击左边栏，可以根据id使得右边可以动态的显示和编辑相关内容。不知道能否实现呢？
2)house_edit,item_edit,remark_edit页都是一样的排布，不知道能否实现三个页面共用同一个显示层呢？
2.关于safe_support页的一些目前无法完善的bug(js部分,主要也是formeasy.js和HTML下方代码)：
1)图像验证码(4位)输入错误可以自动切换，但是不能正确显示错误提示信息。
2)手机验证码现在人为设定的是111111，尚未实现验证码发送和动态匹配的功能。
3)三个tab(phone,email,password)尚未实现分别提交保存(三个submit除了id不同，其他尚无区分度)
4)填写的信息框在切换tab时无法消除。
