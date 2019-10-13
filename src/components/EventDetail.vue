<template>
    <Page class="page">
        <ActionBar class="action-bar" :title="title">
            <NavigationButton @tap="onBack" icon="res://back"/>
            <ActionItem
                    v-show="isGame"
                    icon="res://add"
                    @tap="onAdd"
                    android.position="actionBar"></ActionItem>
        </ActionBar>

        <StackLayout class="content">
            <Label class="h4 text-muted text-center m-y-4">{{ event.start_at | date }}</Label>
            <Label class="h4 text-muted text-center">{{ event.start_at | time }}</Label>
            <Label class="h5 text-center">
                <FormattedString>
                    <Span>{{ event.location_detail ? event.location_detail + ' - ' : '' }}</Span>
                    <Span>{{ event.location_name }}</Span>
                </FormattedString>
            </Label>

            <Label class="h4 m-b-4" color="#D34C46">Details</Label>

            <GridLayout rows="auto" columns="40, *">
                <Label col="0"
                       :text="'fa-map-marker' | fonticon"
                       class="fa event-icon"
                       @tap="onLocate"
                ></Label>

                <StackLayout col="1" @tap="onLocate">
                    <Label>{{ event.location_address }}</Label>
                    <Label class="text-muted">Location</Label>
                </StackLayout>

            </GridLayout>

            <GridLayout class="m-y-8" rows="auto" columns="40, *">
                <Label col="0"
                       :text="'fa-list' | fonticon"
                       class="fa event-icon"
                ></Label>

                <StackLayout col="1">
                    <Label>{{ event.location_detail }}</Label>
                    <Label class="text-muted">Additional Information</Label>
                </StackLayout>

            </GridLayout>

            <!-- Home Team -->
            <GridLayout v-if="isGame" class="m-y-8" rows="auto" columns="40, *">
                <Label v-if="isGame" col="0" :text="'fa-star' | fonticon" class="fa event-icon"></Label>

                <StackLayout v-if="isGame" col="1">
                    <Label>{{ event.home_team.name }}</Label>
                    <Label v-if="event.home_team.team_number">{{ event.home_team.team_number }}</Label>
                    <Label class="text-muted">Home Team</Label>
                    <Label class="text-muted">{{ isTeamVs(event.home_team) ? 'Opponent' : 'My Team'}}</Label>
                </StackLayout>
            </GridLayout>

            <!-- Home Score -->
            <GridLayout v-if="isGame" class="m-y-8" rows="auto" columns="40, *">
                <Label v-if="isGame" col="0" :text="'fa-line-chart' | fonticon" class="fa event-icon"></Label>

                <StackLayout v-if="isGame" col="1">
                    <Label>{{ event.home_score }}</Label>
                    <Label class="text-muted">Home Score</Label>
                    <Label class="text-muted">{{ isTeamVs(event.home_team) ? 'Opponent' : 'My Team'}}</Label>
                </StackLayout>
            </GridLayout>

            <!-- Away Team -->
            <GridLayout v-if="isGame" class="m-y-8" rows="auto" columns="40, *">
                <Label v-if="isGame" col="0" :text="'fa-star' | fonticon" class="fa event-icon"></Label>

                <StackLayout v-if="isGame" col="1">
                    <Label>{{ event.away_team.name }}</Label>
                    <Label v-if="event.away_team.team_number">{{ event.away_team.team_number }}</Label>
                    <Label class="text-muted">Away Team</Label>
                    <Label class="text-muted">{{ isTeamVs(event.away_team) ? 'Opponent' : 'My Team'}}</Label>
                </StackLayout>
            </GridLayout>

            <!-- Away Score -->
            <GridLayout v-if="isGame" class="m-y-8" rows="auto" columns="40, *">
                <Label v-if="isGame" col="0" :text="'fa-line-chart' | fonticon" class="fa event-icon"></Label>

                <StackLayout v-if="isGame" col="1">
                    <Label>{{ event.away_score }}</Label>
                    <Label class="text-muted">Away Score</Label>
                    <Label class="text-muted">{{ isTeamVs(event.away_team) ? 'Opponent' : 'My Team'}}</Label>
                </StackLayout>
            </GridLayout>

                <!--                <Label v-if="isGame" row="1" col="0" :text="'fa-star' | fonticon" class="fa"></Label>-->
            <!--                <StackLayout v-if="isGame" row="1" col="1">-->
            <!--                    <Label>{{ getTeamVs(event).name }}</Label>-->
            <!--                    <Label v-if="getTeamVs(event).team_number">{{ getTeamVs(event).team_number }}</Label>-->
            <!--                    <Label class="text-muted">Opponent</Label>-->
            <!--                </StackLayout>-->
        </StackLayout>
    </Page>
</template>

<script>
    import moment from "moment";
    import * as utils from "tns-core-modules/utils/utils"
    import AddScore from "./AddScore";

    export default {
        props: {
            team: {
                type: Object,
                required: true,
            },

            event: {
                type: Object,
                required: true,
            }
        },

        computed: {
            isGame() {
                return this.event.event_type === 'game'
            },

            title() {
                return this.event.event_type === 'game' ? 'Game Details' : 'Event Details'
            }
        },

        filters: {
            date(date) {
                return moment(date).format('ddd, MMM DD');
            },

            time(v) {
                return moment(v).format('h:mm A')
            },
        },

        data() {
            return {};
        },

        methods: {
            onBack() {
                this.$navigateBack();
            },

            isTeamVs(team) {
                return this.team.id === team.id;
            },

            onLocate() {
                utils.openUrl(`geo:0,0?q=${ encodeURI(this.event.location_address) }`)
            },

            onAdd() {
                this.$navigateTo(AddScore, {
                    props: {
                        team: this.team,
                        event: this.event,
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        margin: 20;
    }

    .event-icon {
        color: #D34C46;
        font-size: 24;
        text-align: center;
        vertical-align: center;
    }
</style>