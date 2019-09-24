<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Add Event">
            <NavigationButton @tap="onBack" icon="res://back"/>
        </ActionBar>

        <StackLayout class="form">
            <DateTimePicker title="Start At"></DateTimePicker>
        </StackLayout>
    </Page>
</template>

<script>
    import DateTimePicker from "./DateTimePicker";

    export default {
        components: {
            DateTimePicker
        },
        props: {
            team: {
                type: Object,
                required: true,
            }
        },
        methods: {
            onBack() {
                this.$navigateBack();
            },
        }
    }
</script>

<style>
    .form {
        margin: 20;
    }
</style>