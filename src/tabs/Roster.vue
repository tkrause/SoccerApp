<template>
    <ListView
            for="player in players"
            class="list-group"
            separatorColor="transparent"
            @itemTap="onPlayerTap">

        <v-template>
            <StackLayout class="list-group-item">
                <Label class="body" :text="player | name" />
                <Label class="body m-t-2 text-muted" :text="player.role | wordcase"></Label>
            </StackLayout>
        </v-template>
    </ListView>
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
                players: [],
            }
        },
        methods: {
            onPlayerTap(event) {

            }
        },
        filters: {
            name(v) {
                return `${v.name}`
            }
        },
        async created() {
            let { data: players } = await this.$api.teamMembers(this.team.id)
            this.players = players
        }
    }
</script>

<style scoped>
    .list-group-item {

    }
</style>