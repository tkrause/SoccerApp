<template>
    <Page class="page" @loaded="onLoaded">
        <ActionBar class="action-bar" title="Select Team">
            <NavigationButton text="Back" icon="res://back" @tap="onGoBack" />
            <ActionItem icon="res://add"
                        @tap="onAdd"
                        android.position="actionBar"></ActionItem>
        </ActionBar>

        <ListView
            v-if="hasTeams"
            for="team in teams"
            class="list-group"
            separatorColor="transparent"
            @itemTap="onTeamTap">

            <v-template>
                <StackLayout class="list-group-item">
                    <Label :text="team.name" />
                </StackLayout>
            </v-template>
        </ListView>

        <StackLayout v-else horizontalAlignment="center" verticalAlignment="center" margin="20">
            <Label class="h3 text-muted text-center">No Teams Found</Label>
            <Label>You currently do not have any teams.</Label>
            <Label>Click the add button above to get started.</Label>
        </StackLayout>

<!--        <ActivityIndicator :busy="loading"></ActivityIndicator>-->
    </Page>
</template>

<script>
    import Home from './Home'

    import * as appSettings from "tns-core-modules/application-settings";
    import AddTeam from "./AddTeam";
    import Login from "./Login";

    export default {
        props: {
            canGoBack: {
                type: Boolean,
                default: true,
            }
        },

        data() {
            return {
                teams: [],
                loading: false,
            }
        },

        computed: {
            hasTeams() {
                return this.teams.length > 0
            }
        },

        methods: {
            onTeamTap(event) {
                appSettings.setNumber('lastTeam', event.item.id)

                let team = this.teams.find(i => i.id === event.item.id)

                this.$navigateTo(Home, {
                    clearHistory: true,
                    props: {
                        team
                    }
                })
            },

            onGoBack() {
                if (this.canGoBack) {
                    this.$navigateBack()
                } else {
                    this.$api.logout()
                    this.$navigateTo(Login, {
                        clearHistory: true,
                    })
                }
            },

            async onAdd() {
                try {
                    let team = await this.$showModal(AddTeam, {
                        transition: 'slideTop',
                        fullscreen: true,
                    })

                    if (! team)
                        return

                    this.teams.push(team)
                } catch (e) {
                    // cancelled
                }
            },

            async onLoaded() {
                this.loading = true

                try {
                    let { data: teams } = await this.$api.teams()
                    this.teams = teams
                } finally {
                    this.loading = false
                }
            }
        },
    }
</script>