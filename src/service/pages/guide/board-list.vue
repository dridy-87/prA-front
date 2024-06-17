<template>
  <v-responsive class="border rounded" max-height="300">
    <v-app :theme="theme">
      <v-app-bar class="px-3">
        <v-spacer></v-spacer>
        <!-- <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn> -->
        <!-- {{ useUserStore }} -->
        {{ store.sessionID }}
      </v-app-bar>

      <v-navigation-drawer permanent>
        <v-list>
          <v-list-item title="로그인 성공" @click="login('admin','admin')"></v-list-item>
          <v-list-item title="로그인 실패" @click="login('admin','admin1')"></v-list-item>
          <v-list-item title="RuntimeException" @click="runtimeException"></v-list-item>
          <v-list-item title="Exception" @click="exception"></v-list-item>
          <v-list-item title="invaildSession" @click="invaildSession"></v-list-item>
          <v-list-item title="notAccount" @click="notAccount"></v-list-item>
          <v-list-item title="notfound" @click="notfound"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          {{respons}}
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
  
<script setup>
    import axios from "axios";
    import CryptoJS from "crypto-js";
    import { onMounted, reactive, ref } from "vue";
    import { useUserStore } from '@service/store'
    import { authAxios, testAxios }  from '@system/utils/request'

    const theme = ref('light')
    const respons = ref('')

    
    const store = useUserStore()

    function onClick () {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    function login(id,passwod) {
        const formData = new FormData();
        formData.append('username', id);
        formData.append('password', CryptoJS.SHA256(passwod).toString());
        authAxios.post('/api/login', formData)
          .then((res)=>{
              // alert(JSON.stringify(res.data))
              respons.value = res.data
              useUserStore().setSession(res.data)
              console.log(res.data)
          }).catch(error=>{
            console.log(error)
            respons.value = error
          })
    }

    function exception(){
      testAxios.get('/api/error/exception').then(res=>{
                console.log(res.data)

            }).catch(error=>{
              console.log(error)
              respons.value = error
            })
    }

    function runtimeException() {
      testAxios.get('/api/error/runtimeException').then(res=>{
                console.log(res.data)

            }).catch(error=>{
              console.log(error)
              respons.value = error
            })
    }

    function notAccount() {
      testAxios.get('/api/error/notFound').then(res=>{
                console.log(res.data)

            }).catch(error=>{
              console.log(error)
              respons.value = error
            })
    }

    function notfound() {
      testAxios.get('/api/error/notfound').then(res=>{
                console.log(res.data)

            }).catch(error=>{
              console.log(error)
              respons.value = error
            })
    }

    function invaildSession() {
      testAxios.get('/api/error/invaildSession').then(res=>{
                console.log(res.data)

            }).catch(error=>{
              console.log(error)
              respons.value = error
            })
    }

    onMounted(()=>{
      console.log('s')
    })
    

</script>
  
<style lang="scss">
  
</style>
  