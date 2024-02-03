$.fn.extend({
    /* 时钟 */
    clock:function () {
        var HL={};
        HL.$el=$(this);
        HL.ZHCNArr=['零','一','二','三','四','五','六','七','八','九','十'];
        /* 转为简体中文 */
        HL.changeZHCN=function (value) {
            /* 小于 10 */
            if(value<10){
                return this.ZHCNArr[value];
            }

            var val=value.toString(),str='';
            /* 整 10 */
            if(val.charAt(1)==0){
                if(val.charAt(0)!=1){
                    str=this.ZHCNArr[parseInt(val.charAt(0),10)];
                }
                str+=this.ZHCNArr[10];
                return str;
            }

            /* 小于 20 */
            if(value<20){
                str=this.ZHCNArr[10]+this.ZHCNArr[parseInt(val.charAt(1),10)];
                return str;
            }
            str=this.ZHCNArr[parseInt(val.charAt(0),10)]+this.ZHCNArr[10]+this.ZHCNArr[parseInt(val.charAt(1),10)];
            return str;
        };

        /* 设置日期 */
        HL.setDate=function(){
            var yearStr='',monthStr='',dayStr='';
            var y=this.dateInfo.year.toString();
            for(var i=0;i<y.length;i++){
                yearStr+=this.changeZHCN(parseInt(y.charAt(i),10));
            }
            monthStr=this.changeZHCN(this.dateInfo.month);
            dayStr=this.changeZHCN(this.dateInfo.day);
            if(this.els){
                this.els.date.html(yearStr+'年'+monthStr+'月'+dayStr+'日');
            }else {
                this.$el.append('<li class="date">'+(yearStr+'年'+monthStr+'月'+dayStr+'日')+'</li>');
            }
        };
        /* 设置小时 */
        HL.setHour=function(){
            var str='',rotateArr=[];
            for(var i=1;i<=24;i++){
                rotateArr.push(r=360/24*(i-1)*-1);
                str+='<div><div>'+(this.changeZHCN(i))+'时</div></div>';
            }
            this.$el.append('<li class="hour on-hour">'+str+'</li>');
            setTimeout(function () {
                HL.$el.find(".on-hour>div").each(function (index,el) {
                    $(el).css({
                        "transform":"rotate("+rotateArr[index]+"deg)"
                    })
                });
                setTimeout(function () {
                    HL.setMinute();
                },300);
            },100)
        };
        /* 设置分钟 */
        HL.setMinute=function(){
            var str='',rotateArr=[];
            for(var i=1;i<=60;i++){
                rotateArr.push(360/60*(i-1)*-1);
                str+='<div><div>'+(this.changeZHCN(i))+'分</div></div>';
            }
            this.$el.append('<li class="hour minute on-minute">'+str+'</li>');
            setTimeout(function () {
                HL.$el.find(".on-minute>div").each(function (index,el) {
                    $(el).css({
                        "transform":"rotate("+rotateArr[index]+"deg)"
                    })
                });
                setTimeout(function () {
                    HL.setSec();
                },300)
            },100);
        };
        /* 设置秒 */
        HL.setSec=function(){
            var str='',rotateArr=[];
            for(var i=1;i<=60;i++){
                rotateArr.push(360/60*(i-1)*-1);
                str+='<div><div>'+(this.changeZHCN(i))+'秒</div></div>';
            }
            this.$el.append('<li class="hour sec on-sec">'+str+'</li>');
            setTimeout(function () {
                HL.$el.find(".on-sec>div").each(function (index,el) {
                    $(el).css({
                        "transform":"rotate("+rotateArr[index]+"deg)"
                    })
                });
                setTimeout(function () {
                    HL.initRotate();
                },1300);
            },100);
        };
        /* 初始化滚动位置 */
        HL.initRotate=function(){
            this.rotateInfo={
                "h":360/24*(this.dateInfo.hour-1),
                "m":360/60*(this.dateInfo.minute-1),
                "s":360/60*(this.dateInfo.sec-1),
            };
            this.els={
                "date":this.$el.find(".date"),
                "hour":this.$el.find(".on-hour"),
                "minute":this.$el.find(".on-minute"),
                "sec":this.$el.find(".on-sec")
            };
            this.els.hour.css({
                "transform":"rotate("+this.rotateInfo.h+"deg)"
            });
            this.els.minute.css({
                "transform":"rotate("+this.rotateInfo.m+"deg)"
            });
            this.els.sec.css({
                "transform":"rotate("+this.rotateInfo.s+"deg)"
            });
            setTimeout(function () {
                HL.$el.find("hr").addClass("active").css({
                    "width":"49%"
                });
                HL.start();
            },300);
        };
        /* 启动 */
        HL.start=function(){
            setTimeout(function () {
                if(HL.dateInfo.sec<=60){
                    HL.dateInfo.sec++;
                    var r=360/60*(HL.dateInfo.sec-1);
                    HL.els.sec.css({
                        "transform":"rotate("+r+"deg)"
                    });
                    HL.minuteAdd();
                    HL.start();
                }else {
                    console.log(HL.dateInfo.sec)
                }
            },1000);
        };
        /* 分钟数增加 */
        HL.minuteAdd=function(){
            if(HL.dateInfo.sec==60+1){
                setTimeout(function () {
                    HL.els.sec.css({
                        "transform":"rotate(0deg)",
                        "transition-duration": "0s"
                    });
                    HL.dateInfo.sec=1;
                    setTimeout(function () {
                        HL.els.sec.attr("style","transform:rotate(0deg)");
                    },100);
                    HL.dateInfo.minute++;
                    var r=360/60*(HL.dateInfo.minute-1);
                    HL.els.minute.css({
                        "transform":"rotate("+r+"deg)"
                    });
                    HL.hourAdd();
                },300);
            }
        };
        /* 小时数增加 */
        HL.hourAdd=function(){
            if(HL.dateInfo.minute==60+1){
                setTimeout(function () {
                    HL.els.minute.css({
                        "transform":"rotate(0deg)",
                        "transition-duration": "0s"
                    });
                    HL.dateInfo.minute=1;
                    setTimeout(function () {
                        HL.els.minute.attr("style","transform:rotate(0deg)");
                    },100);
                    HL.dateInfo.hour++;
                    var r=360/24*(HL.dateInfo.hour-1);
                    HL.els.hour.css({
                        "transform":"rotate("+r+"deg)"
                    });
                    HL.dayAdd();
                },300);
            }
        };
        /* 天数增加 */
        HL.dayAdd=function(){
            if(HL.dateInfo.hour==24+1){
                setTimeout(function () {
                    HL.els.hour.css({
                        "transform":"rotate(0deg)",
                        "transition-duration": "0s"
                    });
                    HL.dateInfo.hour=1;
                    setTimeout(function () {
                        HL.els.hour.attr("style","transform:rotate(0deg)");
                    },100);

                    var nowDate=new Date();
                    HL.dateInfo.year=nowDate.getFullYear();
                    HL.dateInfo.month=nowDate.getMonth()+1;
                    HL.dateInfo.day=nowDate.getDate();
                    HL.setDate();
                },300);
            }
        };
        /* 初始化 */
        HL.init=function(){
            var nowDate=new Date();
            this.dateInfo={
                "year":nowDate.getFullYear(),
                "month":nowDate.getMonth()+1,
                "day":nowDate.getDate(),
                "hour":nowDate.getHours(),
                "minute":nowDate.getMinutes(),
                "sec":nowDate.getSeconds()
            };
            console.log(this.dateInfo);
            this.setDate();
            this.setHour();
        };
        HL.init();
    }
});
