<template>
    <Page class="page" @loaded="onLoad">
        <ActionBar class="action-bar" title="Add Score" >
            <NavigationButton @tap="onBack" icon="res://back"/>
        </ActionBar>

        <StackLayout class="form" v-if="! loading">

            <Label class="text-muted font-weight-bold">Home Score</Label>
            <TextField v-model="recentGame.home_score" hint="Home Team Score"
                       editable="true"
                       class="input input-border"></TextField>

            <Label class="text-muted font-weight-bold">Away Score</Label>
            <TextField v-model="recentGame.away_score" hint="Away Team Score"
                       editable="true"
                       class="input input-border"></TextField>

            <Button :isEnabled="! processing"
                    text="Update"
                    @tap="onSubmit" class="btn btn-primary btn-rounded-lg m-t-20"></Button>

        </StackLayout>
        <ActivityIndicator v-else busy="true" width="50" height="50"></ActivityIndicator>
    </Page>
</template>

<script>
    export default {
        props: {
            team: {
                type: Object,
                required: true,
            },
        },

        data() {
            return {
                recentGame: {
                    home_team: {},
                    away_team: {},
                },
                loading: true,
                processing: false
            }
        },

        methods: {
            async onLoad() {
                this.loading = true

                try {
                    let { data: recentGame } = await this.$api.recentEvent(this.team.id)
                    this.recentGame = recentGame
                } catch(e) {
                    alert(e.message)
                } finally {
                    this.loading = false
                }
            },

            async onSubmit() {
                try {
                    await this.$api.client.put(`/events/${this.recentGame.id}`, {
                             home_score: this.recentGame.home_score,
                             away_score: this.recentGame.away_score,
                        })
                    this.onBack()
                } catch (e) {
                    alert(e.message)
                }
            },

            onBack() {
                this.$navigateBack();
            },
        }
    }
</script>

<style scoped>

</style>