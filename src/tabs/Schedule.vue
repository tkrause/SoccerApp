
<template>
    <Page class="page">
        <ActionBar title="Home" class="action-bar"></ActionBar>
        <ScrollView>
            <StackLayout class="home-panel">

                <ListView class="list-group" for="e in events" @itemTap="onItemTap" style="height:1250px">
                    <v-template>
                        <GridLayout class="list-group-item" rows="auto" columns="auto, *">

                            <StackLayout  class="m-r-10 event-box" row="0" col="0" verticalAlignment="center">

                                <Label class="m-t-4" :text="e.start_at | month"></Label>
                                <Label :text="e.start_at | dayOfTheMonth"></Label>
                                <Label :text="e.start_at | day"></Label>
                            </StackLayout>

                            <StackLayout row="0" col="1" verticalAlignment="center">
                                <Label class="font-weight-bold" :text="e.start_at | time"></Label>
                                <Label v-if="e.event_type === 'game'" class="text-muted"  >vs. {{getTeamVs(e)}}</Label>
                                <Label class="text-muted" :text="e.location_name"></Label>
                            </StackLayout>

                        </GridLayout>
                    </v-template>
                </ListView>


            </StackLayout>
        </ScrollView>
    </Page>
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
        methods: {
            onItemTap: function (args) {
                console.log('Item with index: ' + args.index + ' tapped');
            },
            getTeamVs(event) {
                if(this.team === event.home_team_id)
                    return event.away_team_id;
                else
                    return event.home_team_id;
            }
        },
        data() {
            return {

                events: [
                    {
                        "id": 1,
                        "event_type": "event",
                        "home_team_id": 1,
                        "away_team_id": null,
                        "home_score": 0,
                        "away_score": 0,
                        "location_name": "Chucky Cheese",
                        "location_address": "27019 Chucky Cheese, United States",
                        "location_detail": "Team Party",
                        "start_at": "2019-09-30T21:08:29.635Z",
                        "started_at": null,
                        "ended_at": null
                    },
                    {
                        "id": 2,
                        "event_type": "game",
                        "home_team_id": 1,
                        "away_team_id": 2,
                        "home_score": 10,
                        "away_score": 6,
                        "location_name": "Ocean Side Middle School",
                        "location_address": "12345 School, Monterrey",
                        "location_detail": "Field 4",
                        "start_at": "2019-09-16T21:08:29.668Z",
                        "started_at": "2019-09-16T21:08:29.668Z",
                        "ended_at": "2019-09-16T22:08:29.668Z"
                    },
                    {
                        "id": 3,
                        "event_type": "game",
                        "home_team_id": 1,
                        "away_team_id": 2,
                        "home_score": 0,
                        "away_score": 0,
                        "location_name": "Ocean Side Middle School",
                        "location_address": "12345 School, Monterrey",
                        "location_detail": "Field 1",
                        "start_at": "2019-09-18T21:08:29.673Z",
                        "started_at": null,
                        "ended_at": null
                    },
                    {
                        "id": 4,
                        "event_type": "game",
                        "home_team_id": 2,
                        "away_team_id": 1,
                        "home_score": 0,
                        "away_score": 0,
                        "location_name": "Ocean Side Middle School",
                        "location_address": "12345 School, Monterrey",
                        "location_detail": "Field 2",
                        "start_at": "2019-10-02T21:08:29.682Z",
                        "started_at": null,
                        "ended_at": null
                    },
                    {
                        "id": 5,
                        "event_type": "game",
                        "home_team_id": 3,
                        "away_team_id": 1,
                        "home_score": 0,
                        "away_score": 0,
                        "location_name": "Ocean Side Middle School",
                        "location_address": "12345 School, Monterrey",
                        "location_detail": "Field 3",
                        "start_at": "2019-10-05T21:08:29.701Z",
                        "started_at": null,
                        "ended_at": null
                    }
                ]

            }
        },

        filters: {
            month(v) {
                return moment(v).format('MMM');
            },
            day(v) {
                return moment(v).format('ddd');
            },
            dayOfTheMonth(v) {
                return moment(v).format('D');
            },
            time(v) {
                return moment(v).format('h:mm A');
            },

        },

    }
</script>



<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20px;
        margin: 15px;
    }

    .description-label {
        margin-bottom: 15px;
    }
    .event-box {
        background-color: #F2F3F4;
        padding: 8 4;
        border-radius: 8;

    }
</style>