<template>
    <scroll-view>

        <stacklayout>
            <CardView class="cards" >
                <stack-layout orientation="vertical">
                    <action-bar class="action-bar" title="Current Game Stats"></action-bar>
                    <label class="stats" :text="team.name" ></label>
                    <label class="stats">Team Number: {{team.team_number}}</label>
                    <label class="stats" text="League Placement: "></label>
                    <label class="stats">Number of wins: {{team.wins}}</label>
                    <label class="stats">Number of losses: {{team.losses}}</label>
                </stack-layout>
            </CardView>
            <CardView class="cards">
                <stack-layout orientation="vertical">
                    <action-bar class="action-bar" title="Most Recent Game"></action-bar>
                    <label class="recent" > team vs team</label>
                    <label class="team" text="Score:  "></label>
<!--                    <label class="recent" >{{event.home_team.name}} vs {{event.away_team.name}}</label>-->
                    <label></label>


                </stack-layout>

            </CardView>
            <CardView class="cards" >
                <stack-layout orientation="vertical">
                    <action-bar class="action-bar" title="Upcoming Event"></action-bar>
                    <label>{{next_event.event_type}}</label>
<!--                    <label v-if="next_event.event_type === 'game'">{{next_event.home_team.name}} vs {{next_event.away_team.name}}</label>-->
                </stack-layout>
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

        data() {
            return {
                recent_game: {},
                next_event: {},
                loading: false,
            }
        }
    },
    methods: {
        async created() {
            this.loading = true

            try {
                let { data: recent_game } = await this.$api.recentEvent(this.team.id)
                this.recent_game = recent_game
                let { data: next_event } = await this.$api.nextEvent(this.team.id)
                console.log(this.next_event)
                this.next_event = next_event
            }
            finally {
                this.loading = false
            }
        }
    }
}
</script>
<style scoped>
    .action-bar{
        text-align: center;
        padding-left: 0px !important;
        padding-right: 0px !important;
        padding-bottom: 15px;
        padding-top: 0px;
    }

    .cards{
        border-radius:50px !important;
        margin : 10;
        elevation : 30;
        radius : 1;
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