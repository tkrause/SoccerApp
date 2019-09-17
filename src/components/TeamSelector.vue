<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Select Team">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onGoBack" />
        </ActionBar>

        <ListView
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

<!--        <ActivityIndicator :busy="loading"></ActivityIndicator>-->
    </Page>
</template>

<script>
    import Home from './Home'

    import * as appSettings from "tns-core-modules/application-settings";

    export default {
        data() {
            return {
                teams: [],
                loading: false,
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
                this.$navigateBack()
            }
        },
        async created() {
            this.loading = true

            try {
                let { data: teams } = await this.$api.teams()
                this.teams = teams
            } finally {
                this.loading = false
            }
        }
    }
</script>