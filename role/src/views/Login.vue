<template>
  <div>
    <button @click="login('admin')">Iniciar admin</button>
    <button @click="login('editor')">Iniciar editor</button>
    <button @click="login('reader')">Iniciar lector</button>
  </div>
</template>

<script>

import {jwtDecode} from "jwt-decode";

export default {
  name: 'HomeView',

  data(){
    return{

    }
  },

  methods:{
    login(role){
      let token = "";
      switch (role){
        case 'admin':
          token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.UHnffynBjuE3dcwEUyqldVbN-5QzMT-oiyXqkRbWJOI"
          break;
        case 'editor':
          token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZWRpdG9yIn0.O_uqVbz-BOfRRRmyY5bMX0aEg_YmWESE_okCflsM_JA"
          break;
        case  'reader':
          token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidmlld2VyIn0.uoNjQeybe0q6NSVYguZLJCpOg7ftV7b_TW76Cp-3euc"
          break;
      }
      localStorage.setItem("token", token)
      this.auth()
    },

    auth(){
      const {role} = jwtDecode( localStorage.getItem("token"))
      this.$router.push({name: role})
    }
  }
}
</script>
