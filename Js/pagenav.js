jQuery.extend({
    myPageNation:myPageNation
});
function myPageNation(size=20){
    var page_index,
        page_total;
    var pagesize=size;
    function nextpage(){
        if(page_index<page_total&&page_index>=0){
            page_index+=1;
        }else{
            page_index=page_total;
        }
        paginationinit(page_total,$('.pagination'),page_index);        
    }
    function prepage(){
        if(page_index<=page_total&&(page_index-1)>0){
            page_index-=1;
            console.log(page_index);
                // this.getallstrategy(this.page,this.pagesize);/
        }else{
            page_index=1;
        }
        paginationinit(page_total,$('.pagination'),page_index);
    }
    function paginationievent(e){
        var tagname=$(e.target);
        if(tagname[0].className=='pre'){
            prepage();
        }else if (tagname[0].className=='next') {
            nextpage();
        }else if(tagname.text().trim()=="..."||tagname.text().trim()=="当前无任何记录"){
            return;
        }else{
            page_index=parseInt(tagname.text().trim());
            paginationinit(page_total,$('.pagination'),page_index);
        }
    }
    function paginationinit(total,item,page){
        page_total=total;
        page_index=page;
        var paginationclass=item;
        var contentpage='<li><a href="javascript:void(0);" v-on:click="prepage" class="pre">&laquo;</a></li>';
        if (total==0) {
            contentpage+='<li><a href="javascript:void(0);">当前无任何记录</a></li>';
        }else if(total<6){
            for (var i=1;i<=total;i++) {
                if(page==i){
                    contentpage+='<li class="active"><a href="javascript:void(0);">'+i+'</a></li>';
                }
                else{
                    contentpage+='<li><a href="javascript:void(0);">'+i+'</a></li>';
                }
            }
        }else{
            if(page<6){
                for (var i=1;i<=5;i++) {
                    if(page==i){
                        contentpage+='<li class="active"><a href="javascript:void(0);">'+i+'</a></li>';
                    }
                    else{
                        contentpage+='<li><a href="javascript:void(0);">'+i+'</a></li>';
                    }
                }
                contentpage+='<li><a href="javascript:void(0);">...</a></li><li><a href="javascript:void(0);">'+total+'</a></li>';
            }else{
                if(page==6){
                    contentpage+='<li><a href="javascript:void(0);">1</a></li>';
                }else{
                    contentpage+='<li><a href="javascript:void(0);">1</a></li><li><a href="javascript:void(0);">...</a></li>';
                }
                for (var i=1,j=page_index-5;i<4;i++) {
                    contentpage+='<li><a href="javascript:void(0);">'+(i+j)+'</a></li>';
                }
                contentpage+='<li class="active"><a href="javascript:void(0);">'+(page_index-1)+'</a></li>';
                if(page_index==page_total){
                    contentpage+='<li><a href="javascript:void(0);">'+total+'</a></li>';
                }else{
                    contentpage+='<li><a href="javascript:void(0);">...</a></li><li><a href="javascript:void(0);">'+total+'</a></li>';
                }
            }
        }
        contentpage+='<li><a href="javascript:void(0);" class="next">&raquo;</a></li>';
        paginationclass.html(contentpage);
    }
    return {
        "paginationinit":paginationinit,
        "paginationievent":paginationievent
    }
}
    