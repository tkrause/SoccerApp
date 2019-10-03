<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Select a Team">
            <NavigationButton @tap="onBack" icon="res://back"/>
        </ActionBar>

        <StackLayout class="form">

            <ListView
                      for="team in teams"
                      class="list-group body"
                      separatorColor="transparent"
                      @itemTap="onSelectTeam">
                <v-template>
                    <StackLayout >
                        <Label class="font-weight-bold" :text="team.name"></Label>
                        <Label  :text="team.team_number"></Label>
                    </StackLayout>
                </v-template>
            </ListView>


        </StackLayout>

    </Page>
</template>

<script>
    export default {
        name: "SelectTeam",
        data() {
            return {
                teams: [],
                selected: null,
            }
        },
        methods: {
            onBack() {
                this.$modal.close()
            },
            async onSubmit() {

            },
            onSelectTeam(event) {
                this.$modal.close(event.item)

            },
            async created() {
                let { data: teams } = await this.$api.allTeams()
                this.teams = teams



            },

        }
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