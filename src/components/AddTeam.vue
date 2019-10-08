<template>
    <Frame>
        <Page class="page">
            <ActionBar class="action-bar" title="Create Team" >
                <NavigationButton @tap="onBack" icon="res://back"/>
            </ActionBar>

            <StackLayout class="form">

                <TextField v-model="form.name" hint="Team Name"
                           class="input input-rounded input-border"></TextField>

                <TextField v-model="form.team_number" hint="Team Number"
                           class="input input-rounded input-border"></TextField>

                <Button :isEnabled="! processing"
                        text="Create Team"
                        @tap="onSubmit" class="btn btn-primary btn-rounded-lg m-t-20"></Button>
            </StackLayout>

            <ActivityIndicator v-if="processing" busy="true" width="50" height="50"></ActivityIndicator>
        </Page>
    </Frame>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: null,
                    team_number: null,
                },
                processing: false
            }
        },
        methods: {
            async onSubmit() {
                try {
                    let { data: team } = await this.$api.client.post(`/teams`, this.form)

                    await this.$modal.close(team)
                } catch (e) {
                    alert(e.message)
                }
            },
            onBack() {
                this.$modal.close();
            },
        }
    }
</script>

<style scoped>

</style>