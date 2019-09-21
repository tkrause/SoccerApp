<template>
    <ListView
            for="player in players"
            class="list-group body"
            separatorColor="transparent"
            @itemTap="onPlayerTap">

        <v-template>
            <GridLayout class="list-group-item" rows="auto" columns="auto, *">
                <Label row="0" col="0" class="player-avatar" :text="player | toAvatar"></Label>

                <StackLayout row="0" col="1" verticalAlignment="center">
                    <Label :text="player | name" />
                    <Label class="m-t-2 text-muted" :text="player.role | wordcase"></Label>
                </StackLayout>
            </GridLayout>
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
                return `${v.user.name}`
            },
            toAvatar(p) {
                if (p.role === 'coach')
                    return 'C'

                if (p.role === 'admin')
                    return 'A'

                if (! p.jersey_number) {
                    // if it's a player and they don't have a number
                    // get their initials and display those
                    let matches = p.user.name.match(/\b(\w)/g);
                    return matches.slice(0,2).join('')
                }

                return p.jersey_number
            }
        },
        async created() {
            let { data: players } = await this.$api.teamMembers(this.team.id)
            this.players = players
        }
    }
</script>

<style scoped>
    .player-avatar {
        text-align: center;
        font-size: 20;
        font-weight: bold;

        padding-top: 10;
        border-radius: 50%;
        margin-right: 10;
        width: 40;
        height: 40;

        background-color: #a2a2a2;
        color: #f0f0f0;
    }
</style>