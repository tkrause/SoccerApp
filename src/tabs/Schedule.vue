<template>
    <Frame>
        <Page class="page" actionBarHidden="true">

            <RadListView
                    for="e in events"
                    ref="listView"
                    class="list-group body"
                    separatorColor="transparent"
                    swipeActions="true"
                    pullToRefresh="true"
                    @itemTap="onItemTap"
                    @itemSwipeProgressStarted="onSwipeStarted"
                    @pullToRefreshInitiated="onPullAction">

                <v-template>
                    <GridLayout class="list-group-item" rows="auto" columns="auto, *">

                        <StackLayout class="m-r-10 event-box"
                                     row="0" col="0"
                                     horizontalAlignment="center" verticalAlignment="center"
                                     orientation="horizontal">

                            <StackLayout class="m-r-4" verticalAlignment="center">
                                <Label v-for="c in toMonth(e.start_at)"
                                       :key="c"
                                       :text="c"
                                       class="text-month"></Label>
                            </StackLayout>

                            <StackLayout verticalAlignment="center" horizontalAlignment="center">
        <!--                    <Label class="text-month" :text="e.start_at | month"></Label>-->
                                <Label class="text-date" :text="e.start_at | dayOfTheMonth"></Label>
                                <Label class="text-day" :text="e.start_at | day"></Label>
                            </StackLayout>
                        </StackLayout>

                        <StackLayout row="0" col="1" verticalAlignment="center">
                            <Label>
                                <FormattedString>
                                    <Span :class="['fa', e.event_type === 'game' ? 'icon-game' : 'icon-event']"
                                          :text="e.event_type === 'game' ? 'fa-futbol-o' : 'fa-calendar-o' | fonticon"></Span>
                                    <Span text=" "></Span>
                                    <Span class="font-weight-bold" :text="e.start_at | time"></Span>
                                </FormattedString>
                            </Label>
                            <Label v-if="e.event_type === 'game'" class="text-muted m-y-2">vs. {{ getTeamVs(e) }}</Label>
                            <Label v-else-if="e.location_detail" class="text-muted m-y-2" :text="e.location_detail"></Label>
                            <Label class="text-muted" :text="e.location_name"></Label>
                        </StackLayout>

                    </GridLayout>
                </v-template>

                <v-template name="itemswipe">
                    <GridLayout columns="*, auto" backgroundColor="#B02F26">
                        <StackLayout id="delete-view"
                                     col="1"
                                     class="swipe-item right"
                                     orientation="horizontal" @tap="onEventSwipeClick">
                            <Label class="fa p-y-4 p-x-8"
                                   color="#ffffff"
                                   fontSize="16"
                                   :text="'fa-trash-o' | fonticon"
                                   verticalAlignment="center"
                                   horizontalAlignment="center"></Label>
                        </StackLayout>
                    </GridLayout>
                </v-template>
            </RadListView>

        </Page>
    </Frame>
</template>

<script>
    import moment from "moment";
    import EventDetail from "../components/EventDetail";

    export default {
        props: {
            team: {
                type: Object,
                required: true,
            }
        },

        data() {
            return {
                events: [],
                loading: true,
                swiping: false,
            }
        },

        filters: {
            month(v) {
                return moment(v).format('MMM')
            },
            day(v) {
                return moment(v).format('ddd')
            },
            dayOfTheMonth(v) {
                return moment(v).format('DD')
            },
            time(v) {
                return moment(v).format('h:mm A')
            },
        },

        methods: {
            onItemTap({ item }) {
                if (this.swiping) {
                    this.swiping = false
                    return
                }

                this.$navigateTo(EventDetail, {
                    props: {
                        event: item,
                        team: this.team,
                    }
                })
            },

            getTeamVs(event) {
                if(this.team === event.home_team_id)
                    return event.away_team.name
                else
                    return event.home_team.name
            },

            toMonth(v) {
                return moment(v).format('MMM').toUpperCase().split('')
            },

            refresh() {
                this.onLoaded()
            },

            async onLoaded() {
                this.loading = true

                try {
                    let { data: events } = await this.$api.eventsForTeam(this.team.id)
                    this.events = events
                } finally {
                    this.loading = false
                }
            },

            onSwipeStarted ({ data, object }) {
                const swipeLimits = data.swipeLimits;
                const right = object.getViewById('delete-view');
                swipeLimits.right = right.getMeasuredWidth();
                swipeLimits.threshold = right.getMeasuredWidth() / 2;

                this.swiping = true;
            },

            async onEventSwipeClick({ object }) {
                let event = object.bindingContext

                try {
                    // remove from the api, when succeeded delete local object
                    await this.$api.client.delete(`/events/${event.id}`)
                    this.removeEvent(event)
                } catch (e) {
                    // if we found the object but had some other error
                    if (e.response.statusCode !== 404) {
                        alert(e.response.data.error)
                    } else {
                        // this is fine the player doesn't exist on the server
                        this.removeEvent(event)
                    }
                } finally {
                    // tell the listView it can swipe other items
                    this.$refs.listView.notifySwipeToExecuteFinished();
                    this.swiping = false;
                }
            },

            removeEvent(event) {
                this.events.splice(this.events.indexOf(event), 1)
            },

            onPullAction({ object }) {
                this.$nextTick(() => {
                    this.onLoaded().finally(() => {
                        this.swiping = false
                        object.notifyPullToRefreshFinished();
                    })
                });
            },

        },

        created() {
            this.onLoaded()
        }
    }
</script>

<style scoped>
    .event-box {
        /*text-align: center;*/
        background-color: #F2F3F4;
        padding: 0;
        border-radius: 8;
        width: 60;
        height: 60;
    }

    .text-month {
        font-weight: bold;
        font-size: 12;
        color: #283237;
    }

    .text-date {
        font-size: 24;
        margin-bottom: 4;
        font-weight: bold;
        color: #7a5553;
    }

    .text-day {
        font-size: 14;
        text-transform: uppercase;
        color: #7E8487;
    }

    .icon-game {
        color: #B02F26;
    }

    .icon-event {
        color: #276bb0;
    }
    /*.event-box Label {*/
    /*    color: #262626;*/
    /*}*/
</style>