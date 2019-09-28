<template>
    <Page class="page">
        <ActionBar class="action-bar" @tap="onTeamSelect">
            <StackLayout
                orientation="horizontal"
                android:horizontalAlignment="left"
                ios:horizontalAlignment="center">

                <Label class="action-bar-title" verticalAlignment="center">{{ team.name }}</Label>
                <FontIcon class="action-bar-icon" name="fa-caret-down" verticalAlignment="center"></FontIcon>

            </StackLayout>

            <ActionItem
                v-show="selectedIndex !== 0"
                icon="res://add"
                @tap="onAdd"
                android.position="actionBar" />
        </ActionBar>

        <TabView class="tab-view fa"
                 v-model="selectedIndex"
                 androidTabsPosition="bottom">

            <TabViewItem :title="'fa-home' | fonticon">
                <Overview :team="team" ></Overview>

            </TabViewItem>

            <TabViewItem :title="'fa-calendar' | fonticon">
                <Schedule :team="team" ></Schedule>
            </TabViewItem>

            <TabViewItem :title="'fa-users' | fonticon">
                <Roster :team="team"></Roster>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import Overview from "../tabs/Overview";
    import Schedule from "../tabs/Schedule";
    import Roster from "../tabs/Roster";

    import TeamSelector from "./TeamSelector";
    import AddToRoster from "./AddToRoster";
    import AddEvent from "./AddEvent";

    export default {
        components:{
            Overview,
            Schedule,
            Roster
        },
        props: {
            team: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                teams: [],
                selectedIndex: 0,
            }
        },
        methods: {
            onTeamSelect() {
                this.$navigateTo(TeamSelector)
            },
            async onAdd() {
                // navigate to the right component
                if (this.selectedIndex === 1) {
                    this.$navigateTo(AddEvent, {
                        props: {
                            team: this.team,
                        }
                    })
                    // nav to add event / game
                } else if (this.selectedIndex === 2) {
                    this.$navigateTo(AddToRoster, {
                        props: {
                            team: this.team,
                        }
                    })
                }
            },
        },
    }
</script>

<style scoped>
    .tab-view {
        tab-text-font-size: 24;
    }

    .action-bar-icon {
        margin-left: 10;
        font-size: 30;
    }

</style>