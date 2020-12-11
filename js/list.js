$(function(){

  let list = null
  const list_info = {
    sort_method: '价格',
    sort_type: 'ASC',
    current: 1,
    pagesize: 4
  }

  getTotalPage()
  async function getTotalPage() {
    // 2-1. 请求分页数据
    const totalInfo = await $.get('../server/getTotalPage.php', list_info, null, 'json')

    // 2-2. 渲染分页内容
    // jquery-pagination 插件
    $('.pagination').pagination({
      pageCount: totalInfo.total,
      callback (index) {
        list_info.current = index.getCurrent()
        // 从新请求商品列表
        getGoodsList()
      }
    })

  }
  getGoodsList()
  async function getGoodsList() {
    // 3-1. 请求商品列表
    const goodsList = await $.get('../server/getGoodsList.php', list_info, null, 'json')

    // 给全局变量 list 进行赋值
    list = goodsList.list

    // 3-2. 渲染页面
    let str = ''
    goodsList.list.forEach(item => {
      str +=
          `<div>
            <img src="${ item.goods_big_logo }">
            <h3 data-id="${ item.goods_id }">${ item.goods_name }</h3>
            <p>魅族17Pro魅族17Pro魅族17Pro</p>
            <b>￥${ item.goods_price }</b>
         </div>
        `
    })
    $('.photo_1').html(str)
  }
  //点击筛选价格
  $('.bt').on('click', 'span', function () {
    // 7-2. 拿到信息
    const method = $(this).attr('data-method')
    const type = $(this).attr('data-type')

    // 7-3. 切换类名
    $(this).addClass('active').siblings().removeClass('active')

    // 7-4. 修改对象信息
    list_info.sort_method = method
    list_info.sort_type = type

    // 7-5. 从新请求
    getTotalPage()
    getGoodsList()

    // 7-6. 修改 data-type 属性
    // 为下一次准备的
    $(this)
      .attr('data-type', type === 'ASC' ? 'DESC' : 'ASC')
      .siblings()
      .attr('data-type', 'ASC')
  })
  //点击跳转到详情页
  $('.photo_1').on('click', 'h3', function () {
    // 9-2. 拿到 标签身上记录的商品 id
    const id = $(this).data('id')
    // 9-3. 把这个 id 存储到 cookie 中
    setCookie('goods_id', id)
    // 9-4. 进行页面跳转
    window.location.href = './detail.html'
  })




})