(function(){
    var template_s='<div class="col-10 sepatu-content"><div class="col-2"><img src="{img}" class="img-sepatu"></div><div class="col-8 detail-sepatu"><h2>{nama}</h2><p>{detail}</p></div></div>';
    const listData=[
        {
            nama:"Nika 123",
            img:'img/sepatu-1.jfif',
            detail:'Ini sepatu mahal heheheheheheheh'
        },
        {
            nama:"Nika 1234",
            img:'img/sepatu-2.jfif',
            detail:'Ini sepatu mahal heheheheheheheh'
        },
    ];


    var contentElem=document.getElementById('content');
    var cariTxt=document.getElementById('text-sepatu-search');
    var btnCari=document.querySelector('.btn-cari');

    function setSearchData(txt){
        contentElem.innerHTML='';
        var searchResult=listData.filter((value)=>value.nama.toLowerCase().search(txt.toLowerCase())!==-1);
        if(searchResult.length===0){
            contentElem.innerHTML='<h4>Sepatu tidak ditemukan</h4>';
            return;
        }

        var result='';
        for(var i=0;i<searchResult.length;i++){
            var r=searchResult[i];
            var t=template_s;
            t=t.replace('{img}',r.img).replace('{nama}',r.nama).replace('{detail}',r.detail);
            result+=t;
        }
        contentElem.innerHTML=result;
    }

    btnCari.onclick=function(){
        setSearchData(cariTxt.value);
    }

    cariTxt.onkeyup=function(e){
        if(e.keyCode===13)
            setSearchData(cariTxt.value);
    }

})();