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

    export default {
        data() {
            return {
                email: null,
                password: null,

            };
        },
        methods: {
            onSignIn() {

            },

            onSignUp() {
                this.$navigateTo(SignUp)

            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style native>
    @import '~styles/style-one';
</style>