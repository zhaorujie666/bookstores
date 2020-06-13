<template>
  <div>
    <input id="file" @change="inputChange($event)" />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {}
  },
  methods: {
    test () {
      document.getElementById('file').value = '123'
    },
    inputChange (event) {
      let form = new FormData()
      let file = document.getElementById('file').files[0]

      form.append('imageFile', file, file.name)
      form.append('access_token', JSON.parse(sessionStorage.getItem('userInfo')).access_token)

      console.log(form)
      axios({
        method: 'post',
        url: 'http://29916786qq.zicp.vip/pc/imageUpload/uploadImage',
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(data => {
        console.log('data', data)
      })
      // console.log(form)
      // console.log(file)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
