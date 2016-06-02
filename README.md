# jquery_bootstrap_page_navigation
jquery分页插件

基本概要：

 1. 基于jquery库
 2. 基于bootstrap样式
 3. 可分离样式自定义样式
 4. 使用方便：
   1. 新建bjPageNation对象`var mynavtion=$.bjPageNation(callback,5);`上下页翻页时的数据更新callback，每页5条数据
   2. 初始化`mynavtion.pageInit(1,100);`第一页，总共100条
   3. 获取当前页`mynavtion.getPageIndex();`
