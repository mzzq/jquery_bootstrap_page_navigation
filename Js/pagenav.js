jQuery.extend({
    myPageNation:myPageNation
});
function myPageNation(size=20){
    var page_index,
        page_total;
    var pagesize=size;
    function getpageindex(){
        return page_index;
    }
    function nextpage(){
        if(page_index+1<page_total&&page_index>0){
            page_index+=1;
            paginationinit(page_total,page_index);
        }else{
            page_index=page_total;
        }
    }
    function prepage(){
        if(page_index<=page_total&&(page_index-1)>0){
            page_index-=1;
            paginationinit(page_total,page_index);
        }else{
            page_index=1;
        }
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
            paginationinit(page_total,page_index);
        }
        console.log(getpageindex());
    }
    // function produceli(i) {
    //     var _li='<li class="active"><a href="javascript:void(0);">'+i+'</a></li>';
    //     return _li;
    // }
    function paginationinit(total,page){
        page_total=total;
        page_index=page;
        var paginationclass=$('.pagination');
        var contentpage='<li><a href="javascript:void(0);" class="pre">&laquo;</a></li>';
        if (total==0) {
            contentpage+='<li><a href="javascript:void(0);">当前无任何记录</a></li>';
        }else if(total<5){
            for (var i=1;i<=total;i++) {
                if(page==i){
                    contentpage+='<li class="active"><a href="javascript:void(0);">'+i+'</a></li>';
                }
                else{
                    contentpage+='<li><a href="javascript:void(0);">'+i+'</a></li>';
                }
            }
        }else{
            if(page<4){
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
                if(page==4){
                    contentpage+='<li><a href="javascript:void(0);">1</a></li>';
                }else{
                    contentpage+='<li><a href="javascript:void(0);">1</a></li><li><a href="javascript:void(0);">...</a></li>';
                }
                if((page_index+2)<page_total){
                    for (var i=1,j=page_index-3;i<6;i++) {
                        if((i+j)==page_index){
                            contentpage+='<li class="active"><a href="javascript:void(0);">'+page_index+'</a></li>';
                        }else{
                            contentpage+='<li><a href="javascript:void(0);">'+(i+j)+'</a></li>';
                        }
                    }
                    contentpage+='<li><a href="javascript:void(0);">...</a></li><li><a href="javascript:void(0);">'+total+'</a></li>';
                }else{
                    for (var i=1,j=page_index-3;i<(4+page_total-page_index);i++) {
                        if((i+j)==page_index){
                            contentpage+='<li class="active"><a href="javascript:void(0);">'+page_index+'</a></li>';
                        }else{
                            contentpage+='<li><a href="javascript:void(0);">'+(i+j)+'</a></li>';
                        }
                    }
                }
            }
        }
        contentpage+='<li><a href="javascript:void(0);" class="next">&raquo;</a></li>';
        paginationclass.html(contentpage);
    }
    return {
        "pageInit":paginationinit,
        "pageEvent":paginationievent,
        "getPageIndex":getpageindex
    }
}
    