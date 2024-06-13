import axios from 'axios';

const { VITE_TEST_API_URL } = import.meta.env

const merge = (target, source) => {
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (let key of Object.keys(source)) {
      if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]))
    }
  
    // Join `target` and modified `source`
    Object.assign(target || {}, source)
    return target
}


function getSessionID() {
    let result = ''
    if (Object.keys(localStorage).includes('userStore')) {
      const { sessionID } = JSON.parse(localStorage.userStore)
      result = sessionID
    }
    return result
  }

// Axios 인스턴스 생성
export const testAxios = axios.create({
    baseURL: VITE_TEST_API_URL, // 기본 URL 설정
    timeout: 10000,                    // 요청 타임아웃 설정 (10초)
});

// 요청 인터셉터 추가
testAxios.interceptors.request.use(
    config => {
        // Authorization 헤더 추가 
        config.headers['Authorization'] = getSessionID();
        
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가 (필요에 따라 사용)
testAxios.interceptors.response.use(
    response => response,
    error => {
        // 오류 처리 로직 (예: 토큰 만료 시 재로그인 처리)
        if (error.response && error.response.status === 401) {
            // 예: 토큰 만료 시 로그아웃 처리
            // localStorage.removeItem('token');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

