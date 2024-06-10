import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
    persist: {
      storage: localStorage //쓰고싶은 스토리지(세션 또는 로컬)
    },
    state: () => {
      return {
        sessionID: '',
        userInfo: {},
        isAuthenticated: false,
      }
    },
    actions: {
      passwordValidator(password) {
        return new Promise((resolve, reject) => {
          request.get({
            url: '/check-password',
            headers: {
              'User-Id': this.getUserId
            },
            params: {
              password
            }
          })
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
        })
      },
      setSession(payload){
        this.sessionID = payload.session
        this.isAuthenticated = true
      },
      setToken(token, expiredTime) {
        this.token = token
        this.expiredTime = dayjs(expiredTime)
        this.isAuthenticated = true
      },
      setUser(payload) {
        this.userInfo = payload
      },
      logout() {
        this.sessionID = ''
        this.userInfo = {}
        this.isAuthenticated = false
        // this.expiredTime = dayjs()
        // this.hasLogout.set(LOGOUT_STATUS_KEY, HAS_LOGOUT.YES)
  
        // useLoginTimerStore().setIsRunning(false)
        // window.location.href = '/'
      },
  
      /**
       * 
       * @param { username, password } payload 
       */
      login(payload) {
        return new Promise((resolve, reject) => {
          request
            .post({
              url: '/login',
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: payload
            })
            .then((res) => {
              if (res.code !== 'SUCCESS') {
                reject(res)
              }
              this.hasLogout.set(LOGOUT_STATUS_KEY, HAS_LOGOUT.NO)
              this.setToken(res.data.accessToken, res.data.accessTokenExpiredTime)
              this.setUser(res.data.userInfo)
              resolve(res)
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      reIsuue() {
        return new Promise((resolve, reject) => {
          request
            .post({
              url: '/re-issue'
            })
            .then(res => {
              this.setToken(res.data.token, res.data.expiredTime)
              this.setUser(res.data.userInfo)
              resolve(res)
            })
            .catch(err => {
              reject(err)
            })
        })
      }
    },
    getters: {
      
    }
  })