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
                @tap="onAdd"
                ios.systemIcon="4" ios.position="left"
                android.systemIcon="ic_menu_add" android.position="actionBar" />
        </ActionBar>

        <TabView class="tab-view fa" androidTabsPosition="bottom">

            <TabViewItem :title="'fa-home' | fonticon">
                <Overview></Overview>
            </TabViewItem>

            <TabViewItem :title="'fa-calendar' | fonticon">
                <Schedule :team="team"></Schedule>
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
            }
        },
        data() {
            return {
                teams: [],
            }
        },
        methods: {
            onTeamSelect() {
                this.$navigateTo(TeamSelector)
            },
            onAdd() {
                console.log('onAdd()')
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