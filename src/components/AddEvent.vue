<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Add Event">
            <NavigationButton @tap="onBack" icon="res://back"/>
        </ActionBar>

        <StackLayout class="form">
            <DateTimePicker v-model="form.start_at" title="Date"></DateTimePicker>
            <Button text="Create" @tap="onButtonTap"></Button>

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
            },
            eventType: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
                form: {
                    start_at: null,
                },
            }
        },
        methods: {
            onButtonTap() {
                console.log("Button was pressed");
            },
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