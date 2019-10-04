<template>
    <RadListView
            for="player in players"
            ref="listView"
            class="list-group body"
            separatorColor="transparent"
            swipeActions="true"
            pullToRefresh="true"
            @itemSwipeProgressStarted="onSwipeStarted"
            @pullToRefreshInitiated="onPullAction">

        <v-template>
            <GridLayout class="list-group-item" rows="auto" columns="auto, *">
                <Label row="0" col="0" class="player-avatar" :text="player | toAvatar"></Label>

                <StackLayout row="0" col="1" verticalAlignment="center">
                    <Label :text="player | name" />
                    <Label class="m-t-2 text-muted" :text="player.role | wordcase"></Label>
                </StackLayout>
            </GridLayout>
        </v-template>

        <v-template name="itemswipe">
            <GridLayout columns="*, auto" backgroundColor="#F2F3F4">
                <StackLayout id="delete-view"
                             col="1"
                             class="swipe-item right"
                             orientation="horizontal" @tap="onPlayerSwipeClick">
                    <Label class="fa p-y-4 p-x-8"
                           color="#283237"
                           text="Remove"
                           verticalAlignment="center"
                           horizontalAlignment="center"></Label>
                </StackLayout>
            </GridLayout>
        </v-template>
    </RadListView>
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
            onSwipeStarted ({ data, object }) {
                const swipeLimits = data.swipeLimits;
                const right = object.getViewById('delete-view');
                swipeLimits.right = right.getMeasuredWidth();
                swipeLimits.threshold = right.getMeasuredWidth() / 2;
            },

            async onPlayerSwipeClick({ object }) {
                let player = object.bindingContext

                try {
                    // remove from the api, when succeeded delete local object
                    await this.$api.client.delete(`/teams/${this.team.id}/members/${player.id}`)
                    this.removePlayer(player)
                } catch (e) {
                    // if we found the object but had some other error
                    if (e.response.statusCode !== 404) {
                        alert(e.response.data.error)
                    } else {
                        // this is fine the player doesn't exist on the server
                        this.removePlayer(player)
                    }
                } finally {
                    // tell the listView it can swipe other items
                    this.$refs.listView.notifySwipeToExecuteFinished();
                }
            },

            removePlayer(player) {
                this.players.splice(this.players.indexOf(player), 1)
            },

            onPullAction({ object }) {
                this.$nextTick(() => {
                    this.load().finally(() => {
                        object.notifyPullToRefreshFinished();
                    })
                });
            },

            refresh() {
                this.load()
            },

            async load() {
                let { data: players } = await this.$api.teamMembers(this.team.id)
                this.players = players
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
        created() {
            this.load()
        }
    }
</script>

<style scoped>
    .player-avatar {
        text-align: center;
        font-size: 20;
        font-weight: bold;

        padding-top: 10;
        border-radius: 8;
        margin-right: 10;
        width: 40;
        height: 40;

        background-color: #F2F3F4;
        color: #283237;
    }
</style>