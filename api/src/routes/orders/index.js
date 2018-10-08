
module.exports = router => {
  router.get('/orders', ctx => {
    ctx.body = {
      message: 'GET orders'
    }
  })

  router.post('/orders', ctx => {
    ctx.body = {
      message: 'POST orders'
    }
  })
}
