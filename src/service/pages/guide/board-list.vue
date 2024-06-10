<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-toolbar color="secondary">
      <v-btn icon="mdi-menu" variant="text"></v-btn>

      <v-toolbar-title>My files</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-magnify" variant="text"></v-btn>

      <v-btn icon="mdi-view-module" variant="text"></v-btn>
    </v-toolbar>

    <v-list lines="two">
      <v-list-subheader inset>Folders</v-list-subheader>

      <v-list-item
        v-for="folder in folders"
        :key="folder.title"
        :subtitle="folder.subtitle"
        :title="folder.title"
      >
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-1">
            <v-icon color="white">mdi-folder</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-information"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-subheader inset>Files</v-list-subheader>

      <v-list-item
        v-for="file in files"
        :key="file.title"
        :subtitle="file.subtitle"
        :title="file.title"
      >
        <template v-slot:prepend>
          <v-avatar :color="file.color">
            <v-icon color="white">{{ file.icon }}</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-information"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
  
<script setup>
    import axios from "axios";
    import CryptoJS from "crypto-js";
    import { reactive } from "vue";
    import { useUserStore } from '@service/store'

    const store = useUserStore()
    const state = reactive({
        username:'admin',
        password:'admin',
    })
    const func = {
        login: ()=> {
            axios.post('/api/login', {
                    username: state.username,
                    password:CryptoJS.SHA256(state.password).toString()
                },
                {   
                    headers:{
                    'Content-Type': 'multipart/form-data' 
                    }
                }
            ).then((res)=>{
                // alert(JSON.stringify(res.data))

                useUserStore().setSession(res.data)
                console.log(res.data)
            })
        },
        logout:()=>{
            axios.get('/api/logout').then(res=>{
                console.log(res.data)
                useUserStore().logout()
            })
        }
    }

</script>
  
<style lang="scss">
  
</style>
  