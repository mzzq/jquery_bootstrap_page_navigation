function myPageNation(size=10){
    this.page_index=1,
    this.page_total=0;
    this.pagesize=size;
    this._first=true;
    this.paginationclass={};
    this.listen=[];
}
myPageNation.prototype={
    pushListen:function(listen){
        this.listen.push(listen);
    },
    trrigerListen:function(){
        for (var i = this.listen.length - 1; i >= 0; i--) {
            this.listen[i]();
        }
    },
    getpageindex:function(){
        return this.page_index;
    },
    nextpage:function(){
        if(this.page_index<this.page_total&&this.page_index>0){
            this.page_index+=1;
            this.paginationinit();
        }else{
            this.page_index=this.page_total;
        }
    },
    prepage:function(){
        if(this.page_index<=this.page_total&&this.page_index>1){
            this.page_index-=1;
            this.paginationinit();
        }else{
            this.page_index=1;
        }
    },
    paginationinit:function(total,fn){
        if(this._first){
            fn();
            this.pushListen(fn);
            this.paginationclass=document.getElementById('pagination');
            this.computepagetotal(total);
            var _serf=this;
            this.paginationclass.addEventListener('click',function(e){
                var tagname=e.target;
                if(tagname.className=='pre'){
                    _serf.prepage();
                    _serf.trrigerListen();
                }else if (tagname.className=='next') {
                    _serf.nextpage();
                    _serf.trrigerListen();
                }else if(!/^[0-9]*$/.test(tagname.dataset.page)){
                    return;
                }else{
                    _serf.page_index=parseInt(tagname.dataset.page);
                    _serf.paginationinit();
                    _serf.trrigerListen();
                } 
            });
            this._first=false;
        }
        var contentpage='<ul class="pagination"><li><a href="javascript:void(0);" class="pre">&laquo;</a></li>';
        if (this.page_total==0) {
            contentpage+=this.produceli("当前无任何记录");
        }else if(this.page_total<8){
            for (var i=1;i<=this.page_total;i++) {
                contentpage+=this.whichli(this.page_index,i);
            }
        }else if(this.page_index<6){
            for (var i=1;i<6;i++) {
                contentpage+=this.whichli(this.page_index,i);
            }
            contentpage+=this.produceli("...");
            contentpage+=this.produceli(this.page_total);
        }else if(this.page_total-this.page_index<5){
            contentpage+=this.produceli(1);
            contentpage+=this.produceli("...");
            for(var i=this.page_total-4;i<=this.page_total;i++){
                contentpage+=this.whichli(this.page_index,i);
            }
        }else{
            contentpage+=this.produceli(1);
            contentpage+=this.produceli("...");
            contentpage+=this.produceli(this.page_index-1);
            contentpage+=this.produceliactive(this.page_index);
            contentpage+=this.produceli(this.page_index+1);
            contentpage+=this.produceli("...");
            contentpage+=this.produceli(this.page_total);
        }
        contentpage+='<li><a href="javascript:void(0);" class="next">&raquo;</a></li>';
        this.paginationclass.innerHTML=contentpage;
    },
    computepagetotal:function(total){
        if(total==0){
            this.page_total=0;
            return;
        }
        var _totalpage=total%this.pagesize;
        if(_totalpage==0){
            this.page_total=total/this.pagesize;
        }else{
            this.page_total=Math.floor(total/this.pagesize)+1;
        }
    },
    produceli:function(i){
        var _li='<li><a href="javascript:void(0);" data-page="'+i+'">'+i+'</a></li>';
        return _li;
    },
    produceliactive:function(i){
        var _li='<li class="active"><a href="javascript:void(0);" data-page="'+i+'">'+i+'</a></li>';
        return _li;
    },
    whichli:function(page,i){
        if(page==i){
            return this.produceliactive(i);
        }else{
            return this.produceli(i);
        }
    }
}
    