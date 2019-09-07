<template>

    <Page class="page" backgroundImage="https://daily.jstor.org/wp-content/uploads/2018/06/soccer_europe_1050x700.jpg">
        <ActionBar title="Soccer League" class="action-bar" />
        <ScrollView>

            <StackLayout class="home-panel">
                <!--Add your page content here-->
                <TextField v-model="email" id="email"
                           hint="Email" autocorrect="false" autocapitalizationType="none" />
                <TextField v-model="password" secure="true"
                           hint="Password" />
                <Button class="signIn" text="Sign In" @tap="onSignIn" />
                <Button class="signUp" text="Sign Up" @tap="onSignUp" />

            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import SignUp from "./SignUp";
    import Home from "./Home";

    export default {
        data() {
            return {
                // TODO: make these null to start with when done testing
                email: 'user@example.com',
                password: '0987654321',
            };
        },
        methods: {
            async onSignIn() {
                try {
                    let user = await this.$api.login(this.email, this.password)
                    this.$navigateTo(Home, { clearHistory: true })
                } catch (e) {
                    // TODO: handle validation errors
                    // if e.response.statusCode is null
                    // then it was a network error and the server is probably down.
                    // data will contain errors in JSON if it was a validation error

                    console.log(e.response.data)
                }
            },

            onSignUp() {
                this.$navigateTo(Home, { clearHistory: true })
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style native>
    @import '~styles/style-one';
</style>