<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Soccer League"></ActionBar>
<!--        <Label class="font-weight-bold">Welcome {{ $api.current_user.name }}</Label>-->
        <TabView
            class="tab-view"
            androidTabsPosition="bottom">

            <TabViewItem class="fa" :title="'fa-home' | fonticon">
                <Overview></Overview>
            </TabViewItem>

            <TabViewItem class="fa" :title="'fa-calendar' | fonticon">
                <Schedule></Schedule>
            </TabViewItem>

            <TabViewItem class="fa" :title="'fa-users' | fonticon">
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

<style scoped>
    .tab-view {
        tab-text-font-size: 18;
    }
</style>