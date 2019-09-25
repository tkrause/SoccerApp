<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Add Event">
            <NavigationButton @tap="onBack" icon="res://back"/>
        </ActionBar>

        <StackLayout class="form">
<!--         You can delete this line and the label below it :)-->
            <Label :text="form.start_at"></Label>
            <DateTimePicker v-model="form.start_at" title="Start At"></DateTimePicker>
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
        data() {
            return {
                form: {
                    start_at: null,
                }
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