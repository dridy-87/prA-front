<template>
    <div>
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        min-width="700"
        rounded="lg"
      >
       sessionID: {{ store.sessionID }}
        <div class="d-flex text-subtitle-1 text-medium-emphasis">ID</div>
        <v-text-field
            density="compact"
            placeholder="id"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            v-model="state.username"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
        </div>
  
        <v-text-field
          :type="'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="state.password"
        ></v-text-field>
  
        <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
        >
        </v-card>
  
        <v-btn
          v-show="!store.isAuthenticated"
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block

          @click="func.login"
        >
          Log In
        </v-btn>
        <v-btn
          v-show="store.isAuthenticated"
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block

          @click="func.logout"
        >
          Log Out
        </v-btn>
  
        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block

          @click="func.getBoards"
        >
          Board List
        </v-btn>

      </v-card>
    </div>
  </template>
  
<script setup>
    import axios from "axios";
    import CryptoJS from "crypto-js";
    import { reactive } from "vue";
    import { useUserStore } from '@service/store'
    import { authAxios, testAxios }  from '@system/utils/request'


    const store = useUserStore()
    const state = reactive({
        username:'admin',
        password:'admin',
    })
    const func = {
        login: ()=> {
          const formData = new FormData();
          formData.append('username', state.username);
          formData.append('password', CryptoJS.SHA256(state.password).toString());
          authAxios.post('/api/login', formData)
            .then((res)=>{
                // alert(JSON.stringify(res.data))

                useUserStore().setSession(res.data)
                console.log(res.data)
            })
        },
        logout:()=>{
          authAxios.get('/api/logout').then(res=>{
                console.log(res.data)
                useUserStore().logout()
            })
        },
        getBoards:()=>{
          testAxios.get('/api/boards').then(res=>{
                console.log(res.data)

            })

        },

    }

</script>
  
<style lang="scss">
  
</style>
  