var qiniuImageView2 = require('../libs/qiniuImageView2');

test('簡易圖片生成', () => {
  let imgUrl = 'http://78re52.com1.z0.glb.clouddn.com/resource/gogopher.jpg';
  let options = {
    width: 300,
    height: 300
  };
  expect(qiniuImageView2.formatURL(imgUrl, options)).toBe(imgUrl + '?' + 'imageView2/2/w/300/h/300');
});


test('裁剪正中部分，等比缩小生成500x500缩略图：', () => {
  let imgUrl = 'http://78re52.com1.z0.glb.clouddn.com/resource/gogopher.jpg';
  let options = {
    mode: 1,
    width: 500,
    height: 500
  };
  expect(qiniuImageView2.formatURL(imgUrl, options)).toBe(imgUrl + '?' + 'imageView2/1/w/500/h/500');
});

test('宽度固定为200px，高度等比缩小，生成200x133缩略图', () => {
  let imgUrl = 'http://78re52.com1.z0.glb.clouddn.com/resource/gogopher.jpg';
  let options = {
    mode: 2,
    width: 200
  };
  expect(qiniuImageView2.formatURL(imgUrl, options)).toBe(imgUrl + '?' + 'imageView2/2/w/200');
});


test('高度固定为200px，宽度等比缩小，生成300x200缩略图', () => {
  let imgUrl = 'http://78re52.com1.z0.glb.clouddn.com/resource/gogopher.jpg';
  let options = {
    mode: 2,
    height: 200
  };
  expect(qiniuImageView2.formatURL(imgUrl, options)).toBe(imgUrl + '?' + 'imageView2/2/h/200');
});

test('渐进显示图片', () => {
  let imgUrl = 'http://78re52.com1.z0.glb.clouddn.com/resource/gogopher.jpg';
  let options = {
    mode: 1,
    width: 200,
    height: 200,
    interlace: true
  };
  expect(qiniuImageView2.formatURL(imgUrl, options)).toBe(imgUrl + '?' + 'imageView2/1/w/200/h/200/interlace/1');
});


test('模式1,2,3 缩放或裁切测试', () => {
  let modes = [1, 2, 3];
  let imgUrl = 'http://78re52.com1.z0.glb.clouddn.com/resource/gogopher.jpg';
  for (var i = modes.length - 1; i >= 0; i--) {
    let mode = modes[i];
    let options = {
      mode: modes[i],
      width: (Math.random() * 1000).toFixed(),
      height: (Math.random() * 1000).toFixed(),
    };
    expect(qiniuImageView2.formatURL(imgUrl, options)).toBe(imgUrl + '?' + 'imageView2/' + mode + '/w/' + options.width + '/h/' + options.height);
  }
});

test('模式0,4,5 根据长边短边缩放或裁切', () => {
  let modes = [0, 4, 5];
  let imgUrl = 'http://78re52.com1.z0.glb.clouddn.com/resource/gogopher.jpg';
  for (var i = modes.length - 1; i >= 0; i--) {
    let mode = modes[i];
    let options = {
      mode: modes[i],
      longEdge: (Math.random() * 1000).toFixed(),
      shortEdge: (Math.random() * 1000).toFixed(),
    };
    expect(qiniuImageView2.formatURL(imgUrl, options)).toBe(imgUrl + '?' + 'imageView2/' + mode + '/w/' + options.longEdge + '/h/' + options.shortEdge);
  }
});


test('模式0,4,5 空值测试 throw error', () => {
  let modes = [0, 4, 5];
  let imgUrl = 'http://78re52.com1.z0.glb.clouddn.com/resource/gogopher.jpg';
  for (var i = modes.length - 1; i >= 0; i--) {
    let mode = modes[i];
    let options = {
      mode: modes[i],
    };
    expect( function(){ qiniuImageView2.formatURL(imgUrl, options); } ).toThrow(new Error("longEdge and shortEdge must have a one value."));
  }
});


test('模式1,2,3 空值测试 throw error', () => {
  let modes = [1, 2, 3];
  let imgUrl = 'http://78re52.com1.z0.glb.clouddn.com/resource/gogopher.jpg';
  for (var i = modes.length - 1; i >= 0; i--) {
    let mode = modes[i];
    let options = {
      mode: modes[i],
    };
    expect( function(){ qiniuImageView2.formatURL(imgUrl, options); } ).toThrow(new Error("width and height must have a one value."));
  }
});


