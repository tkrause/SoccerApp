import axios from 'axios'
// import * as appSettings from "tns-core-modules/application-settings";

export default class ApiService {

    constructor(opts = {}) {
        const defaults = {
            baseURL: process.env.VUE_APP_API_ENDPOINT || 'http://10.0.2.2:3001',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }

        this.current_user = null
        this.jwt = null
        // create the axios client from options
        this.client = axios.create({...defaults, ...opts})
        this.client.interceptors.request.use(config => {
            const token = this.jwt ? this.jwt.token : null

            if ( token != null ) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        }, err => {
            return Promise.reject(err);
        })

        this.client.interceptors.response.use(response => response, err => {
            if (err.response.status === null) {
                err.message = 'Server connection error'
            }

            return Promise.reject(err)
        })
    }

    user() {
        return this.current_user
    }

    // we're logged in if we have a user set and a token
    isLoggedIn() {
        return this.user() && this.jwt
    }

    // login in using email and password
    async login(email, password) {
        let {data: jwt} = await this.client.post('/login', {
            email,
            password
        })

        this.jwt = jwt

        // now grab the user that we're logged in as
        let {data: user} = await this.client.get('/users/current')
        this.current_user = user

        return user
    }

    logout() {
        this.current_user = null
        this.jwt = null
    }

    register(data) {
        return this.client.post('/users', data)
    }

    invite(data) {
        return this.client.post('/users/invite', data)
    }

    userSearch(email) {
        return this.client.post(`/users/search`, {
            email,
        })
    }

    teams() {
        return this.client.get('/teams')
    }

    team(id) {
        return this.client.get(`/teams/${id}`)
    }

    events() {
        return this.client.get(`/events`)
    }

    eventsForTeam(id) {
        return this.client.get(`/teams/${id}/events`)
    }

    nextEvent(teamId) {
        return this.client.get(`/teams/${teamId}/events/next`)
    }

    recentEvent(teamId) {
        return this.client.get(`/teams/${teamId}/events/recent`)
    }

    teamMembers(id) {
        return this.client.get(`/teams/${id}/members`)
    }
    allTeams() {
        return this.client.get('/teams/all')
    }
}
