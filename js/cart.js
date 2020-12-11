$(function(){
  const cart = JSON.parse(window.localStorage.getItem('cart')) || []
console.log(cart)
  if(!cart.length){
    $('.login').removeClass('hide')
    $('.cart').addClass('hide')
    return
  }

  $('.cart').removeClass('hide')
  $('.login').addClass('hide')
  bindHtml()
  function bindHtml(){
    const selectAll = cart.every(item => item.is_select === '1')
    let total = 0
    let totalMoney = 0
    cart.forEach(item => {
      if(item.is_select === '1'){
        total += item.cart_number - 0
        totalMoney += item.cart_number * item.goods_price
      }
    })

    let str = `
    <div class="cart_1">
      <input type="checkbox" ${selectAll ? 'checked' : ''}>
      <span>全选</span>
      <b>小计</b>
      <a>编辑</a>
    </div>
    <div class="cart_2">
      <input type="checkbox"  ${selectAll ? 'checked' : ''}>
      <span>魅族</span>
      <b>再买80元,即可免运费</b>
      <a>立即凑单></a>
    </div>
    <div class="nr">
       `
       cart.forEach(item => {
         str += `
         <div class="cart_3">
        <input data-id="${item.goods_id}" type="checkbox" ${item.is_select === '0' ? '' : 'checked'}>
        <img src="${item.goods_small_logo}">
        <p>${item.goods_name}</p>
        <div class="a1">
          <span>限时折扣${item.goods_price}</span>
        </div>
        <div class="a2">
          <button class="subNum" data-id="${item.goods_id}">-</button>
          <input type="text" value="${item.cart_number}">
          <button class="addNum" data-id="${item.goods_id}">+</button>
        </div>
        <a>
          <span class="text-danger">￥${item.goods_price * item.cart_number.toFixed(2)}</span>
        </a>
      </div>
         `
       })
       str += `
      
    </div>
    <div class="cart_4">
      <input type="checkbox">
      <span>全选</span>
      <b>删除选中商品</b>
      <b>共一件</b>
      <b>已选择<em class="text-danger cartNum">${total}</em>件</b>
      <p>已优惠<em>0.00</em>元,合计:<em class="text-danger total">￥${totalMoney.toFixed(2)}</em></p>
      <button class="btn btn-success" ${totalMoney === 0 ? 'disabled' : ''}>去结算</button>
    </div>
    `
  $('.cart').html(str)

  }
  $('.cart').on('click', '.cart_3 > input', function(){
    console.log(this)
    const id = $(this).data('id')
    const type = this.checked
    // console.log(id,type)
    const info = cart.filter(item => item.goods_id == id)[0]
    info.is_select = type ? '1' : '0'
    
    bindHtml()

    window.localStorage.setItem('cart', JSON.stringify(cart))

  })
  $('.cart').on('click', '.addNum', function(){
    // console.log(this)
    const id = $(this).data('id')
    const info = cart.filter(item => item.goods_id == id)[0]


    info.cart_number = info.cart_number - 0 + 1
    bindHtml()
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  $('.cart').on('click', '.subNum', function(){
    // console.log(this)
    const id = $(this).data('id')
    const info = cart.filter(item => item.goods_id == id)[0]

    if(info.cart_number === 1) return
    info.cart_number = info.cart_number - 0 - 1
    bindHtml()
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })




  $('.cart').on('click', '.cart_1 > input', function(){
    // console.log(this)
    
    // console.log($('.nr > .cart_3 > input'))
    $('.nr > .cart_3 > input').prop('checked','checked')
  
    
    // bindHtml()

    // window.localStorage.setItem('cart', JSON.stringify(cart))

  })

})