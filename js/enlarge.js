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