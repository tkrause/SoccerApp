<template>
    <Page class="page" @loaded="onLoaded">
        <ActionBar class="action-bar" @tap="onTeamSelect">
            <StackLayout
                orientation="horizontal"
                android:horizontalAlignment="left"
                ios:horizontalAlignment="center">

                <Label class="action-bar-title" verticalAlignment="center">{{ team.name }}</Label>
                <FontIcon class="action-bar-icon" name="fa-caret-down" verticalAlignment="center"></FontIcon>

            </StackLayout>

            <ActionItem
                v-show="selectedIndex !== 3"
                icon="res://add"
                @tap="onAdd"
                android.position="actionBar"></ActionItem>
        </ActionBar>

        <TabView class="tab-view fa"
                 v-model="selectedIndex"
                 @selectedIndexChange="onTabChanged"
                 androidTabsPosition="bottom">

            <TabViewItem :title="'fa-home' | fonticon">
                <Overview :team="team" ref="overview"></Overview>
            </TabViewItem>

            <TabViewItem :title="'fa-calendar' | fonticon">
                <Schedule :team="team" ref="schedule"></Schedule>
            </TabViewItem>

            <TabViewItem :title="'fa-users' | fonticon">
                <Roster :team="team" ref="roster"></Roster>
            </TabViewItem>

            <TabViewItem :title="'fa-cog' | fonticon">
                <Settings :team="team" ref="settings"></Settings>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import Overview from "../tabs/Overview";
    import Schedule from "../tabs/Schedule";
    import Roster from "../tabs/Roster";
    import Settings from "../tabs/Settings";

    import AddScore from "./AddScore";
    import TeamSelector from "./TeamSelector";
    import AddToRoster from "./AddToRoster";
    import AddEvent from "./AddEvent";

    export default {
        components:{
            Overview,
            Schedule,
            Roster,
            Settings,
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

            onLoaded() {
                this.onTabChanged({
                    newIndex: this.selectedIndex,
                })
            },

            onTabChanged({ newIndex }) {
                let available = ['overview', 'schedule', 'roster']
                if (newIndex > available.length)
                    return

                let ref = this.$refs[available[newIndex]]
                if (ref && ref.refresh)
                    ref.refresh()
            },

            async onAdd() {
                // navigate to the right component
                if (this.selectedIndex === 0) {
                    this.$navigateTo(AddScore, {
                        props: {
                            team: this.team,
                        }
                    })
                }

                if (this.selectedIndex === 1) {
                    try {
                        let eventType = await action("Select a Event Type", "Cancel",  [
                            'Game',
                            'Event',
                        ])

                        this.$navigateTo(AddEvent, {
                            props: {
                                team: this.team,
                                eventType: eventType.toLowerCase(),
                            }
                        })

                    } catch (e) {
                        // do nothin, user just hit cancel
                    }

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
        tab-text-font-size: 24 !important;
    }

    .action-bar-icon {
        margin-left: 10;
        font-size: 30;
    }

</style>