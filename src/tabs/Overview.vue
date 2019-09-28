<template>
    <scroll-view>

        <stacklayout>
            <CardView class="cards" radius="8">
                <stack-layout orientation="vertical">
                    <Label class="heading" text="Team Statistics"></Label>
                    <Label class="stats" :text="team.name" ></Label>
                    <Label class="stats">Team Number: {{ team.team_number }}</Label>
                    <Label class="stats" text="League Placement: "></Label>
                    <Label class="stats">Number of wins: {{ team.wins }}</Label>
                    <Label class="stats">Number of losses: {{ team.losses }}</Label>
                </stack-layout>
            </CardView>
            <CardView class="cards" radius="8">
                <stack-layout orientation="vertical">
                    <Label class="heading" text="Most Recent Game"></Label>
                    <Label class="recent">team vs team</Label>
                    <Label class="team" text="Score:  "></Label>
<!--                    <Label class="recent" >{{event.home_team.name}} vs {{event.away_team.name}}</Label>-->
                    <Label></Label>


                </stack-layout>

            </CardView>
            <CardView class="cards" radius="8">
                <StackLayout orientation="vertical">
                    <Label class="heading" text="Upcoming Event"></Label>
                    <Label>{{ nextEvent.event_type }}</Label>
                    <Label v-if="nextEvent.event_type === 'game'">
                        <FormattedText>
                            <Span>{{ nextEvent.home_team.name }}</Span>
                            <Span> vs </Span>
                            <Span>{{ nextEvent.away_team.name }}</Span>
                        </FormattedText>
                    </Label>
                </StackLayout>
            </CardView>

        </stacklayout>
    </scroll-view>

</template>

<script>

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
    },
    methods: {

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
    .action-bar {
        text-align: center;
        padding-left: 0px !important;
        padding-right: 0px !important;
        padding-bottom: 15px;
        padding-top: 0px;
    }

    .heading {
        padding: 24;
        background-color: #276bb0;
        font-size: 24;
        color: #fff;
        font-weight: bold;
    }

    .cards{
        /*border-radius:50px !important;*/
        margin : 10;
        /*elevation : 30;*/
        /*radius : 1;*/
        padding: 10px;
        padding-left: 0px ;
        padding-right: 0px;

    }

    .stats{
        padding-left: 25px;
        padding-right: 25px !important;
        padding-bottom: 0px;
        padding-top: 15px;
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