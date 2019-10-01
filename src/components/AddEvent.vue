<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Add Event">
            <NavigationButton @tap="onBack" icon="res://back"/>
        </ActionBar>

        <StackLayout class="form">
            <TextField hint="Select type of Event"
                       editable="false"
                       :text="name"
                       @tap="onSelectEventType"
                       class="input input-rounded input-border"></TextField>
            <!--         You can delete this line and the label below it :)-->
            <Label :text="form.start_at"></Label>
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
            }
        },
        data() {
            return {
                form: {
                    start_at: null,
                    event_type:null
                },
                types: [
                    'Game',
                    'Event',

                ],
            }
        },
        methods: {
            onButtonTap() {
                console.log("Button was pressed");
            },
            onBack() {
                this.$navigateBack();
            },
            async onSelectEventType() {
                try {
                    let result = await action("Select a Event Type", "Cancel", this.types)
                    this.form.event_type = result
                } catch (e) { }
            }//})
        }
    }
</script>

<style>
    .form {
        margin: 20;
    }

</style>