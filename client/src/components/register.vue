<template>
<v-card>
  <v-card-title>
    <span class="headline">Register New User</span>
  </v-card-title>
  <v-card-text>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex xs12 sm6>
          <v-text-field
            name="firstName"
            label="First Name"
            id="firstName"
            v-model="firstName"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            name="lastName"
            label="Last Name"
            id="lastName"
            v-model="lastName"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm12>
          <v-text-field
            name="email"
            label="Email Address"
            id="email"
            v-model="email"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm12>
          <v-text-field
            name="password"
            label="Password"
            id="password"
            v-model="password"
            type="password"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-alert v-bind:color="alert.type" value="true">
      {{alert.msg}}
    </v-alert>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="primary" dark @click="register">Register</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import authService from '@/services/authService'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      alert: {
        type: 'info',
        msg: 'Complete form to register'
      }
    }
  },
  methods: {
    async register () {
      try {
        await authService.register({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        })
        this.alert.type = 'success'
        this.alert.msg = 'Registration Successful'
      } catch (error) {
        this.alert.type = 'error'
        this.alert.msg = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
