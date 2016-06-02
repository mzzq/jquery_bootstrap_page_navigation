jQuery.extend({
    myPageNation:myPageNation
});
function myPageNation(fn,size=10){
    var page_index,
        page_total;
    var pagesize=size;
    var _first=true;
    var _fun=fn;
    function getpageindex(){
        return page_index;
    }
    function nextpage(){
        if(page_index<page_total&&page_index>0){
            page_index+=1;
            paginationinit(page_index);
        }else{
            page_index=page_total;
        }
    }
    function prepage(){
        if(page_index<=page_total&&(page_index-1)>0){
            page_index-=1;
            paginationinit(page_index);
        }else{
            page_index=1;
        }
    }
    function paginationievent(e){
        var tagname=$(e.target);
        if(tagname[0].className=='pre'){
            prepage();
            _fun();
        }else if (tagname[0].className=='next') {
            nextpage();
            _fun();
        }else if(tagname.text().trim()=="..."||tagname.text().trim()=="当前无任何记录"){
            return;
        }else{
            page_index=parseInt(tagname.text().trim());
            paginationinit(page_index);
            _fun();
        }
    }
    function computepagetotal(total){
        var _totalpage=total%pagesize;
        if(_totalpage==0){
            page_total=total/pagesize;
        }else{
            page_total=Math.floor(total/pagesize)+1;
        }
    }
    function produceli(i) {
        var _li='<li><a href="javascript:void(0);">'+i+'</a></li>';
        return _li;
    }
    function produceliactive(i) {
        var _li='<li class="active"><a href="javascript:void(0);">'+i+'</a></li>';
        return _li;
    }
    function whichli(page,i){
        if(page==i){
            return produceliactive(i);
        }else{
            return produceli(i);
        }
    }
    function paginationinit(page,total){
        page_index=page;
        if(_first){
            computepagetotal(total);
            $('.pagination').on('click',paginationievent);
            _first=false;
        }
        var paginationclass=$('.pagination');
        var contentpage='<li><a href="javascript:void(0);" class="pre">&laquo;</a></li>';
        if (page_total==0) {
            contentpage+=produceli("当前无任何记录");
        }else if(page_total<8){
            for (var i=1;i<=page_total;i++) {
                contentpage+=whichli(page_index,i);
            }
        }else if(page<6){
            for (var i=1;i<6;i++) {
                contentpage+=whichli(page_index,i);
            }
            contentpage+=produceli("...");
            contentpage+=produceli(page_total);
        }else if(page_total-page_index<5){
            contentpage+=produceli(1);
            contentpage+=produceli("...");
            for(var i=page_total-4;i<=page_total;i++){
                contentpage+=whichli(page_index,i);
            }
        }else{
            contentpage+=produceli(1);
            contentpage+=produceli("...");
            contentpage+=produceli(page_index-1);
            contentpage+=produceliactive(page_index);
            contentpage+=produceli(page_index+1);
            contentpage+=produceli("...");
            contentpage+=produceli(page_total);
        }
        contentpage+='<li><a href="javascript:void(0);" class="next">&raquo;</a></li>';
        paginationclass.html(contentpage);
    }
    return {
        "pageInit":paginationinit,
        "getPageIndex":getpageindex
    }
}
    