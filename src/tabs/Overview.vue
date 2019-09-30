<template>
    <ScrollView>
        <StackLayout>
            <CardView class="cards" radius="8">
                <StackLayout orientation="vertical">
                    <Label class="heading" text="Team Statistics"></Label>
                    <Label class="stats" :text="team.name" ></Label>
                    <Label class="stats">Team Number: {{ team.team_number }}</Label>
                    <Label class="stats" text="League Placement: "></Label>
                    <Label class="stats">Number of wins: {{ team.wins }}</Label>
                    <Label class="stats">Number of losses: {{ team.losses }}</Label>
                </StackLayout>
            </CardView>
            <CardView class="cards" radius="8">
                <StackLayout orientation="vertical">
                    <Label class="heading" text="Most Recent Game"></Label>
                    <Label class="stats">team vs team</Label>
                    <Label class="team" text="Score:  "></Label>
<!--                    <Label class="recent" >{{recentGame.home_team.name}} vs {{recentGame.away_team.name}}</Label>-->
                    <Label></Label>
                </StackLayout>

            </CardView>
            <CardView class="cards" radius="8">
                <StackLayout orientation="vertical">
                    <Label class="heading" text="Upcoming Event"></Label>
                    <Label class="stats" >Next {{ nextEvent.event_type }} info </Label>
                    <Label v-if="nextEvent.event_type === 'game'">
                        <FormattedText>
                            <Span>{{ nextEvent.home_team.name }}</Span>
                            <Span> vs </Span>
                            <Span>{{ nextEvent.away_team.name }}</Span>
                        </FormattedText>
                    </Label>
                    <Label class="stats" >Date: {{nextEvent.start_at}}</Label>
                    <Label class="stats">Location: {{nextEvent.location_name}}</Label>
                    <Label class="stats">Address: {{nextEvent.location_address}}</Label>
                </StackLayout>
            </CardView>

        </StackLayout>
    </ScrollView>

</template>

<script>
    import moment from "moment";
export default {
    props: {
        team: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            recentGame: {},
            nextEvent: {},
            loading: false,
        }
    },filters: {
        moment: function (date) {
            return moment(date).format('MMMM Do YYYY, h:mm A');
        }
    },
    methods: {
        moment: function () {
            return moment();
        }
    },
    async created() {
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
    }
}
</script>
<style scoped>

    .heading {
        padding: 15;
        background-color: rgba(38, 164, 176, 0.99);
        font-size: 24;
        color: #fff;
        font-weight: bold;
    }

    .cards{
        margin : 10;
        padding: 10px;
        padding-left: 0px ;
        padding-right: 0px;

    }

    .stats{
        padding-left: 25px;
        padding-right: 25px !important;
        padding-bottom: 7px;
        padding-top: 7px;
    }
    .recent{
        text-align:center;
        padding-left: 25px !important;
        padding-right: 25px !important;
        padding-bottom: 25px;
        padding-top: 25px;
    }
    .team{
        text-align:center;
        font-weight: bold;
        padding-left: 15px !important;
        padding-right: 15px !important;
        padding-bottom: 15px;
        padding-top: 15px;
    }
    
</style>