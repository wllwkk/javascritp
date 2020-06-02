function show(opt) {
    this.startDate(opt);
    this.autoSlide(this);
    this.btnRight(this);
    this.btnLeft(this);
    /*this.preventCopy();*/
    /*this.commitFocus(this);*/
/*    this.centerTextActive(this);*/
    this.adjustHeight(this);
/*    this.backBtn(this);*/
    this.preventCopy();
}
show.prototype = {
    autoSlide: function (_this) {
        clearInterval(_this.timer);
        _this.timer = setInterval(function () {
            for (let i = 0; i < _this.detailContent.length;i++){
                _this.detailContent[i].className = _this.detailContent[i].className.replace(' detailContentActive','');
            }
            for (let i = 0; i < _this.onSlide.length; i++) {
                _this.onSlide[i].style.opacity = _this.startLeft[i] != 70 ? '0' : '1';
                _this.startLeft[i] = _this.startLeft[i] <= -50 ? 150 : _this.startLeft[i];
                _this.onSlide[i].style.left = _this.startLeft[i] - 40 + '%';
                _this.startLeft[i] = _this.startLeft[i] - 40;
            }
            _this.index = _this.index == 5 ? 0 : _this.index;
            _this.slideBarDate += 20;
            _this.slideBarDate = _this.slideBarDate > 100 ? 20 : _this.slideBarDate
            _this.detailContent[_this.index].className += ' detailContentActive';
            _this.oDiv.style.backgroundImage = 'url(img/' + _this.opt.imgRec[_this.index] + ')';
            _this.slideBar.style.width = _this.slideBarDate + '%';
            _this.index++;
        },_this.opt.slideTime);
    },
    btnRight: function (_this) {
        _this.btnClickRight.addEventListener(_this.oclickEvent,function () {
            clearInterval(_this.timer);
            for (let i = 0; i < _this.detailContent.length;i++){
                _this.detailContent[i].className = _this.detailContent[i].className.replace(' detailContentActive','');
            }
            _this.index = _this.index == 5 ? 0 : _this.index;
            _this.index++;
            _this.slideBarDate += 20;
            _this.slideBarDate = _this.slideBarDate > 100 ? 20 : _this.slideBarDate;
            _this.detailContent[_this.index-1].className += ' detailContentActive';
            _this.oDiv.style.backgroundImage = 'url(img/' + _this.opt.imgRec[_this.index - 1] + ')';
            _this.slideBar.style.width = _this.slideBarDate + '%';

            for (let i = 0; i < _this.onSlide.length; i++) {
                _this.onSlide[i].style.opacity = _this.startLeft[i] != 70 ? '0' : '1';
                _this.startLeft[i] = _this.startLeft[i] <= -90 ? 110 : _this.startLeft[i];
                _this.onSlide[i].style.left = _this.startLeft[i] - 40 + '%';
                _this.startLeft[i] = _this.startLeft[i] - 40;
            }
        },false);
    },
    btnLeft: function (_this) {
        _this.btnClickLeft.addEventListener(_this.oclickEvent,function () {
            clearInterval(_this.timer);
            for (let i = 0; i < _this.detailContent.length;i++){
                _this.detailContent[i].className = _this.detailContent[i].className.replace(' detailContentActive','');
            }
            _this.index = _this.index == 1 ? 6 : _this.index;
            _this.index--;
            _this.slideBarDate -= 20;
            _this.slideBarDate = _this.slideBarDate < 20 ? 100 : _this.slideBarDate;
            _this.detailContent[_this.index-1].className += ' detailContentActive';
            _this.oDiv.style.backgroundImage = 'url(img/' + _this.opt.imgRec[_this.index - 1] + ')';
            _this.slideBar.style.width = _this.slideBarDate + '%';

            for (let i = 0; i < _this.onSlide.length; i++) {
                _this.onSlide[i].style.opacity = _this.startLeft[i] != -10 ? '0' : '1';
                _this.startLeft[i] = _this.startLeft[i] >= 110 ? (-90) : _this.startLeft[i];
                _this.onSlide[i].style.left = (Number(_this.startLeft[i]) + 40) + '%';
                _this.startLeft[i] = (Number(_this.startLeft[i]) + 40);
            }
        },false);

    },
    startDate:function(opt){
        this.opt = opt;
        this.index = 2;
        this.slideBarDate = 20;
        this.startLeft = ['-50', '-10', '30', '70', '110'];
        this.container = document.querySelector('.container');
        this.oDiv = document.querySelector('.slideImg');
        this.slideBar = document.querySelector('.slideBar>div');
        this.onSlide = document.querySelectorAll('.onSlide>li');
        this.btnClickLeft = document.querySelector('.btnLeft');
        this.btnClickRight = document.querySelector('.btnRight');
        /*this.detailContentActive = document.querySelector('.detailContentActive');*/
        this.detailContent = document.querySelector('.detail').children;
        /*this.centerText = document.querySelector('.centerText');*/
        this.test1 = document.querySelector('.centerText>div');
        this.scrollBack = document.querySelector('.scrollBack');
        if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            this.adjustScale = 0.6;
            this.oclickEvent = 'touchstart';
        } else if(/(Android)/i.test(navigator.userAgent)) {
            this.adjustScale = 0.6;
            this.oclickEvent = 'touchstart';
        } else {
            this.adjustScale = 0.8;
            this.oclickEvent = 'click';
        }
    },
    preventCopy:function(){
        document.querySelector('.containerFilter').onmousedown = function(){
            return false;
        }
    },
    /*commitFocus:function(_this){
        addEventListener('focus',function(){
            clearInterval(_this.timer);
            _this.autoSlide(_this);
        },false);
        addEventListener('blur',function () {
            clearInterval(_this.timer);
        },false)
    },*/
    /*centerTextActive:function(_this){
        _this.timeEssential = setInterval(function(){
            if(document.documentElement.scrollTop>300){
                _this.scrollBack.style.opacity = '0.8';
                _this.scrollBack.style.transform = 'translateX('+0+'px)';
                _this.test1.style.opacity = '0.8';
                _this.videoControl.setAttribute('muted','muted');
                _this.test1.style.transform = 'translateX('+0+'px)';
            }
        },1);
        /*_this.timeBack = setInterval(function(){
            if (document.documentElement.scrollTop<300){
                _this.scrollBack.style.opacity = '0';
                _this.scrollBack.style.transform = 'translateX('+100+'px)';
            }
        },1)
    }*/
    adjustHeight:function(_this){
        _this.container.style.height = Number(window.innerHeight * _this.adjustScale) + 'px';
        /*onresize = function(){
            _this.container.style.height = Number(window.innerHeight * 0.8) + 'px';
        }*/
        addEventListener('resize',function(){
            _this.container.style.height = Number(window.innerHeight * _this.adjustScale) + 'px';
        },false)
    },
    /*backBtn:function(_this){
        _this.scrollBack.addEventListener('click',function () {
            clearInterval(_this.t);
            _this.scroll = document.documentElement.scrollTop;
            _this.t = setInterval(function(){
                _this.scroll -=10;
                document.documentElement.scrollTop = _this.scroll;
                if(_this.scroll < 1)clearInterval(_this.t);
            },5)
        },false)
    }*/
}
function $(opt){
    return new show(opt);
}