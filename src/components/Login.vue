<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">

                <Label class="header" text="Soccer Tracking App"></Label>

                <GridLayout rows="auto, auto, auto, auto">

                    <StackLayout row="0" class="input-field">
                        <TextField class="input" hint="Name" :isEnabled="!processing"
                                   keyboardType="name" autocorrect="false"
                                   autocapitalizationType="none" v-model="user.name"
                                   returnKeyType="next" @returnPress="focusPassword"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout row="1" class="input-field">
                        <TextField class="input" hint="Email" :isEnabled="!processing"
                                   keyboardType="email" autocorrect="false"
                                   autocapitalizationType="none" v-model="user.email"
                                   returnKeyType="next" @returnPress="focusPassword"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>


                    <StackLayout row="2" class="input-field">
                        <TextField class="input" ref="password" :isEnabled="!processing"
                                   hint="Password" secure="true" v-model="user.password"
                                   :returnKeyType="isLoggingIn ? 'done' : 'next'"
                                   @returnPress="focusConfirmPassword"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>


                    <StackLayout row="3" v-show="!isLoggingIn" class="input-field">
                        <TextField class="input" ref="confirmPassword"
                                   :isEnabled="!processing" hint="Confirm password"
                                   secure="true" v-model="user.password_confirmation"
                                   returnKeyType="done"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <ActivityIndicator rowSpan="3" :busy="processing"></ActivityIndicator>
                </GridLayout>

                <Button :text="isLoggingIn ? 'Log In' : 'Sign Up'" :isEnabled="!processing"
                        @tap="submit" class="btn btn-primary m-t-20"></Button>
                <Label *v-show="isLoggingIn" text="Forgot your password?"
                       class="login-label" @tap="forgotPassword()"></Label>
            </StackLayout>

            <Label class="login-label sign-up-label" @tap="toggleForm">
                <FormattedString>
                    <Span :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'"></Span>
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
                this.isLoggingIn = !this.isLoggingIn;
            },

            submit() {
                if (!this.user.email || !this.user.password) {
                    this.alert(
                        "Please provide both an email address and password."
                    );
                    return;
                }

                this.processing = true;
                if (this.isLoggingIn) {
                    this.login();
                } else {
                    this.register();
                }
            },

            async login() {
                try {


                    let user = await this.$api
                        .login(this.user.email, this.user.password);

                    this.$navigateTo(Home, {
                        clearHistory: true
                    })

                    } catch (e) {
                    console.log(e);
                    this.alert(
                "Unfortunately we could not find your account."

                    )} finally {
                    this.processing = false;
                }

            },

            register: function () {

                if (this.user.password !== this.user.password_confirmation) {
                    this.alert("Your passwords do not match.");
                    this.processing = false;
                    return;
                }

                this.$api
                    .register(this.user)
                    .then(() => {
                        this.processing = false;
                        this.alert(
                            "Your account was successfully created.");
                        this.isLoggingIn = true;
                    })
                    .catch(() => {
                        this.processing = false;
                        this.alert(
                            "Unfortunately we were unable to create your account."
                        );
                    });
            },

            forgotPassword() {
                prompt({
                    title: "Forgot Password",
                    message: "Enter the email address you used to register for Soccer Tracking App to reset your password.",
                    inputType: "email",
                    defaultText: "",
                    okButtonText: "Ok",
                    cancelButtonText: "Cancel"
                }).then(data => {
                    if (data.result) {
                        this.$api
                            .resetPassword(data.text.trim())
                            .then(() => {
                                this.alert(
                                    "Your password was successfully reset. Please check your email for instructions on choosing a new password."
                                );
                            })
                            .catch(() => {
                                this.alert(
                                    "Unfortunately, an error occurred resetting your password."
                                );
                            });
                    }
                });
            },

            focusPassword() {
                this.$refs.password.nativeView.focus();
            },
            focusConfirmPassword() {
                if (!this.isLoggingIn) {
                    this.$refs.confirmPassword.nativeView.focus();
                }
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


<style scoped>
    .page {
        align-items: center;
        flex-direction: column;
    }

    .form {
        margin-left: 30px;
        margin-right: 30px;
        flex-grow: 2;
        vertical-align: middle;
    }


    .header {
        horizontal-align: center;
        font-size: 28px;
        font: bold, 70x ,Arial, sans-serif;
        font-weight: 600;
        margin-bottom: 70px;
        text-align: center;
        color: rgb(23, 185, 200);
    }

    .input-field {
        margin-bottom: 25px;
    }

    .input {
        font-size: 18px;
        placeholder-color: rgba(24, 179, 206, 0.808);
    }

    .input:disabled {
        background-color: #64e6ff;
        opacity: 0.5;
    }

    .btn-primary {
        margin: 30px 5px 15px 5px;
    }

    .login-label {
        horizontal-align: center;
        color: #A8A8A8;
        font-size: 16px;
    }

    .sign-up-label {
        margin-bottom: 20px;
    }

    .bold {
        color: #000000;
    }
</style>



<style native>
    @import '~styles/style-one';
</style>