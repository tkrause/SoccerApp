<template>
    <ListView class="list-group"
              for="e in events"
              separatorColor="transparent"
              @itemTap="onItemTap">
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
                    <Label class="text-muted" :text="e.location_name"></Label>
                </StackLayout>

            </GridLayout>
        </v-template>
    </ListView>
</template>

<script>
    import moment from "moment";

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
                loading: false,
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
            onItemTap(args) {
                console.log('Item with index: ' + args.index + ' tapped')
            },
            getTeamVs(event) {
                if(this.team === event.home_team_id)
                    return event.away_team_id
                else
                    return event.home_team_id
            },
            toMonth(v) {
                return moment(v).format('MMM').toUpperCase().split('')
            }
        },
        async created() {
            this.loading = true

            try {
                let { data: events } = await this.$api.eventsForTeam(this.team.id)
                this.events = events
            } finally {
                this.loading = false
            }
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