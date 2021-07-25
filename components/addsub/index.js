Component({
  properties:{
    // 值
    number: {
      type: Number,
      value: 1
    },
    index: {
      type: Number,
      value: 0
    },
    size: {
      type: Number,
      value: 35
    },
  },
  data:{

  },
  methods:{
    add() {
      this.setData({
        number: ++this.data.number
      })
      this.triggerEvent("submit", {
        number:this.data.number,
        index: this.data.index
      })
    },
    sub() {
      if (this.data.number > 1) {
        this.setData({
          number: --this.data.number,
           index: this.data.index
        }) 
      }
      this.triggerEvent("submit", {
        number: this.data.number,
        index: this.data.index
      })
    },
  }
})