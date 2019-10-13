<template>
    <NoConnection v-if="! connected"></NoConnection>
    <Login v-else></Login>
</template>

<script>
    import * as Connectivity from 'tns-core-modules/connectivity'
    import NoConnection from "./NoConnection";
    import Login from "./Login";

    export default {
        components: {
            NoConnection,
            Login
        },

        data() {
            return {
                connected: true,
            }
        },

        created() {
            Connectivity.startMonitoring(conn => {
                this.connected = conn !== Connectivity.connectionType.none;
            })
        }
    }
</script>

<style scoped>

</style>