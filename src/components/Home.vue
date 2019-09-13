<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Soccer League"></ActionBar>

        <TabView
            class="tab-view"
            androidTabsPosition="bottom">

            <TabViewItem class="tab-view-item" title="Tab 1">
                <Teams></Teams>
            </TabViewItem>

            <TabViewItem class="tab-view-item" title="Tab 2">
                <Label text="Content for Tab 2" />
            </TabViewItem>
        </TabView>
<!--        <Label class="font-weight-bold">Welcome {{ $api.current_user.name }}</Label>-->
    </Page>
</template>

<script>
    import Teams from "../tabs/Teams";

    export default {
        name: "Home",
        components: {
            Teams
        }
    }
</script>