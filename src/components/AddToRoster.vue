<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Add to Roster">
            <NavigationButton @tap="onBack" icon="res://back"/>
        </ActionBar>

        <StackLayout class="form">
            <TextField hint="Email"
                       class="input input-rounded input-border"
                       v-model="form.email"/>

            <TextField hint="Name"
                       class="input input-rounded input-border"
                       v-model="form.name"/>

            <Label :text="form.role"
                   class="input input-rounded input-rounded"
                   @tap="onSelectRole"></Label>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        props: {
            team: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {
                form: {
                    email: null,
                    name: null,
                    role: 'Player',
                },
                roles: [
                    'Player',
                    'Coach',
                    'Admin',
                ],
            }
        },
        methods: {
            onBack() {
                this.$navigateBack();
            },
            async onSelectRole() {
                try {
                    let result = await action("Select a Role", "Cancel", this.roles)
                    console.log(result)
                    this.form.role = result
                } catch (e) { }
            },
        }
    }
</script>

<style scoped>
    .form .input {
        padding: 8;
        margin-bottom: 20;
    }

    .form {
        margin: 20;
    }
</style>