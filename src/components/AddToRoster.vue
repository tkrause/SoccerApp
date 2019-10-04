<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Add to Roster">
            <NavigationButton @tap="onBack" icon="res://back"/>
        </ActionBar>

        <StackLayout class="form">
            <TextField hint="Select a User"
                       editable="false"
                       :text="name"
                       @tap="onSelectUser"
                       class="input input-rounded input-border"></TextField>

            <Label :text="form.role"
                   class="input input-rounded input-rounded"
                   @tap="onSelectRole"></Label>

            <TextField hint="Jersey Number"
                       :text="form.jersey_number"
                       class="input input-rounded input-border"></TextField>

            <Button :isEnabled="! processing"
                    text="Add"
                    @tap="onSubmit" class="btn btn-primary btn-rounded-lg m-t-20"></Button>
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
                processing: false,
                form: {
                    user: null,
                    jersey_number: null,
                    role: 'Player',
                },
                roles: [
                    'Player',
                    'Coach',
                    'Admin',
                ],
                members: [],
            }
        },

        computed: {
            name() {
                return this.form.user?.name
            },
        },

        watch: {
            members: {
                handler(newMembers) {
                    if (! newMembers || newMembers?.length <= 0) {
                        this.form.jersey_number = null
                        return
                    }

                    // get all the current numbers, remove nulls
                    let numbers = newMembers.map(m => m.jersey_number).filter(x => x)
                    // get the max number
                    let jersey = String(Math.max(...numbers))
                    // now add one to it, if it's prefixed, we need to prefix it
                    let isPrefixed = jersey.startsWith('0')
                    let padLen = jersey.length
                    jersey = parseInt(jersey) + 1

                    // if prefixed, pad to same size with 0's
                    jersey = isPrefixed ? String(jersey).padStart(padLen, '0') : jersey

                    this.form.jersey_number = jersey
                },
                deep: true,
                immediate: true,
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
            },

            async onSubmit() {
                try {
                    let response = await this.$api.client.post(`/teams/${this.team.id}/members`, {
                        user_id: this.form.user?.id,
                        role: this.form.role?.toLowerCase(),
                        jersey_number: this.form.jersey_number,
                    })

                    this.onBack()
                } catch (e) {
                    alert(e.message)
                }
            }
        },

        async created() {
            let { data: members } = this.$api.teamMembers(this.team.id)
            this.members = members
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