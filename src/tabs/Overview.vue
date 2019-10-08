<template>

    <Frame>
        <Page class="page" actionBarHidden="true" @loaded="onLoaded" @navigatedTo="onLoaded">
            <ScrollView v-if="! loading" class="body">
                <StackLayout>

                    <!-- Team Statistics Card -->
                    <CardView class="card" radius="8">
                        <StackLayout orientation="vertical" class="card-body">
                            <GridLayout rows="auto" columns="*, auto">
                                <Label class="heading" text="Statistics"></Label>
                                <Label class="fa icon-stats" :text="'fa-trophy' | fonticon" col="1"></Label>
                            </GridLayout>

                            <GridLayout rows="auto" columns="auto, *, auto">
                                <StackLayout col="0" orientation="vertical" verticalAlignment="center">
                                    <Label class="team-score">{{ team.wins }}</Label>
                                    <Label class="text-muted">Wins</Label>
                                </StackLayout>

                                <StackLayout col="1" orientation="horizontal" horizontalAlignment="center" verticalAlignment="center">
                                    <Label verticalAlignment="center">
                                        <FormattedString>
                                            <Span class="text-muted team-place">{{ team.placement || '1' }}</Span>
                                            <Span class="text-muted team-place-super">{{ team.placement || 'st' }}</Span>
                                        </FormattedString>
                                    </Label>

                                    <StackLayout>
                                        <Label class="team-name">{{ team.name }}</Label>
                                        <Label class="text-center text-muted">{{ team.team_number }}</Label>
                                    </StackLayout>
                                </StackLayout>

                                <StackLayout col="2" orientation="vertical" verticalAlignment="center">
                                    <Label class="text-right team-score">{{ team.losses }}</Label>
                                    <Label class="text-center text-muted">Losses</Label>
                                </StackLayout>
                            </GridLayout>
                        </StackLayout>
                    </CardView>

                    <!-- Recent Game Card -->
                    <CardView v-if="recentGame" class="card" radius="8">
                        <StackLayout orientation="vertical" class="card-body">
                            <GridLayout rows="auto" columns="*, auto">
                                <Label class="heading" text="Last Game"></Label>
                                <Label class="fa icon-game" :text="'fa-futbol-o' | fonticon" col="1"></Label>
                            </GridLayout>

                            <GridLayout rows="auto" columns="auto, *, auto">
                                <StackLayout col="0" horizontalAlignment="center">
                                    <Label class="team-score">{{ recentGame.home_score }}</Label>
                                    <Label class="text-muted">{{ recentGame.home_team.name }}</Label>
                                </StackLayout>

                                <Label col="1"
                                       verticalAlignment="center"
                                       horizontalAlignment="center"
                                       class="team-vs">vs</Label>

                                <StackLayout col="2" horizontalAlignment="center">
                                    <Label class="text-right team-score">{{ recentGame.away_score }}</Label>
                                    <Label class="text-muted">{{ recentGame.away_team.name }}</Label>
                                </StackLayout>
                            </GridLayout>

                            <Label class="m-t-12 event-date">{{ recentGame.start_at | date }}</Label>

                            <GridLayout class="m-t-12" columns="auto, *" @tap="onLocate(recentGame.location_address)">
                                <Label class="fa icon-location"
                                       verticalAlignment="center"
                                       :text="'fa-map-marker' | fonticon"></Label>

                                <StackLayout class="m-l-8" col="1">
                                    <Label class="location">{{ recentGame.location_name }}</Label>
                                    <Label class="text-muted">{{ recentGame.location_address }}</Label>
                                </StackLayout>
                            </GridLayout>

                        </StackLayout>
                    </CardView>

                    <!-- Upcoming Game Card -->
                    <CardView v-if="nextEvent" class="card" radius="8">
                        <StackLayout orientation="vertical" class="card-body">
                            <GridLayout rows="auto" columns="*, auto">
                                <Label class="heading heading-muted" :text="upcomingLabel"></Label>
                                <Label col="1" :class="['fa', upcomingClass]" :text="upcomingIcon | fonticon"></Label>
                            </GridLayout>

                            <Label class="event-date font-weight-bold">{{ nextEvent.start_at | date }}</Label>
                            <Label class="event-time font-weight-bold">{{ nextEvent.start_at | time }}</Label>

                            <GridLayout v-if="nextEvent.event_type === 'game'" rows="auto" columns="auto, *, auto">
                                <StackLayout col="0" horizontalAlignment="center">
                                    <Label class="team-score">{{ nextEvent.home_team.team_number }}</Label>
                                    <Label class="text-muted">{{ nextEvent.home_team.name }}</Label>
                                </StackLayout>

                                <Label col="1"
                                       verticalAlignment="center"
                                       horizontalAlignment="center"
                                       class="team-vs">vs</Label>

                                <StackLayout col="2" horizontalAlignment="center">
                                    <Label class="text-right team-score">{{ nextEvent.away_team.team_number }}</Label>
                                    <Label class="text-muted">{{ nextEvent.away_team.name }}</Label>
                                </StackLayout>
                            </GridLayout>

                            <Label v-if="nextEvent.location_detail"
                                   class="m-t-12"
                                   :text="nextEvent.location_detail"></Label>

                            <GridLayout class="m-t-12" columns="auto, *" @tap="onLocate(nextEvent.location_address)">
                                <Label class="fa icon-location"
                                       verticalAlignment="center"
                                       :text="'fa-map-marker' | fonticon"></Label>

                                <StackLayout class="m-l-8" col="1">
                                    <Label class="location">{{ nextEvent.location_name }}</Label>
                                    <Label class="text-muted">{{ nextEvent.location_address }}</Label>
                                </StackLayout>
                            </GridLayout>
                        </StackLayout>
                    </CardView>

                </StackLayout>
            </ScrollView>

            <ActivityIndicator v-else busy="true" width="50" height="50"></ActivityIndicator>

        </Page>
    </Frame>

