# jquery_bootstrap_page_navigation
jquery分页插件

基本概要：

 1. 基于jquery库
 2. 基于bootstrap样式
 3. 可分离样式自定义样式
 4. 使用方便：
   1. 首先将pagenav.js引入项目，在它之前需要jquery.min.js以及bootstrap.min.css提供样式
   1. 新建bjPageNation对象`var mynavtion=$.bjPageNation(callback,5);`上下页翻页时的数据更新callback，每页5条数据
   2. 初始化`mynavtion.pageInit(1,100);`第一页，总共100条
   3. 获取当前页`mynavtion.getPageIndex();`
   4. 在HTML需要插入分页的地方插入`<ul class="pagination"></ul>`
 5. 代码不多，可以运行index.html看看效果

        <!DOCTYPE html>
    	<html>
    	<head>
    		<title>bootstrap page</title>
    		<link rel="stylesheet" type="text/css" href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
    		<style type="text/css">
    			.page{
    				text-align: center;
    			}
    		</style>
    		<script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.0.0-rc1/jquery.min.js"></script>
    		<script type="text/javascript" src="http://www.tekbroaden.com/pagenav.js"></script>
    	</head>
    	<body>
    		<div class="page">
    			<ul class="pagination">
    			</ul>
    		</div>
    		<script type="text/javascript">
    			var mynavtion=$.bjPageNation(callback,5);
    			mynavtion.pageInit(1,100);
    			function callback(){
    				mynavtion.getPageIndex();
    			}
    		</script>
    	</body>
    	</html>