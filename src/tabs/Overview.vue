<template>
    <scroll-view>
        <stacklayout>
            <CardView class="cards" >
                <stack-layout class="stats" orientation="vertical">
                    <label class="title" >Current Game Stats</label>
                    <label class="team" :text="team.name" ></label>
                    <label text="League Placement: "></label>
                    <label text="Number of wins: "></label>
                    <label text="Number of loses: "></label>
                    <label text="Total points: "></label>
                </stack-layout>
            </CardView>
            <CardView class="cards" >
                <stack-layout orientation="vertical">
                    <label class="title" >Most Recent Game</label>

                </stack-layout>
            </CardView>
            <CardView class="cards" >
                <grid-layout rows="120, auto" columns="*, *, *, *">
                    <label class="title" row="0" colSpan="3">Upcoming event</label>

                </grid-layout>
            </CardView>
            <CardView class="cards" >
                <grid-layout rows="120, auto" columns="*, *, *, *">
                    <label class="title" row="0" colSpan="3">Past Event</label>

                </grid-layout>
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

        }
    }
}
</script>
<style scoped>
    .cards{
        margin : 10;
        elevation : 30;
        radius : 1;
        padding: 10px;
        padding-left: 25px !important;
        padding-right: 25px !important;

    }
    .title{
        text-align: center;
        font-weight: bold;
        text-decoration: underline;
    }
    
    .sh{
        background-color: #f44336; /* Red */
        border: none;
        color: white;
        padding: 4px 4px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 8px;
    }
    .stats{
        padding-left: 25px !important;
        padding-right: 25px !important;
        padding-bottom: 25px;
        padding-top: 25px;
    }
    
</style>