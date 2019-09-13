<template>
    <Page class="page" actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">

                <Label class="header text-white" text="Soccer League"></Label>

                <GridLayout rows="auto, auto, auto, auto">

                    <TextField
                            row="0"
                            v-show="! isLoggingIn"
                            :isEnabled="! processing"
                            v-model="user.name"
                            class="input input-rounded input-border"
                            hint="Name"
                            keyboardType="name"
                            autocorrect="false"
                            autocapitalizationType="none"
                            returnKeyType="next"></TextField>

                    <TextField
                            row="1"
                            :isEnabled="! processing"
                            v-model="user.email"
                            class="input input-rounded input-border"
                            hint="Email"
                            keyboardType="email"
                            autocorrect="false"
                            autocapitalizationType="none"
                            returnKeyType="next"></TextField>

                    <TextField
                            row="2"
                            :isEnabled="! processing"
                            v-model="user.password"
                            class="input input-rounded input-border"
                            hint="Password"
                            secure="true"
                            :returnKeyType="isLoggingIn ? 'done' : 'next'"
                            @returnPress="onReturnPassword"></TextField>

                    <TextField
                            row="3"
                            v-show="! isLoggingIn"
                            :isEnabled="! processing"
                            v-model="user.password_confirmation"
                            class="input input-rounded input-border"
                            hint="Confirm password"
                            secure="true"
                            returnKeyType="done"></TextField>

                    <ActivityIndicator rowSpan="3" :busy="processing"></ActivityIndicator>
                </GridLayout>

                <Button
                        :isEnabled="! processing"
                        :text="isLoggingIn ? 'Log In' : 'Create Account'"
                        @tap="submit" class="btn btn-primary btn-rounded-lg m-t-20"></Button>

                <Label
                        v-show="isLoggingIn"
                        text="Forgot your password?"
                        class="login-label" @tap="forgotPassword()"></Label>
            </StackLayout>

            <Label class="login-label sign-up-label" @tap="toggleForm">
                <FormattedString>
                    <Span :text="isLoggingIn ? 'Don’t have an account? ' : 'Already have an account?'"></Span>
                    <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold"></Span>
                </FormattedString>
            </Label>
        </FlexboxLayout>
    </Page>
</template>
<script>
    import Home from "./Home";

    export default {
        data() {
            return {
                isLoggingIn: true,
                processing: false,
                user: {
                    name: null,
                    email: "user@example.com",
                    password: "0987654321",
                    password_confirmation: null
                }
            };
        },
        methods: {
            toggleForm() {
                this.isLoggingIn = ! this.isLoggingIn;
            },

            submit() {
                if (! this.user.email || ! this.user.password) {
                    this.alert("Please provide both an email address and password.");

                    return;
                }

                if (this.isLoggingIn) {
                    this.login();
                } else {
                    this.register();
                }
            },

            async login() {
                this.processing = true;

                try {
                    await this.$api.login(this.user.email, this.user.password);

                    this.$navigateTo(Home, {
                        clearHistory: true
                    })
                } catch (e) {
                    this.alert(e.message)
                    console.log(e);
                    // this.alert("Unfortunately we could not find your account.")
                } finally {
                    this.processing = false;
                }

            },

            async register() {
                if (this.user.password !== this.user.password_confirmation) {
                    this.alert("Your passwords do not match.");

                    return;
                }

                this.processing = true;

                try {
                    await this.$api.register(this.user)

                    this.isLoggingIn = true
                    this.alert("Your account was successfully created.")
                } catch (e) {
                    this.alert("Unfortunately we were unable to create your account.")
                } finally {
                    this.processing = false
                }
            },

            async forgotPassword() {
                // prompt({
                //     title: "Forgot Password",
                //     message: "Enter the email address you used to register for Soccer Tracking App to reset your password.",
                //     inputType: "email",
                //     defaultText: "",
                //     okButtonText: "Ok",
                //     cancelButtonText: "Cancel"
                // }).then(data => {
                //     if (data.result) {
                //         this.$api
                //             .resetPassword(data.text.trim())
                //             .then(() => {
                //                 this.alert(
                //                     "Your password was successfully reset. Please check your email for instructions on choosing a new password."
                //                 );
                //             })
                //             .catch(() => {
                //                 this.alert(
                //                     "Unfortunately, an error occurred resetting your password."
                //                 );
                //             });
                //     }
                // });
            },

            onReturnPassword() {
                // if we're signing up do nothing
                if (! this.isLoggingIn)
                    return

                this.submit()
            },

            alert(message) {
                return alert({
                    title: "Soccer Tracking App",
                    okButtonText: "OK",
                    message: message
                });
            }
        }
    };
</script>


<style lang="css" scoped>
    .page {
        align-items: center;
        flex-direction: column;
        background-color: #D34C46;
    }

    .form .input {
        background-color: #fff;
        padding: 10;
        margin-bottom: 20;

        color: #dba4a4;
    }

    .form {
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .logo {
        margin-bottom: 12;
        height: 90;
        font-weight: bold;
    }

    .header {
        horizontal-align: center;
        font-size: 35;
        font-weight: 600;
        margin-bottom: 70;
        text-align: center;
        color: #ffffff;
    }

    /*.input-field {*/
    /*    margin-bottom: 25;*/
    /*}*/

    .btn-primary {
        margin: 30 5 15 5;
    }

    .login-label {
        horizontal-align: center;
        color: #ffe6e6;
        font-size: 16;
    }

    .sign-up-label {
        margin-bottom: 20;
    }

</style>