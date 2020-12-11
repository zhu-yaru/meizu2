

//购物车
$(function () {

  let info = null
  const id = getCookie('goods_id')

  getGoodsInfo()
  async function getGoodsInfo() {
    const goodsInfo = await $.get('../server/getGoodsInfo.php', { goods_id: id }, null, 'json')

    // 3. 进行页面的渲染
    bindHtml(goodsInfo.info)

    // 给提前准备好的变量进行赋值
    info = goodsInfo.info
  }

  function bindHtml(info) {
    // console.log(info)

    // 1. 渲染左边放大镜位置
    // $('.box > .detail').html(`
    //     <div class="show">
    //       <img src="${ info.goods_big_logo }">
    //     <div class="mask"></div>
    //     </div>
    //     <div class="list">
    //         <img src="${ info.goods_small_logo }">
    //     </div>
    //     <div class="enlarge"></div>
    //     <div>
    //     <a>收藏</a>
    //     </div>
    // `)

    // 2. 商品详细信息渲染
    $('.wsm').html(`
    <h1 class="desc">${ info.goods_name }</h1>
    <p>【双12狂欢价39元】&nbsp;潮酷印花&nbsp; |&nbsp; 超大容量&nbsp; |&nbsp; 透亮设计</p>
    <div class="one">
        <p>
          <span>双十二狂欢购</span>
          <a>剩余5天</a>
        </p>
        <b class="text-danger">${ info.goods_price }</b>
    </div>
    <div class="two">
      <a>支持</a>
      <a>花呗分期</a>
      <a>花呗分期</a>
      <a>花呗分期</a>
    </div>
    <div class="info">
              <div>
              <select id="s_province" name="s_province"></select>  
              <select id="s_city" name="s_city" ></select>  
              <script class="resources library" src="area.js" type="text/javascript"></script>
              <script type="text/javascript">_init_area();</script>
            </div>
            </div>
    <div class="cp">
      <p>相关产品</p>
      <div>Pandaer系列</div>
      <div>Pandaer系列</div>
    </div>
    <div class="cp">
      <p>产品颜色</p>
      <div>蓝色</div>
      <div>透明</div>
    </div>
    <div class="cp">
      <p>花呗分期</p>
      <div>蓝色</div>
      <div>透明</div>
      <div>透明</div>
    </div>
    <div class="cp">
              <p>数量</p>
              <div class="num">
                <button class="subNum">-</button>
                <input type="text" value="1" class="cartNum">
                <button class="addNum">+</button>
              </div>
            </div>
    <div class="cart">
    <button class="btn addCart">加入购物车</button>
    </div>
    `)
  }
  $('.wsm').on('click', '.addCart', function(){
    console.log('我要加入购物车')
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []
    console.log(info)
    const flag = cart.some(item => item.goods_id === id )
    
    
    // console.log(flag)
    if(flag) {
      const cart_goods = cart.filter(item => item.goods_id === id)[0]
      cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
    }else{
      info.cart_number = 1
      cart.push(info)
    }
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  $('.wsm').on('click', '.subNum', function(){
    let num = $('.cartNum').val() - 0
    if(num === 1) return
    $('.cartNum').val(num - 1)
  })
  $('.wsm').on('click', '.addNum', function(){
    let num = $('.cartNum').val() - 0
    $('.cartNum').val(num + 1)
  })





})

//放大镜
function Enlarge(ele) {
  // 0. 拿到范围元素
  this.ele = document.querySelector(ele)
  // 1. show 盒子
  this.show = this.ele.querySelector('.show')
  // 2. mask 盒子
  this.mask = this.ele.querySelector('.mask')
  // 3. enlarge 盒子
  this.enlarge = this.ele.querySelector('.enlarge')
  // 4. show 盒子的宽高
  // clientWidth 获取元素的尺寸(内容 + padding)
  this.show_width = this.show.clientWidth
  this.show_height = this.show.clientHeight
  // 5. enlarge 盒子的宽高
  // 因为 enlarge 盒子默认是隐藏的, clientWidth 不好使
  // 获取元素非行内样式
  this.enlarge_width = parseInt(window.getComputedStyle(this.enlarge).width)
  this.enlarge_height = parseInt(window.getComputedStyle(this.enlarge).height)
  // 6. 背景图片的尺寸
  // split() 按照你给出的符号切割字符串, 返回值是一个数组
  this.bg_width = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
  this.bg_height = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])
  // 7. 获取列表盒子
  this.list = this.ele.querySelector('.list')

  // 直接启动入口函数
  this.init()
}
Enlarge.prototype.init = function () {
  // init 方法是被实例调用的
  // 所以这个位置的 this 就是当前实例
  this.setScale()
  this.overOut()
  this.move()
  this.change()
}
Enlarge.prototype.setScale = function () {
  // 根据公式计算 mask 盒子的大小
  this.mask_width = this.show_width * this.enlarge_width / this.bg_width
  this.mask_height = this.show_height * this.enlarge_height / this.bg_height

  // 给 mask 盒子进行赋值
  this.mask.style.width = this.mask_width + 'px'
  this.mask.style.height = this.mask_height + 'px'
}
Enlarge.prototype.overOut = function () {
  // 绑定移入事件
  // 之所以写成箭头函数, 是因为写了标准函数以后, 函数内部的 this 变成 show 盒子了
  // 就没有当前实例了, 所以改变了 箭头函数
  this.show.addEventListener('mouseover', () => {
    this.mask.style.display = 'block'
    this.enlarge.style.display = 'block'
  })

  // 绑定移出事件
  this.show.addEventListener('mouseout', () => {
    this.mask.style.display = 'none'
    this.enlarge.style.display = 'none'
  })
}
Enlarge.prototype.move = function () {
  // 给 show 盒子绑定 move 事件
  this.show.addEventListener('mousemove', e => {
    // 处理事件对象兼容
    e = e || window.event
    // 获取坐标点位
    // offsetTop 元素的偏移量, 根据元素参考父级来计算的偏移量
    // this.ele 元素的参考父级, body
    // const x = e.pageX - this.ele.offsetLeft
    // const y = e.pageY - this.ele.offsetTop
    // console.log(x, y)

    // 获取坐标点位
    let x = e.offsetX - this.mask_width / 2
    let y = e.offsetY - this.mask_height / 2

    // 边界值判断
    if (x <= 0) x = 0
    if (y <= 0) y = 0
    if (x >= this.show_width - this.mask_width) x = this.show_width - this.mask_width
    if (y >= this.show_height - this.mask_height) y = this.show_height - this.mask_height

    // 给 msak 盒子进行 left 和 top 的赋值
    this.mask.style.left = x + 'px'
    this.mask.style.top = y + 'px'

    // 根据公式计算出背景图片移动的距离
    const bg_x = this.enlarge_width * x / this.mask_width
    const bg_y = this.enlarge_height * y / this.mask_height

    // 赋值给 enlarge 盒子的 background-position 属性
    this.enlarge.style.backgroundPosition = `-${ bg_x }px -${ bg_y }px`
  })

}
Enlarge.prototype.change = function () {
  // 绑定事件
  this.list.addEventListener('click', e => {
    // 处理事件对象兼容
    e = e || window.event
    // 处理事件目标兼容
    const target = e.target || e.srcElement


    // 判断点击的是哪一个 img 元素
    if (target.nodeName === 'IMG') {
      // 拿到点击元素的身上的自定义属性
      const show_url = target.getAttribute('show')
      const enlarge_url = target.getAttribute('enlarge')

      // 给元素进行赋值
      this.show.firstElementChild.src = show_url
      this.enlarge.style.backgroundImage = `url(${ enlarge_url })`

      // 给所有 p 标签取消 active
      for (let i = 0; i < this.list.children.length; i++) {
        this.list.children[i].classList.remove('active')
      }

      target.parentElement.classList.add('active')
    }
  })
}