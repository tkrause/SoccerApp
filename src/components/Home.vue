<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Soccer League"></ActionBar>
<!--        <Label class="font-weight-bold">Welcome {{ $api.current_user.name }}</Label>-->
        <TabView
            class="tab-view"
            androidTabsPosition="bottom">
            <TabViewItem title="Overview">
                <Overview></Overview>
            </TabViewItem>
            <TabViewItem title="Schedule">
            <Schedule></Schedule>
            </TabViewItem>
            <TabViewItem title="Roster">
                <Roster></Roster>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>

    import Overview from "../tabs/Overview";
    import Schedule from "../tabs/Schedule";
    import Roster from "../tabs/Roster";

    export default {
        name: "Home",
        components:{
            Overview,
            Schedule,
            Roster
        }

    }
</script>