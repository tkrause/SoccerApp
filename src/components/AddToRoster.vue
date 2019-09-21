<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Add to Roster">
            <NavigationButton @tap="onBack" android.systemIcon="ic_menu_back" />
        </ActionBar>

        <StackLayout class="form">
            <TextField hint="Email" class="input input-rounded input-border" />
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        props: {
            team: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {

            }
        },
        methods: {
            onBack() {
                this.$navigateBack();
            }
        }
    }
</script>

<style scoped>

</style>