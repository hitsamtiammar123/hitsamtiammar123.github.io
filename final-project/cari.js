(function(){
    var template_s='<div class="col-10 sepatu-content"><div class="col-2"><img src="{img}" class="img-sepatu"></div><div class="col-8 detail-sepatu"><h2>{nama}</h2><p>{detail}</p></div></div>';
    const listData=[{"nama":"Nike Air Jordan 5 Retro","img":"img/4b1f81e3-6b97-4955-a7b7-32fa38b4ff79.webp","detail":"Air Jordan 5 Retro untuk wanita memberikan perubahan warna-warni ke salah satu sepatu permainan MJ yang paling berkesan. Menampilkan pematung midsole yang terinspirasi pesawat tempur ikonik dan toggle renda yang dibentuk, versi ini menampilkan cetakan pelangi reflektif lengkap untuk warna dan energi yang berani."},{"nama":"Nike React Infinity Run Flyknit","img":"img/nike-react-infinity.webp","detail":"Nike React Infinity Run Flyknit dirancang untuk membantu mengurangi cedera dan membuat Anda tetap berlari. Lebih banyak busa dan detail atas yang ditingkatkan memberikan rasa aman dan empuk. Bersiap dan rasakan potensi saat Anda berangkat."},{"nama":"Nike Drop-Type","img":"img/Nike Drop-Type.webp","detail":"Dengan sikap DIY dan daya tarik sepatu tenis klasik, Nike Drop-Type menghadirkan keunggulan eksperimental pada tampilan ikonik. Menampilkan garis-garis berbeda yang dipinjam dari seri NikeCourt, lidah busa terbuka dan branding N354, memungkinkan sepatu Anda yang berbicara"},{"nama":"Nike Air VaporMax 360","img":"img/Nike Air VaporMax 360.webp","detail":"Menampilkan midsole busa ukuran penuh dan unit VaporMax Air, Nike Air VaporMax 360 memberi Anda kenyamanan luar biasa dengan gaya 90-an yang berani yang terinspirasi oleh Air Max 360."},{"nama":"Nike Air Jordan 1 Mid","img":"img/Nike Air VaporMax 360.webp","detail":"The Air Jordan 1 Mid Shoes terinspirasi oleh AJ1 pertama, menawarkan penggemar OG melihat seberapa jauh merek Jordan telah datang sejak tahun 1985."},{"nama":"Nike Jordan Aerospace 720 Paris Saint-Germain","img":"img/Jordan Aerospace 720 Paris Saint-Germain.webp","detail":"Melangkahlah ke masa depan dengan lebih banyak alas kaki yang empuk dan ekspresi warisan Jordan yang sangat progresif. Bagian dari kolaborasi Paris Saint-Germain, Jordan Aerospace 720 versi ini memiliki garis teknologi tinggi, branding stealth, dan warna Paris asimetris."},{"nama":"Nike Air Force 1 React","img":"img/Nike Air Force 1 React.webp","detail":"Segarkan tampilan Anda dan masuklah ke dunia AF-1 baru dengan Nike Air Force 1 React. Ini memadukan desain modern dengan gaya b-ball yang ikonik untuk tampilan yang besar dan berani. Swoosh besar, \"AIR\" besar di midsole dan pola sol baru memungkinkan Anda mengekspresikan dunia modern Anda, sementara teknologi Nike React menambah kenyamanan luar biasa."},{"nama":"Nike Air Max 90 LTR","img":"img/Nike Air Max 90 LTR.webp","detail":"Nike Air Max 90 LTR merayakan tahun ke-30 ikon dengan desain yang tepat untuk anak-anak. Dengan Air klasik, bantalan busa dan sol fleksibel, ini semua tentang membawa fave '90 -an ke generasi baru."},{"nama":"Nike Air Max 90","img":"img/Nike Air Max 90.webp","detail":"Garis yang bersih, fleksibel, dan tak lekang oleh waktu — sepatu orang kembali dengan Nike Air Max 90. Menampilkan sol Waffle ikonik yang sama, lapisan yang dijahit, dan aksen TPU klasik yang Anda sukai, sepatu ini memungkinkan Anda berjalan di antara jajaran Air."},{"nama":"Nike Air Zoom Terra Kiger 5","img":"img/Nike Air Zoom Terra Kiger 5.webp","detail":"Taklukkan lintasan basah dan berbatu di Nike Air Zoom Terra Kiger 5. Flymesh yang sangat ringan bergabung dengan Nike React foam untuk perjalanan yang mulus. Bagian atas berlubang membantu menjaga kelembapan, sementara sol karet yang lengket menghasilkan traksi multi-arah dan multi-permukaan."},{"nama":"Nike Air VaporMax Flyknit 3","img":"img/Nike Air VaporMax Flyknit 3.webp","detail":"Jadilah goyang dan apung di Nike Air VaporMax Flyknit 3. Fitur-fitur teratasnya mengalir garis-garis 2-nada dari konstruksi Flyknit yang dapat direnggangkan untuk gaya unik, gaya jalanan. Teknologi VaporMax Air yang revolusioner membuat langkah Anda tetap nyaman dengan bantalan kaki-ke-tumit."},{"nama":"Adidas Ultraboost 20 SEOUL CITY PACK Shoes","img":"img/Ultraboost 20 SEOUL CITY PACK Shoes.jpg","detail":"Apa kota favoritmu? Sepatu lari adidas ini dirancang dengan warna dan grafik khusus untuk kota-kota utama di seluruh dunia. Bagian atas rajutan yang elastis telah dijahit untuk mendukung di bagian tengah kaki. Bantalan responsif membuat Anda nyaman saat menavigasi lingkungan perkotaan Anda sendiri."},{"nama":"Adidas Ultraboost 20 SYDNEY CITY PACK Shoes","img":"img/Ultraboost 20 SYDNEY CITY PACK Shoes.jpg","detail":"Apa kota favoritmu? Sepatu lari adidas ini dirancang dengan warna dan grafik khusus untuk kota-kota utama di seluruh dunia. Bagian atas rajutan yang elastis telah dijahit untuk mendukung di bagian tengah kaki. Bantalan responsif membuat Anda nyaman saat menavigasi lingkungan perkotaan Anda sendiri."},{"nama":"Adidas Ultraboost DNA Shoes","img":"img/Ultraboost DNA Shoes.jpg","detail":"Dibangun sebagai pelari berkinerja tinggi, dampak Ultraboost jauh melampaui berlari ke dunia musik dan mode. Sepatu adidas Ultraboost DNA ini menggabungkan siluet ramping dan bergaya dengan teknologi canggih untuk membuat sepatu yang bisa Anda pakai di mana saja."},];


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