var Canvas = {};

Canvas.cxt = document.getElementById('canvasId').getContext('2d');

Canvas.Point = function(x, y){
    this.x = x;
    this.y = y;
};

/*����canvas�ϵ�����ͼ��*/
Canvas.clearCxt = function(){
    //var me = this;
    var canvas = this.cxt.canvas;
       this.cxt.clearRect(0,0, canvas.offsetWidth, canvas.offsetHeight);//������Χ�ڵ�����ͼ��
};

/*ʱ��*/
Canvas.Clock = function(){
    var me = Canvas,
        c = me.cxt,
        radius = 150, /*�뾶*/
        scale = 20, /*�̶ȳ���*/
        minangle = (1/30)*Math.PI, /*һ���ӵĻ���*/
        hourangle = (1/6)*Math.PI, /*һСʱ�Ļ���*/
        hourHandLength = radius/2, /*ʱ�볤��*/
        minHandLength = radius/3*2, /*���볤��*/
        secHandLength = radius/10*9, /*���볤��*/
        center = new me.Point(c.canvas.width/2, c.canvas.height/2); /*Բ��*/
   
    /*����Բ�ģ��������ģ�*/
    function drawCenter(){
        c.save();

        c.translate(center.x, center.y); 

        c.fillStyle = 'black';
        c.beginPath();
        c.arc(0, 0, radius/20, 0, 2*Math.PI);
        c.closePath();
        c.fill();
        c.stroke();

        c.restore();
    };

    /*ͨ������任���Ʊ���*/
    function drawBackGround(){
        c.save();

        c.translate(center.x, center.y); /*ƽ�Ʊ任*/
        /*���ƿ̶�*/
        function drawScale(){
           c.moveTo(radius - scale, 0);
           c.lineTo(radius, 0); 
        };

        c.beginPath();
        c.arc(0, 0, radius, 0, 2*Math.PI, true);
        c.closePath();
    
        for (var i = 1; i <= 12; i++) {
           drawScale();
           c.rotate(hourangle); /*��ת�任*/
        };
        /*����ʱ��(3,6,9,12)*/
        c.font = " bold 30px impack"
        c.fillText("3", 110, 10);
        c.fillText("6", -7, 120);
        c.fillText("9", -120, 10);
        c.fillText("12", -16, -100);
        c.stroke();

        c.restore();
    };

    /*����ʱ��(h: ��ǰʱ��24Сʱ�ƣ�)*/
    this.drawHourHand = function(h){

        h = h === 0? 24: h;

        c.save();
        c.translate(center.x, center.y); 
        c.rotate(3/2*Math.PI);

        c.rotate(h*hourangle);

        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(hourHandLength, 0);
        c.stroke();
        c.restore();
    };

    /*���Ʒ��루m: ��ǰ�֣�*/
    this.drawMinHand = function(m){

        m = m === 0? 60: m;

        c.save();
        c.translate(center.x, center.y); 
        c.rotate(3/2*Math.PI);

        c.rotate(m*minangle);

        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(minHandLength, 0);
        c.stroke();
        c.restore();
    };

    /*�������루s����ǰ�룩*/
    this.drawSecHand = function(s){

        s = s === 0? 60: s;

        c.save();
        c.translate(center.x, center.y); 
        c.rotate(3/2*Math.PI);

        c.rotate(s*minangle);

        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(secHandLength, 0);
        c.stroke();
        c.restore();
    };

    /*���ݱ���ʱ�����ʱ��*/
    this.drawClock = function(){
        var me = this;
 
        function draw(){
           var date = new Date();

           Canvas.clearCxt();

           drawBackGround();
           drawCenter();
           me.drawHourHand(date.getHours() + date.getMinutes()/60);
           me.drawMinHand(date.getMinutes() + date.getSeconds()/60);
           me.drawSecHand(date.getSeconds());
        }
        draw();
        setInterval(draw, 1000);
    };  
};

 var main = function(){
    var clock = new Canvas.Clock();
    clock.drawClock();
};