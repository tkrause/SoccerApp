<template>

    <Page class="page" >
        <ActionBar title="Sign Up" class="action-bar" />
        <ScrollView>

                            <StackLayout class="home-panel">
                                <!--Add your page content here-->
                                <TextField v-model="Name" id="Name"
                                           hint="Name" autocorrect="false" autocapitalizationType="none" />
                                <TextField v-model="email" id="email"
                                           hint="email" autocorrect="false" autocapitalizationType="none" />
                                <TextField v-model="password" secure="true"
                                           hint="Password" />
                                <TextField v-model="password2" secure="true"
                                                                   hint="Re-enter Password" />
                                <Button class="Create" text="Create Account" @tap="onSignIn" />


                            </StackLayout>
                </ScrollView>
    </Page>
</template>


<script>
    export default {
        data(){
            return{
                Name:null,
                email:null,
                password:null,
                password2:null,
            }
        }
    }
</script>

<style scoped>

</style>