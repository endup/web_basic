const crypto=require('crypto');

module.exports={
//  MD5_SUFFIX:"",
  md5:function(str){
    var obj=crypto.createHash('md5');

    obj.update(str+"%&……￥#&￥&HIHLIHIwoshi别对被hfaoghlfjdaogih#^%^%$^#&^&&^hIGGKKb1561651我是一个孩子");
    return obj.digest('hex');
  }
}
