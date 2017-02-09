/**
 * qiniu imageView2 Api
 * @author zhouziyao@fangdd.com
 * @description imageView2 是 imageView 接口的更新版本，实现略有差异，功能更为丰富。同样，只需要填写几个参数即可对图片进行缩略操作，
 *              生成各种缩略图。imageView2接口可支持处理的原图片格式有psd、jpeg、png、gif、webp、tiff、bmp。
 *
 */
var qiniuImageView2 = {
  /**
   * @param {String} imgUrl
   * @param {Object} options qiniu imageView2 Support args.
   * @return {String} Image url
   */
  formatURL: function(imgUrl, options) {
    var self = this;
    /**
     * [defaultOptions description]
     * @type {Object}
     */
    var defaultOptions = {
      /**
       * [mode 限定缩略图模式]
       * @type Number
       * @var {0}
       * 限定缩略图的长边最多为<LongEdge>，短边最多为<ShortEdge>，进行等比缩放，
       * 不裁剪。如果只指定 w 参数则表示限定长边（短边自适应），只指定 h 参数则表示限定短边（长边自适应）。
       * @var {1}
       * 限定缩略图的宽最少为<Width>，高最少为<Height>，进行等比缩放，居中裁剪。
       * 转后的缩略图通常恰好是<Width>x<Height>的大小有一个边缩放的时候会因为超出矩形框而被裁剪掉多余部分。
       * 如果只指定 w 参数或只指定 h 参数，代表限定为长宽相等的正方图。
       * @var {2}
       * 限定缩略图的宽最多为<Width>，高最多为<Height>，进行等比缩放，不裁剪。如果只指定 w 参数则表示限定宽（长自适应），只指定 h 参数则表示限定长（宽自适应）。
       * 它和模式0类似，区别只是限定宽和高，不是限定长边和短边。从应用场景来说，模式0适合移动设备上做缩略图，模式2适合PC上做缩略图。
       * @var {3}
       * 限定缩略图的宽最少为<Width>，高最少为<Height>，进行等比缩放，不裁剪。如果只指定 w 参数或只指定 h 参数，代表长宽限定为同样的值。
       * 你可以理解为模式1是模式3的结果再做居中裁剪得到的。
       * @var {4}
       * 限定缩略图的长边最少为<LongEdge>，短边最少为<ShortEdge>，进行等比缩放，不裁剪。如果只指定 w 参数或只指定 h 参数，表示长边短边限定为同样的值。
       * 这个模式很适合在手持设备做图片的全屏查看（把这里的长边短边分别设为手机屏幕的分辨率即可），生成的图片尺寸刚好充满整个屏幕（某一个边可能会超出屏幕）。
       * @var {5}
       * 限定缩略图的长边最少为<LongEdge>，短边最少为<ShortEdge>，进行等比缩放，居中裁剪。如果只指定 w 参数或只指定 h 参数，表示长边短边限定为同样的值。
       * 同上模式4，但超出限定的矩形部分会被裁剪。
       *
       */
      mode: 2,
      /**
       * 长边
       * @type {Number}
       */
      longEdge: null,
      /**
       * 短边
       * @type {Number}
       */
      shortEdge: null,
      /**
       * 长
       * @type {Number}
       */
      width: null,
      /**
       * 宽
       * @type {Number}
       */
      height: null,
      /**
       * 新图的输出格式取值范围：jpg，gif，png，webp等，默认为原图格式。参考支持转换的图片格式 http://www.imagemagick.org/script/formats.php。
       * @type {String}
       */
      format: null,
      /**
       * 是否支持渐进显示取值范围：适用目标格式：jpg效果：网速慢时，图片显示由模糊到清晰。
       * 1 支持渐进显示
       * 0 不支持渐进显示(默认为0)
       * @type {Number}
       */
      interlace: false,
      /**
       * 取值范围是[1, 100]，默认75, 支持图片类型：jpg。
       * 七牛会根据原图质量算出一个修正值，取修正值和指定值中的小值。
       * ● 如果图片的质量值本身大于90，会根据指定值进行处理，此时修正值会失效。
       * ● 指定值后面可以增加 !，表示强制使用指定值，如100!。
       * ● 支持图片类型：jpg
       * @type {Number}
       */
      quality: 75,
      /**
       * 可选
       * ● 未设置此参数时，正常返回处理结果。
       * ● 设置了此参数时，若图像处理的结果失败，则返回原图。
       * ● 设置了此参数时，若图像处理的结果成功，则正常返回处理结果。
       * @type {Boolean}
       *
       */
      ignoreError: false,
      /**
       * Todo 尚未实作
       * 下载服务器域名，可为七牛三级域名或自定义二级域名，参考七牛自定义域名绑定流程。
       * @type {String}
       */
      host: ''
    };
    var opts = this.extend(defaultOptions, options);
    return imgUrl + '?' + self.generatorUrl(opts);
  },
  generatorUrl: function(opts) {
    /**
     * imageView2/<mode>/w/<LongEdge>
     * /h/<ShortEdge>
     * /format/<Format>
     * /interlace/<Interlace>
     * /q/<Quality>
     * /ignore-error/<ignoreError>
     */

    // Prefix
    var qs = [];
    qs.push('imageView2');

    // Mode
    qs.push(opts.mode);

    switch (opts.mode.toString()) {
      case '0':
      case '4':
      case '5':
        if (!(opts.longEdge || opts.shortEdge)) {
          throw new Error('longEdge and shortEdge must have a one value.');
        }
        if (opts.longEdge) {
          qs.push('w', opts.longEdge);
        }
        if (opts.shortEdge) {
          qs.push('h', opts.shortEdge);
        }
        break;
      case '1':
      case '2':
      case '3':
        if (!(opts.width || opts.height)) {
          throw new Error('width and height must have a one value.');
        }

        if (opts.width) {
          qs.push('w', opts.width);
        }
        if (opts.height) {
          qs.push('h', opts.height);
        }
        break;
      default:
        break;
    }

    // Image Format JPG GIF PSD .....
    if (opts.format) {
      qs.push('format', opts.format);
    }

    // Interlace
    if (opts.format) {
      qs.push('format', opts.format);
    }

    if (opts.interlace) {
      qs.push('interlace', 1);
    }

    //  新图的图片质量不設定為 75
    if (opts.quality && opts.quality.toString() !== '75') {
      qs.push('q', opts.quality);
    }

    // 设置1失败会返回原图
    if (opts.ignoreError) {
      qs.push('ignore-error', 1);
    }
    return qs.join('/');
  },
  extend: function(a, b) {
    var i = 0;
    var key;
    for (i; i < Object.keys(b).length; i++) {
      key = Object.keys(b)[i];
      if (this.hasOwnProp(b, key)) {
        a[key] = b[key];
      }
    }

    if (this.hasOwnProp(b, 'toString')) {
      a.toString = b.toString;
    }

    if (this.hasOwnProp(b, 'valueOf')) {
      a.valueOf = b.valueOf;
    }
    return a;
  },
  hasOwnProp: function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
};

module.exports = qiniuImageView2;