</template>

<script>
    import moment from "moment";
    import * as utils from "tns-core-modules/utils/utils"
    import { debounce } from "../services/util";

    export default {
        props: {
            team: {
                type: Object,
                required: true,
            },
        },

        data() {
            return {
                recentGame: {
                    home_team: {},
                    away_team: {},
                },
                nextEvent: {
                    home_team: {},
                    away_team: {},
                },
                loading: true,
            }
        },

        computed: {
            upcomingLabel() {
                if (this.nextEvent?.event_type === 'game')
                    return 'Upcoming Game'

                return 'Upcoming Event'
            },
            upcomingClass() {
                if (this.nextEvent?.event_type === 'game')
                    return 'icon-game'

                return 'icon-event'
            },
            upcomingIcon() {
                if (this.nextEvent?.event_type === 'game')
                    return 'fa-futbol-o'

                return 'fa-calendar-o'
            }
        },

        filters: {
            date(date) {
                return moment(date).format('ddd, MMM DD');
            },

            time(date) {
                return moment(date).format('h:mm a');
            }
        },

        methods: {
            onLocate(address) {
                utils.openUrl(`geo:0,0?q=${ encodeURI(address) }`)
            },

            refresh() {
                this.onLoaded()
            },

            onLoaded: debounce(async function() {
                this.loading = true

                try {
                    let { data: recentGame } = await this.$api.recentEvent(this.team.id)
                    this.recentGame = recentGame
                    let { data: nextEvent } = await this.$api.nextEvent(this.team.id)
                    this.nextEvent = nextEvent
                } catch(e) {
                    alert(e.message)
                } finally {
                    this.loading = false
                }
            }, 400)
        },
    }
</script>
<style scoped>

    .body {
        background-color: #f4f4f4;
    }

    .heading, .location {
        color: #777;
        font-weight: bold;
    }

    .heading-muted {
        font-weight: normal;
    }

    .heading {
        padding-bottom: 15;
        font-size: 16;
    }

    .event-date {
        font-size: 18;
        padding-bottom: 4;
        color: #999;
    }

    .event-time {
        padding-bottom: 15;
        font-size: 18;
        color: #999;
    }

    .card {
        margin: 10;
        background-color: #fff;
    }

    .card-body {
        margin: 10;
    }

    .team-name {
        font-size: 18;
        font-weight: bold;
        margin-left: 8;
        color: #283237;
    }

    .team-vs {
        font-size: 18;
        font-weight: bold;
    }

    .team-place {
        font-size: 16;
    }

    .team-place-super {
        font-size: 12;
    }

    .team-score {
        font-size: 24;
    }

    .icon-stats {
        color: #e4a252;
    }

    .icon-game {
        color: #D34C46;
    }

    .icon-event {
        color: #276bb0;
    }

    .icon-location {
        font-size: 24;
        color: #a2a2a2;
    }
    
</style>