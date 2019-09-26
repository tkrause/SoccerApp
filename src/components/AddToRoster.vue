<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Add to Roster">
            <NavigationButton @tap="onBack" icon="res://back"/>
        </ActionBar>

        <StackLayout class="form">
            <StackLayout>
                <TextField hint="Select a User"
                           editable="false"
                           :text="name"
                           @tap="onSelectUser"
                           class="input input-rounded input-border"></TextField>
            </StackLayout>

            <Label :text="form.role"
                   class="input input-rounded input-rounded"
                   @tap="onSelectRole"></Label>
        </StackLayout>
    </Page>
</template>

<script>
    import SelectUser from "./SelectUser";

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
                    user: null,
                    role: 'Player',
                },
                roles: [
                    'Player',
                    'Coach',
                    'Admin',
                ],
            }
        },
        computed: {
            name() {
                return this.form.user?.name
            }
        },
        methods: {
            onBack() {
                this.$navigateBack();
            },

            async onSelectRole() {
                try {
                    let result = await action("Select a Role", "Cancel", this.roles)
                    this.form.role = result
                } catch (e) { }
            },
            async onSelectUser() {
                this.form.user = await this.$showModal(SelectUser, {
                    transition: 'slideTop',
                    fullscreen: true,
                })
            }
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