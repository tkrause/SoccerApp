<template>
    <Frame>
        <Page class="page" @loaded="onLoaded">
            <ActionBar class="action-bar" title="Select a Team">
                <NavigationButton @tap="onBack" icon="res://back"/>
            </ActionBar>

            <StackLayout v-if="! loading" class="form">

                <ListView
                          for="team in teams"
                          class="list-group body"
                          separatorColor="transparent"
                          @itemTap="onSelectTeam">
                    <v-template>
                        <StackLayout >
                            <Label class="font-weight-bold" :text="team.name"></Label>
                            <Label :text="team.team_number"></Label>
                        </StackLayout>
                    </v-template>
                </ListView>

            </StackLayout>

            <ActivityIndicator v-else busy="true" width="50" height="50"></ActivityIndicator>
        </Page>
    </Frame>
</template>

<script>
    export default {
        data() {
            return {
                teams: [],
                selected: null,
                loading: true,
            }
        },

        methods: {
            onBack() {
                this.$modal.close()
            },

            onSelectTeam(event) {
                this.$modal.close(event.item)
            },

            async onLoaded() {
                this.loading = true

                try {
                    let {data: teams} = await this.$api.allTeams()
                    this.teams = teams
                } finally {
                    this.loading = false
                }
            }
        },
    }
</script>

<style scoped>
    .item-selected {
        background-color: #F2F3F4;
        border-radius: 8;
    }

    .item {
        padding: 6;
    }

    .item-selected Label {
        color: #283237;
    }
</style>