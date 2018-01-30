<template>
<div>
  <h1>Register</h1>
  <form>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" id="firstName" v-model="firstName">
      <label class="mdl-textfield__label" for="firstName">First Name</label>
    </div>
    <br>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" id="lastName" v-model="lastName">
      <label class="mdl-textfield__label" for="lastName">Last Name</label>
    </div>
    <br>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="email" id="email" v-model="email">
      <label class="mdl-textfield__label" for="email">Email Address</label>
      <span class="mdl-textfield__error">Not an email address</span>
    </div>
    <br>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="password" id="password" v-model="password">
      <label class="mdl-textfield__label" for="password">Password</label>
    </div>
    <br>
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" @click="register">
      Register
    </button>
  </form>
</div>
</template>

<script>
import authService from '@/services/authService'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async register () { // eslint-disable-next-line
      const response = await authService.register({ 
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>

<style lang="css">
</style>
