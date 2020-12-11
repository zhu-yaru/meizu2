
$(function(){
  const nickname = getCookie('nickname')
  // console.log(nickname)
  if(nickname){
    $('.no').addClass('hide')
    $('.yes').removeClass('hide')
    setCartNum()
  }else{
    $('.yes').addClass('hide')
    $('.no').removeClass('hide')
  }
  function setCartNum(){
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []
    if(!cart.length) {
      $('.cartNum').html('0')
      return
    }
    let count = 0
    cart.forEach(item => count += item.cart_number - 0)
    $('.cartNum').html(count)
  }










})
 
$('.biaoqian > .left > ul > li').mouseenter(function(){
    // console.log(this)
    $(this).addClass('active').siblings().removeClass('active')
    $(this)
    .find('div')
    .stop()
    .slideDown(500)
    .parent()
    .find()
    .siblings()
    .stop()
    .slideUp(1)
})
$('.biaoqian > .left > ul > li').mouseleave(function(){
    // console.log(this)
    $(this)
    .find('div')
    .stop()
    .slideUp(1)
})

let ol = document.querySelector('.ss > ol')

//1. 给 文本框 绑定给一个 input 事件
let inp = document.querySelector('input')
inp.addEventListener('input', function () {

  // 2. 拿到文本框输入的内容
  // trim() 去除首位空格
  const value = this.value.trim()

  if (!value){
  ol.classList.remove('active')
  // console.log(value)
  return
} 

  // 3. 准备发送请求
  // 动态创建 script 标签
  const script = document.createElement('script')
  // 准备一个请求地址
  // wd 这个参数要换成我文本框里面输入的内容
  const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=${value}&req=2&bs=%E5%8D%8E%E4%B8%BA&csor=2&cb=bindHtml&_=1607400194620`
//   const url = `https://www.vmall.com/search_keywords`
  script.src = url
  // 把 script 标签插入到页面里面
  document.body.appendChild(script)
  script.remove()
})

// 全局准备一个 jsonp 的处理函数
function bindHtml(res) {
   console.log(res)


  // 没有 g 这个数据, 就不渲染页面了
  if (!res.g) {
    ol.classList.remove('active')
    return
  }
  // 代码来到这里, 表示有 g 这个数据, 渲染页面
  let str = ''

  for (let i = 0; i < res.g.length; i++) {
    str += `
      <li>${ res.g[i].q }</li>
    `
  }
 ol.innerHTML = str
  // 让 ul 显示出来
  ol.classList.add('active')

}


